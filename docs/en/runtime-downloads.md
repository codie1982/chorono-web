# Chorono SDK downloads

Use `@chorono/runtime` 0.1.0 for browser playback or `chorono-android-sdk` 1.0.0 for Android. Both have published packages. The other platform projects are listed below with their current development status.

## Published JavaScript runtime

```bash
npm install @chorono/runtime@0.1.0
```

| Distribution | Download or package link | Use |
| --- | --- | --- |
| npm package | [@chorono/runtime 0.1.0](https://www.npmjs.com/package/@chorono/runtime/v/0.1.0) | Bundlers, JavaScript and TypeScript |
| Package archive | [Download runtime-0.1.0.tgz](https://registry.npmjs.org/@chorono/runtime/-/runtime-0.1.0.tgz) | Package files, including type declarations |
| Browser global | [Open browser script](https://cdn.jsdelivr.net/npm/@chorono/runtime@0.1.0/dist/chorono-runtime.global.js) | Plain HTML, using the `Chorono` global |
| ES module | [Open ES module](https://cdn.jsdelivr.net/npm/@chorono/runtime@0.1.0/dist/chorono-runtime.mjs) | Module-based browser loading |

The CDN links serve JavaScript. Save the file from your browser if you want to host it yourself. The archive link downloads the npm distribution; it does not install or start the editor.

## Use the browser build

```html
<script src="https://cdn.jsdelivr.net/npm/@chorono/runtime@0.1.0/dist/chorono-runtime.global.js"></script>
```

The script exposes `Chorono.ChronoPlayer` and `Chorono.CanvasRenderAdapter`. Follow the [JavaScript quick start](runtime-javascript.md#load-and-render-a-scene), using those globals instead of the module import. Keep the version pinned when deploying a tested animation.

## Framework guides

| Framework | Package | Guide |
| --- | --- | --- |
| React | `@chorono/runtime` | [React component lifecycle](runtime-react.md) |
| Vue | `@chorono/runtime` | [Vue component lifecycle](runtime-vue.md) |

## Published Android SDK

The Android SDK is available from Maven Central as `com.grntsoftware:chorono-android-sdk:1.0.0`. Its native player is separate from the JavaScript runtime. The Android project includes a `ChoronoView` and a Jetpack Compose `ChoronoAnimator` wrapper.

Follow the [Android SDK guide](runtime-android.md) for Gradle installation, a Jetpack Compose example and native scene-loading notes.

| Distribution | Download or metadata | Use |
| --- | --- | --- |
| Android library | [Download Android SDK 1.0.0 AAR](https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/1.0.0/chorono-android-sdk-1.0.0.aar) | Manual inspection or local library use; Gradle is the usual installation path |
| Published dependencies | [View package POM](https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/1.0.0/chorono-android-sdk-1.0.0.pom) | Package coordinates and dependency metadata |
| Source archive | [Download SDK sources](https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/1.0.0/chorono-android-sdk-1.0.0-sources.jar) | Inspect the published Android API |

These package endpoints were checked on 11 November 2026. A published package does not guarantee support for every current editor feature. Test your scene on Android and keep the original editable project.

## Upcoming distributions

These projects have source or an initial implementation, but they are not listed here as ready-to-use releases. **Coming soon** means public download and setup instructions are still to come; no release date is promised.

### Web

| SDK or wrapper | Current state |
| --- | --- |
| [WebAssembly web SDK](runtime-webassembly.md) (`@chorono/web-sdk`) | Partial C++/WASM bridge and Canvas renderer. Several shape and image commands remain unfinished. Public package coming soon. |
| [Web Component](runtime-web-component.md) (`@chorono/embed`) | Custom element and lifecycle outline exist; connection to the runtime player is unfinished. Public package coming soon. |

### Mobile and multiplatform

| SDK or wrapper | Current state |
| --- | --- |
| [iOS / Swift](runtime-ios.md) | Swift player/view and a partial CoreGraphics renderer exist. Some shape and image commands remain unfinished. Download and setup guide coming soon. |
| [Flutter](runtime-flutter.md) | FFI bindings and widget outline exist; native build and frame drawing remain unfinished. Public plugin coming soon. |
| [React Native](runtime-react-native.md) (`@chorono/react-native`) | React component and native component specification exist; Android/iOS modules remain unfinished. Public package coming soon. |
| [Kotlin Multiplatform](runtime-kotlin-multiplatform.md) | Shared Kotlin API outline exists; platform implementations remain unfinished. Distribution coming soon. |
| [HarmonyOS](runtime-harmonyos.md) | ArkTS component and native bridge outline exist; playback and drawing remain unfinished. Distribution coming soon. |

### Desktop

| SDK or player | Current state |
| --- | --- |
| [Desktop / SDL2](runtime-desktop.md) | Early window/player loop with rectangle drawing. Transforms and other drawing commands remain unfinished. Distribution coming soon. |
| [macOS / AppKit](runtime-macos.md) | Native view outline exists; player connection, frame loop and drawing remain unfinished. Distribution coming soon. |
| [Qt / QML](runtime-qt.md) | View component outline exists; QPainter drawing and QML integration remain unfinished. Distribution coming soon. |

### Server and scripting

| Runtime | Current state |
| --- | --- |
| [Node.js](runtime-node.md) (`@chorono/node`) | Native bridge and rendering API outline exist; frame rendering and MP4/GIF export are unfinished. Public package coming soon. |
| [Python](runtime-python.md) | Native bindings and player/renderer outline exist; frame commands and Pillow drawing remain unfinished. Distribution coming soon. |

### TVs and mini programs

| Platform | Current state |
| --- | --- |
| [Samsung Tizen](runtime-tizen.md) | Web app shell exists; runtime loading and remote-control input remain unfinished. Distribution coming soon. |
| [LG webOS](runtime-webos.md) | Web app shell exists; runtime loading and Magic Remote input remain unfinished. Distribution coming soon. |
| [WeChat Mini Program](runtime-wechat.md) | Custom component shell exists; runtime loading and canvas playback remain unfinished. Distribution coming soon. |

Use the published JavaScript runtime for the documented browser examples. The WebAssembly SDK is a separate implementation, so a shared scene format alone does not establish identical playback. Installation commands for the developing projects will be added after release verification.

## Match the scene to the player

Keep the original project and inspect [runtime export warnings](export-runtime-json.md). Verify media, fonts, effects and interaction behavior with your chosen package version. The editor's version number and the runtime package's version number are independent.
