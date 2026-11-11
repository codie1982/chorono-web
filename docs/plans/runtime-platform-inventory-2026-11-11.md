# Runtime platform inventory, 11 November 2026

The runtime projects are siblings of chorono-web under the caamtscr workspace.
The active editor checkout used for the docs screenshots is a different checkout
under Documents/ChatGPT/chorono. Looking only inside that editor missed nine
platform projects and incorrectly left the published Android SDK as coming soon.

The initial inventory correction updated only /docs/runtime and /docs/runtime/downloads.
A subsequent user-requested expansion adds individual platform pages; see
[runtime-pages-seo-2026-11-11.md](runtime-pages-seo-2026-11-11.md) for its routes,
keyword research and publication rules. The inventory below remains the source baseline.
There are 17 runtime/platform projects: two published packages and 15 developing
projects. React/Vue are usage guides for the JavaScript package, not extra SDKs.

| Repository | Observed status | Inspected source (repository-relative) |
| --- | --- | --- |
| chorono-runtime | Published npm 0.1.0 | `package.json` |
| chorono-android-sdk | Published Maven Central 1.0.0 | `chorono-sdk/build.gradle.kts` |
| chorono-web-sdk | Partial WASM bridge/renderer | `src/renderer.ts` |
| chorono-embed | Scaffold; runtime connection TODO | `src/chorono-player.ts` |
| chorono-ios-sdk | Partial Swift bridge/renderer | `Sources/ChoronoSDK/ChoronoRenderer.swift` |
| chorono-flutter | Scaffold; frame drawing TODO | `lib/src/chorono_painter.dart` |
| chorono-react-native | Scaffold; native modules TODO | `src/ChoronoViewNativeComponent.ts` |
| chorono-kmp | Shared API outline; actual implementations TODO | `src/commonMain/kotlin/Chorono.kt` |
| chorono-harmony | Scaffold; NAPI/render TODO | `entry/src/main/ets/components/ChoronoPlayer.ets` |
| chorono-desktop | SDL2 prototype; rectangle drawing only | `src/renderer.cpp` |
| chorono-macos | AppKit view scaffold | `Sources/ChoronoMac/ChoronoMacView.swift` |
| chorono-qt | QML view scaffold; drawing TODO | `src/ChoronoQuickItem.cpp` |
| chorono-node | Scaffold; frame/video output TODO | `src/index.ts` |
| chorono-python | Scaffold; frame command/Pillow rendering TODO | `chorono/renderer.py` |
| chorono-tizen | App shell; runtime/remote TODO | `js/app.js` |
| chorono-webos | App shell; runtime/remote TODO | `js/app.js` |
| chorono-wechat | Mini Program component scaffold | `components/chorono-player/index.js` |

Related infrastructure is kept distinct from user-facing playback SDKs:
chorono-core contains the shared C++ evaluator; chorono-gpu is a renderer plan;
chorono-render is a separate local 3D render project with editor integration
unfinished. Source existence does not establish release or editor parity.

Primary release verification on 11 November 2026:

- npm @chorono/runtime metadata returned 200, latest 0.1.0.
- Maven Central Android metadata returned 200, release 1.0.0. Versioned AAR,
  POM and sources endpoints all returned 200.
- npm @chorono/web-sdk, @chorono/embed, @chorono/node and @chorono/react-native
  returned 404. No installation command or download for those packages is claimed.
- Other platform release channels were not exhaustively queried. Their source
  TODOs justify the development status; no build or runtime compatibility test
  was performed for them in this documentation update.

References:
https://registry.npmjs.org/@chorono/runtime
https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/maven-metadata.xml

The existing package links and legacy URLs remain intact. Reuse the normal docs
loader/tests and scripts/docs/check-indexing.py for validation. No paid keyword
research was added for this factual correction to existing pages.
