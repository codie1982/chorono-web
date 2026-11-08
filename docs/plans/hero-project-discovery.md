# Hero transition and motion-crew download page

The blurred dark-to-cream strip has been removed. `HeroProjectBridge` connects the homepage
characters to their editable project using a crisp rounded light surface, source/download links,
and three editing steps. The earlier setup/agent cards are represented by links in those steps;
the web/runtime section follows on the same cream background.

The character scene now has a curated entry at `/animations/interactive-motion-crew`. Existing
`/animations/<slug>` routes and the detail template are retained for this review. This is not a
decision about the future library URL or page design. No redirects, bulk pages or deployment
are introduced. New library pages retain the existing local/noindex publication gate.

## Ownership

- `components/hero/HeroProjectBridge.tsx`: static transition/navigation; no new animation runtime.
- `lib/animation-library/catalog.ts`: typed basic/interactive preview selection and download allowlist.
- `lib/animation-library/loader.ts`: unchanged project bytes, source-derived stats and public attachment sizes.
- `components/animation-library/InteractiveCrewPreview.tsx`: reuses `useHeroCrew`, `HeroCharacters`
  and `NativeSplineFrameAdapter`. It starts paused, uses explicit Play, and demonstrates reactions
  without navigation. Page scrolling stays independent from the scene.
- `useHeroCrew({autoPlay, followScroll})`: both options default true, preserving homepage behavior.
  `trigger` exposes non-navigating one-shots for the detail preview; pause still takes precedence.
- Basic documentation examples continue using the existing timeline preview. Linking an interactive
  library entry to a guide does not automatically embed another interactive player in that guide.
- The library index uses a lazy poster/link for the crew, avoiding a second large interactive player.

## Downloads and regeneration

- `/animations/interactive-motion-crew/download`: exact curated native JSON, attachment filename
  `interactive-motion-crew.chorono.json`; no arbitrary filesystem parameters.
- `/hero/motion-crew.png`: transparent native poster.
- `/hero/motion-crew-project.zip`: native JSON/poster, web reference/metrics files, five native MCP
  recipes, event documentation, README and the existing MIT license notice (19 files total).

Run `python3 scripts/build-hero-download.py` after changing any bundled source or asset. It uses
Python's standard ZIP/CRC implementation, a fixed file allowlist and an atomic output replacement.
Python is not added to the Next.js build requirements. The ZIP contains source for an existing
React/Next.js/Tailwind application and the published runtime; it is not a new editor installer.
No credentials, node_modules, build artifacts or unrelated editor files are included.

The primary editable source is the saved native `chorono-motion-crew-idles.chorono.json` project.
Four staggered idle gestures were authored in place while retaining all layer IDs and nine other
reaction timelines. No new timeline evaluator or renderer is introduced. The same compatibility adapter supplies
the homepage and detail preview, including correctly animated spline coordinates.

## Validation

The catalogue/download tests cover the third entry, exact JSON attachment bytes, actual attachment
files and native state-machine playback. Sitemap checks cover 29 reviewed HTML URLs, still excluding
downloads and media; the published sitemap remains gated. The archive's CRCs and every bundled
source file are checked against the repository before local review.

Stop the owned web server before `npm run build`; restart production preview on port 2011.
Review the transition, detail preview, three download links and narrow layout locally before release.

Latest validation: 54 tests passed, production build and existing SEO checks passed. Native
validation returned valid with no warnings. JSON/PNG/ZIP endpoints returned 200; browser-downloaded
JSON matched the public source byte for byte. ZIP CRCs and all 17 bundled repository files matched.
The real browser showed Pip pointer dwell of 4881 ms and union interaction of 4952 ms.
Narrow/desktop checks at actual widths 653/1280 px had no horizontal overflow. A requested
390 px browser override was not applied by this browser backend, so that exact width is not
claimed as runtime validation for this revision. Preview controls, high-five and sitting worked;
console errors were empty. Proof is in outputs/hero-crew-idles-2026-11-08.
