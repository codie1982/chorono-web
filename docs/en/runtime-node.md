# Chorono Node.js animation runtime

**Coming soon.** The Node.js project is being developed for rendering Chorono animations without a browser. Its native bridge and API outline exist, but frame output and video export are unfinished.

## Server-side scene rendering

The intended workflow loads an authored scene, evaluates it at chosen times and draws image frames on the server. This could support thumbnails or batch rendering once implemented. It is different from a browser animation loop: Node.js does not provide the canvas element used by the current JavaScript quick start.

The source outlines `renderFrames` and an MP4 export function. The frame-rendering path is still TODO, and the MP4 function reports that export is not implemented. These names are development interfaces, not evidence that the package can produce PNG, GIF or MP4 output today.

## What you can export now

Use the editor's [image-sequence export](export-sequence.md) when you need rendered frames now. For interactive playback in a browser, use the [published JavaScript runtime](runtime-javascript.md). Its CommonJS distribution alone does not supply a native Node.js renderer.

## Installation and downloads

The `@chorono/node` package is not publicly available from npm at the latest check. A pinned package, system requirements and a working frame-rendering example will be added here after release verification. See [SDK downloads](runtime-downloads.md) for available distributions.
