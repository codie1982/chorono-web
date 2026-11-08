# English documentation interface

The public-site repository `chorono-web` owns `/docs`. The animation editor remains in the separate `chorono-editor` repository. This feature was migrated from an initial editor-hosted preview on November 8, 2026. See [migration and verification](docs-library-migration.md).

## Contracts and ownership

- `app/docs/layout.tsx` supplies the local Geist font, docs shell and server-built search index. `app/docs/[[...slug]]/page.tsx` enumerates 11 reviewed routes, renders Markdown on the server and returns a real 404 for unknown slugs.
- `lib/documentation/manifest.ts` owns routes, labels and allowlisted source paths under `docs/en/` and `docs/releases/`. `loader.ts` reads those sources with per-render React caching; user input never becomes a filesystem path.
- `content.ts` uses unified/remark GFM and github-slugger for shared duplicate-aware heading IDs, introductory copy and section search. Raw HTML is disabled. Curated Markdown sibling links resolve locally; other technical repository references retain the editor source URL.
- `search.ts` matches all query terms, weights titles/sections and returns at most 12 results. It is deterministic, immutable and makes no network request. Sections are bounded to 1,800 characters.
- `components/documentation/` owns reading UI, code copy, native menu/search dialogs and contents tracking. Styles are scoped in `app/docs/docs.css` and use a separate theme preference.
- `lib/animation-library/catalog.ts` owns the two source-backed examples and their guide relationships. `components/player/ScenePreview.tsx` delegates to the website's existing `AnimationExample` compact presentation, backed only by the published `@chorono/runtime` package. No editor engine code is imported.

## Interaction and lifecycle

Cmd/Ctrl+K opens the native search dialog. Arrow keys/Enter choose a section; Escape closes and restores focus. Desktop uses a left sidebar and right contents rail; narrower layouts use expandable contents and a mobile navigation dialog. Observers/listeners are removed on unmount. Clipboard/storage failures have fallbacks. Reduced-motion preferences remove decorative transitions; example motion starts only on a user action.

The shared player initially shows a static local poster. It lazily loads its runtime export on play or seek, owns one frame clock, pauses when hidden and destroys its player/adapter on unmount. Scene identity keys force fresh ownership on route changes. Times are milliseconds and dimensions are composition pixels. The two original portable projects remain unchanged; their runtime exports have no exporter warnings.

## Add a page

Write a reviewed article under `docs/en/`, with one H1 and precise H2/H3 sections. Add its allowlisted route to `documentationPages`, link actual sibling tasks and configure three distinct related guides in `lib/documentation/related.ts`. The route, search index, heading anchors and topic sitemap use the same sources. Check the page's real HTML, source links, search result, TOC and responsive layout.

Run `npm test` and `npm run build` in this repository. `npm run seo:check -- http://127.0.0.1:2011` verifies existing public page contracts and follows the new sitemap index. The Python docs inspector and browser-only `?measure=1` diagnostics remain available; their local lab values are not field Core Web Vitals.

Publication is deliberately disabled for the new routes during local review. Canonicals use the existing site origin; new HTML is noindex and excluded from live sitemap groups until the explicit release configuration and rebuild described in the sitemap handoff. This change does not deploy anything.
