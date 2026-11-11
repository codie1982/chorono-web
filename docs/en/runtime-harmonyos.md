# Chorono HarmonyOS animation runtime

**Coming soon.** The HarmonyOS project is being developed for Chorono animation playback in an ArkUI application. An ArkTS component and native bridge outline are present; scene playback and drawing are not complete.

## From an ArkUI component to the native core

The proposed flow connects the component to the shared C++ core through HarmonyOS's native API. Each evaluated frame would then be drawn on an ArkUI canvas. This is intended for an authored Chorono scene inside an application, rather than a general tutorial for ArkUI property animations.

The current component does not yet connect scene loading, frame updates and cleanup into a working player. The native bindings, build configuration and canvas renderer still need completion. There is no verified device compatibility list for this prototype.

## Installation and downloads

A HarmonyOS distribution, supported API levels and a tested setup example are coming soon. No installable package or finished sample is offered here yet.

The [Android SDK](runtime-android.md) is a separate native integration with its own published artifact; its availability does not imply HarmonyOS compatibility. See [runtime downloads and status](runtime-downloads.md) for the current options, and keep your [editable scene](export-project-json.md) for later platform testing.
