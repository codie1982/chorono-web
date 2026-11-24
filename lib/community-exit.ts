import { readCommunityValue, writeCommunityValue } from './community'

const exitKey = 'chorono:community-exit:v1'

/** Existing desktop signal, with a durable browser marker after the server responds. */
export function watchExitIntent(available: () => boolean, claim: () => Promise<boolean>, show: () => void) {
  const startedAt = Date.now()
  let pending = false
  let disposed = false

  async function onExit(event: MouseEvent) {
    if (disposed || pending || event.relatedTarget !== null || event.clientY > 0 || document.visibilityState !== 'visible') return
    if (Date.now() - startedAt < 30000 || window.scrollY < 250 || !available() || readCommunityValue(exitKey)) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches) return

    pending = true
    try {
      const permitted = await claim()
      writeCommunityValue(exitKey, '1')
      if (permitted && !disposed && available() && document.visibilityState === 'visible') show()
    } catch {
      // Another eligible exit can retry a failed request.
    } finally {
      pending = false
    }
  }

  document.documentElement.addEventListener('mouseleave', onExit)
  return () => {
    disposed = true
    document.documentElement.removeEventListener('mouseleave', onExit)
  }
}
