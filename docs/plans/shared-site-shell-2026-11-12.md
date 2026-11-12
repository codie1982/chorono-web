# Shared website shell — 12 November 2026

## Problem and result

The landing page, guides, documentation and animation library previously owned
different headers, footers, logos and typography. All routes now use the same
website frame and the existing landing-page palette. Documentation retains its
section navigation and search. The animation library has its own collection
layout and a dedicated section in the shared footer, including on the homepage.

## Ownership and entry points

- `app/layout.tsx` mounts `components/site/SiteShell.tsx` once around route content.
- `SiteHeader` owns the brand, global links and responsive native menu. It closes
  on navigation or Escape; Escape returns focus to its disclosure control.
- `GitHubStarButton` reuses `lib/github-stars.mjs` and existing analytics. Its
  asynchronous count is optional, and unmounting ignores late responses.
- `SiteFooter` owns global discovery links, the existing author anchor and the
  animation-library section. Links point to existing public routes.
- `app/site.css` owns shared `--site-*` tokens, typography and shell breakpoints.
- `DocumentationShell` owns only documentation tools, sidebar, mobile topic menu
  and reader theme. Its `--cd-*` light tokens inherit the shared site palette;
  the optional dark reader remains local to documentation.
- `app/animations/layout.tsx` uses the shared root shell without mounting the
  documentation shell or its search index. Reader/content CSS is reused by the
  collection and detail pages. Playback and project downloads are unchanged.

Content layouts must not mount another site header or footer. A new route needs
only its metadata and a single main landmark, for example:

```tsx
export default function ExamplePage() {
  return <main><h1>Example</h1><p>Page content.</p></main>
}
```

The shared shell is a server component with a small client navigation boundary.
Pages continue to render their article HTML and structured data on the server.
No new package, state service or persistence contract is introduced.

## SEO and compatibility

Existing URLs, canonical metadata, page titles, article headings, JSON-LD,
publication rules and sitemap membership are preserved. `/animations` remains
the collection URL; no misspelled alias or redirect is introduced. Robots and
sitemap generators need no change for this visual refactor. The old page-local
footer blocks have been removed to avoid duplicate footer landmarks.

`scripts/check-seo.mjs` checks one shared header, main and footer, and a crawlable
library footer link on all indexed pages. Article-section assertions read only
the main landmark, excluding site-navigation headings in the shared footer.

## Verification

- `npm test`: existing Node and documentation suites.
- `VERCEL_ENV=production npm run build`: production compile and prerender.
- `npm run seo:check -- http://127.0.0.1:4334`: metadata, structured data,
  shared landmarks, public sitemap, downloads and brand assets.
- `python3 scripts/docs/check-indexing.py --base-url http://127.0.0.1:4334
  --mode production --expect-docs 83 --expect-unlisted-docs 15`: docs, internal
  links, images, canonical/indexing rules and sitemap coverage.
- Browser review at 1280, 390 and 320 px: common branding, no horizontal
  overflow, mobile navigation, documentation menu/search, library playback
  and homepage footer. Optional reader theme remains available.

Evidence is kept in the editor workspace under
`output/site/shared-shell-20261112/`. This change is prepared locally; publishing
is a separate release operation.

Verified result: 15 Node tests and 63 documentation tests passed, production
build passed, and SEO checks passed across all 86 indexed URLs. The indexing
audit checked 83 docs, 101 HTML pages, 15 deliberately unlisted docs and 63 image
assets without errors. Mobile browser checks found one shared header/footer and
no horizontal overflow on docs, guides and the library at both tested widths.
