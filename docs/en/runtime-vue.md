# Use Chorono with Vue

Use `@chorono/runtime` in a Vue component to play a Chorono scene on a canvas. This is a lifecycle integration for the JavaScript package, not a separately published Vue SDK.

## Prepare the scene

Install version 0.1.0 using the [JavaScript guide](runtime-javascript.md#install). Save the [title-card runtime JSON](https://www.chorono.com/examples/first-animation.runtime.json) in your public directory as `/animation.runtime.json`.

## Mount and release

Load the browser runtime after mounting. Abort a pending scene request when the component unmounts and destroy the owned player to stop its clock and listeners.

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { ChronoPlayer } from '@chorono/runtime'

const canvas = ref<HTMLCanvasElement | null>(null)
const status = ref('Loading animation…')
const ready = ref(false)
const controller = new AbortController()
let player: ChronoPlayer | undefined

onMounted(async () => {
  try {
    const [{ ChronoPlayer, CanvasRenderAdapter }, response] = await Promise.all([
      import('@chorono/runtime'),
      fetch('/animation.runtime.json', { signal: controller.signal }),
    ])
    if (!response.ok) throw new Error('Scene could not load')
    const exported = await response.json()
    if (controller.signal.aborted || !canvas.value) return
    const context = canvas.value.getContext('2d')
    if (!context) throw new Error('Canvas 2D is unavailable')
    canvas.value.width = exported.runtime.composition.width
    canvas.value.height = exported.runtime.composition.height
    player = new ChronoPlayer(exported.runtime, new CanvasRenderAdapter(context), { loop: true })
    player.seek(0)
    status.value = 'Ready'
    ready.value = true
  } catch (error) {
    if (!controller.signal.aborted) status.value = String(error)
  }
})

onBeforeUnmount(() => {
  controller.abort()
  player?.destroy()
})
</script>

<template>
  <figure>
    <canvas ref="canvas" aria-label="Chorono animation" style="width: 100%; height: auto" />
    <figcaption role="status">{{ status }}</figcaption>
    <button :disabled="!ready" @click="player?.play()">Play</button>
    <button :disabled="!ready" @click="player?.pause()">Pause</button>
  </figure>
</template>
```

## Extend the example

If your component accepts a changing scene URL, dispose the old player and abort its request before loading the replacement. This example loads one fixed scene per mount.

The example waits for the visitor to start playback. Add visibility handling appropriate to your app and inspect your own export's warnings. See the [JavaScript API](runtime-javascript.md#control-playback) for parameters, events and time controls, and [SDK downloads](runtime-downloads.md) for distribution files.
