# Chorono desktop animation runtime

**Coming soon.** The desktop project is an early C++ and SDL2 player for Chorono scenes. A window/player loop and basic rectangle drawing exist, but the renderer is not complete enough to reproduce general editor scenes.

## A native desktop playback path

The intended application uses the shared C++ core to evaluate animation, then sends drawing commands to SDL2. Windows, macOS and Linux are the target environments. That target list is not a release or a verified platform support statement.

The current drawing path handles filled rectangles. Transform handling, other shapes, text, images and view scaling still need work. Even a scene made of rectangles may depend on transforms or opacity that the prototype does not yet reproduce.

## Choose the right desktop project

The SDL2 player is distinct from the [macOS AppKit project](runtime-macos.md) and [Qt/QML component](runtime-qt.md). Those projects target integration into their host UI frameworks. It is also separate from Chorono Render, the local 3D rendering tool; that tool is not this 2D animation player.

## Installation and downloads

A desktop distribution and supported-scene guide are coming soon. There is no ready desktop player download linked here. If your desktop application already hosts a browser view, evaluate the [published JavaScript runtime](runtime-javascript.md) in that host, including its own media and lifecycle requirements.
