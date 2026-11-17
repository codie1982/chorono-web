# Spline documentation SEO audit and shortlist — 17 November 2026

Market: United States, English. The source of truth for feature availability is the inspected `chorono-editor` `main` source, not a search query or a release draft. This focused audit was completed before creating the new documentation pages.

## Evidence and limits

- OpenSEO crawl `e0fca10d-5fca-4f95-81ca-0e07eb1ca4de` completed on 17 November: 50/50 pages crawled. The existing `/docs/editor/canvas/splines` and `/docs/editor/canvas/snapping` returned HTTP 200. The reported issues were five long descriptions and four long titles, all informational; no access blocker was reported in the 50-page sample.
- OpenSEO US/en keyword metrics returned 13 of 25 requested phrases. Missing rows are unknown, not zero. Values are estimated monthly searches, not visits. The full selection is in `spline-keywords-2026-11-17.csv`.
- Direct DataForSEO `POST /v3/dataforseo_labs/google/keyword_suggestions/live`, task `11170428-2404-0399-0000-706fa681bc93`, returned 24 results for `spline editor` in US/en. Most long tails named DaVinci Resolve, Unity, Spline Design or 3D. The only additional suitable phrase observed was `online spline editor` (10), but Chorono must not be described as a hosted editor. The reduced response did not provide a task cost.
- Six live OpenSEO US/en SERPs were read for `bezier curve`, `bezier curve editor`, `spline editor`, `pathfinder tool`, `boolean operations vector` and `animation scripting`. Each returned 20 mixed blocks and 14–17 organic listings. Organic destination URLs were opaque Google redirects; Chorono's exact rank or absence could not be verified. The results showed mathematics, unrelated Pathfinder products, 3D design and screenplay intent, so these head terms cannot be treated as qualified demand automatically.
- OpenSEO domain ranked-keyword sample returned no rows; that limited sample does not establish zero rankings. Search Console returned `gsc_oauth_not_configured`, so page clicks and impressions are unknown in this connection. The `seo-report` save/list tools are unavailable here, so no OpenSEO HTML report was written.

## Opportunities checked

| Pages | Observed problem | Evidence | Proposed change | Searcher and fit | Plausible benefit | Effort | Main uncertainty | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/docs/editor/canvas/splines` plus a task companion | Existing guide covers basic points, but compound contours and Continue have little procedural detail | HTTP 200; `spline editor` 50, `bezier curve editor` 30, US/en estimates; live SERPs have mixed intent | Add a focused compound spline workflow and link it from the existing guide and editor help | A user already editing a vector shape | Better task completion and potentially more qualified discovery | Small | No first-party performance baseline | Recommend |
| `/docs/scripting` plus a spline API reference | Long scripting guide contains only a brief spline table | `animation scripting` 480, but live SERP mostly screenplay/other engines | Add a precise current API reference with an executable minimal example and limitations | Agent or developer scripting a native spline | Better documentation and fewer unsupported calls; SEO gain uncertain | Small | Search intent overlap is high | Recommend as product help |
| Proposed Boolean/topology page | No implementation in inspected editor `main` | `spline boolean` 10; `pathfinder tool` 260 is ambiguous; live results mixed | Prepare a noindex draft and publish after source validation | Vector editor user | Future product fit, no current traffic case | Medium | Feature code and search fit | Defer publication |
| Offset/Outline guide | Tool not shipped | `offset path` 110; `outline stroke` 70 | Add task guide after geometry and preview ship | Designer making parallel contours | Potentially useful qualified niche | Medium | Tool behavior not finalized | Defer |
| Fillet/Chamfer guide | Tools not shipped | `fillet corners` 260; Chamfer metric not returned | Add separate guide when geometry limits are verified | Designer rounding or cutting a corner | Potentially useful, no current baseline | Medium | Exact tool semantics | Defer |
| Existing `/docs/editor/canvas/snapping` | Current guide implies vertex targets, while the inspected collector does not gather actual spline vertices | Source inspection and HTTP 200 | Correct the claim until the new snap implementation lands | Existing editor user | Prevents failed attempts | Small | Pending implementation may change shortly | Recommend correction |
| Existing doc title/description lengths | Nine informational crawl notices across sampled pages | OpenSEO 50-page crawl | Trim only when revising those pages | General visitors | Unproven SEO effect | Small | No demonstrated click loss | Maintenance, not priority |

## Decision

Lead with working compound spline tasks and a script reference because these answer real editor workflows now. The Boolean and corner-tool ideas have interesting estimates, but their pages cannot be published as current feature instructions before the implementation exists. The `spline editor` query itself has substantial other-product intent; do not forecast visits from its 50 searches or add overlapping variants together.

Sources: [OpenSEO SEO Audit skill](https://openseo.so/docs/skills/seo-audit), [DataForSEO keyword suggestions documentation](https://docs.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live/), local `chorono-editor` source read on 17 November 2026. Direct DataForSEO and OpenSEO usage are separate; this audit did not purchase duplicate keyword metrics through both routes.
