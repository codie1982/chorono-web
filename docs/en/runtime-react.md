# Use Chorono with React

Mount the published JavaScript runtime inside a React component. This guide uses `@chorono/runtime` 0.1.0; there is no separate React SDK to install for this example.

## Prepare the scene

Follow [JavaScript installation](runtime-javascript.md#install). Download the [title-card runtime JSON](https://www.chorono.com/examples/first-animation.runtime.json) and serve it from your app's public directory as `/animation.runtime.json`.

## Mount and clean up the player

This client component loads the package inside its effect, aborts stale requests and destroys its owned player on unmount. A new `src` replaces the player; effect cleanup also handles React's development remount checks.

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChronoPlayer } from '@chorono/runtime'

export function ChoronoAnimation({ src = '/animation.runtime.json' }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const player = useRef<ChronoPlayer | null>(null)
  const [status, setStatus] = useState('Loading animation…')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    let owned: ChronoPlayer | undefined
    setReady(false)
    setStatus('Loading animation…')

    async function load() {
      try {
        const [{ ChronoPlayer, CanvasRenderAdapter }, response] = await Promise.all([
          import('@chorono/runtime'),
          fetch(src, { signal: controller.signal }),
        ])
        if (!response.ok) throw new Error('Scene could not load')
        const exported = await response.json()
        if (controller.signal.aborted || !canvas.current) return
        const context = canvas.current.getContext('2d')
        if (!context) throw new Error('Canvas 2D is unavailable')
        canvas.current.width = exported.runtime.composition.width
        canvas.current.height = exported.runtime.composition.height
        owned = new ChronoPlayer(exported.runtime, new CanvasRenderAdapter(context), { loop: true })
        player.current = owned
        owned.seek(0)
        setStatus('Ready')
        setReady(true)
      } catch (error) {
        if (!controller.signal.aborted) setStatus(String(error))
      }
    }
    void load()
    return () => {
      controller.abort()
      owned?.destroy()
      if (player.current === owned) player.current = null
    }
  }, [src])

  return <figure>
    <canvas ref={canvas} aria-label="Chorono animation" style={{ width: '100%', height: 'auto' }} />
    <figcaption role="status">{status}</figcaption>
    <button disabled={!ready} onClick={() => player.current?.play()}>Play</button>
    <button disabled={!ready} onClick={() => player.current?.pause()}>Pause</button>
  </figure>
}
```

## Adapt it to your application

Playback starts only when the visitor chooses Play. Keep controls accessible and pause the player when your application hides the view. Review export warnings before shipping; the example loads a reviewed, media-free scene.

For player methods and host-supplied assets, continue with the [JavaScript runtime](runtime-javascript.md). Use [runtime JSON export](export-runtime-json.md) for your own scene and keep its editable project separately.
