# Chorono Python animation runtime

**Coming soon.** The Python project is intended to evaluate and render scenes authored in Chorono from a Python program. Native bindings and player/renderer classes exist, but the frame-command and drawing paths are still incomplete.

## Render an authored animation from Python

The proposed flow calls the shared C++ core through `ctypes`, receives drawing commands for a frame, and renders them with Pillow. It could be useful for scripted previews and batch scene variations. Its scope is Chorono scene playback; it is not a general plotting or mathematical-animation library.

In the current source, `update_frame` returns an empty command list and the renderer does not yet interpret the full drawing stream. The presence of a Python API and an example filename does not mean that a scene can be rendered faithfully. Native library packaging and distribution remain unfinished too.

## Work with frames today

If you need pictures for an existing Python workflow, export an [image sequence](export-sequence.md) from the editor and process those files. This gives you rendered frames without relying on an incomplete native binding. The [Node.js project](runtime-node.md) is a separate, also unfinished server-rendering path.

## Installation and downloads

A public Python distribution and tested installation instructions are coming soon. There is no verified wheel or pip installation command linked here. Available packages are listed in [SDK downloads](runtime-downloads.md).
