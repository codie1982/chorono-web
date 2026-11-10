# Motion crew engagement measurements

`lib/hero/analytics.ts` owns bounded duration accounting independently of React,
the browser and the native player. `useHeroCrew` supplies `performance.now()`,
loaded/visible/input boundaries and actual native ticks. `lib/analytics.ts` reuses
the existing Google tag and dispatches the same payload as `chorono:animation` for
local inspection. No tag ID, storage, cookie or visitor identifier is introduced.

## Three-event budget

| Event | Engagement threshold | Maximum per mounted scene |
| --- | --- | --- |
| `animation_engagement_10s` | 10 cumulative seconds | 1 |
| `animation_engagement_20s` | 20 cumulative seconds | 1 |
| `animation_engagement_30s` | 30 cumulative seconds | 1 |

A scene emits at most three animation events. Less than ten seconds of engagement
emits none. Leaving/re-entering, pausing, pagehide and BFCache restoration preserve
the reached thresholds; they do not reset the budget or send partial reports.
A new scene mount starts a new budget. The local one-second checkpoint timer stops
after the third event. It never sends a periodic heartbeat event.

Engagement is the union of whole-canvas pointer hover and active character/CTA
pointer or keyboard-focus channels. Overlapping inputs count once. The scene must
be loaded, at least 5% intersecting the viewport and in a foreground document.
Hidden/offscreen intervals count neither engagement nor visibility; stale inputs
are released on suspension. Hover/focus can count while paused. Playback time
additionally requires a running player. This is dwell, not a claim of continuous
mouse movement or completed installation.

## Snapshot parameters

All three events include `animation_id=motion-crew`, `placement=hero|library` and
numeric `engagement_seconds=10|20|30`. Durations use milliseconds:

- `interaction_ms`: union engagement, exactly 10000, 20000 or 30000 at its threshold.
- `hover_ms`: whole-canvas pointer dwell within visible intervals.
- `visible_ms`: loaded foreground time with the scene in view, including passive time.
- `playback_ms`: visible time while playback is eligible.

Rendered pose entries are summarized as numeric `motion_<pose>_count` parameters,
with hyphens replaced by underscores: `motion_idle_count`, `motion_shy_pip_count`,
`motion_shy_milo_count`, `motion_shy_fig_count`, `motion_shy_dot_count`,
`motion_excited_count`, `motion_curious_count`, `motion_celebrate_count`,
`motion_highfive_count` and `motion_sit_count`. A repeated native tick or completed
idle loop does not create another entry. Unrendered requests while paused do not
count as poses. Explicit requests use `control_play_count`, `control_pause_count`,
`control_celebrate_count` and `control_highfive_count`. Only observed counters are
included; requests do not prove successful navigation or installation.

These are cumulative milestone snapshots, not additive duration deltas. Filter
one milestone event when comparing durations/motions; summing all three snapshots
double-counts earlier time and actions. Count each event name to see how many scene
mounts reached its threshold. A delayed checkpoint splits elapsed time at each
threshold, so it cannot skip 10/20 seconds or attach a 35-second duration to them.
No coordinates, arbitrary targets, URLs or query strings enter the payload.

## Migration and other interactions

The previous `animation_engagement` delta event and separate `animation_target_time`,
`animation_motion`, `animation_motion_time`, `animation_idle_action` and
`animation_control` events are retired. Per-target/per-pose residence times and
individual idle signatures are no longer sent. Update existing reports to the
three threshold event names and their cumulative snapshot semantics.

Homepage CTA events (`github_star_click`, `editor_setup_click`, `agent_skills_click`,
`android_sdk_click`) and successful `code_copy` events remain independent. Identical
event/placement or copy/snippet repeats within two seconds are suppressed; different
actions and placements are independent. Suppression affects telemetry only and never
disables a link, copy action or animation control. The module keeps at most 64 recent
internal labels in memory, without persistent storage, queuing or retries.

## Inspect and verify

Open `http://localhost:2011/?crewDebug=1` or the animation detail page with the same
query. The optional in-memory inspector shows only the milestone payloads and works
without a configured Google tag. Interact for 10/20/30 seconds; no new animation
reports appear after the third threshold. Passive idle playback sends none.

```js
window.addEventListener('chorono:animation', event => {
  console.log(event.detail.name, event.detail.params)
})
```

`npm test` covers exact thresholds, cumulative visits, overlap, hidden gaps, paused
hover, passive loops, high-frequency pose changes, delayed checkpoints, disposal,
failed sinks and CTA/copy cooldown boundaries. Run the normal production build
with the owned website server stopped, then inspect the real local scene. Google
delivery remains subject to the existing tag, consent and network availability;
this implementation does not configure GA4 property reports or custom metrics.
