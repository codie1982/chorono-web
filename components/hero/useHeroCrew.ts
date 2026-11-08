'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { ChronoPlayer } from '@chorono/runtime'
import { CrewAnalytics } from '@/lib/hero/analytics'
import { trackAnimationEvent } from '@/lib/analytics'
import { NativeSplineFrameAdapter } from '@/lib/hero/NativeSplineFrameAdapter'
import { FEEDBACK_MS, HeroInteractionModel, shouldDelayNavigation, type CrewPose, type IntentSource } from '@/lib/hero/interaction'

type Scene = Parameters<ChronoPlayer['load']>[0]

/** Owns one native player, one 30 fps render loop and website input subscriptions.
 * The saved Chorono scene owns geometry, poses, blending and pupil parameter wires.
 * Loading is cancelled on unmount. Offscreen/hidden/user-paused playback stops requesting frames.
 * autoPlay:false starts a library preview paused; followScroll:false gives that preview independent poses.
 */
export function useHeroCrew({ autoPlay = true, followScroll = true, placement = 'hero' }: { autoPlay?: boolean; followScroll?: boolean; placement?: 'hero' | 'library' } = {}) {
  const router = useRouter()
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const model = useRef(new HeroInteractionModel())
  const runtime = useRef<ChronoPlayer | null>(null)
  const analytics = useRef<CrewAnalytics | null>(null)
  const active = useRef(false)
  const navigateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const input = useRef<(source: IntentSource, pose?: CrewPose) => void>(() => {})
  const wake = useRef<() => void>(() => {})
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [paused, setPaused] = useState(!autoPlay)
  const [pose, setPose] = useState<CrewPose>('idle')

  useEffect(() => {
    const root = section.current, surface = stage.current, target = canvas.current
    if (!root || !surface || !target) return
    const metrics = new CrewAnalytics(placement, () => performance.now(), trackAnimationEvent)
    analytics.current = metrics
    const abort = new AbortController()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false, inView = false, pageActive = true, userPaused = reduced.matches || !autoPlay
    let raf = 0, last = 0, elapsed = 0, renderedPose: CrewPose = 'idle'
    let cause = 'automatic'
    let bounds = surface.getBoundingClientRect()
    const pointer = { x: .5, y: .5 }, gaze = { x: .5, y: .5 }
    setPaused(userPaused)

    /** Measures only on layout/scroll changes, never inside the animation loop. */
    function measure() { if (stage.current) bounds = stage.current.getBoundingClientRect() }
    /** Applies visibility/playback eligibility before starting or stopping the owned RAF. */
    function schedule() {
      const visible = !disposed && !!runtime.current && inView && !document.hidden && pageActive
      active.current = visible && !userPaused
      metrics.availability(visible, active.current, document.hidden ? 'hidden' : !inView ? 'offscreen' : userPaused ? 'pause' : 'pagehide')
      if (active.current && !raf) raf = requestAnimationFrame(draw)
      if (!active.current) { cancelAnimationFrame(raf); raf = 0; last = 0 }
    }
    /** Native tick receives time since entering the current pose, in milliseconds. */
    function draw(now: number) {
      raf = 0
      if (!active.current || !runtime.current) return
      if (last && now - last < 1000 / 30) { raf = requestAnimationFrame(draw); return }
      const delta = last ? Math.min(now - last, 80) : 0
      last = now
      const next = model.current.resolve(now)
      if (next !== renderedPose) {
        runtime.current.dispatch(next)
        renderedPose = next; elapsed = 0; setPose(next)
      } else elapsed += delta
      const smoothing = 1 - Math.exp(-delta / 90)
      gaze.x += (pointer.x - gaze.x) * smoothing
      gaze.y += (pointer.y - gaze.y) * smoothing
      runtime.current.setParam('pointerX', gaze.x)
      runtime.current.setParam('pointerY', gaze.y)
      runtime.current.tick(elapsed)
      metrics.rendered(next, elapsed, next === 'celebrate' || next === 'highfive' ? 'click' : next === 'idle' ? 'automatic' : cause)
      raf = requestAnimationFrame(draw)
    }
    function move(event: PointerEvent) {
      if (event.pointerType === 'touch') return
      pointer.x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
      pointer.y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))
    }
    function leave() { pointer.x = .5; pointer.y = .5 }
    /** Updates the scroll pose and cached bounds; no frame-level layout measurements. */
    function scroll() { if (followScroll) { model.current.setScroll(window.scrollY); cause = 'scroll' }; measure() }
    /** Opens canvas pointer dwell, including gaps between characters. */
    function enter() { metrics.hover(true) }
    /** Closes canvas dwell without clearing a separately focused character. */
    function exit() { metrics.hover(false) }
    /** Suspends and flushes before navigation/BFCache; unmount cannot duplicate these deltas. */
    function pagehide() { pageActive = false; schedule(); metrics.flush('pagehide') }
    /** Restores eligibility after BFCache without replaying old duration counters. */
    function pageshow() { pageActive = true; schedule() }
    function preference() {
      userPaused = reduced.matches || !autoPlay; setPaused(userPaused); schedule()
    }
    const observer = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .05; schedule()
    }, { threshold: .05 })
    observer.observe(surface)
    const resize = new ResizeObserver(measure); resize.observe(surface)
    surface.addEventListener('pointerenter', enter)
    surface.addEventListener('pointerleave', exit)
    window.addEventListener('pagehide', pagehide)
    window.addEventListener('pageshow', pageshow)
    const heartbeat = setInterval(() => metrics.flush('checkpoint'), 15000)
    root.addEventListener('pointermove', move, { passive: true })
    root.addEventListener('pointerleave', leave)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    document.addEventListener('visibilitychange', schedule)
    reduced.addEventListener('change', preference)
    scroll()
    input.current = (source, next) => {
      model.current.setIntent(source, next); cause = source.endsWith('Focus') ? 'focus' : 'pointer'
      const target = next?.startsWith('shy-') ? next.slice(4) : next === 'excited' ? 'install' : next === 'curious' ? 'skills' : next
      metrics.input(source, target)
    }
    wake.current = () => { userPaused = !userPaused; metrics.control(userPaused ? 'pause' : 'play'); setPaused(userPaused); schedule() }

    Promise.all([import('@chorono/runtime'), fetch('/hero/motion-crew.chorono.json', { signal: abort.signal })])
      .then(async ([sdk, response]) => {
        if (!response.ok) throw new Error('Hero scene unavailable')
        const scene: Scene = await response.json()
        if (disposed) return
        const context = target.getContext('2d')
        if (!context) throw new Error('Canvas unavailable')
        // Portable scene preserves state machines and wires omitted by the lean exporter.
        const renderer = new NativeSplineFrameAdapter(new sdk.CanvasRenderAdapter(context))
        runtime.current = new sdk.ChronoPlayer(scene, renderer, { loop: false })
        runtime.current.tick(0); setReady(true); schedule()
      }).catch(() => { if (!disposed) setFailed(true) })

    return () => {
      metrics.dispose(); analytics.current = null; clearInterval(heartbeat)
      surface.removeEventListener('pointerenter', enter); surface.removeEventListener('pointerleave', exit)
      window.removeEventListener('pagehide', pagehide); window.removeEventListener('pageshow', pageshow)
      disposed = true; active.current = false; abort.abort(); cancelAnimationFrame(raf)
      observer.disconnect(); resize.disconnect()
      root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave)
      window.removeEventListener('scroll', scroll); window.removeEventListener('resize', measure)
      document.removeEventListener('visibilitychange', schedule); reduced.removeEventListener('change', preference)
      runtime.current?.destroy(); runtime.current = null
      if (navigateTimer.current) clearTimeout(navigateTimer.current)
      input.current = () => {}; wake.current = () => {}
    }
  }, [autoPlay, followScroll, placement])

  /** Plays an explicit preview reaction without starting navigation; paused playback stays paused. */
  function trigger(action: 'celebrate' | 'highfive') {
    analytics.current?.control(action)
    if (active.current) model.current.trigger(action, performance.now())
  }

  /** Leaves the href functional without JavaScript or an available/moving player.
   * Only ordinary same-tab activation waits for a brief native celebration; the latest click wins.
   */
  function navigate(event: MouseEvent<HTMLAnchorElement>, action: 'celebrate' | 'highfive') {
    if (navigateTimer.current) { clearTimeout(navigateTimer.current); navigateTimer.current = null }
    if (!shouldDelayNavigation(event, !!runtime.current, active.current)) return
    event.preventDefault()
    const href = event.currentTarget.getAttribute('href')
    if (!href) return
    trigger(action)
    navigateTimer.current = setTimeout(() => { navigateTimer.current = null; router.push(href) }, FEEDBACK_MS)
  }

  /** Returns independent hover/focus handlers for either existing hero CTA. */
  function cta(kind: 'install' | 'skills') {
    const intent = kind === 'install' ? 'excited' : 'curious'
    return {
      onPointerEnter: () => input.current('ctaPointer', intent),
      onPointerLeave: () => input.current('ctaPointer'),
      onFocus: () => input.current('ctaFocus', intent),
      onBlur: () => input.current('ctaFocus'),
    }
  }
  return { section, stage, canvas, ready, failed, paused, pose, cta, navigate, trigger,
    setIntent: (source: IntentSource, next?: CrewPose) => input.current(source, next),
    toggle: () => wake.current() }
}

export type HeroCrew = ReturnType<typeof useHeroCrew>
