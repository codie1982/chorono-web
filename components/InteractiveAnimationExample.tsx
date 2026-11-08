'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { ChronoPlayer } from '@chorono/runtime'
import { ANIMATION_EXAMPLES } from '@/lib/animation-example'

type Scene = Parameters<ChronoPlayer['load']>[0]

/** Owns one lazy runtime and a bounded wall-clock blend loop; releases both on unmount.
 * Native buttons supply keyboard semantics. Only the preview state changes; nothing is persisted.
 */
export default function InteractiveAnimationExample({ exampleId }: { exampleId: 'heart-like' | 'hamburger-menu' }) {
  const example = ANIMATION_EXAMPLES[exampleId]
  const menu = exampleId === 'hamburger-menu'
  const base = `/examples/${exampleId}`
  const id = useId()
  const canvas = useRef<HTMLCanvasElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const player = useRef<ChronoPlayer | null>(null)
  const source = useRef<Scene | null>(null)
  const mounted = useRef(false)
  const busy = useRef(false)
  const raf = useRef(0)
  const [active, setActive] = useState(false)
  const [status, setStatus] = useState<'poster' | 'ready' | 'error'>('poster')
  const [working, setWorking] = useState(false)
  const action = menu ? active ? 'Close example menu' : 'Open example menu' : active ? 'Unlike this example' : 'Like this example'

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; cancelAnimationFrame(raf.current); player.current?.destroy() }
  }, [])

  /** Loads playback data once; unmounted responses never create a renderer or update React state. */
  async function getPlayer() {
    if (player.current) return player.current
    const [runtime, response] = await Promise.all([import('@chorono/runtime'), fetch(`${base}.chorono.json`)])
    if (!response.ok) throw new Error('Example unavailable')
    const data = await response.json()
    if (!mounted.current || !canvas.current) throw new Error('Preview closed')
    const context = canvas.current.getContext('2d')
    if (!context) throw new Error('Canvas unavailable')
    source.current = data
    const instance = new runtime.ChronoPlayer(data, new runtime.CanvasRenderAdapter(context), { loop: false })
    player.current = instance
    instance.tick(0)
    return instance
  }

  /** Sends the saved click trigger, then renders its state blend in milliseconds.
   * A short input lock prevents overlapping transitions. Reduced motion uses zero-duration blends.
   */
  async function toggle() {
    if (busy.current) return
    busy.current = true
    setWorking(true)
    try {
      const instance = await getPlayer()
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      for (const definition of source.current?.stateMachines ?? []) {
        instance.smRuntimes.get(definition.id)?.sync({ ...definition, transitions: definition.transitions.map(transition => ({ ...transition, blendMs: reduced ? 0 : transition.blendMs })) })
      }
      instance.fireEvent({ type: 'click', layerId: menu ? 'rect_9' : 'path_2' })
      instance.tick(0) // The click queues the saved trigger's named event.
      instance.tick(0) // Consume the named event and enter the new state.
      setActive([...instance.smRuntimes.values()][0].activeTimelineId === (menu ? 'open' : 'liked'))
      setStatus('ready')
      const start = performance.now()
      /** Constant state timelines are blended by the runtime's wall clock, not global timeline time. */
      const draw = (now: number) => {
        if (!mounted.current) return
        instance.tick(0)
        if (!reduced && now - start < 300) raf.current = requestAnimationFrame(draw)
        else { busy.current = false; setWorking(false) }
      }
      draw(start)
    } catch {
      if (mounted.current) { setStatus('error'); setWorking(false) }
      busy.current = false
    }
  }

  return <figure className="my-7 overflow-hidden rounded-2xl border border-[#d9bca9] bg-white" aria-labelledby={`${id}-title`} onKeyDown={event => {
    if (menu && active && event.key === 'Escape' && !busy.current) { event.preventDefault(); void toggle(); button.current?.focus() }
  }}>
    <div className="flex flex-wrap justify-between gap-2 border-b border-[#e7d8cf] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#8F3D27]"><span id={`${id}-title`}>{example.title}</span><span>Click to toggle · {example.layers} editable layers</span></div>
    <button ref={button} type="button" onClick={() => void toggle()} aria-label={action} aria-disabled={working} aria-pressed={menu ? undefined : active} aria-expanded={menu ? active : undefined} aria-controls={menu ? `${id}-menu` : undefined} className="relative block w-full cursor-pointer bg-[#F7F1ED] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#8F3D27]" style={{ aspectRatio: '1200 / 675' }}>
      <img src={`${base}.png`} alt="" width={1200} height={675} className="absolute inset-0 h-full w-full" />
      <canvas ref={canvas} width={1200} height={675} aria-hidden="true" className={`absolute inset-0 h-full w-full ${status === 'ready' ? '' : 'invisible'}`} />
    </button>
    {menu && <nav id={`${id}-menu`} aria-label="Example navigation" hidden={!active} className="border-t border-[#e7d8cf] px-5 py-3"><a href="/getting-started" className="inline-flex min-h-[44px] items-center pr-6">Get started</a><a href="/blog" className="inline-flex min-h-[44px] items-center">Explore guides</a></nav>}
    <div className="border-t border-[#e7d8cf] px-5 py-4 text-sm leading-6 text-[#6d5a52]">
      <p role="status">{status === 'error' ? 'Preview unavailable. Download the project to open it in Chorono.' : working ? 'Updating…' : menu ? active ? 'Menu open. Press Escape to close.' : 'Menu closed. Click the canvas or press Enter or Space.' : active ? 'Liked. Click again to unlike.' : 'Not liked. Click the canvas or press Enter or Space.'}</p>
      <a href={`${base}.chorono.json`} download={`${exampleId}.chorono.json`} className="inline-flex min-h-[44px] items-center font-semibold">Download editable Chorono project · {Math.ceil(example.bytes / 1024)} KB JSON</a>
    </div>
    <figcaption className="border-t border-[#e7d8cf] bg-[#faf7f4] px-5 py-4 text-sm leading-6 text-[#6d5a52]">Click-driven Chorono state transitions. No autoplay. Reduced-motion preferences skip the blend. {menu ? 'Navigation links belong to this web preview; the project contains the interactive icon.' : 'The like state is local to this preview and resets when you leave.'}</figcaption>
  </figure>
}
