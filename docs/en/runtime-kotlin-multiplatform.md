# Chorono Kotlin Multiplatform runtime

**Coming soon.** The Kotlin Multiplatform project is an early shared API for Chorono animation playback. Its platform implementations and rendering connection are still to be built.

## Share the playback interface

The source outlines a common Kotlin player with platform-specific implementations. Android would connect through the native SDK, iOS through the C API, and desktop through a native bridge. The common declarations describe the intended contract; they are not evidence that those targets can currently load and draw a scene.

This project is also distinct from a Compose Multiplatform animation component. A shared API does not automatically provide a cross-platform view. Platform targets, render-command handling and the visual component remain part of the development work.

## Android is available separately

If your application only needs Android, follow the [Android SDK installation](runtime-android.md). Its Jetpack Compose wrapper belongs to that Android package. It should not be presented as a released Kotlin Multiplatform dependency.

## Installation and downloads

Multiplatform package coordinates and a tested target matrix are coming soon. There is no shared installation command to use yet. When the distribution is ready, this page will explain how each supported target is configured. Until then, check [SDK availability](runtime-downloads.md) and the separate [iOS project status](runtime-ios.md).
