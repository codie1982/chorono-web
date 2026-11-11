# Export from Chorono

Choose an output based on what the next person or application needs. Keep an editable project for future changes, then create a separate delivery file for playback, images or web sharing.

## Choose a format

| Output | Use it for | What to check |
| --- | --- | --- |
| [Project JSON](export-project-json.md) | Reopening and editing the scene | Portable assets and a successful reopen |
| [Runtime JSON](export-runtime-json.md) | Playback through a compatible SDK | Export warnings, version and target-player behavior |
| [PNG / WebP / JPEG](export-images.md) | A still image of the current frame | Playhead time, dimensions and transparency |
| [SVG](export-images.md#svg) | Supported vector content | Skipped layers/effects and optional SMIL limitations |
| [Image sequence ZIP](export-images.md#image-sequences) | Numbered frames for an external video pipeline | FPS, resolution, frame count and storage |
| [Standalone HTML](export-html.md) | A self-playing web document | Supported playback and asset availability |

## Find the commands

In the updated toolbar, use **Project** for saving and inspecting scene JSON, and **Export** for delivery formats. The File menu also exposes output commands. Older editor versions may show separate **JSON** and **Runtime** buttons.

Match the command to its output, rather than assuming that every JSON file has the same schema. The JSON inspector can expose a legacy runtime representation; the main **Runtime JSON (lean)** export produces the package used by the runtime guides.

## Prepare the scene

1. Save the editable source.
2. Check composition dimensions and duration.
3. Preview representative times, including loop boundaries.
4. Check that fonts and media are available.
5. Export, read diagnostics and open the resulting file in its destination.

## Video delivery

The output menu documented here provides still images, image sequences, SVG, HTML and runtime JSON. Use an image sequence as input to an external video encoder when you need a video file. This does not add an MP4 or GIF encoder to the editor; audio must be handled by the external production workflow.

For an interactive application instead of a fixed video, continue with [Runtime](runtime-overview.md). For changing the scene itself, return to the [Editor guide](editor-overview.md).
