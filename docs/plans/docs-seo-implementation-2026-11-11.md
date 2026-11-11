# Docs search identity and sitemap handoff

The November 11 documentation expansion adds 56 guides to 11 existing documents.
Navigation can change without moving indexed URLs. The legacy fixture and source
hash tests preserve those 11 URLs, titles, descriptions and Markdown bodies.
This work is local; it does not deploy the website or submit URLs for indexing.

## Ownership and data flow

- `lib/documentation/manifest.ts` and `editor-guides.ts` own page identities.
  `sections.ts` owns the seven documentation groups and their sitemap names.
- `hierarchy.ts` derives one deduplicated visible breadcrumb from these identities.
  `structured-data.ts` reuses that trail and the shared entities in `lib/site.ts`.
  Hubs describe collections; task guides describe technical articles. The Docs
  root has no BreadcrumbList because its visible trail contains only one item.
- `DocumentationArticle.tsx` renders both the visible trail and escaped JSON-LD.
  No client fetch, external service or mutable state is needed for search metadata.
- `lib/site-index/sitemap.ts` combines the existing marketing inventory, document
  manifest and animation catalog. It rejects duplicate/unsafe paths and topic
  names. Root-level XML routes delegate to this single owner.
- `lib/site-index/robots.ts` owns environment-specific crawler rules. Preview
  metadata remains controlled by the existing `publication.ts` contract.

## Sitemap inventory

The production root is `https://www.chorono.com/sitemap.xml`. Its 11 child files
contain 85 distinct HTML destinations, including all 67 documentation pages.

| Topic file | Pages |
| --- | ---: |
| `sitemap-site.xml` | 3 |
| `sitemap-blog.xml` | 6 |
| `sitemap-guides.xml` | 5 |
| `sitemap-docs-start.xml` | 3 |
| `sitemap-docs-editor.xml` | 46 |
| `sitemap-docs-integrations.xml` | 1 |
| `sitemap-docs-runtime.xml` | 5 |
| `sitemap-docs-export.xml` | 7 |
| `sitemap-docs-ai.xml` | 3 |
| `sitemap-docs-resources.xml` | 2 |
| `sitemap-animations.xml` | 4 |

URLs are absolute, canonical and sorted within their category. Downloads, query
variants and fragments are excluded. Existing authoritative `lastmod` dates are
retained; there is no generated current-date stamp or invented publication date.
New guides enter the sitemap through the manifest, not a second handwritten list.

## Publication contract

`VERCEL_ENV=production` enables the reviewed public content and all topic routes.
Production robots allows pages and their assets, blocks `/api/`, and names the
canonical root sitemap. `/sitemap-preview.xml` returns 404 in production.

`VERCEL_ENV=preview` serves `Disallow: /` without a Sitemap line. Documentation
keeps its existing `noindex, nofollow` metadata and production canonical identity.
The inspection-only `/sitemap-preview.xml` has an `X-Robots-Tag: noindex, nofollow`
header. Public content-topic endpoints remain 404 until production. Unset/local
environment behavior remains compatible with existing local workflows.

Robots rules control crawling; they do not guarantee removal from an existing
search index. No new URL is claimed indexed based on these checks.

## Reproduce verification

Stop the Next server in the checkout before building. Use the same environment
for building and starting each profile, with an isolated port such as 4323.

```sh
npm test
VERCEL_ENV=production npm run build
VERCEL_ENV=production npm start -- --hostname 127.0.0.1 --port 4323
# In another terminal:
npm run seo:check -- http://127.0.0.1:4323
python3 scripts/docs/check-indexing.py --base-url http://127.0.0.1:4323 \
  --mode production --expect-docs 67 --output outputs/docs-indexing-production.json
```

After stopping that server, build and start with `VERCEL_ENV=preview`, then run
the same Python checker with `--mode preview` and a separate output filename.
The checker reuses `inspect.py`'s HTML parser. It checks all topic XML, HTTP
statuses, canonical/Open Graph identity, one H1, distinct document metadata,
JSON-LD, internal links/anchors, navigation reachability and image responses.
It also verifies preview crawler rules and that unpublished public topic routes
are unavailable. This is HTTP verification, not a browser performance benchmark.

## Scope and evidence

The live OpenSEO crawl on November 11 completed 54 URLs with HTTP 200: 29 indexable
HTML pages, including the 11 old docs, plus 25 assets/downloads. It reported no
critical findings or warnings, and eight informational metadata-length notices
on existing marketing/blog pages. Those notices alone do not justify rewriting
existing editorial titles or descriptions.

The SVG and sequence guides now explain the actual export controls, supported
content and limitations, verified against the editor's export components.
Runtime React/Vue examples and the truthful coming-soon integration statuses are
preserved. Existing keyword research was reused; this audit added no paid lookup.

Validation includes 13 Node tests, 60 Vitest tests, a production build, the existing
SEO/asset check, rendered HTTP checks, independent review and browser inspection
of the nested Editor breadcrumb. Check generated evidence for exact timestamps.
Public deployment and Google indexing must be checked separately after release.

Primary references: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[robots.txt scope](https://developers.google.com/search/docs/crawling-indexing/robots/intro),
and [breadcrumb requirements](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
