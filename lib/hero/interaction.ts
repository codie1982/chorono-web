export type Character = 'pip' | 'milo' | 'fig' | 'dot'
export type CrewPose = 'idle' | `shy-${Character}` | 'excited' | 'curious' | 'celebrate' | 'highfive' | 'sit'
export type IntentSource = 'characterPointer' | 'characterFocus' | 'ctaPointer' | 'ctaFocus'
export const FEEDBACK_MS = 680
const INPUT_SOURCES: readonly IntentSource[] = ['characterPointer', 'characterFocus', 'ctaPointer', 'ctaFocus']

/** Arbitrates website inputs without owning DOM, rendering or navigation.
 * Inputs are independent: leaving a hover never erases keyboard focus. A one-shot takes
 * precedence. Scroll holds a sitting pose until a fresh hover/focus arrives; releasing that
 * input returns to sitting. Times are monotonic milliseconds.
 */
export class HeroInteractionModel {
  private intents: Partial<Record<IntentSource, { pose: CrewPose; sequence: number }>> = {}
  private sequence = 0
  private sitting = false
  private interactionAfterScroll = false
  private oneShot: { pose: CrewPose; until: number } | null = null

  /** Replaces one input channel; undefined releases only that channel. */
  setIntent(source: IntentSource, pose?: CrewPose): void {
    if (pose === undefined) delete this.intents[source]
    else this.intents[source] = { pose, sequence: ++this.sequence }
    if (pose !== undefined) this.interactionAfterScroll = true
  }

  /** Hysteresis prevents tiny scroll fluctuations from toggling the sitting pose. */
  setScroll(y: number): void {
    if (y > 40) this.sitting = true
    else if (y < 12) this.sitting = false
    this.interactionAfterScroll = false
  }

  /** Starts a native one-shot, replacing any previous one. */
  trigger(pose: 'celebrate' | 'highfive', nowMs: number): void {
    this.oneShot = { pose, until: nowMs + (pose === 'celebrate' ? 1200 : 1000) }
  }

  /** Resolves the latest intent; expired feedback returns to the current input, not a stale pose. */
  resolve(nowMs: number): CrewPose {
    if (this.oneShot && nowMs < this.oneShot.until) return this.oneShot.pose
    this.oneShot = null
    // Browser focus can scroll a control into view after its focus/click event.
    // Preserve that explicit input instead of immediately replacing it with sitting.
    if (this.sitting && !this.interactionAfterScroll) return this.newest(true) ?? 'sit'
    return this.newest() ?? (this.sitting ? 'sit' : 'idle')
  }

  /** Chooses the latest active input, so keyboard focus can replace a stale pointer hover and vice versa. */
  private newest(focusOnly = false): CrewPose | undefined {
    let selected: CrewPose | undefined, sequence = -1
    for (const source of INPUT_SOURCES) {
      if (focusOnly && !source.endsWith('Focus')) continue
      const input = this.intents[source]
      if (input && input.sequence > sequence) { selected = input.pose; sequence = input.sequence }
    }
    return selected
  }
}

/** Existing same-tab CTA anchors preserve modified clicks and non-primary buttons. */
export function shouldDelayNavigation(event: {
  button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean
}, ready: boolean, moving: boolean): boolean {
  return ready && moving && event.button === 0
    && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}
