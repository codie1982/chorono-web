'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Download, Pause, Play, RotateCcw } from 'lucide-react'
import type { ChronoPlayer } from '@chorono/runtime'
import { ANIMATION_EXAMPLES, type AnimationExampleId } from '@/lib/animation-example'
import { trackExampleAction } from '@/lib/analytics'

/**
 * Play one reviewed scene through @chorono/runtime, lazily on user interaction.
 * Full and compact presentations share loading, timing and resource ownership.
 * The host owns one frame clock; unmount destroys the adapter and hidden tabs
 * pause. Pending loads check ownership before allocating a player. Times are
 * milliseconds and dimensions are native composition pixels. No autoplay.
 */
export default function AnimationExample({ exampleId = 'ideas-in-motion', compact = false, title, initialTimeMs }: { exampleId?: AnimationExampleId; compact?: boolean; title?: string; initialTimeMs?: number }) {
  const example = ANIMATION_EXAMPLES[exampleId]
  const posterTime = initialTimeMs ?? example.posterTimeMs
  const width = 'width' in example ? example.width : 1200
  const height = 'height' in example ? example.height : 675
  const loop = 'loop' in example && example.loop
  const DURATION = example.durationMs
  const BASE = `/examples/${exampleId}`
  const labelId = useId()
  const canvas = useRef<HTMLCanvasElement>(null)
  const player = useRef<ChronoPlayer | null>(null)
  const pending = useRef<Promise<ChronoPlayer> | null>(null)
  const mounted = useRef(false)
  const started = useRef(false)
  const playbackPending = useRef(false)
  const position = useRef<number>(posterTime)
  const [status, setStatus] = useState<'poster' | 'loading' | 'ready' | 'error'>('poster')
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState<number>(posterTime)

  useEffect(() => {
    mounted.current = true
    const visibility = () => { if (document.hidden) setPlaying(false) }
    document.addEventListener('visibilitychange', visibility)
    return () => {
      document.removeEventListener('visibilitychange', visibility)
      mounted.current = false
      player.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!playing) return
    let previous = performance.now()
    let displayed = previous
    let frame: number
    const advance = (now: number) => {
      const next = position.current + now - previous
      position.current = loop ? next % DURATION : Math.min(DURATION, next)
      previous = now
      // Host-driven timing keeps the controls and the runtime on the same clock.
      player.current?.tick(position.current)
      if (now - displayed >= 80 || position.current === DURATION) {
        setTime(position.current)
        displayed = now
      }
      if (position.current === DURATION) setPlaying(false)
      else frame = requestAnimationFrame(advance)
    }
    frame = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(frame)
  }, [playing, DURATION, loop])

  async function getPlayer() {
    if (player.current) return player.current
    if (pending.current) return pending.current
    setStatus('loading')
    pending.current = (async () => {
      const [runtime, response] = await Promise.all([
        import('@chorono/runtime'),
        fetch(`${BASE}.runtime.json`),
      ])
      if (!response.ok) throw new Error('Example unavailable')
      const exported = await response.json()
      if (!mounted.current || !canvas.current) throw new Error('Preview closed')
      const context = canvas.current.getContext('2d')
      if (!context) throw new Error('Canvas unavailable')
      const instance = new runtime.ChronoPlayer(exported.runtime, new runtime.CanvasRenderAdapter(context), { loop: false })
      player.current = instance
      instance.seek(posterTime)
      setStatus('ready')
      return instance
    })()
    try {
      return await pending.current
    } catch (error) {
      if (mounted.current) setStatus('error')
      throw error
    } finally {
      pending.current = null
    }
  }

  async function togglePlayback(restart = false) {
    if (playbackPending.current) return
    playbackPending.current = true
    try {
      const instance = await getPlayer()
      if (playing && !restart) {
        setPlaying(false)
        setTime(position.current)
        return
      }
      if (restart || !started.current || position.current >= DURATION) {
        position.current = 0
        instance.seek(0)
        setTime(0)
      }
      started.current = true
      setPlaying(true)
      trackExampleAction(exampleId, restart ? 'replay' : 'play')
    } catch { /* The poster and project download remain available. */ }
    finally { playbackPending.current = false }
  }

  async function seek(value: number) {
    setTime(value)
    position.current = value
    setPlaying(false)
    started.current = true
    try {
      const instance = await getPlayer()
      instance.pause()
      instance.seek(value)
    } catch { /* Show the download fallback if playback is unavailable. */ }
  }

  if (compact) return <figure className="cd-scene-example">
    <div className="cd-scene-heading"><span className="cd-status-dot" /><span>EDITABLE EXAMPLE</span><span>{example.layers} layers · {DURATION / 1000}s</span></div>
    <div className="cd-scene-stage relative" style={{ aspectRatio: `${width} / ${height}` }}>
      <img src={`${BASE}.png`} alt={example.alt} aria-hidden={status === 'ready' ? true : undefined} width={width} height={height} loading="lazy" className="absolute inset-0 h-full w-full" />
      <canvas ref={canvas} width={width} height={height} role="img" aria-label={title ?? example.title} className={`absolute inset-0 h-full w-full ${status === 'ready' ? '' : 'invisible'}`} />
    </div>
    {status === 'error' && <p role="alert">The preview could not load. Download the project to open it in Chorono.</p>}
    <div className="cd-scene-controls">
      <button type="button" disabled={status === 'loading'} onClick={() => void togglePlayback()} aria-label={playing ? 'Pause example' : 'Play example'}>{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}<span>{status === 'loading' ? 'Loading' : playing ? 'Pause' : 'Play'}</span></button>
      <input type="range" min={0} max={DURATION} step={1} value={Math.round(time)} onChange={event => void seek(Number(event.target.value))} disabled={status === 'loading'} aria-label="Example preview time" aria-valuetext={`${(time / 1000).toFixed(1)} seconds`} />
      <output>{(time / 1000).toFixed(1)} <span>/ {DURATION / 1000}s</span></output>
    </div>
    <figcaption>{title ?? example.title}. Native Chorono playback. {loop ? 'Repeats until paused.' : 'Plays once.'}</figcaption>
  </figure>

  return <figure className="animation-example my-7 overflow-hidden rounded-2xl border border-[#d9bca9] bg-white" aria-labelledby={labelId}>
    <div className="flex flex-wrap justify-between gap-2 border-b border-[#e7d8cf] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#8F3D27]">
      <span id={labelId}>{example.title}</span><span>{DURATION / 1000} seconds · {example.layers} editable layers</span>
    </div>
    <div className="relative bg-[#F7F1ED]" style={{ aspectRatio: `${width} / ${height}` }}>
      <img src={`${BASE}.png`} alt={example.alt} aria-hidden={status === 'ready' ? true : undefined} width={width} height={height} loading="lazy" className="absolute inset-0 h-full w-full" />
      <canvas ref={canvas} width={width} height={height} role="img" aria-label={`Animated preview: ${example.title}`} className={`absolute inset-0 h-full w-full ${status === 'ready' ? '' : 'invisible'}`} />
    </div>
    <div className="border-t border-[#e7d8cf] p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => void togglePlayback()} disabled={status === 'loading'} className="inline-flex min-h-[44px] min-w-[112px] items-center justify-center gap-2 rounded-lg bg-[#8F3D27] px-4 text-sm font-semibold text-white disabled:opacity-60" aria-label={playing ? 'Pause animation' : 'Play animation'}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{status === 'loading' ? 'Loading…' : playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" onClick={() => void togglePlayback(true)} disabled={status === 'loading'} className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-medium text-[#8F3D27] hover:bg-[#f7f1ed] disabled:opacity-60"><RotateCcw size={16} aria-hidden="true" />Replay</button>
        <span className="ml-auto text-sm tabular-nums text-[#6d5a52]" aria-hidden="true">{(time / 1000).toFixed(1)} / {(DURATION / 1000).toFixed(1)} s</span>
      </div>
      <label className="mt-3 flex flex-wrap items-center gap-x-3 text-sm text-[#6d5a52]">Preview time
        <input type="range" min={0} max={DURATION} step={10} value={time} onChange={event => void seek(Number(event.target.value))} disabled={status === 'loading'} aria-valuetext={`${(time / 1000).toFixed(1)} seconds of ${DURATION / 1000} seconds`} className="min-h-[44px] min-w-0 flex-1 accent-[#8F3D27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F3D27]" />
      </label>
      <div className="mt-1 flex flex-wrap gap-2" aria-label="Inspect animation moments">{example.cues.map(cue => <button key={cue.timeMs} type="button" onClick={() => void seek(cue.timeMs)} disabled={status === 'loading'} className="min-h-[44px] rounded-lg border border-[#e7d8cf] px-3 text-left text-xs leading-5 text-[#6d5a52] hover:bg-[#f7f1ed] disabled:opacity-60">{(cue.timeMs / 1000).toFixed(2).replace(/0$/, '')} s · {cue.label}</button>)}</div>
      {status === 'error' && <div role="status" className="mt-3 text-sm text-[#8F3D27]">The preview could not load. Download the project below to open it in Chorono.</div>}
      <a href={`${BASE}.chorono.json`} download={`${exampleId}.chorono.json`} onClick={() => trackExampleAction(exampleId, 'download')} className="mt-3 inline-flex min-h-[44px] flex-wrap items-center gap-2 text-sm font-semibold"><Download size={17} aria-hidden="true" />Download editable Chorono project <span className="whitespace-nowrap font-normal">· {Math.ceil(example.bytes / 1024)} KB JSON</span></a>
    </div>
    <figcaption className="border-t border-[#e7d8cf] bg-[#faf7f4] px-5 py-4 text-sm leading-6 text-[#6d5a52]">A real Chorono scene, played with @chorono/runtime. Playback starts when you choose Play. {loop && 'This preview repeats until paused. '}Text, shapes and keyframes remain editable in the downloaded project.</figcaption>
  </figure>
}
