'use client'

import { useEffect, useState } from 'react'
import type { CrewEvent } from '@/lib/hero/analytics'

/** Optional local inspection of the same events delivered to the existing Google tag.
 * Enabled with ?crewDebug=1; retains at most 30 entries in component memory, never storage.
 * Debugging does not require an analytics account or change consent/tag availability.
 */
export default function CrewEventLog() {
  const [enabled, setEnabled] = useState(false)
  const [events, setEvents] = useState<CrewEvent[]>([])
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('crewDebug') !== '1') return
    setEnabled(true)
    const receive = (event: Event) => setEvents(previous => [(event as CustomEvent<CrewEvent>).detail, ...previous].slice(0, 30))
    window.addEventListener('chorono:animation', receive)
    return () => window.removeEventListener('chorono:animation', receive)
  }, [])
  if (!enabled) return null
  return <details className="my-4 rounded-xl border border-white/20 p-3 text-xs text-[#E8DCCF]" open>
    <summary className="cursor-pointer py-2 font-medium">Animation event inspector · last 30 events</summary>
    <p className="py-2 leading-5">Times are milliseconds. Hover a character, leave it, or pause to flush durations. Background tabs and offscreen playback are excluded.</p>
    <ol data-crew-events className="max-h-64 space-y-2 overflow-auto" aria-label="Animation events">
      {events.map((event, index) => <li key={index} className="border-t border-white/10 pt-2"><strong>{event.name}</strong><pre className="mt-1 whitespace-pre-wrap break-all">{JSON.stringify(event.params)}</pre></li>)}
    </ol>
  </details>
}
