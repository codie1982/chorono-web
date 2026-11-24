'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChronoPlayer } from '@chorono/runtime'
import styles from './skill-catalog.module.css'

type Scene = Parameters<ChronoPlayer['load']>[0]
type Action = { label: string; target?: string; event?: string; state: string; hover?: string }

const actions: Record<'plant-cards' | 'artifact-card', readonly Action[]> = {
  'plant-cards': [
    { label: 'Fern', target: 'Tappable Fern', state: 'plant-fern', hover: 'hover-fern' },
    { label: 'Aloe', target: 'Tappable Aloe', state: 'plant-aloe', hover: 'hover-aloe' },
    { label: 'Mint', target: 'Tappable Mint', state: 'plant-mint', hover: 'hover-mint' },
    { label: 'Reset', event: 'plant-reset', state: 'plant-idle' },
  ],
  'artifact-card': [
    { label: 'Open inspection', target: 'Artifact tile click target', state: 'inspect-open' },
    { label: 'Close inspection', target: 'Close inspection button', state: 'inspect-idle' },
  ],
}

export function SkillInteractiveDemo({ kind, project, poster, width, height }: {
  kind: keyof typeof actions
  project: string
  poster: string
  width: number
  height: number
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const player = useRef<ChronoPlayer | null>(null)
  const source = useRef<Scene | null>(null)
  const opened = useRef(false)
  const busy = useRef(false)
  const raf = useRef(0)
  const [active, setActive] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    opened.current = true
    return () => {
      opened.current = false
      cancelAnimationFrame(raf.current)
      player.current?.destroy()
      player.current = null
    }
  }, [])

  async function getPlayer() {
    if (player.current) return player.current
    const [runtime, response] = await Promise.all([import('@chorono/runtime'), fetch(project)])
    if (!response.ok || !opened.current) throw Error('The interactive scene is unavailable')
    const data: Scene = await response.json()
    if (!opened.current || !canvas.current) throw Error('The interactive scene is closed')
    const context = canvas.current.getContext('2d')
    if (!context) throw Error('The canvas is unavailable')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    source.current = {
      ...data,
      timelines: data.timelines.filter(timeline => timeline.id !== 'timeline_1'),
      stateMachines: data.stateMachines?.map(machine => ({
        ...machine,
        transitions: machine.transitions.map(transition => ({ ...transition, blendMs: reduced ? 0 : transition.blendMs })),
      })),
    }
    const instance = new runtime.ChronoPlayer(source.current, new runtime.CanvasRenderAdapter(context), { loop: false })
    player.current = instance
    instance.tick(0)
    setError(false)
    return instance
  }

  async function choose(action: Action) {
    if (busy.current) return
    busy.current = true
    try {
      const instance = await getPlayer()
      if (action.target) {
        const layer = source.current?.layers.find(item => item.name === action.target)
        if (!layer) throw Error('The interactive control is unavailable')
        instance.fireEvent({ type: 'click', layerId: layer.id })
        instance.tick(0)
        instance.tick(0)
      } else if (action.event) {
        instance.fireEvent({ type: 'customEvent', refId: action.event })
        instance.tick(0)
      }
      const runtimeState = [...instance.smRuntimes.values()][0]?.activeTimelineId
      setActive(runtimeState ?? '')
      cancelAnimationFrame(raf.current)
      const started = performance.now()
      const draw = (now: number) => {
        if (!opened.current) return
        instance.tick(0)
        if (now - started < 350) raf.current = requestAnimationFrame(draw)
      }
      draw(started)
    } catch {
      if (opened.current) setError(true)
    } finally {
      busy.current = false
    }
  }

  return <section className={styles.interactiveDemo} aria-label="Interactive Chorono demo">
    <h2>Try the interactive scene</h2>
    <div className={styles.interactiveCanvas} style={{ aspectRatio: `${width} / ${height}` }}>
      {active === '' && <img src={poster} alt="" width={width} height={height} loading="lazy" />}
      <canvas ref={canvas} width={width} height={height} aria-hidden="true" />
    </div>
    <div className={styles.interactiveControls}>
      {actions[kind].map(action => <button key={action.state} type="button" aria-pressed={active === action.state}
        onPointerEnter={action.hover ? () => { if (player.current && active === 'plant-idle') void choose({ ...action, target: undefined, event: action.hover }) } : undefined}
        onPointerLeave={action.hover && active === action.hover ? () => { void choose({ label: 'Reset', event: 'plant-reset', state: 'plant-idle' }) } : undefined}
        onClick={() => void choose(action)}>{action.label}</button>)}
    </div>
    <p role="status">{error ? 'The demo could not load. Open the downloaded project in Chorono.' : ''}</p>
  </section>
}
