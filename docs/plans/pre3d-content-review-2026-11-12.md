# Editor documentation expansion, 12 November 2026

The requested change extends 21 existing English guides with the current editor workflows. It preserves route slugs, page titles, descriptions, existing heading IDs, navigation, canonicals and sitemap eligibility. New task headings are searchable through the existing documentation index. No new route, redirect, robots exception or sitemap URL is needed.

## Decisions and evidence

1. Expand Properties and Controllers with formulas, procedural previews and two distinct bake workflows. The earlier guides did not explain these shipped controls. DataForSEO returned estimated US monthly demand of 110 for “sine wave animation”, 110 for “keyframe interpolation” and 10 for “bake animation” on 12 November. This is product-fit evidence, not a traffic or ranking forecast.
2. Extend existing hierarchy, selection, cloning, arrays, recovery and export guides with concrete operations and limits. Add eight task-specific Help targets through the editor's existing DocumentationHelp component. This helps readers finish the operation they already started.
3. Protect indexed identity. Keep the existing sitemap and robots policy, including 15 deliberately noindex coming-soon guides. Do not create competing formula or bake landing pages simply to repeat a keyword.

The strongest alternative was a standalone SVG export landing page: “svg export” has an estimated 170 US monthly searches, higher than the new bake term. The existing `/docs/export/svg` already serves that task. Expanding its compatibility section is a better fit than adding another URL, and the formula/bake controls have a larger documented usage gap.

## Research coverage and limits

- Existing OpenSEO project: `016339b3-2965-4937-bf53-ea847cd51952`, US (2840), English. Reused the 11 November keyword research and context.
- One new metrics request contained 20 queries; six returned metrics. Missing rows are unknown, not zero. `pre3d-keyword-map-2026-11-12.csv` records page mapping and dates.
- Two live SERP queries: “bake animation to keyframes” and “animation expressions”, 12 November 2026. Each returned 20 mixed result blocks. Most destination URLs were opaque Google redirects, so no Chorono rank or absence claim is made. Titles suggest tutorial intent for baking and mixed facial-animation/programmatic intent for expressions. That supports the qualified heading “Animation expressions and formulas”; it does not establish ranking potential.
- Crawl `67b74da5-9bbe-4486-abb7-7efa2bdad3bb` completed with 150 pages. No critical or warning issues were reported. Informational results: 15 intentional noindex pages, five long descriptions outside this docs work, and four long titles, including the existing Arrays guide. Length heuristics alone do not justify changing established page identities.
- Search Console access was unavailable in the prior project research (`gsc_oauth_not_configured`). Clicks, impressions and baseline organic visits remain unknown.
- OpenSEO's native connector failed; the already configured SSH-to-MCP wrapper supplied the research. Self-hosted whoami returned no credit balance, and responses exposed no charge. No cost is inferred.
- This server's tool inventory has no report-save capability. No hosted HTML SEO report was created. These are implementation and evidence notes, not a substitute hosted report.

Raw provider responses and the original file-hash inventory are retained in the editor checkout at `output/docs/pre3d-2026-11-12`. Product claims come from `docs/tr/chorono-web-pre3d-content.md`, checked against actual components and the shortcut registry. Search results do not define editor capabilities.

## Validation and release

Run web tests, a production-mode local build, `seo:check`, and the existing `scripts/docs/check-indexing.py` against that build. Verify every new editor Help fragment in rendered HTML. Compare prior heading IDs and metadata before publication. Editor checks are `npm test`, `npm run mcp:build` and `npm run build`; inspect the real component host separately.

This change is prepared locally. Publishing is a separate release step.

### Independent review and real captures

The skill's independent reviewer checked all 21 guide changes against the handoff, existing headings and actual source. Findings fixed: the MCP source link, Array count wording, nested-dialog Escape handling and the missing canvas zoom shortcut. The reviewed Timeline source hash was refreshed in `legacy-pages.json`; all route/metadata fields remain identical. Other reviewed legacy hashes are unchanged.

Three new images were captured from the existing isolated production-component host, with its own synthetic scene and React/editor state: property-expression (520×489), track-bake (560×516), ruler-guides (256×245). Only component-boundary cropping was performed. They are allowlisted in `screenshots.ts`, have descriptive alt text and accompany their task sections. The user's open editor and MCP session were not used.

### Completed checks

- Web: 15 Node tests and 63 docs tests passed; production-mode local build passed; existing SEO checker passed.
- Rendered audit: 83 reachable docs, 101 HTML pages, 86 sitemap URLs across 11 topic files, 15 deliberate noindex guides, 62 image URLs; zero errors.
- All 58 typed editor Help targets resolved on 46 rendered pages, including the eight new fragments.
- All 64 prior headings in the 21 edited guides survived; 34 new headings were added. Route metadata and sitemap inventory modules match the original checkout byte for byte.
- Editor: 370 test files / 2,988 tests passed; MCP build and Next build passed. Next verification used an isolated checkout with no running Next server.
- Browser: preview/apply/Undo and nested Escape behavior checked on real components. Web Properties guide and its new image/TOC were visually inspected.

No application release or public deployment was performed. Publish the web update before distributing editor Help links to the new fragments.
