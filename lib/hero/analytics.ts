import type { CrewPose } from './interaction'

export type CrewEvent = { name: string; params: Record<string, string | number> }
type CrewControl = 'play' | 'pause' | 'celebrate' | 'highfive'
const milestonesMs = [10000, 20000, 30000] as const

/**
 * Measure one mounted scene with a monotonic millisecond clock and optional sink.
 * Owns cumulative counters, never DOM/player resources, storage or visitor IDs.
 * Engagement is the union of canvas hover and character/CTA pointer/focus while
 * the loaded scene is visible in a foreground document. Paused hover still counts;
 * hidden/offscreen intervals do not. Playback additionally requires a running player.
 *
 * Each 10/20/30-second engagement threshold emits once, at most three events per
 * instance. Rendered pose entries and explicit controls are cumulative counters in
 * those snapshots, never separate events. Leaving, pausing or disposal emits only
 * thresholds actually reached, never a partial report. All work ends after 30 s.
 * A new mount starts a new budget; suspension/BFCache restoration does not reset it.
 */
export class CrewAnalytics {
  private at: number
  private visible = false
  private playing = false
  private hovered = false
  private inputs = new Map<string, string>()
  private totals = { visible_ms: 0, playback_ms: 0, hover_ms: 0, interaction_ms: 0 }
  private pose: CrewPose | null = null
  private motions: Partial<Record<CrewPose, number>> = {}
  private controls: Partial<Record<CrewControl, number>> = {}
  private nextMilestone = 0
  private disposed = false

  /** The supplied clock is monotonic milliseconds; sink failures never interrupt input. */
  constructor(private placement: 'hero' | 'library', private clock: () => number, private sink: (event: CrewEvent) => void) {
    this.at = clock()
  }

  /** Settles the preceding interval, then changes eligibility and releases hidden inputs. */
  availability(visible: boolean, playing: boolean): void {
    if (this.finished) return
    this.settle()
    this.visible = visible
    this.playing = visible && playing
    if (!visible) { this.inputs.clear(); this.hovered = false }
  }

  /** Opens/closes whole-canvas pointer dwell, including spaces between characters. */
  hover(value: boolean): void {
    if (this.finished) return
    this.settle()
    this.hovered = value
  }

  /** Updates an independent pointer/focus channel without emitting target/leave events. */
  input(channel: string, target?: string): void {
    if (this.finished) return
    this.settle()
    if (target) this.inputs.set(channel, target)
    else this.inputs.delete(channel)
  }

  /** Called after native tick; counts actual pose entries, never frames or idle-loop beats. */
  rendered(pose: CrewPose): void {
    if (this.finished || !this.playing || pose === this.pose) return
    this.settle()
    if (this.finished) return
    this.pose = pose
    this.motions[pose] = (this.motions[pose] ?? 0) + 1
  }

  /** Accumulates explicit requests in the next milestone, without a separate GA4 event. */
  control(action: CrewControl): void {
    if (this.finished) return
    this.settle()
    if (!this.finished) this.controls[action] = (this.controls[action] ?? 0) + 1
  }

  /** Checks due milestones; false tells the owner to stop its polling timer. */
  checkpoint(): boolean {
    if (!this.finished) this.settle()
    return !this.finished
  }

  /** Final accounting is idempotent and sends no partial or duplicate snapshot. */
  dispose(): void {
    if (this.disposed) return
    if (!this.finished) this.settle()
    this.disposed = true
    this.inputs.clear()
  }

  /** A completed budget or disposed owner cannot emit or accumulate more work. */
  private get finished(): boolean { return this.disposed || this.nextMilestone === milestonesMs.length }

  /**
   * Account wall time once, splitting a delayed callback at exact engagement
   * thresholds. Overlapping inputs count once; eligibility changes settle first.
   * A monotonic clock is required; negative deltas are defensively ignored.
   */
  private settle(): void {
    const now = this.clock()
    let remaining = Math.max(0, now - this.at)
    this.at = now
    if (!this.visible) return
    const interacting = this.hovered || this.inputs.size > 0
    while (remaining > 0 && !this.finished) {
      const threshold = milestonesMs[this.nextMilestone]
      const step = interacting ? Math.min(remaining, threshold - this.totals.interaction_ms) : remaining
      this.totals.visible_ms += step
      if (this.playing) this.totals.playback_ms += step
      if (this.hovered) this.totals.hover_ms += step
      if (interacting) this.totals.interaction_ms += step
      remaining -= step
      if (this.totals.interaction_ms === threshold) {
        this.nextMilestone++
        this.emit(threshold / 1000)
      }
    }
  }

  /** Sends a fixed-name cumulative snapshot; the budget is consumed before optional transport. */
  private emit(seconds: number): void {
    const params: CrewEvent['params'] = {
      animation_id: 'motion-crew', placement: this.placement,
      engagement_seconds: seconds, ...this.totals,
    }
    for (const [pose, count] of Object.entries(this.motions)) params[`motion_${pose.replace(/-/g, '_')}_count`] = count!
    for (const [action, count] of Object.entries(this.controls)) params[`control_${action}_count`] = count!
    for (const [key, value] of Object.entries(params)) if (typeof value === 'number') params[key] = Math.round(value)
    try { this.sink({ name: `animation_engagement_${seconds}s`, params }) } catch { /* Optional telemetry never interrupts animation. */ }
  }
}
