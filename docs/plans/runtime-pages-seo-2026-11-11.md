# Runtime child pages and SEO, 11 November 2026

## Result and ownership

This follow-up supersedes the no-new-routes scope in `runtime-platform-inventory-2026-11-11.md`; its source inventory remains valid. Seventeen runtime/platform projects now have individual destinations. JavaScript reuses its established route; 16 pages are new. Android and JavaScript have verified published packages. Fifteen projects are described as coming soon.

Runtime navigation contains 21 pages: the 17 platform destinations, overview, downloads, React and Vue. React/Vue explain the JavaScript package rather than claim separate distributions. Documentation totals 83 pages. The shared C++ core, proposed GPU renderer and separate 3D rendering project are infrastructure, not additional playback SDKs.

| Platform | Route | Status |
| --- | --- | --- |
| JavaScript / TypeScript | /docs/runtime/javascript | npm 0.1.0, existing route |
| Android / Compose | /docs/runtime/android | Maven Central 1.0.0 |
| WebAssembly | /docs/runtime/webassembly | Coming soon |
| Web Component | /docs/runtime/web-component | Coming soon |
| iOS / Swift | /docs/runtime/ios | Coming soon |
| Flutter | /docs/runtime/flutter | Coming soon |
| React Native | /docs/runtime/react-native | Coming soon |
| Kotlin Multiplatform | /docs/runtime/kotlin-multiplatform | Coming soon |
| HarmonyOS | /docs/runtime/harmonyos | Coming soon |
| Desktop / SDL2 | /docs/runtime/desktop | Coming soon |
| macOS / AppKit | /docs/runtime/macos | Coming soon |
| Qt / QML | /docs/runtime/qt | Coming soon |
| Node.js | /docs/runtime/node | Coming soon |
| Python | /docs/runtime/python | Coming soon |
| Tizen | /docs/runtime/tizen | Coming soon |
| webOS | /docs/runtime/webos | Coming soon |
| WeChat Mini Program | /docs/runtime/wechat | Coming soon |

## Source and release accuracy

The Markdown files in `docs/en` explain distinct platform implementations and their limitations. No unpublished package name is presented as an installation command. Direct published downloads remain versioned. Android setup uses the API in the published sources and names the native scene input contract; the JavaScript export envelope is not described as a native scene.

The Android 1.0.0 AAR manifest specifies minimum API 24. Its JNI entries contain only arm64-v8a and x86_64 libraries. These requirements were checked in the actual Maven artifact, not inferred only from the local build configuration. The guide's Compose example was compared with published sources, not run on an emulator. Package publication does not establish parity with every current editor feature.

Release sources checked on 11 November:

- https://registry.npmjs.org/@chorono/runtime
- https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/maven-metadata.xml
- https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/1.0.0/chorono-android-sdk-1.0.0.aar
- https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/1.0.0/chorono-android-sdk-1.0.0-sources.jar

## Publication contract

`lib/documentation/runtime-guides.ts` owns new page metadata. `manifest.ts` extends the existing entry contract with optional `availability: 'coming-soon'`. Existing records, URLs, titles and descriptions remain unchanged. Markdown continues through the existing loader, search, sidebar, breadcrumb and related-link paths.

The document route passes readiness to `contentPublicationMetadata(path, indexable)`. In production, a developing page is self-canonical and `noindex,follow`; its URL remains crawlable so engines can read the exclusion. `structured-data.ts` emits WebPage and BreadcrumbList, but no TechnicalArticle for these status pages. Ready guides retain the existing article behavior.

The existing sitemap serializer separates normal `paths` from `previewOnlyPaths`. The public XML includes 86 eligible site URLs, adding Android to the previous 85. The 15 new status pages appear only in the inspection XML. Preview builds remain `noindex,nofollow` for every page; the existing publication gate and robots policy are preserved. No robots disallow rule hides status-page noindex directives in production.

To promote a platform: verify the released package and supported platforms, replace the status copy with a working setup/example and real versioned downloads, then remove `availability: 'coming-soon'`. Rebuild and validate the public sitemap, metadata and links together. Do not remove the flag merely because the repository exists.

## Keyword decisions

The adjacent `runtime-keywords-2026-11-11.csv` maps 34 terms to 17 destinations. Research used DataForSEO through OpenSEO, US/English: 33 fresh metrics requests plus one cached JavaScript metric from 8 November. Seventeen fresh rows returned, 15 with volume; 16 requested terms were absent. Overall, 16 volumes are known and 18 are unknown. Missing values are not zero.

Four live SERP queries covered Android, WebAssembly, Web Component and Python. Each returned 20 mixed blocks, with 16/17/17/17 organic listings respectively. All destination URLs were opaque Google redirects, so neither Chorono's ranking nor absence is established. Volume variants overlap and must not be summed. No itemized dollar cost or credit total was disclosed by the self-hosted responses.

Android installation intent is served by a real release (50 estimated US monthly searches for the library term, 30 for Compose). Python and React Native each have 70 for their head term but cannot yet satisfy installation intent, so higher demand does not justify indexing unfinished guides. JavaScript's 390-volume term was reused rather than repurchased. These figures are search estimates, not traffic forecasts.

## Validation and review

- 13 Node and 63 Vitest tests passed, including readiness, production/preview sitemap separation and the legacy SEO fixture.
- Production build and the existing SEO smoke check passed.
- Production HTTP check covered 101 HTML pages, all 83 docs reachable, 86 public sitemap URLs, 15 intentionally unlisted docs and 59 successful image requests, with zero errors.
- Browser review confirmed the Android installation guide and Flutter coming-soon page render correctly.
- Independent SEO review confirmed the existing SEO identities and readiness contract; Android platform prerequisites and wording cleanup were incorporated.
- The actual website checkout passed all 76 tests, a preview build and a complete HTTP inspection: 101 HTML pages, 83 reachable docs, 59 successful images, zero errors. Every preview page remains noindex.
- Fresh free live audit completed at 15:49 UTC: 54 public URLs all returned 200, with zero critical issues or warnings and eight informational title/description-length notices. These public pages do not yet contain this local expansion.
- OpenSEO research records were updated. Its installed tool list has no report-saving capability, so no hosted HTML audit report is claimed.

Useful checks:

```sh
npm test
npm run build
npm run seo:check -- http://127.0.0.1:4323
python3 scripts/docs/check-indexing.py --base-url http://127.0.0.1:4323 --mode production --expect-docs 83 --expect-unlisted-docs 15
python3 scripts/docs/check-indexing.py --base-url http://127.0.0.1:2011 --mode preview --expect-docs 83 --expect-unlisted-docs 0
```

Set the existing publication environment variables for the chosen profile before building; stop the corresponding Next server first. This change was prepared locally and does not authorize deployment or indexing submissions.
