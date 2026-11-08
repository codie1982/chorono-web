# Docs and library migration to chorono-web — Nov 8, 2026

The website repository now owns the new English documentation, animation library and grouped sitemaps. The editor repository no longer hosts these features. Existing editor technical docs and the first-animation authoring example remain in their original owner.

## Destination and source boundary

Destination: `codie1982/chorono-web`, local branch `codex/docs-library-migration`, based on main commit `6a423fe`. The public homepage, 14 existing public addresses, analytics and existing animation examples are retained. No push, pull request, public deployment or Search Console submission is part of this migration.

The transferred feature comprises 11 English docs routes; the two-animation library and exact JSON downloads; native posters/runtime exports; local search, contents and related links; the topic sitemap serializer/release gate and diagnostics; research CSV/plans and contract tests. Website source imports only its published runtime package. The existing website player gained a compact presentation so both page families share its loading, timing and disposal behavior. There is no copied editor engine, filesystem dependency on an editor checkout, or local package link.

Source cleanup removes only the new website routes, components/modules, added documentation sources, loading fixture, audit script and website-only Markdown dependencies from `chorono-editor`. Original tracked technical documents/package files are restored only when their contents still match the recorded owned changes. Concurrent editor roadmap/skill/MCP changes are preserved. A temporary exact source snapshot guards ownership during transfer.

## Local review

The final local website uses `http://127.0.0.1:2011`: `/` is the real marketing homepage, `/docs` is the handbook, `/animations` is the library and `/sitemap-preview.xml` is the full draft index. The editor remains a separate application on its own port. “Set up editor” links to the existing setup page instead of treating the website homepage as an editor.

New HTML remains noindex and the live index includes only the pre-existing 14 public URLs in three groups. The inspection index contains all 28 local HTML routes across eight groups. New publication requires the explicit feature flag, matching site origin and a rebuild as documented in the sitemap handoff.

## Verification

- Website: `npm test` passed 10 existing Node tests and 12 docs/library/sitemap tests. `npm run build` passed from the actual destination after the source feature was removed.
- Editor cleanup verification: 263 files / 2,094 tests passed; MCP build and production build passed. Other ongoing editor edits were preserved. These checks describe the cleanup verification point, not later unrelated shared-worktree changes.
- The existing website SEO checker passed all 14 established pages, their JSON-LD/icons/assets, robots.txt and grouped sitemap coverage. It now follows an index and also supports the later 28-URL feature release.
- End-to-end HTTP parsing checked all 28 preview HTML routes: 200 responses, titles/descriptions, one H1 and correct public canonicals. The 14 new routes are noindex. The live index preserves 14 old URLs in three groups; the inspection index contains eight groups with 28 unique URLs. No broken internal path/fragment was found from the new pages.
- Both library downloads match the original project bytes and attachment headers. Unknown pages/downloads/topics return 404. The source editor serves `/` successfully and returns 404 for `/docs`, `/animations` and `/sitemap.xml`.
- Real browser checks verified navigation from the marketing homepage into docs, section search for “loop boundary” (heading at 105px), native play/pause, correct 960×540 title-card identity after switching scenes, and mobile menu navigation/closure. No console errors or horizontal overflow were observed at the actual 609px and 1280px widths.
- Native previews reuse the website's existing `AnimationExample` and `@chorono/runtime`; initial times match its poster metadata. No editor engine dependency, symlink or copied geometry implementation is present in website feature imports.

Local loading sample: fourteen full browser navigations, existing cache, no CPU/network throttling. Every navigation entry matched its page. First Contentful Paint (first visible content) median 106ms, range 84–284ms; first-byte median 8.6ms. This is localhost lab data, not field Core Web Vitals or a production speed claim. Five warm HTTP requests per docs route showed per-page median first-byte 4.06–4.92ms and complete HTML transfer 4.37–5.97ms. No controlled speed-improvement claim is made.

Raw measurements, transfer checks and the rendered library capture are in ignored `outputs/docs-migration-2026-11-08/`. The current preview is kept running from the actual web repository on port 2011 for the requested local review. Editor port 2000 remains separate. The retired editor-preview server record for port 2011 was verified stale and replaced with the correct editor port record. No live deployment was performed.
 Historical SEO research and editor-preview timings are preserved in their dated plans; they are not evidence of public rankings or migrated-site speed. No new paid keyword research was needed.
