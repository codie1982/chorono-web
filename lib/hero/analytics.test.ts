import { describe, expect, it } from 'vitest'
import { CrewAnalytics, type CrewEvent } from './analytics'

/** Supplies a monotonic clock and detached event list without real timers. */
function harness(placement: 'hero' | 'library' = 'hero') {
  let now = 0
  const events: CrewEvent[] = []
  const metrics = new CrewAnalytics(placement, () => now, event => events.push(event))
  return { metrics, events, at: (ms: number) => { now = ms } }
}

const names = ['animation_engagement_10s', 'animation_engagement_20s', 'animation_engagement_30s']

describe('bounded animation engagement milestones', () => {
  it('emits each exact 10/20/30-second threshold once, then stops polling', () => {
    const h = harness()
    h.metrics.availability(true, true)
    h.metrics.hover(true)
    h.at(9999); expect(h.metrics.checkpoint()).toBe(true)
    expect(h.events).toEqual([])
    h.at(10000); h.metrics.checkpoint()
    expect(h.events.map(event => event.name)).toEqual(names.slice(0, 1))
    h.at(19999); h.metrics.checkpoint()
    expect(h.events).toHaveLength(1)
    h.at(20000); h.metrics.checkpoint()
    h.at(30000); expect(h.metrics.checkpoint()).toBe(false)
    h.at(120000); h.metrics.checkpoint(); h.metrics.dispose(); h.metrics.dispose()
    expect(h.events.map(event => event.name)).toEqual(names)
    expect(h.events.map(event => event.params.interaction_ms)).toEqual([10000, 20000, 30000])
    expect(h.events.map(event => event.params.engagement_seconds)).toEqual([10, 20, 30])
  })

  it('counts engagement cumulatively across leaves without counting passive time', () => {
    const h = harness()
    h.metrics.availability(true, true); h.metrics.hover(true)
    h.at(6000); h.metrics.hover(false)
    h.at(26000); h.metrics.checkpoint()
    expect(h.events).toEqual([])
    h.metrics.hover(true)
    h.at(30000); h.metrics.hover(false)
    expect(h.events[0].params).toMatchObject({interaction_ms: 10000, hover_ms: 10000, visible_ms: 30000})
    h.at(40000); h.metrics.hover(true)
    h.at(50000); h.metrics.checkpoint()
    expect(h.events.map(event => event.name)).toEqual(names.slice(0, 2))
  })

  it('excludes hidden/offscreen gaps and clears stale inputs without resetting milestones', () => {
    const h = harness()
    h.metrics.availability(true, true); h.metrics.hover(true); h.metrics.input('characterFocus', 'fig')
    h.at(10000); h.metrics.availability(false, false)
    h.at(110000); h.metrics.checkpoint(); h.metrics.availability(true, true)
    h.at(120000); h.metrics.checkpoint()
    expect(h.events).toHaveLength(1)
    h.metrics.hover(true)
    h.at(130000); h.metrics.availability(false, false)
    expect(h.events).toHaveLength(2)
    expect(h.events[1].params).toMatchObject({interaction_ms: 20000, hover_ms: 20000, visible_ms: 30000})
  })

  it('counts overlapping canvas, character and CTA inputs once', () => {
    const h = harness()
    h.metrics.availability(true, true); h.metrics.hover(true)
    h.metrics.input('characterPointer', 'pip'); h.metrics.input('characterFocus', 'pip')
    h.metrics.input('ctaFocus', 'install')
    h.at(10000); h.metrics.hover(false); h.metrics.input('characterPointer'); h.metrics.input('characterFocus')
    h.at(20000); h.metrics.input('ctaFocus')
    expect(h.events.map(event => event.params.interaction_ms)).toEqual([10000, 20000])
    expect(h.events[1].params.hover_ms).toBe(10000)
  })

  it('measures paused engagement without claiming playback or unrendered poses', () => {
    const h = harness()
    h.metrics.availability(true, false); h.metrics.hover(true)
    h.metrics.control('celebrate'); h.metrics.rendered('celebrate')
    h.at(10000); h.metrics.checkpoint()
    expect(h.events[0].params).toMatchObject({interaction_ms: 10000, playback_ms: 0, control_celebrate_count: 1})
    expect(h.events[0].params).not.toHaveProperty('motion_celebrate_count')
  })

  it('sends nothing for passive idle loops and summarizes high-frequency pose changes', () => {
    const h = harness()
    h.metrics.availability(true, true)
    for (let time = 0; time <= 60000; time += 100) {
      h.at(time); h.metrics.rendered('idle'); h.metrics.checkpoint()
    }
    expect(h.events).toEqual([])
    h.metrics.hover(true)
    for (let time = 60100; time <= 120000; time += 100) {
      h.at(time); h.metrics.rendered(time % 200 ? 'shy-pip' : 'idle')
      h.metrics.control('highfive'); h.metrics.checkpoint()
    }
    expect(h.events.map(event => event.name)).toEqual(names)
    expect(h.events[0].params.motion_idle_count).toBeGreaterThan(1)
    expect(h.events[0].params.motion_shy_pip_count).toBeGreaterThan(1)
    expect(h.events[0].params.control_highfive_count).toBeGreaterThan(1)
  })

  it('splits a delayed checkpoint into exact snapshots without dropping thresholds', () => {
    const h = harness()
    h.metrics.availability(true, true); h.metrics.hover(true)
    h.at(35000); expect(h.metrics.checkpoint()).toBe(false)
    expect(h.events.map(event => event.name)).toEqual(names)
    expect(h.events.map(event => event.params.hover_ms)).toEqual([10000, 20000, 30000])
    expect(h.events.map(event => event.params.visible_ms)).toEqual([10000, 20000, 30000])
  })

  it('does not send sub-10-second exits, partial reports or duplicate disposal events', () => {
    const h = harness()
    h.metrics.availability(true, true); h.metrics.hover(true)
    h.at(6000); h.metrics.availability(false, false); h.metrics.dispose()
    h.at(60000); h.metrics.dispose(); h.metrics.hover(true); h.metrics.input('characterFocus', 'dot')
    h.metrics.rendered('sit'); h.metrics.control('pause')
    expect(h.metrics.checkpoint()).toBe(false)
    expect(h.events).toEqual([])
    const reached = harness()
    reached.metrics.availability(true, true); reached.metrics.hover(true)
    reached.at(10000); reached.metrics.dispose(); reached.metrics.dispose()
    expect(reached.events.map(event => event.name)).toEqual(names.slice(0, 1))
  })

  it('keeps motion/control snapshots fixed-cardinality and limited to actual pose entries', () => {
    const h = harness('library')
    h.metrics.availability(true, true); h.metrics.hover(true)
    h.metrics.rendered('idle'); h.metrics.rendered('idle'); h.metrics.rendered('shy-pip'); h.metrics.rendered('shy-pip')
    h.metrics.control('pause'); h.metrics.control('play')
    h.at(10000); h.metrics.checkpoint()
    expect(h.events).toHaveLength(1)
    expect(h.events[0].params).toMatchObject({animation_id: 'motion-crew', placement: 'library', motion_idle_count: 1, motion_shy_pip_count: 1, control_pause_count: 1, control_play_count: 1})
    expect(h.events[0].params).not.toHaveProperty('target')
  })

  it('isolates sink failures and never retries consumed milestones', () => {
    let now = 0, attempts = 0
    const metrics = new CrewAnalytics('hero', () => now, () => { attempts++; throw Error('blocked') })
    expect(() => {
      metrics.availability(true, true); metrics.hover(true)
      now = 35000; expect(metrics.checkpoint()).toBe(false)
      metrics.checkpoint(); metrics.dispose()
    }).not.toThrow()
    expect(attempts).toBe(3)
  })
})
