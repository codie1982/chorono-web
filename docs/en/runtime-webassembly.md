# Chorono WebAssembly runtime

**Coming soon.** The Chorono WebAssembly SDK is being developed for applications that want to run the shared C++ animation core in a browser. The published [JavaScript runtime](runtime-javascript.md) is the available web playback option today.

## Where the WASM player fits

The project compiles the native core to WebAssembly and connects it to a TypeScript player and Canvas renderer. That makes it a separate playback path from `@chorono/runtime`, which is implemented in TypeScript. Choose between them by verified scene support and deployment needs when both are released; using WASM alone is not evidence of faster or identical rendering.

## What is implemented

The source has an Emscripten bridge, a player wrapper and basic drawing for transforms, rectangles, circles, ellipses, lines and text. Polygon, star, arc, ring and image rendering are still incomplete. A scene containing those features is not a reliable compatibility test for the current prototype.

## Installation and downloads

There is no verified public `@chorono/web-sdk` package to install yet. This page will gain a pinned version, the JavaScript/WASM files and loading instructions when the distribution is ready. No release date is set.

For an application you are building now, follow the [JavaScript quick start](runtime-javascript.md#load-and-render-a-scene) and use the versioned files in [SDK downloads](runtime-downloads.md). Keep the original project so it can be tested against the WASM player later.
