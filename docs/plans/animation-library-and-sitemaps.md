# Animation library and topic sitemaps

`chorono-web` owns the library at `/animations`, the three detail routes and the root sitemap index. `chorono-editor` owns the authoring application and its existing technical documentation. Website code does not import files from an editor checkout.

## Data, playback and downloads

`lib/animation-library/catalog.ts` is the reviewed allowlist. It holds stable slugs, distinct copy, category, source provenance, public asset path, website example ID, preview time and editing-guide relationship. `loader.ts` reads only these trusted portable sources and derives composition/timeline statistics. It does not normalize arbitrary uploads. New examples must first be validated in Chorono and in native runtime checks.

The unchanged projects live in `public/examples/codex-loading-loop.chorono.json` and `public/examples/first-animation.chorono.json`. Existing loading assets are reused; the first-animation source/poster came from the maintained editor example. Its runtime package was generated once using the editor's existing RuntimeExporter, with zero warnings and unchanged composition/timelines. The website depends on `@chorono/runtime@0.1.0`, never editor source. The MIT notice is retained in `docs/animation-examples-LICENSE`.

`components/AnimationExample.tsx` is the existing website player, now with a compact docs/library presentation. Both presentations share loading, play/pause/seek, one frame clock, hidden-tab pause and resource disposal. `components/player/ScenePreview.tsx` is its small presentation adapter. Each route keys the instance by scene identity. It initially displays a static poster and starts motion only on request. Times are milliseconds; dimensions are composition pixels.

The attachment route `/animations/[slug]/download` serves exact original JSON with a download filename and noindex header. No MP4, SVG or Lottie download is promised. Detail HTML includes a specific editing exercise, source-derived specs, license/provenance and related docs. A larger collection should use static card posters and pagination rather than many mounted players.

## Root index and topic ownership

All XML files are at the root so directory scope covers the linked pages. The inventories are shared with static route manifests.

| File | Topic | Routes |
| --- | --- | ---: |
| `/sitemap.xml` | Index of eligible topic files | 8 in production; 3 locally/in previews |
| `/sitemap-site.xml` | Existing homepage, setup, skills | 3 |
| `/sitemap-blog.xml` | Existing blog hub and articles | 6 |
| `/sitemap-guides.xml` | Existing product/use-case/fundamental guides | 5 |
| `/sitemap-docs-start.xml` | New docs hub, installation, first edit | 3 |
| `/sitemap-docs-editor.xml` | New keyframes, timeline, loops | 3 |
| `/sitemap-docs-ai.xml` | New MCP, skills, scripting | 3 |
| `/sitemap-docs-resources.xml` | New troubleshooting and releases | 2 |
| `/sitemap-animations.xml` | New library hub and three details | 4 |

`lib/site-index/existing.ts` preserves all 14 existing public addresses and their actual modification dates from the former `app/sitemap.ts`. That flat metadata route is replaced by `app/sitemap.xml/route.ts`. `sitemap.ts` combines existing inventories with 15 new routes (11 docs and 4 library pages), escapes XML and returns absolute URLs. Each HTML URL occurs once. New pages have no invented modification dates; build time is not an editorial update. Search/filter/debug URLs and attachment routes are excluded.

`/sitemap-preview.xml` includes all eight topics and 29 real local HTML routes for inspection, uses the local origin and returns noindex/nofollow. Never submit that inspection endpoint to search engines.

## Publication lifecycle

During local review new docs/library HTML is noindex and its five public XML endpoints return 404. Existing public pages, their three sitemap groups, the root index and robots.txt continue to work. Canonicals and release origin use the website's existing `SITE_URL`, `https://www.chorono.com`.

`lib/site-index/publication.ts` enables these reviewed routes only when `VERCEL_ENV=production`. Production HTML emits `index, follow` and the root index lists all eight topics containing 29 unique HTML URLs. An unset environment, `development` and `preview` keep the new routes noindex and omit their five topic files, even for a local production-mode build. `NODE_ENV=production` and the former `CHORONO_PUBLISH_CONTENT` / `CHORONO_CONTENT_ORIGIN` flags do not enable indexing. All canonicals and published sitemap URLs use `SITE_URL`; deployment hostnames cannot override it. Static metadata and dynamic sitemap eligibility must be rebuilt/restarted together. These helpers do not deploy or submit sitemaps themselves.

Add a reviewed source, runtime export, poster and example ID to the existing website asset inventory, then one library record with a real docs handoff. Validate playback, dimensions, original download, save/reopen and ownership. Extend categories only when there are real additional assets; there is no bulk page generation. Protocol limits are 50,000 URLs or 50 MB uncompressed per sitemap.

## Checks and references

`npm test` runs existing Node tests plus documentation/library/sitemap contract tests. The original SEO checker now follows the index and verifies the same existing public URL set. New tests cover exact portable downloads, source/runtime timeline equality, native playback, unknown slugs, unique 29-route preview coverage and production/preview/local publication gating.

[LottieFiles detail reference](https://lottiefiles.com/free-animation/the-evil-halloween-pumpkin-PmL1A2wAha) and [its 13-part index](https://lottiefiles.com/sitemap/free-animations-index.xml) informed the small per-asset structure, not a ranking claim or asset count. [Google sitemap construction](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [index guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps) describe location, absolute URLs and limits.
