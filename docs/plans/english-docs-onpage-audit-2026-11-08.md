# Docs, Animation Library and Search Appearance Audit — Nov 8, 2026

Migration note, November 8, 2026: this research/audit describes the original editor-hosted preview. The implementation now belongs to `chorono-web`; see [current migration and verification](docs-library-migration.md) and [current sitemap ownership](animation-library-and-sitemaps.md). Historical measurements are not new measurements of the migrated website.

## Your next SEO move

- Keep the implemented task links: every docs page now offers three relevant next guides.
- Review two real animation detail pages before growing the collection; publish with the grouped sitemap when ready.
- Preserve the working public favicon and schema; diagnose indexing separately from Google's spelling correction.

## Recommendations

### 1. Connect the guides to the next useful task

**Do this**

- Keep three curated “Related guides” links beneath each of the 11 docs pages, with meaningful titles.
- Use body links for prerequisites and explanations; link the first-edit and loop guides to their animation downloads.
- Keep the more descriptive “Chorono setup and MCP troubleshooting” page title.

**Why**

- The former local interface relied on shared navigation and previous/next controls; some articles had no body-level handoff.
- The new server-rendered links connect installation, manual editing, agent connection and troubleshooting without duplicating general guides.
- This could help visitors finish a task and help discovery; no traffic or completion gain is measured.

| Local evidence, Nov 8, 2026 | Before | Implemented |
| --- | --- | --- |
| Related links beneath the article | 0 | 3 per page, 33 total |
| Scripting links to other local docs in prose | 0 | 4 |
| Installation links to other local docs in prose | 1 | 3 |
| Broken local docs links/fragments | 0 | 0 |
| Distinct titles, descriptions; one H1 | 11 pages | Preserved |

