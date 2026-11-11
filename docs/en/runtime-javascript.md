# Chorono JavaScript runtime

The published `@chorono/runtime` package provides a canvas adapter and player for JavaScript and TypeScript applications. The examples below use version 0.1.0 and a reviewed Chorono runtime export.

## Install

```bash
npm install @chorono/runtime@0.1.0
```

For direct browser scripts or an archive, use [SDK downloads](runtime-downloads.md). The package includes TypeScript declarations.

## Download the published runtime

Version 0.1.0 is available as an [npm package](https://www.npmjs.com/package/@chorono/runtime/v/0.1.0) and a [package archive](https://registry.npmjs.org/@chorono/runtime/-/runtime-0.1.0.tgz). For browser hosting, use the versioned [ES module](https://cdn.jsdelivr.net/npm/@chorono/runtime@0.1.0/dist/chorono-runtime.mjs) or [browser-global script](https://cdn.jsdelivr.net/npm/@chorono/runtime@0.1.0/dist/chorono-runtime.global.js).

This JavaScript animation player renders authored Chorono scenes to a canvas. It does not animate arbitrary HTML elements. The separate [WebAssembly SDK](runtime-webassembly.md) and [Web Component](runtime-web-component.md) are coming soon; they are not required for the examples on this page.

## Load and render a scene

Download the [title-card runtime JSON](https://www.chorono.com/examples/first-animation.runtime.json) and serve it as `/animation.runtime.json` in your application. Add a canvas to the page:

```html
<canvas id="animation" aria-label="Chorono title animation"></canvas>
```

Run this module after the canvas exists:

```js
import { ChronoPlayer, CanvasRenderAdapter } from '@chorono/runtime'

const canvas = document.querySelector('#animation')
const context = canvas.getContext('2d')
if (!context) throw new Error('Canvas 2D is unavailable')

const response = await fetch('/animation.runtime.json')
if (!response.ok) throw new Error(`Scene request failed: ${response.status}`)
const exported = await response.json()
if (exported.warnings?.length) console.warn(exported.warnings)

canvas.width = exported.runtime.composition.width
canvas.height = exported.runtime.composition.height
const player = new ChronoPlayer(
  exported.runtime,
  new CanvasRenderAdapter(context),
  { loop: true }
)
player.seek(0)
// Call player.play() from your application's Play control.
```

Pass `exported.runtime`, not the entire export wrapper. Keep the editor source JSON separately. These examples use a scene without external media; image and video assets require host-side loading and the player's `assets` option.

## Control playback

| Method | Purpose |
| --- | --- |
| `player.play()` | Start the player's animation clock |
| `player.pause()` | Pause playback |
| `player.stop()` | Stop and reset playback |
| `player.seek(1500)` | Seek to 1,500 milliseconds |
| `player.setParam('name', value)` | Override a declared scene parameter |
| `player.dispatch('event', machineId)` | Dispatch an event to a configured state machine |
| `player.destroy()` | Stop the clock and remove player listeners |

Use the parameter and event names defined by your scene. See [State machines](editor-state-machines.md) for the authoring side.

## Own the lifecycle

Call `destroy()` when removing or replacing the player. Cancel pending fetches if the host view closes before loading finishes. Remove any event listeners your own application installed.

The runtime also exposes `tick(timeMs)` for a host-driven clock. Supply absolute playback time in milliseconds; do not run an independent requestAnimationFrame loop alongside `player.play()`.

Offer play/pause controls and respect the visitor's reduced-motion preference. The [React](runtime-react.md) and [Vue](runtime-vue.md) guides show lifecycle cleanup with playback started by the visitor.
