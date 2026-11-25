'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { ChronoPlayer } from '@chorono/runtime'
import { makeHeroPanelRenderer } from './heroPanelRenderer'
import styles from './skill-catalog.module.css'

type Scene = Parameters<ChronoPlayer['load']>[0]

const panels = [
  { name: 'Overview', message: 'Four hero panels' },
  { name: 'Render', message: 'Set the light. Make the frame.', href: '/animations/chorono-render', action: 'Explore Chorono Render', actionX: 124 },
  { name: 'Motion', message: 'Bring ideas into motion.', href: '/motion-graphics-software', action: 'Explore motion graphics', actionX: 220 },
  { name: 'Model', message: 'Give shape to your ideas.', href: '/3d-animation-software', action: 'Explore 3D modeling', actionX: 316 },
  { name: 'Game', message: 'Build worlds that respond.', href: '/game-engine', action: 'Explore the Game Engine', actionX: 412 },
] as const
type Panel = typeof panels[number]

export function HeroPanelDemo({ poster, posterAlt }: { poster: string; posterAlt: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const player = useRef<ChronoPlayer | null>(null)
  const transition = useRef(0)
  const togglePlayback = useRef(() => {})
  const [panel, setPanel] = useState<Panel>(panels[0])
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const surface = canvas.current
    const context = surface?.getContext('2d')
    if (!surface || !context) return
    const abort = new AbortController()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let userPaused = reduced.matches
    let visible = false
    setPaused(userPaused)

    function syncPlayback() {
      const instance = player.current
      if (!instance) return
      if (visible && !document.hidden && !userPaused) instance.play()
      else instance.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    })
    observer.observe(surface)
    document.addEventListener('visibilitychange', syncPlayback)
    togglePlayback.current = () => {
      userPaused = !userPaused
      setPaused(userPaused)
      syncPlayback()
    }

    async function load() {
      const [sdk, response] = await Promise.all([
        import('@chorono/runtime'),
        fetch('/agent-skill-examples/interactive-hero-panels/hero-browser.json', { signal: abort.signal }),
      ])
      if (!response.ok) throw Error('Hero scene unavailable')
      const scene: Scene = await response.json()
      const assets = new Map(await Promise.all(scene.assets.map(async asset => {
        const image = new Image()
        image.src = asset.url
        await image.decode()
        return [asset.id, image] as const
      })))
      if (abort.signal.aborted || !context) return
      if (reduced.matches) for (const machine of scene.stateMachines ?? []) {
        for (const change of machine.transitions) change.blendMs = 0
      }
      const instance = new sdk.ChronoPlayer(scene, makeHeroPanelRenderer(context, scene, sdk.CanvasRenderAdapter), { assets, loop: true })
      instance.tick(0)
      player.current = instance
      setReady(true)
      syncPlayback()
    }

    void load().catch(() => { if (!abort.signal.aborted) setFailed(true) })
    return () => {
      abort.abort()
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      cancelAnimationFrame(transition.current)
      player.current?.destroy()
      player.current = null
    }
  }, [])

  function select(next: Panel) {
    const instance = player.current
    if (!instance) return
    setPanel(next)
    cancelAnimationFrame(transition.current)
    instance.dispatch(`focus:${next.name}`)
    if (instance.isPlaying) return
    const elapsed = instance.currentTimeMs
    const finish = performance.now() + 600
    const draw = (now: number) => {
      if (instance.isPlaying) return
      instance.tick(elapsed)
      if (now < finish && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        transition.current = requestAnimationFrame(draw)
      }
    }
    draw(performance.now())
  }

  return <section className={styles.interactiveDemo} aria-label="Interactive hero panels">
    <h2>Choose a hero panel</h2>
    <div className={styles.interactiveCanvas} style={{ aspectRatio: '1440 / 520' }}>
      {!ready && <img src={poster} alt={posterAlt} width={1440} height={520} />}
      <canvas ref={canvas} width={1440} height={520} aria-hidden="true" />
      {'href' in panel && <Link className={styles.heroPanelHotspot} href={panel.href} aria-label={panel.action}
        style={{ left: `${panel.actionX / 14.4}%` }} tabIndex={-1} />}
    </div>
    <div className={styles.interactiveControls} role="group" aria-label="Hero panels">
      {panels.map(item => <button key={item.name} type="button" disabled={!ready} aria-pressed={panel === item}
        onClick={() => select(item)}>{item.name}</button>)}
      <button type="button" disabled={!ready} onClick={() => togglePlayback.current()}>{paused ? 'Play artwork' : 'Pause artwork'}</button>
    </div>
    <p role="status">{failed ? 'The interactive scene could not load. You can watch the preview below.' : ready ? panel.message : 'Loading the interactive scene…'}</p>
    {'href' in panel && <Link className={styles.heroPanelLink} href={panel.href}>{panel.action}</Link>}
  </section>
}
