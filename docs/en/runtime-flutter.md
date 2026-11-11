# Chorono Flutter animation runtime

**Coming soon.** The Flutter project is being built to play Chorono vector animation scenes inside a Flutter interface. It has an initial FFI layer and widget structure, with frame drawing and native packaging still to complete.

## A player inside a Flutter widget

The intended path uses Dart FFI to call the shared C++ core, then draws its frame commands with a `CustomPainter`. A ticker provides the frame loop. This differs from animating a Flutter widget's own position or color: the content being played is an authored Chorono scene.

The current bindings cover part of the core API. The render-command buffer, complete drawing implementation and platform build integration are unfinished. The repository names several target platforms, but that is not a tested support matrix. In particular, the native FFI outline should not be read as proof of Flutter web support.

## Installation and downloads

A public Flutter plugin and working setup example are coming soon. There is no released package linked here, and no release date is promised. The eventual guide will state which Flutter targets were tested and which scene features they can render.

For a native Android application, see the separately published [Android SDK](runtime-android.md). That SDK is not a ready-made Flutter plugin. For browser projects, the [JavaScript player](runtime-javascript.md) is available. Keep an [editable project](export-project-json.md) to revisit your scene when the Flutter runtime is ready.
