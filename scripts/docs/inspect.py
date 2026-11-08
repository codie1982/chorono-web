"""Audit rendered docs HTML and warm local HTTP timings without browser automation.

Usage: python3 scripts/docs/inspect.py --output outputs/docs-audit.json
Only the same-origin /docs graph is crawled, with a 40-page safety bound.
HTTP timings exclude JavaScript, browser rendering and real-world network latency.
"""
import argparse
import gzip
import json
import statistics
import time
from collections import Counter, deque
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from urllib.request import Request, urlopen


class DocumentationHTML(HTMLParser):
    """Collect metadata and link contexts while ignoring script/style text."""
    _VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self, html):
        super().__init__()
        self._stack = []
        self._hidden = 0
        self._anchor = None
        self._heading = None
        self._title = []
        self._words = []
        self._data = {'title': '', 'description': '', 'robots': '', 'canonical': None, 'lang': '', 'h1': [], 'ids': [], 'links': [], 'images': []}
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        kind = self._stack[-1][1] if self._stack else 'navigation'
        classes = attrs.get('class', '').split()
        if tag == 'main':
            kind = 'article'
        if 'cd-prose' in classes:
            kind = 'prose'
        if 'cd-related-guides' in classes:
            kind = 'related'
        if attrs.get('aria-label') == 'Documentation pages':
            kind = 'pagination'
        if tag not in self._VOID:
            self._stack.append((tag, kind))
        if tag in ['script', 'style']:
            self._hidden += 1
        if 'id' in attrs:
            self._data['ids'].append(attrs['id'])
        if tag == 'html':
            self._data['lang'] = attrs.get('lang', '')
        if tag == 'meta' and attrs.get('name') in ['description', 'robots']:
            self._data[attrs['name']] = attrs.get('content', '')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self._data['canonical'] = attrs.get('href')
        if tag == 'h1':
            self._heading = []
        if tag == 'a':
            self._anchor = {'href': attrs.get('href', ''), 'context': kind, 'text': ''}
        if tag == 'img':
            self._data['images'].append({'src': attrs.get('src'), 'alt': attrs.get('alt')})

    def handle_endtag(self, tag):
        if tag == 'a' and self._anchor is not None:
            self._data['links'].append(self._anchor)
            self._anchor = None
        if tag == 'h1' and self._heading is not None:
            self._data['h1'].append(' '.join(self._heading))
            self._heading = None
        if tag in ['script', 'style']:
            self._hidden = max(0, self._hidden - 1)
        for index in range(len(self._stack) - 1, -1, -1):
            if self._stack[index][0] == tag:
                self._stack = self._stack[:index]
                break

    def handle_data(self, data):
        if self._hidden:
            return
        if self._stack and self._stack[-1][0] == 'title':
            self._title.append(data)
        if self._anchor is not None:
            self._anchor['text'] += data
        if self._heading is not None:
            self._heading.append(data)
        if self._stack and self._stack[-1][1] in ['article', 'prose', 'related']:
            self._words.extend(data.split())

    def result(self):
        """Return a detached JSON-safe snapshot; subsequent parsing cannot mutate it."""
        return {**json.loads(json.dumps(self._data)), 'title': ''.join(self._title), 'wordCount': len(self._words)}


def fetch_page(url):
    """Measure header/first-byte/body time for one gzip-capable loopback request."""
    start = time.perf_counter()
    with urlopen(Request(url, headers={'Accept-Encoding': 'gzip', 'User-Agent': 'Chorono-docs-local-audit/1.0'}), timeout=15) as response:
        first = response.read(1)
        first_byte = time.perf_counter()
        encoded = first + response.read()
        finished = time.perf_counter()
        body = gzip.decompress(encoded) if response.headers.get('Content-Encoding') == 'gzip' else encoded
        return response.status, body.decode('utf-8'), {'ttfbMs': round((first_byte-start)*1000, 2), 'htmlCompleteMs': round((finished-start)*1000, 2), 'transferredBytes': len(encoded), 'htmlBytes': len(body)}


def audit(base, samples):
    """Crawl the bounded docs graph, then measure each warmed HTML endpoint."""
    queue = deque(['/docs'])
    pages = {}
    while queue:
        route = queue.popleft()
        if route in pages:
            continue
        if len(pages) >= 40:
            raise RuntimeError('Docs crawl exceeded the 40-page bound.')
        status, html, timing = fetch_page(base + route)
        page = {'path': route, 'status': status, **DocumentationHTML(html).result()}
        pages[route] = page
        for link in page['links']:
            target = urlsplit(urljoin(base + route, link['href']))
            if target.netloc == urlsplit(base).netloc and (target.path == '/docs' or target.path.startswith('/docs/')):
                queue.append(target.path.rstrip('/'))
    broken = []
    for route, page in pages.items():
        contextual, related = set(), set()
        for link in page['links']:
            target = urlsplit(urljoin(base + route, link['href']))
            if target.netloc != urlsplit(base).netloc or not target.path.startswith('/docs'):
                continue
            path = target.path.rstrip('/')
            if path not in pages or (target.fragment and unquote(target.fragment) not in pages[path]['ids']):
                broken.append({'from': route, 'href': link['href']})
            if path != route and link['context'] == 'prose':
                contextual.add(path)
            if path != route and link['context'] == 'related':
                related.add(path)
        page['contextualTargets'] = sorted(contextual)
        page['relatedTargets'] = sorted(related)
        measurements = [fetch_page(base + route)[2] for _ in range(samples)]
        page['timing'] = {'samples': samples, 'medianTtfbMs': statistics.median(x['ttfbMs'] for x in measurements), 'medianHtmlCompleteMs': statistics.median(x['htmlCompleteMs'] for x in measurements), 'transferredBytes': measurements[-1]['transferredBytes'], 'htmlBytes': measurements[-1]['htmlBytes']}
        page['duplicateIds'] = [value for value, count in Counter(page['ids']).items() if count > 1]
    for page in pages.values():
        del page['links'], page['ids']
    return {'checkedAtUtc': datetime.now(timezone.utc).isoformat(), 'base': base, 'conditions': 'Local production Next server; HTML endpoints warmed by crawl; gzip requested; sequential HTTP samples. Excludes JS/assets/rendering, cold browser cache and internet/CDN latency.', 'pages': list(pages.values()), 'brokenLinks': broken, 'duplicateTitles': [title for title, count in Counter(p['title'] for p in pages.values()).items() if count > 1], 'duplicateDescriptions': [value for value, count in Counter(p['description'] for p in pages.values()).items() if count > 1]}


def main():
    """Write the evidence JSON and fail on broken links or core HTML regressions."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', default='http://127.0.0.1:2000')
    parser.add_argument('--samples', type=int, default=5)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    if not 1 <= args.samples <= 20:
        parser.error('samples must be between 1 and 20')
    result = audit(args.base_url.rstrip('/'), args.samples)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2))
    print(json.dumps({'pages': len(result['pages']), 'brokenLinks': len(result['brokenLinks']), 'duplicateTitles': result['duplicateTitles'], 'duplicateDescriptions': result['duplicateDescriptions'], 'timings': [{'path': p['path'], **p['timing'], 'proseLinks': len(p['contextualTargets']), 'relatedLinks': len(p['relatedTargets'])} for p in result['pages']]}, indent=2))
    failed = result['brokenLinks'] or result['duplicateTitles'] or result['duplicateDescriptions'] or any(p['status'] != 200 or len(p['h1']) != 1 or p['duplicateIds'] or not p['description'] for p in result['pages'])
    raise SystemExit(1 if failed else 0)


if __name__ == '__main__':
    main()
