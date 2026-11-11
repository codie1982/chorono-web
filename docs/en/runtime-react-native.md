# Chorono React Native animation runtime

**Coming soon.** The React Native project is intended to expose native Chorono playback through a React component. The JavaScript interface and native component specification exist; the Android and iOS wrapper modules are still unfinished.

## Native playback, with a React interface

The planned component connects React Native to the Android and iOS SDK views. It does not embed the browser canvas player. This distinction matters if you already use Chorono on the web: the [React guide](runtime-react.md) describes a browser application and cannot be copied directly into React Native.

Before the component can be used as a complete integration, it needs the platform modules, event delivery, playback commands and a tested example app. The underlying [Android SDK](runtime-android.md) has a published package, while the [iOS SDK](runtime-ios.md) is still a partial implementation. Their availability does not by itself complete the wrapper.

## Installation and downloads

The `@chorono/react-native` package is not publicly available from npm at the latest check. Installation instructions will be added after the native modules and package have been verified. That guide will distinguish platform support rather than promise the same feature set everywhere.

Use [SDK downloads and status](runtime-downloads.md) to check the current distribution options. For now, treat the component as development work, not an installable React Native animation library.
