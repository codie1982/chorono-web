# Motion crew interaction measurements

`lib/hero/analytics.ts` owns duration accounting independently of React, the browser and the
native player. `useHeroCrew` supplies a monotonic `performance.now()` clock, visibility/input
boundaries and actual completed native ticks. `lib/analytics.ts` reuses the website's existing
Google tag and emits the same payload as `window` event `chorono:animation`. Nothing is sent
to Google when the tag is unavailable. No new tag ID, storage, cookie or visitor ID is added.

## Event contract

All events include `animation_id=motion-crew` and `placement=hero|library`. Parameter values
are fixed labels or numeric milliseconds, never cursor coordinates or page query strings.

| Event | Parameters | Meaning |
| --- | --- | --- |
| `animation_engagement` | `visible_ms`, `playback_ms`, `hover_ms`, `interaction_ms`, `reason` | Additive duration deltas |
| `animation_target_time` | `target`, `input`, `duration_ms`, `reason` | Time over/focusing Pip, Milo, Fig, Dot, Install, Skills or Sit |
| `animation_motion` | `motion`, `cause` | A native pose actually rendered after dispatch; idle is automatic |
| `animation_motion_time` | `motion`, `duration_ms`, `reason` | Active playback residence in that pose |
| `animation_idle_action` | `character`, `motion` | Native idle playback crosses wave/stretch/jelly-breath/scan beats |
| `animation_control` | `action` | Explicit play/pause/celebrate/highfive request; not proof of installation |

The scene must be loaded, at least 5% intersecting the viewport and in a foreground document
to accumulate visible time. Playback also requires a running player. Hover is pointer dwell
over the entire canvas, including gaps, and can accumulate while paused. Interaction is the
union of canvas hover and active character/CTA pointer/focus channels. It is dwell, not a
claim that somebody continuously moved their mouse. Per-target pointer and focus durations
are separate dimensions: overlapping channels count once in the overall interaction total.

Reports flush every 15 seconds, when a target is left, at pause/hidden/offscreen boundaries,
pagehide and unmount. They contain deltas, not cumulative totals: SUM milliseconds and divide
by 1000 to obtain seconds. Flushes reset counters, so pagehide followed by unmount cannot
duplicate a duration. Hidden/offscreen intervals release stale hover/focus measurements.
Pose time excludes pauses; signature events use actual pose-relative native playback time,
once per 8 s loop. No transport is called per frame or pointer move.

## Inspect locally

Open `http://localhost:2011/?crewDebug=1`, or add the same query to the animation detail page.
The optional inspector below the scene retains the last 30 events in component memory.
Hover/focus a character, leave it, pause or wait for a checkpoint to see numeric durations.
The inspector works even when no Google tag is configured. The plain page has no inspector.

An existing host can receive the same fixed event contract:

```js
window.addEventListener('chorono:animation', event => {
  console.log(event.detail.name, event.detail.params)
})
```

For GA4 reporting, use the existing property's Events/Explorations tools and register the
custom dimensions `animation_id`, `placement`, `target`, `input`, `motion`, `character`, `cause`
and the numeric custom metrics above if needed. Property reporting configuration is separate
from this local implementation; no property configuration or deployment was performed.
Google delivery remains subject to the existing tag configuration, consent and network availability.

Deterministic tests cover overlapping inputs, hidden gaps, paused hover, additive checkpoint
segments, idempotent disposal, rendered-only poses, each idle signature, and transport failure.
