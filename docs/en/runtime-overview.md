# Chorono runtimes and SDKs

Use a runtime to play an exported Chorono scene inside an application. JavaScript and Android packages are available today. Other platform projects are in development, with their current status listed below.

## Choose a playback path

| Target | Current path | Distribution |
| --- | --- | --- |
| JavaScript / TypeScript | Canvas playback and player API | `@chorono/runtime` 0.1.0 |
| React | Component lifecycle guide | Uses `@chorono/runtime` |
| Vue | Component lifecycle guide | Uses `@chorono/runtime` |
| Plain HTML | Versioned browser-global script | Same runtime, via CDN |
| [Android / Jetpack Compose](runtime-android.md) | Native Android SDK | `com.grntsoftware:chorono-android-sdk:1.0.0` on Maven Central |

Open [SDK downloads](runtime-downloads.md) for npm, the package archive and the browser files. React and Vue are usage guides for the published player, not separate SDK releases.

## Platforms in development

The runtime family also includes the following projects. Their source ranges from an initial API outline to a partial renderer; these entries do not mean a complete SDK is ready to install.

| Platform family | Projects | Current stage |
| --- | --- | --- |
| Web | [WebAssembly SDK](runtime-webassembly.md), [Web Component](runtime-web-component.md) | Partial WASM renderer; Web Component playback connection still in development |
| Mobile and shared app code | [iOS](runtime-ios.md), [Flutter](runtime-flutter.md), [React Native](runtime-react-native.md), [Kotlin Multiplatform](runtime-kotlin-multiplatform.md), [HarmonyOS](runtime-harmonyos.md) | Partial iOS renderer; other platform bridges and drawing paths are being built |
| Desktop | [SDL2 desktop player](runtime-desktop.md), [macOS](runtime-macos.md), [Qt/QML](runtime-qt.md) | Early desktop drawing and view components; complete playback is not ready |
| Server and scripting | [Node.js](runtime-node.md), [Python](runtime-python.md) | Initial rendering APIs; frame output and video export are unfinished |
| TVs and mini programs | [Samsung Tizen](runtime-tizen.md), [LG webOS](runtime-webos.md), [WeChat Mini Program](runtime-wechat.md) | App/component shells; playback and device input are unfinished |

Each platform has its own guide below. See [upcoming distributions](runtime-downloads.md#upcoming-distributions) for a compact status comparison. Public downloads will be added when a release is available and its supported behavior has been checked.

The shared C++ core and planned GPU renderer support the native runtime family. The separate Chorono Render project is a local 3D rendering tool, with its editor connection still in development; it is not a replacement for a 2D playback SDK.

## How playback fits together

For the published JavaScript player:

1. Create the animation in the [Editor](editor-overview.md).
2. Keep an [editable project](export-project-json.md).
3. Export a [runtime JSON package](export-runtime-json.md) and inspect its warnings.
4. Load the package and pass its `runtime` payload to `ChronoPlayer`.
5. Render through `CanvasRenderAdapter` and control playback from your application.

The player uses milliseconds for playback time. Canvas dimensions should match the exported composition; CSS can scale its display size independently.

For Android, use the [Maven installation instructions](runtime-android.md#install-from-maven-central). JavaScript's `ChronoPlayer` and `CanvasRenderAdapter` calls are specific to the browser package; native SDKs have their own APIs and scene-loading requirements.

## Authoring and playback are separate APIs

[JavaScript scene scripting](scripting.md) runs in the editor's isolated MCP bridge and changes the editable scene. `@chorono/runtime` runs in your application to play a scene. Do not use editor scripting calls as playback SDK methods.

## Check compatibility

Pin the package version and test the exact exported scene. An editor release may support features that the published runtime does not yet reproduce. Review fonts, media loading, effects, interactions and the first and last frames on the target browser.

The quick-start examples use the website's reviewed title-card runtime export. They are a starting point for integration, not a claim that all editor features have identical output on every platform.
