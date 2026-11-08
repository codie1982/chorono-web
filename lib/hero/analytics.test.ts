import { describe, expect, it } from 'vitest'
import { CrewAnalytics, type CrewEvent } from './analytics'

/** Supplies a deterministic clock so wall-time boundaries are checked without real timers. */
function harness() {
  let now = 0
  const events: CrewEvent[] = []
  const metrics = new CrewAnalytics('hero', () => now, event => events.push(event))
  return { metrics, events, at: (ms: number) => { now = ms }, named: (name: string) => events.filter(e => e.name === name) }
}

describe('animation engagement accounting', () => {
  it('keeps visibility, playback, canvas hover and union interaction distinct', () => {
    const h = harness(); h.metrics.availability(true, true); h.metrics.rendered('idle', 0, 'automatic')
    h.at(100); h.metrics.hover(true); h.metrics.input('characterPointer', 'pip')
    h.at(200); h.metrics.input('characterFocus', 'pip')
    h.at(400); h.metrics.input('characterPointer')
    h.at(600); h.metrics.input('characterFocus'); h.metrics.hover(false)
    h.at(1000); h.metrics.flush('checkpoint')
    expect(h.named('animation_engagement')[0].params).toMatchObject({visible_ms:1000,playback_ms:1000,hover_ms:500,interaction_ms:500})
    expect(h.named('animation_target_time').map(e=>[e.params.input,e.params.duration_ms])).toEqual([['pointer',300],['focus',400]])
    expect(h.named('animation_motion_time')[0].params.duration_ms).toBe(1000)
  })
  it('excludes hidden gaps and clears stale pointer input', () => {
    const h=harness();h.metrics.availability(true,true);h.metrics.hover(true);h.metrics.input('characterPointer','fig')
    h.at(500);h.metrics.availability(false,false,'hidden')
    h.at(10500);h.metrics.flush('checkpoint');h.metrics.availability(true,true)
    h.at(11000);h.metrics.dispose()
    expect(h.named('animation_engagement').map(e=>e.params.visible_ms)).toEqual([500,500])
    expect(h.named('animation_engagement').map(e=>e.params.interaction_ms)).toEqual([500,0])
    expect(h.named('animation_target_time')).toHaveLength(1)
  })
  it('counts paused hover separately from playback and never reports unrendered poses', () => {
    const h=harness();h.metrics.availability(true,false);h.metrics.hover(true)
    h.metrics.rendered('celebrate',0,'click')
    h.at(800);h.metrics.flush('pause')
    expect(h.named('animation_engagement')[0].params).toMatchObject({hover_ms:800,playback_ms:0,interaction_ms:800})
    expect(h.named('animation_motion')).toHaveLength(0)
  })
  it('emits additive heartbeat/leave/final deltas exactly once', () => {
    const h=harness();h.metrics.availability(true,true);h.metrics.input('characterPointer','dot')
    h.at(15000);h.metrics.flush('checkpoint')
    h.at(15500);h.metrics.input('characterPointer')
    h.at(16000);h.metrics.dispose();h.metrics.dispose();h.metrics.flush('pagehide')
    expect(h.named('animation_target_time').map(e=>e.params.duration_ms)).toEqual([15000,500])
    expect(h.named('animation_engagement').reduce((n,e)=>n+Number(e.params.visible_ms),0)).toBe(16000)
  })
  it('records rendered pose changes and all four idle signatures once per loop', () => {
    const h=harness();h.metrics.availability(true,true)
    for(const t of [0,600,600,2400,4300,6000,7999,8000,8600])h.metrics.rendered('idle',t,'automatic')
    expect(h.named('animation_idle_action').map(e=>e.params.motion)).toEqual(['wave','stretch','jelly-breath','scan','wave'])
    h.metrics.rendered('highfive',0,'click');h.metrics.rendered('highfive',100,'click')
    expect(h.named('animation_motion').map(e=>[e.params.motion,e.params.cause])).toEqual([['idle','automatic'],['highfive','click']])
  })
  it('splits active motion residence around pauses and changes', () => {
    const h=harness();h.metrics.availability(true,true);h.metrics.rendered('idle',0,'automatic')
    h.at(1000);h.metrics.availability(true,false,'pause')
    h.at(9000);h.metrics.availability(true,true)
    h.at(9500);h.metrics.rendered('shy-pip',0,'pointer')
    h.at(10000);h.metrics.dispose()
    expect(h.named('animation_motion_time').map(e=>[e.params.motion,e.params.duration_ms])).toEqual([['idle',1000],['idle',500],['shy-pip',500]])
  })
  it('isolates a failed analytics sink and has no work after disposal', () => {
    const metrics=new CrewAnalytics('library',()=>100,()=>{throw Error('blocked')})
    expect(()=>{metrics.availability(true,true);metrics.rendered('idle',0,'automatic');metrics.control('pause');metrics.dispose();metrics.rendered('sit',0,'scroll')}).not.toThrow()
  })
})
