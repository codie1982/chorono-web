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

/** Records activation at the named placement, not visibility or completion. */
export function trackAction(action: Exclude<keyof typeof events, 'codeCopy'>, location: string) {
  trackEvent(events[action], { cta_location: location })
}

/** Records a successful clipboard write; the parameter is the snippet label only. */
export function trackCodeCopy(snippetName: string) {
  trackEvent(events.codeCopy, { snippet_name: snippetName })
}

/** Sends fixed animation metrics to the existing tag and a local integration event.
 * No queue/storage is created when the Google tag is absent. DOM listeners may inspect
 * the same payload via chorono:animation. Transport/listener failures do not block input.
 */
export function trackAnimationEvent(event: { name: string; params: Record<string, string | number> }) {
  if (typeof window === 'undefined') return
  trackEvent(event.name, event.params)
  try { window.dispatchEvent(new CustomEvent('chorono:animation', { detail: event })) } catch { /* Optional integration. */ }
}
