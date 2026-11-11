"""Verify rendered production/preview docs and the complete topic sitemap graph.

Run against a loopback build with --mode production or preview, --base-url and
--output. This is HTTP validation, not browser automation or proof of indexing.
Reuse inspect.py's HTML reader; preserve its existing audit CLI and imports.
"""
import argparse
import importlib.util
import json
import re
import xml.etree.ElementTree as ET
from collections import deque
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import unquote, urljoin, urlsplit
from urllib.request import urlopen

spec = importlib.util.spec_from_file_location('docs_inspect', Path(__file__).with_name('inspect.py'))
reader = importlib.util.module_from_spec(spec)
spec.loader.exec_module(reader)
CANONICAL = 'https://www.chorono.com'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}


def check(base, mode, expected_docs, expected_unlisted):
    """Read bounded same-origin routes/assets; accumulate all failures for review.

    Production URLs in XML are mapped to the inspected server without rewriting
    the expected canonical identity. External links are not crawled or ranked.
    """
    errors, pages, topics, assets = [], {}, {}, {}
    def require(condition, message):
        if not condition:
            errors.append(message)

    def fetch(path):
        try:
            with urlopen(base + path, timeout=25) as response:
                return response.status, response.read(), {key.lower(): value for key, value in response.headers.items()}, response.url
        except HTTPError as error:
            return error.code, error.read(), {key.lower(): value for key, value in error.headers.items()}, error.url

    def sitemap(path):
        status, body, headers, _ = fetch(path)
        require(status == 200, f'{path}: HTTP {status}')
        require('xml' in headers.get('content-type', ''), f'{path}: incorrect XML content type')
        require(len(body) < 50 * 1024 * 1024, f'{path}: over 50 MB')
        return ET.fromstring(body)

    status, robots, _, _ = fetch('/robots.txt')
    require(status == 200, 'robots.txt missing')
    robots = robots.decode()
    index_path = '/sitemap.xml' if mode == 'production' else '/sitemap-preview.xml'
    index = sitemap(index_path)
    require(index.tag == '{%s}sitemapindex' % NS['s'], 'Expected a sitemap index')
    topic_locations = index.findall('s:sitemap/s:loc', NS)
    require(0 < len(topic_locations) <= 50_000, 'Empty or oversized sitemap index')
    require(len({node.text for node in topic_locations}) == len(topic_locations), 'Duplicate sitemap topics')
    for node in topic_locations:
        target = urlsplit(node.text)
        require(target.scheme in ['http', 'https'], f'Invalid topic URL: {node.text}')
        if mode == 'production':
            require(node.text.startswith(CANONICAL + '/'), f'Noncanonical topic: {node.text}')
        path = target.path + ('?' + target.query if target.query else '')
        root = sitemap(path)
        require(root.tag == '{%s}urlset' % NS['s'], f'{path}: expected urlset')
        urls = [entry.text for entry in root.findall('s:url/s:loc', NS)]
        require(0 < len(urls) <= 50_000, f'{path}: empty or oversized topic')
        topics[path] = urls
        for entry in root.findall('s:url', NS):
            modified = entry.find('s:lastmod', NS)
            if modified is not None:
                try:
                    require(datetime.fromisoformat(modified.text.replace('Z', '+00:00')).date() <= datetime.now(timezone.utc).date(), f'{path}: future lastmod')
                except ValueError:
                    require(False, f'{path}: invalid lastmod')

    urls = [url for values in topics.values() for url in values]
    require(len(set(urls)) == len(urls), 'Duplicate URLs across topic sitemaps')
    listed_paths = {urlsplit(url).path for url in urls}

    def read_page(path, listed):
        """Inspect one rendered identity; only explicit noindex guides may be
        reachable outside the production sitemap. Never relax checks for a
        listed URL, even if a page also calls itself coming soon."""
        status, body, headers, resolved = fetch(path)
        require(status == 200 and resolved == base + path, f'{path}: status/redirect {status} → {resolved}')
        require('text/html' in headers.get('content-type', ''), f'{path}: not HTML')
        page = reader.DocumentationHTML(body.decode()).result()
        pages[path] = page
        require(page['canonical'] in ([CANONICAL, CANONICAL + '/'] if path == '/' else [CANONICAL + path]), f'{path}: canonical mismatch')
        require(page['metadata'].get('og:url') == page['canonical'], f'{path}: Open Graph URL mismatch')
        require(len(page['h1']) == 1 and page['title'] and page['description'], f'{path}: missing title/description or H1 count')
        require(len(set(page['ids'])) == len(page['ids']), f'{path}: duplicate element IDs')
        if mode == 'production':
            if listed:
                require('noindex' not in page['robots'].lower() and 'noindex' not in headers.get('x-robots-tag', '').lower(), f'{path}: sitemap page unexpectedly noindex')
            else:
                require('noindex' in page['robots'].lower() and 'nofollow' not in page['robots'].lower(), f'{path}: unlisted guide must be noindex/follow')
        return page

    for url in urls:
        target = urlsplit(url)
        require(not target.query and not target.fragment and not target.path.endswith('/download'), f'Non-HTML sitemap URL: {url}')
        if mode == 'production':
            require(url.startswith(CANONICAL + '/'), f'Noncanonical sitemap URL: {url}')
        read_page(target.path, True)

    # Status pages intentionally stay out of production XML, but must still be
    # reachable, valid and explicitly noindex rather than accidental omissions.
    queue, visited = deque(path for path in pages if reader.is_documentation_page(path)), set()
    while queue:
        path = queue.popleft()
        if path in visited:
            continue
        visited.add(path)
        for link in pages[path]['links']:
            target = urlsplit(urljoin(base + path, link['href']))
            if target.netloc not in [urlsplit(base).netloc, urlsplit(CANONICAL).netloc] or not reader.is_documentation_page(target.path):
                continue
            if target.path not in pages:
                if len(pages) >= 256:
                    raise RuntimeError('Docs discovery exceeded 256 pages')
                read_page(target.path, target.path in listed_paths)
            if target.path not in visited:
                queue.append(target.path)

    docs = {path: page for path, page in pages.items() if reader.is_documentation_page(path)}
    require(len(docs) == expected_docs, f'Expected {expected_docs} docs; found {len(docs)}')
    unlisted = set(docs) - listed_paths
    require(len(unlisted) == expected_unlisted, f'Expected {expected_unlisted} deliberately unlisted docs; found {len(unlisted)}')
    for field in ['title', 'description']:
        require(len(set(page[field] for page in docs.values())) == len(docs), f'Duplicate docs {field}')
    for path, page in docs.items():
        require(page['lang'] == 'en', f'{path}: incorrect document language')
        if mode == 'preview':
            require('noindex' in page['robots'], f'{path}: preview should be noindex')
        require(not page['schemaErrors'] and len(page['structuredData']) == 1, f'{path}: invalid or missing JSON-LD')
        graph = page['structuredData'][0].get('@graph', []) if page['structuredData'] else []
        breadcrumbs = [entity for entity in graph if entity.get('@type') == 'BreadcrumbList']
        if path == '/docs':
            require(not breadcrumbs, 'Docs root should not emit a one-item breadcrumb')
        else:
            require(len(breadcrumbs) == 1 and len(breadcrumbs[0]['itemListElement']) >= 2 and breadcrumbs[0]['itemListElement'][-1]['item'] == page['canonical'], f'{path}: invalid breadcrumb trail or destination')
        for link in page['links']:
            target = urlsplit(urljoin(base + path, link['href']))
            if target.netloc not in [urlsplit(base).netloc, urlsplit(CANONICAL).netloc]:
                continue
            if target.path in docs and target.fragment:
                require(unquote(target.fragment) in docs[target.path]['ids'], f'{path}: broken anchor {link["href"]}')
            elif reader.is_documentation_page(target.path):
                require(target.path in docs, f'{path}: missing linked guide {link["href"]}')
        for image in page['images']:
            require(image['alt'] is not None, f'{path}: image missing alt')
            target = urlsplit(urljoin(base, image['src'] or ''))
            image_path = target.path + ('?' + target.query if target.query else '')
            if target.netloc == urlsplit(base).netloc and image_path not in assets:
                code, _, response_headers, _ = fetch(image_path)
                assets[image_path] = code
                require(code == 200 and response_headers.get('content-type', '').startswith('image/'), f'Broken image {image_path}')

    # Discovery must also work through server-rendered links, independently of XML.
    reached, queue = set(), deque(['/docs'])
    while queue:
        path = queue.popleft()
        if path in reached or path not in docs:
            continue
        reached.add(path)
        for link in docs[path]['links']:
            target = urlsplit(urljoin(base + path, link['href']))
            if target.netloc == urlsplit(base).netloc:
                queue.append(target.path)
    require(reached == set(docs), f'Orphan docs: {sorted(set(docs) - reached)}')
    if mode == 'production':
        require(f'Sitemap: {CANONICAL}/sitemap.xml' in robots and not re.search(r'^Disallow: /$', robots, re.M), 'Production robots blocks discovery')
        require(fetch('/sitemap-preview.xml')[0] == 404, 'Production exposes preview sitemap')
    else:
        require(re.search(r'^Disallow: /$', robots, re.M) and 'Sitemap:' not in robots, 'Preview robots should block crawling without advertising a sitemap')
        require('noindex' in fetch('/sitemap-preview.xml')[2].get('x-robots-tag', ''), 'Preview XML lacks noindex header')
        public_index = sitemap('/sitemap.xml')
        require(len(public_index.findall('s:sitemap/s:loc', NS)) == 3, 'Preview public sitemap advertises unpublished content')
        for topic in topics:
            name = urlsplit(topic).query.removeprefix('topic=')
            if name.startswith('sitemap-docs-') or name == 'sitemap-animations.xml':
                require(fetch('/' + name)[0] == 404, f'{name}: unpublished public topic is available')
    return {'checkedAtUtc': datetime.now(timezone.utc).isoformat(), 'mode': mode, 'base': base,
            'topics': {key: len(value) for key, value in topics.items()}, 'sitemapPages': len(urls), 'htmlPages': len(pages),
            'docsPages': len(docs), 'unlistedDocs': sorted(unlisted), 'reachableDocs': len(reached), 'images': len(assets), 'errors': errors}


def main():
    """Save a compact evidence artifact and exit nonzero for any release defect."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', required=True)
    parser.add_argument('--mode', choices=['production', 'preview'], required=True)
    parser.add_argument('--expect-docs', type=int, required=True)
    parser.add_argument('--expect-unlisted-docs', type=int, default=0)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    result = check(args.base_url.rstrip('/'), args.mode, args.expect_docs, args.expect_unlisted_docs)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(result['errors']))


if __name__ == '__main__':
    main()
