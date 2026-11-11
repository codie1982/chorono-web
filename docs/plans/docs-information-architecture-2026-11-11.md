# Documentation information architecture — 11 November 2026

The website documentation now has Editor, Integrations, Runtime and Export entry points. Existing articles retain their URLs, source content, titles and descriptions. The change belongs to `chorono-web`; it does not move the documentation back into the editor repository or modify the editor engine.

## Content ownership and navigation

`lib/documentation/manifest.ts` remains the allowlist for routes, Markdown sources, metadata and search. Each article now declares a stable `section` separately from its display `group`. `sections.ts` owns the section labels, entry URLs and sitemap filenames. A navigation change therefore does not require an article slug change.

The header exposes the four primary sections. `DocumentationNavigation` renders the same crawlable links in desktop and mobile navigation, using native disclosures and opening the active section. `DocumentationCategories` reuses the manifest for the home and section cards. The existing Markdown renderer, loader, local search, contents rail, screenshot component and related-guide system are reused. There is no additional content store, dependency or editor-runtime copy.

To add a guide:

1. Add its English Markdown source under `docs/en/`.
2. Add a unique manifest slug, title, description, section and group.
3. Add contextual incoming and outgoing links in `related.ts`.
4. Run the content/link, navigation and sitemap tests, then build and inspect the rendered page.

For example, `section: 'editor'` and `group: 'Workspace'` control discovery; `slug: 'editor/canvas'` alone controls its route. Article order in the manifest also controls previous/next links. Sections and groups only borrow readonly records and own no runtime resources.

## SEO preservation

The live sitemap read on 11 November contained 29 HTML URLs across eight topic sitemaps, including 11 docs URLs. All remain covered. Seventeen additional docs pages bring the total to 46 HTML URLs and 28 docs pages. Three additive sitemap routes cover Integrations, Runtime and Export. Existing docs remain in their original topic sitemap. No redirects, URL removals or canonical-origin changes are introduced.

The existing `VERCEL_ENV === 'production'` publication policy remains unchanged: production publishes reviewed pages; local and preview docs stay noindex. Tests exercise both states. Do not set the production flag on a publicly accessible preview to make it indexable.

`legacy-pages.json` records the original 11 articles' identity and source hashes. The compatibility test makes accidental replacements visible. If an intentional future content update is approved, review its search intent and anchor compatibility, then update this fixture with that change. Do not mechanically regenerate the baseline to hide a regression.

Search Console reported impressions for `/docs`, `/docs/installation`, `/docs/first-animation`, `/docs/ai/mcp`, `/docs/releases/0.2.0` and `/docs/troubleshooting` in its returned 14 October–11 November window. This is evidence of search appearance, not a complete index coverage report or a ranking prediction. No Search Console settings or submissions were changed.

The approach follows the [Google guidance on separating URL changes from other site changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes): this change reorganizes discovery while retaining established addresses. Rankings remain dependent on search engines and must be observed after an actual production release.

## Runtime and export evidence

The existing website depends on `@chorono/runtime` 0.1.0. Its installed declarations and existing `AnimationExample` component establish the documented `ChronoPlayer(scene, adapter, options)` constructor, millisecond time basis, runtime-package payload and disposal behavior. The React and Vue examples dynamically import the player after mount, cancel pending loads and destroy their owned instance. They are framework usage guides, not separate package releases.

The npm registry returned 0.1.0 and its archive URL on 11 November. Both pinned jsDelivr browser-global and ES-module files returned HTTP 200. Registry requests for `@chorono/web-sdk`, `@chorono/embed`, `@chorono/react-native` and `@chorono/node` returned 404. Those distributions are shown as coming soon, without invented downloads. Android/iOS/Flutter installation guides are also pending verification. There is no promised release date or cross-platform feature parity claim.

Editor field and export descriptions were checked against the current editor source, including the Project/Export toolbar menus, output orchestration, runtime exporter, image/sequence/SVG dialogs and motion-key documentation. Export guides distinguish editable JSON, the runtime package and the legacy JSON-inspector runtime format. They do not advertise an unimplemented native MP4/GIF encoder. Existing older indexed guides remain unchanged in this reorganization.

## Validation

- Website `npm test`: 13 Node tests and 53 Vitest tests pass, including original-page preservation, new link/fragment resolution, exact sitemap membership and production/preview indexing behavior.
- `npm run build`: passes with all 28 documentation routes statically generated.
- `npm run seo:check -- http://127.0.0.1:2011`: passes for the 14 established marketing pages, robots, sitemaps, examples and assets.
- HTTP checks pass for all 28 docs routes: HTTP 200, one H1, public canonical, preview noindex and no broken internal route/fragment or screenshot link. The preview sitemap covers 46 unique HTML routes in 11 topics and retains all 29 live baseline paths.
- Real browser checks pass at desktop size and 375px: category navigation, active-section expansion, mobile dialog navigation/closure, SDK table layout, light/dark themes and keyboard search into the new Resources guide. No document-level horizontal overflow at 375px and no browser console errors were observed. A mobile header overflow discovered during QA was fixed before delivery.
- The original website preview was stopped before building, then restored on `http://127.0.0.1:2011/docs`. Raw HTTP results and the desktop capture are in ignored `outputs/docs-reorganization-2026-11-11/`.
- No dependencies, scene files, editor implementation or hosting configuration changed. This change does not publish the website by itself.

The editor repository's MCP build is not applicable: no MCP tool, skill or editor code changes are part of this website update.
