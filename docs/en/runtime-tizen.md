# Chorono Tizen animation runtime

**Coming soon.** The Tizen project is an early web-application shell for playing Chorono animations on Samsung TVs. Runtime loading and remote-control interaction are still unfinished.

## Animation in a TV application

The intended application hosts the JavaScript or WebAssembly player in a canvas. It must load a scene, manage playback and translate remote-control input into the application's interaction flow. A desktop browser example does not establish that the same behavior works on a particular television.

The source currently includes the application configuration, page and script entry point. Connecting the player, loading the scene, handling TV input and producing a tested installation package remain development work. There is no verified model-year or device support list yet.

## Prepare a scene for testing

You can work on the animation in the editor and inspect it with the available [JavaScript runtime](runtime-javascript.md). Keep that browser check separate from TV validation: text readability, input focus, memory use and lifecycle need testing on the intended device.

## Installation and downloads

A Tizen package and setup guide are coming soon. For LG televisions, see the separate [webOS project](runtime-webos.md). The [SDK status list](runtime-downloads.md) records which playback packages are available now.
