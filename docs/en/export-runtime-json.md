# Export Chorono runtime JSON

Runtime JSON packages scene data for playback in an application. Keep an editable source copy, export the runtime package, and check its diagnostics before using it with the player.

## Export the package

1. Save an [editable project](export-project-json.md).
2. Choose **Export → Runtime JSON (lean)**, or **Runtime** in an older toolbar.
3. Read any export warnings. Validation failures prevent a usable package from being produced.
4. Open the downloaded JSON and inspect its `runtime` and `warnings` fields.

The package is produced by the editor's runtime exporter. It is different from the legacy runtime representation exposed by the JSON inspector. Do not select a schema based only on the `.json` filename.

## Load the runtime payload

The website's examples use this package shape:

```js
const response = await fetch('/animation.runtime.json')
if (!response.ok) throw new Error('Runtime export could not load')
const exported = await response.json()
console.log(exported.warnings)

const player = new ChronoPlayer(
  exported.runtime,
  new CanvasRenderAdapter(context),
  { loop: true }
)
```

See the [JavaScript runtime guide](runtime-javascript.md) for imports, canvas setup, playback controls and cleanup. The constructor receives `exported.runtime`, not the wrapper object.

## Review warnings and assets

Warnings describe compatibility or delivery concerns found during export. Review them individually; a successful download does not guarantee that every editor feature is implemented by the installed player.

Make referenced assets reachable from the deployed application. Temporary browser URLs are not durable hosting addresses. For media scenes, load the assets required by the runtime API and test browser access and fonts in the real target environment.

## Verify playback

Pin the [runtime version](runtime-downloads.md), then compare the first frame, a middle frame, the end and the loop boundary. Exercise state-machine events and parameters if the scene uses them. Retain both the editable source and the tested runtime export so a later edit can be exported and checked again.

## Check procedural motion on the target runtime

The full-scene web player and simpler or native runtimes have different capabilities. A project that works in the editor is not automatically supported by every runtime package.

Review diagnostics for live expressions, controllers, modifiers and assets. Use an explicit conversion or [bake to keyframes](editor-timeline-controllers.md) only when it fits the target. Numeric, color and point expression bakes produce linear keys; boolean and text bakes produce hold keys. Those editor results do not establish universal support for hold keys or all property types in other formats.

Test the downloaded payload with the exact runtime version and platform you will ship. Check the start, middle, end and any interaction-dependent states, using the runtime's documented installation and capability guide.
