# Chorono iOS animation SDK

**Coming soon.** The iOS SDK is being developed to play Chorono animations in a native Swift application. A player, view and partial CoreGraphics renderer are present in the source; a supported public installation is not ready yet.

## Native Swift playback

The prototype connects a UIKit view and display-link loop to the shared C++ core. The core evaluates the scene, and CoreGraphics draws the resulting commands. This is a player for an animation authored in Chorono, rather than a replacement for ordinary UIKit or SwiftUI interface transitions.

Basic transforms, rectangles, circles, ellipses, lines and text have drawing paths. Polygon, star, arc, ring and image commands remain unfinished. Those gaps matter when choosing a scene: a title with a rectangle is a different compatibility case from an illustration with embedded media.

## Before an iOS release

The installation guide will identify the supported package version, platform requirements and tested scene capabilities. A local Swift package definition is useful for development, but it does not establish a complete SDK release or parity with the editor.

## Installation and downloads

Public download and setup instructions are coming soon. For the other native platform, the [Android SDK](runtime-android.md) already has a Maven release. The [React Native wrapper](runtime-react-native.md) is a separate development project and does not make the iOS prototype production-ready. Check the [distribution list](runtime-downloads.md) for current availability.
