/** Explicit homepage interactions. None confirms a GitHub star or installation. */
export const events = {
  githubStar: 'github_star_click',
  editorSetup: 'editor_setup_click',
  agentSkills: 'agent_skills_click',
  androidSdk: 'android_sdk_click',
  codeCopy: 'code_copy',
} as const

/**
 * Sends one event to the existing Google tag. Does nothing during SSR or when
 * analytics is unavailable. Transport failure must never block the user action.
 * GA supplies timestamps; no visitor identifiers or code contents are included.
 */
function trackEvent(eventName: string, params: Record<string, string | number>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', eventName, params)
  } catch {
    // Optional analytics must not turn a successful copy into a UI failure.
  }
}

const recentInteractions = new Map<string, number>()
const interactionCooldownMs = 2000

/**
 * Limit rapid duplicate CTA/copy telemetry without delaying the actual action.
 * Keys contain only internal event/placement/snippet labels. Memory is bounded
 * to 64 entries per module lifetime; no storage, queue or retry is introduced.
 * Different actions/placements remain independent and a later repeat is allowed.
 */
function trackInteraction(eventName: string, params: Record<string, string | number>, context: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const key = JSON.stringify([eventName, context])
  const now = Date.now()
  const previous = recentInteractions.get(key)
  if (previous !== undefined && now >= previous && now - previous < interactionCooldownMs) return
  if (!recentInteractions.has(key) && recentInteractions.size >= 64) {
    recentInteractions.delete(recentInteractions.keys().next().value!)
  }
  recentInteractions.set(key, now)
  trackEvent(eventName, params)
}

/** Records activation at the named placement, suppressing identical repeats within two seconds. */
export function trackAction(action: Exclude<keyof typeof events, 'codeCopy'>, location: string) {
  trackInteraction(events[action], { cta_location: location }, location)
}

/** Records successful clipboard writes, at most once per snippet every two seconds. */
export function trackCodeCopy(snippetName: string) {
  trackInteraction(events.codeCopy, { snippet_name: snippetName }, snippetName)
}

/** Sends bounded animation milestones to the existing tag and a local integration event.
 * No queue/storage is created when the Google tag is absent. DOM listeners may inspect
 * the same payload via chorono:animation. Transport/listener failures do not block input.
 */
export function trackAnimationEvent(event: { name: string; params: Record<string, string | number> }) {
  if (typeof window === 'undefined') return
  trackEvent(event.name, event.params)
  try { window.dispatchEvent(new CustomEvent('chorono:animation', { detail: event })) } catch { /* Optional integration. */ }
}
