# Chorono webOS animation runtime

**Coming soon.** The webOS project is being developed to play Chorono animations in LG TV applications. The web app structure is present; player loading and Magic Remote handling are not complete.

## Playback inside a webOS app

The planned application loads a Chorono web player and draws the scene in a canvas. It also needs to connect the television's input and application lifecycle to playback. This is a TV integration project, not a separate released animation engine.

The current source provides an application shell and script entry point. Runtime initialization, scene loading, input mapping and a tested package remain unfinished. No LG model-year, webOS-version or performance matrix has been verified for this prototype.

## Develop the animation separately

The [JavaScript runtime](runtime-javascript.md) can help you inspect the scene in a browser while the TV integration is being built. That does not replace device testing. Check the animation's dimensions and text size for the intended display, then test playback and input on the actual TV when a package is ready.

## Installation and downloads

The webOS download and installation guide are coming soon. Samsung TVs use the separate [Tizen project](runtime-tizen.md). See [SDK downloads and status](runtime-downloads.md) for current releases.
