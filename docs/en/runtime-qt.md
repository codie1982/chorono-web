# Chorono Qt and QML animation runtime

**Coming soon.** The Qt project is being developed to display Chorono scenes in a Qt/QML application. A view component and core API outline exist; QPainter drawing and the finished QML integration are still to come.

## Play a Chorono scene in QML

The intended component uses `QQuickPaintedItem` to host the animation and QPainter to draw the native core's frame commands. Its purpose is to play an authored Chorono scene. Ordinary QML animations that change an item's properties remain a separate workflow.

The current `paint` path is unfinished. Source properties, plugin registration and the complete event/parameter API also need work before this can be treated as a usable animation component. No desktop or embedded-device performance claim has been established for the prototype.

## What a release will need

A setup guide will identify supported Qt versions, how to register the component, and which exported scene features are tested. It will also explain view sizing and the frame lifecycle within a real QML application.

## Installation and downloads

The Qt distribution is coming soon; there is no ready package or installation command here yet. Compare the [SDL2 desktop project](runtime-desktop.md) if you are choosing a native host, and use the [SDK status list](runtime-downloads.md) to check which distributions are actually available.
