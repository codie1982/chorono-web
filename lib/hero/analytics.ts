import type { CrewPose } from './interaction'

export type CrewEvent = { name: string; params: Record<string, string | number> }
type Input = { target: string; input: 'pointer' | 'focus'; ms: number }
const idleBeats = [
  { time: 600, character: 'pip', motion: 'wave' },
  { time: 2400, character: 'milo', motion: 'stretch' },
  { time: 4300, character: 'fig', motion: 'jelly-breath' },
  { time: 6000, character: 'dot', motion: 'scan' },
] as const

/** Measures one mounted scene using a supplied monotonic millisecond clock and event sink.
 * Owns mutable counters, never DOM/player objects. Visible time requires a loaded foreground
 * scene; playback additionally requires the player to run. Interaction is the UNION of active
 * pointer/focus channels, so overlapping inputs never double-count overall engagement.
 * Flushes emit additive deltas and reset counters; suspension/unmount cannot resend them.
 * Per-target pointer/focus durations are separate dimensions and must not be summed as users.
 * No storage, visitor identifiers, coordinates, URLs or per-frame event transport is used.
 */
export class CrewAnalytics {
  private at: number
  private visible = false
  private playing = false
  private hovered = false
  private inputs = new Map<string, Input>()
  private totals = { visible_ms: 0, playback_ms: 0, hover_ms: 0, interaction_ms: 0 }
  private pose: CrewPose | null = null
  private poseMs = 0
  private previousElapsed = -1
  private disposed = false

  /** Clock must be monotonic; sink failures are isolated from animation/input handling. */
  constructor(private placement: 'hero' | 'library', private clock: () => number, private sink: (event: CrewEvent) => void) {
    this.at = clock()
  }

  /** Settles elapsed time before changing eligibility. Hidden/offscreen inputs are released. */
  availability(visible: boolean, playing: boolean, reason = 'visibility'): void {
    if (this.disposed) return
    this.settle()
    const suspended = this.visible && !visible || this.playing && !playing
    this.visible = visible; this.playing = visible && playing
    if (suspended) this.flush(reason)
    if (!visible) { this.inputs.clear(); this.hovered = false }
  }

  /** Tracks time over the entire canvas, including spaces between the characters. */
  hover(value: boolean): void { if (!this.disposed) { this.settle(); this.hovered = value } }

  /** Replaces/releases one independent input channel, closing its previous duration first. */
  input(channel: string, target?: string): void {
    if (this.disposed) return
    this.settle()
    if (this.inputs.get(channel)?.target === target) return
    this.closeInput(channel, 'leave')
    if (target) this.inputs.set(channel, { target, input: channel.endsWith('Focus') ? 'focus' : 'pointer', ms: 0 })
  }

  /** Called AFTER native tick. Counts only motions actually rendered, not requests while paused.
   * elapsedMs is native pose-relative playback time, including completed 8000 ms idle loops.
   * Signature events are emitted once when their authored beat is crossed, not per frame.
   */
  rendered(pose: CrewPose, elapsedMs: number, cause: string): void {
    if (this.disposed || !this.playing) return
    if (pose !== this.pose) {
      this.settle(); this.closePose('transition')
      this.pose = pose; this.previousElapsed = -1
      this.emit('animation_motion', { motion: pose, cause })
    }
    if (pose === 'idle') {
      const loop = Math.floor(elapsedMs / 8000)
      for (const beat of idleBeats) {
        const time = loop * 8000 + beat.time
        if (time > this.previousElapsed && time <= elapsedMs) this.emit('animation_idle_action', { character: beat.character, motion: beat.motion })
      }
    }
    this.previousElapsed = elapsedMs
  }

  /** Records explicit playback/reaction controls; motion events independently prove rendering. */
  control(action: string): void { if (!this.disposed) this.emit('animation_control', { action }) }

  /** Sends non-overlapping deltas, typically every 15 s and on suspension/pagehide/unmount. */
  flush(reason: string): void {
    if (this.disposed) return
    this.settle()
    if (Object.values(this.totals).some(ms => ms > 0)) this.emit('animation_engagement', { ...this.totals, reason })
    this.totals = { visible_ms: 0, playback_ms: 0, hover_ms: 0, interaction_ms: 0 }
    for (const key of this.inputs.keys()) this.closeInput(key, reason, false)
    this.closePose(reason)
  }

  /** Final flush is idempotent; subsequent callbacks are ignored. */
  dispose(): void { if (!this.disposed) { this.flush('unmount'); this.disposed = true } }

  /** Accounts exact wall milliseconds once before each semantic boundary; never called by a timer per frame. */
  private settle(): void {
    const now = this.clock(), dt = Math.max(0, now - this.at); this.at = now
    if (!this.visible) return
    this.totals.visible_ms += dt
    if (this.playing) { this.totals.playback_ms += dt; if (this.pose) this.poseMs += dt }
    if (this.hovered) this.totals.hover_ms += dt
    if (this.hovered || this.inputs.size) this.totals.interaction_ms += dt
    for (const input of this.inputs.values()) input.ms += dt
  }

  /** Emits and optionally releases one channel without counting it twice at a checkpoint. */
  private closeInput(channel: string, reason: string, remove = true): void {
    const input = this.inputs.get(channel)
    if (input?.ms) this.emit('animation_target_time', { target: input.target, input: input.input, duration_ms: input.ms, reason })
    if (remove) this.inputs.delete(channel)
    else if (input) input.ms = 0
  }

  /** Motion residence counts only active playback, excluding paused/hidden intervals. */
  private closePose(reason: string): void {
    if (this.pose && this.poseMs > 0) this.emit('animation_motion_time', { motion: this.pose, duration_ms: this.poseMs, reason })
    this.poseMs = 0
  }

  /** Fixed low-cardinality context; milliseconds are rounded at transport only. */
  private emit(name: string, values: Record<string, string | number>): void {
    const params: CrewEvent['params'] = { animation_id: 'motion-crew', placement: this.placement }
    for (const [key, value] of Object.entries(values)) params[key] = typeof value === 'number' ? Math.round(value) : value
    try { this.sink({ name, params }) } catch { /* Optional telemetry never interrupts animation. */ }
  }
}
