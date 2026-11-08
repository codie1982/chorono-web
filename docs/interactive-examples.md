# Interactive UI examples

`lib/animation-example.ts` owns example metadata and CreativeWork/download schema.
`lib/blog.ts` owns the guide and four prompts. The blog block selects
`components/InteractiveAnimationExample.tsx` for the heart and hamburger ids;
existing timed examples keep their original player.

The interactive component lazily fetches the **portable scene** on first click,
constructs the installed `@chorono/runtime` player and a Canvas2D adapter, and
fires the saved layer click event. Two ticks consume the click and its queued
named state event. Constant-pose timelines are blended using the runtime wall
clock; the host drives `tick(0)` for at most 300 ms, then stops requesting frames.
No background autoplay, per-frame React updates or server state is involved.
Unmount cancels frames and destroys the player; stale loads cannot create one.
The brief input lock avoids interrupted blends jumping to their previous pose.

Source scenes are 1200 × 675, with pixel coordinates and millisecond timing.
Heart uses path_2; menu uses rect_9's transparent tap area. These ids are part of
the sample integration contract and are checked by the runtime tests. Native
HTML buttons own keyboard semantics. Menu links live in HTML, Escape closes
and returns focus, and reduced-motion preference is checked on each activation.
Transition definitions are synchronized with zero blend duration in that mode.

The live editor's current runtime exporter omitted stateMachines even though
its diagnostic warnings were empty. Therefore these examples deliberately load
the complete portable JSON directly, which ChronoPlayer accepts, preserving
states and triggers. Do not substitute that incomplete runtime export. The
editor repository has separate export work in progress; no editor source is
changed by this website addition. Once a compatible exporter is deployed,
validate its state-machine parity before switching payloads.

Verification: `npm test` checks both saved click triggers, intermediate blends,
return transitions and zero-duration reduced-motion behavior against the actual
installed runtime. `npm run build` checks types/static routes. `npm run seo:check
-- <origin>` checks crawlable metadata, assets and downloads. Also inspect actual
canvas output and button states at desktop/mobile sizes before publication.
