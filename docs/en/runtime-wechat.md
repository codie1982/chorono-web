# Chorono WeChat animation runtime

**Coming soon.** The WeChat project is an early custom component for displaying Chorono animations in a Mini Program. The component structure exists, but canvas playback and runtime loading are not implemented yet.

## A player for the Mini Program canvas

The intended component loads a scene into a canvas owned by the Mini Program. That requires obtaining the canvas node, loading the chosen runtime, fetching the scene and connecting a frame loop. These steps differ from adding a canvas and script tag to an ordinary web page.

The source has the component definition and markup. Player commands, frame scheduling and lifecycle cleanup remain unfinished. Neither a working WebAssembly path nor compatibility with a particular WeChat client version has been established by this component shell.

## Prepare without assuming browser compatibility

Use the [published JavaScript player](runtime-javascript.md) to inspect your animation in a browser. Treat that as a scene preview, not a verified Mini Program integration. The separate [WebAssembly project](runtime-webassembly.md) is also in development and should not be assumed to solve the host integration automatically.

## Installation and downloads

A Mini Program package and tested setup example are coming soon. No installable component is linked here yet. Check [SDK downloads](runtime-downloads.md) for available distributions and keep your editable source for later compatibility tests.
