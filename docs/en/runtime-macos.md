# Chorono macOS animation runtime

**Coming soon.** The macOS project is an AppKit view outline for native Chorono animation playback. The view exists in source, while the player connection, frame loop and CoreGraphics drawing are still unfinished.

## A native view for macOS

The intended integration places a Chorono scene inside an `NSView`. It can draw on the native core and rendering work used by the iOS project, but macOS has a different view and timing lifecycle. An iOS package therefore does not automatically provide a working macOS player.

Scene loading and drawing in the current view are placeholders. There is not yet a tested native playback example to install. The eventual guide will cover loading a scene, resizing its view and releasing playback when the view leaves the screen.

## AppKit or another desktop host

For a Qt application, follow the [Qt/QML project](runtime-qt.md). For the cross-platform SDL2 player, see [Desktop](runtime-desktop.md). Both are also in development. An existing browser-based application can instead evaluate the available [JavaScript runtime](runtime-javascript.md).

## Installation and downloads

The macOS distribution and native setup instructions are coming soon. No release date or supported macOS version range is claimed before verification. Check [SDK downloads](runtime-downloads.md) for current package availability.