Google recommends crawlable links with meaningful anchor text. Better links are useful structure, not a promise of automated search sitelinks. [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

### 2. Give each reviewed animation a useful, distinct detail page

**Do this**

- Review `/animations`, `/animations/three-dot-loading` and `/animations/editable-title-card` locally.
- Keep native playback, exact source downloads, source-derived specifications, license and specific editing instructions together.
- Use the root sitemap index and five topic groups from [the implementation handoff](animation-library-and-sitemaps.md).

**Why**

- A person seeking an example can inspect and obtain it before reading a technique tutorial.
- Existing projects supply distinct content and a real download, rather than many keyword-swapped pages.
- The library and related docs can create additional entry paths after publication; visibility and traffic remain unknown.

| Candidate, US/en estimates reused from Nov 8 research | Est. searches/month | Product fit and limitation |
| --- | ---: | --- |
| loading animation | 1,000 | A real loading study exists; volume is broader than this particular asset |
| looping animation | 480 | Relevant editing tutorial already uses the same project; intent overlaps |
| Editable title card | Unknown in this audit | Existing beginner exercise, not a demand forecast |

Do not add those query volumes or treat them as visits. The library is a bounded product improvement, not a verified ranking opportunity. The topic sitemap contains only 14 reviewed HTML routes: 11 docs and three library pages. Public release remains a separate action.

## What else we checked

| Opportunity | What we found | Decision |
| --- | --- | --- |
| Expand the reviewed animation catalog beyond two | A broader useful collection could serve more tasks; further Chorono assets need production, licensing and review | Runner-up. Two complete source-backed pages lead because their projects already exist; demand for more specific samples remains unverified. |
| Public indexing now | All local docs/library previews intentionally noindex | Retain preview settings; live sitemap responds 404 until explicit publication configuration and rebuild. |
| Page loading | Local browser and warm HTTP observations below; no field data | Keep lazy native playback and no autoplay; no production speed or improvement claim. |
| Favicon replacement | ICO and PNG return 200 with valid square dimensions | No demonstrated missing-file defect; retain stable URLs and verify Google's next crawl. |
| Rich results repair | Google's live test recognizes two valid software items | No critical schema repair established; optional rating warning is not filled with invented reviews. |
| Bare-brand absence | User screenshot and browser observation show correction from chorono to chrono | Do not infer deindexing or a penalty from a different query; current URL Inspection is unavailable. |
| Maintenance and more keyword calls | Unique metadata, headings and links checked; same-day DataForSEO research exists | Reuse research; no additional paid metrics or tracking this phase. |

## How this report was made

Prepared with the [OpenSEO SEO Audit skill](https://openseo.so/docs/skills/seo-audit), run by Codex on November 8, 2026.

This is a local implementation and public search-appearance check, not a new whole-domain ranking audit. Existing same-day US/en research supplied the keyword estimates; no additional paid research was purchased. The current connection exposes no report-saving tools, so this is a repository handoff rather than a report saved in OpenSEO's viewer.

<details>
<summary>Evidence and methodology</summary>

### Local on-page coverage

The bounded HTML inspector followed the 11 same-origin docs routes. It checked rendered titles, descriptions, language, H1 count, duplicate IDs, incoming links, and actual destination paths/fragments. It distinguished article prose, related cards and pagination from navigation. Every docs page has three distinct curated follow-up guides; all leaf articles have an incoming related link. The hub uses its own curated cards in place of Markdown prose.

Read source families: docs hub and beginner setup/editing; editor timeline/keyframes/loops; AI connection/skills/scripting; troubleshooting/releases. Each family has actual task content, not a keyword-swapped template. Existing public concept and acquisition pages retain ownership in [the original SEO plan](english-docs-seo-plan.md).

### Page-loading method and final observations

The final production build on port 2011 used five sequential gzip-capable HTTP requests per docs route. Per-page median first-byte time was 4.01–4.41 ms and median complete HTML transfer was 4.27–5.33 ms. Compressed HTML was 30,008–38,176 bytes. These are warm localhost transfers, excluding browser execution and internet/CDN latency.

Browser measurements used one full navigation per route, existing cache, no CPU/network throttling, and a visible browser. The opt-in `?measure=1` diagnostic exposes actual Navigation Timing and First Contentful Paint (first visible content) in the DOM. Every sample's navigation path matched its page. The final sample covers all 14 docs/library pages on port 2011.

| Final 14-page browser sample | Median | Range |
| --- | ---: | ---: |
| First byte | 9.7 ms | 6.7–98 ms |
| DOMContentLoaded | 39.55 ms | 31.9–224.9 ms |
| Load event | 42.5 ms | 35.3–249.7 ms |
| First Contentful Paint | 90 ms | 72–288 ms |

This is a local lab observation, not production speed, a Lighthouse score, or field Core Web Vitals. LCP, INP and CLS were not established. There is no controlled before/after speed comparison. Cached resources were present; this is not a cold-cache mobile-network test. An earlier 11-page sample had FCP 108–552 ms (median 152); that same-day variation does not establish an improvement.

### Final implementation verification

- `npm test`: 267 test files, 2,105 tests passed. The earlier skill-example assertion was updated by concurrent work and the complete suite then passed; this task did not edit that assertion.
- `npm run mcp:build` and `npm run build`: passed. Eleven docs pages and three library pages are statically generated; sitemap adapters are server routes.
- XML parsing verified five groups of 3/3/3/2/3 HTML addresses, 14 unique routes, each HTTP 200 with a title, description, one H1 and preview noindex. No broken internal route/fragment was found across docs and library.
- Both download endpoints returned exact source bytes with attachment headers. Unknown pages/downloads/topics returned 404. All six live sitemap endpoints returned 404 in private preview; the inspection endpoint returned noindex/nofollow.
- Real browser checks exercised play/pause, actual file download and client navigation between animation details. The new title-card canvas was 960 × 540 at 1.8 seconds after leaving the 1024 × 768 loading scene. No console errors or horizontal overflow appeared at the observed 733/1274-pixel widths. Earlier docs checks covered 320/375/768-pixel layouts; the viewport override did not apply reliably during the final library check, so a fresh phone-width library result is not claimed.
- The final local review is [the library](http://127.0.0.1:2011/animations), [docs](http://127.0.0.1:2011/docs) and [topic sitemap inspection](http://127.0.0.1:2011/sitemap-preview.xml). No public deployment or index request occurred.
- A second-agent review checked recommendations, candidate decisions, source/preview identity, date/geography/rank limits and sitemap/canonical consistency. Its scene-identity finding was fixed with an entry key; the final browser navigation check confirmed the correct scene.

### Live favicon and structured data

On November 8, `https://www.chorono.com/` returned 200, index/follow and a preferred public URL of `https://www.chorono.com`. Its server-rendered machine-readable description (JSON-LD) includes WebSite, Organization, WebPage, two SoftwareApplication items and logo/sharing images. The WebSite names are Chorono and Chorono Animator.

Declared live icons:

| URL | Response | Verified content |
| --- | --- | --- |
| `https://www.chorono.com/favicon.ico` | 200, image/x-icon | 16, 32, 48 and 64 pixel square ICO entries; 3,839 bytes |
| `https://www.chorono.com/icon.svg` | 200, image/svg+xml | SVG; 256 bytes |
| `https://www.chorono.com/apple-touch-icon.png` | 200, image/png | 180 × 180 pixels; 3,293 bytes |

Public robots allows `/` and excludes `/api/`. A request carrying a Googlebot header does not prove access from Google's actual crawler IPs. No current favicon crawl/cache decision was obtained. Google's [favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search) requires crawlable, stable icon URLs and does not guarantee display; a recrawl can take time.

The [live Google Rich Results Test](https://search.google.com/test/rich-results/result?id=XmmFn_BgzrMVa5HfNJGSPQ) returned **two valid SoftwareApplication items**, Chorono Animator and @chorono/runtime. Each has one non-critical optional `aggregateRating` warning. No real rating data was provided and none was fabricated. This is live validation, not the indexed result or a display guarantee. [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

The watch-site links in the user screenshot are generated for Google's corrected `chrono` query. A focused browser search for quoted `chorono` was also initially corrected, then its visible “search instead” control was used. It displayed unrelated exact-spelling results. This was a Turkish, location-dependent browser snapshot, not a controlled US/en ranking sample; no exact Chorono position or first-20 exclusion is claimed. The tool-based rankings in the earlier audit also remain unknown because of opaque destination URLs.

Search Console URL Inspection returned `gsc_oauth_not_configured` for the project. Earlier November 7 evidence included eight indexed pages; that older observation does not establish today's index coverage. Current Google-selected preferred URLs, last crawl and brand-query impressions remain unknown. [Sitelinks are automated](https://developers.google.com/search/docs/appearance/sitelinks); adding schema cannot force them.

### References and reproducibility

- [LottieFiles asset reference](https://lottiefiles.com/free-animation/the-evil-halloween-pumpkin-PmL1A2wAha) and [13-part sitemap index](https://lottiefiles.com/sitemap/free-animations-index.xml), fetched directly after the web reader could not retrieve them.
- [Google sitemap placement and absolute URLs](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [sitemap indexes](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps).
- [Current public homepage](https://www.chorono.com/), [robots](https://www.chorono.com/robots.txt), [maintained first example](https://github.com/codie1982/chorono-editor/tree/main/examples/first-animation), [public Codex loop](https://www.chorono.com/blog/make-animations-with-codex).

Local reproduction: stop Next before builds; run `npm test`, `npm run mcp:build`, `npm run build`; restart with `npm run chorono -- start --background`; run `python3 scripts/docs/inspect.py --output outputs/docs-audit.json`. Open each route with `?measure=1` for browser metrics using full navigations. Raw local observations and screenshots live under ignored `outputs/docs-onpage-audit-2026-11-08/`; this versioned document prints the material evidence so it does not depend on those files.

</details>
