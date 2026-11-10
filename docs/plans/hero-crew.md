# Interactive homepage motion crew

The homepage displays an original four-character scene authored through Chorono MCP and played
with the existing `@chorono/runtime@0.1.0`. Version 2 replaces the earlier cream card and three
similar silhouettes with a transparent, more flexible crew:

- Pip: coral teardrop, soft belly and asymmetric top.
- Milo: lilac rounded triangle, flexible tip and a gold pin.
- Fig: low sage blob with leaves and freckles.
- Dot: blue single-eyed robot with a following antenna.

There is no new animation dependency, copied renderer or live geometry solver in the website.

## Ownership and data flow

| Entry point | Responsibility |
| --- | --- |
| `components/LandingPage.tsx` | Existing hero section, real CTA anchors and analytics |
| `components/hero/useHeroCrew.ts` | Lazy loading, one native player, 30 fps drawing cap, host events and cleanup |
| `components/hero/HeroCharacters.tsx` | Transparent canvas/poster, focus/touch targets, fixed-height caption and pause |
| `lib/hero/interaction.ts` | Input priority, scroll hysteresis and brief navigation feedback |
| `lib/hero/NativeSplineFrameAdapter.ts` | Projects native evaluated spline scalars into owned records before the 0.1.0 canvas renderer |
| `lib/hero/manifest.ts` | Generated native IDs, neutral-rig hit bounds, eye counts and high-five contacts |
| `public/hero/motion-crew.chorono.json` | Native portable scene; authoritative geometry/keyframes/state machine |
| `public/hero/motion-crew.png` | Actual native idle render at 0 ms and pointer `(0.5, 0.5)` |
| `scene-source/hero-crew/` | Native authoring recipes; execute only through isolated MCP |

The saved scene has 192 named layers, ten state timelines, one state machine, fourteen pupil wires
and 17,610 keys. Fixed quadratic splines form the sixteen arms/legs. Native scalar point/control
keys bend them; matching glove/shoe groups stay at their endpoints. Feet stay planted during idle.
Pip/Milo/Fig tips deform independently. Bodies squash/stretch, faces and hands use different phase
offsets, and Dot's antenna follows the body. All are ordinary editable native layers and tracks.

## Events and timing

| Input | Native event | Behavior |
| --- | --- | --- |
| Rest | `idle` | 8 s loop: Pip waves, Milo stretches, Fig breathes with moving leaves, Dot scans |
| Hover/focus/tap a character | `shy-pip`, `shy-milo`, `shy-fig`, `shy-dot` | Curved arms cover the face; individual tilt and settling |
| Hover/focus Install | `excited` | Offset cheering and gentle bounces |
| Hover/focus Explore agent skills | `curious` | Different thinking/pointing poses |
| Activate Install | `celebrate` | Anticipation, jump, squash on landing, recovery and confetti; 1.2 s |
| Activate Explore agent skills | `highfive` | Three neighbor contacts at 330/405/480 ms; 1 s |
| Scroll below 40 px | `sit` | Lower body and curved crossed legs; <12 px resets |

One-shot feedback takes precedence. Scroll holds sitting until a fresh direct input; releasing
that input returns to sitting. Focused controls retain their pose if the browser scrolls them into
view. Hover/focus inputs have separate channels; the most recent active direct input wins, so a
new keyboard selection replaces a stale hover, and a fresh hover can replace an older focus.
Releasing a channel restores the newest remaining input instead of deleting other focus state.

Install and Explore remain real anchors to `/getting-started` and `/agent-skills`. Only normal
same-tab activation with a moving, available player waits 680 ms before navigation. Modified
clicks, pause, reduced motion and unavailable playback preserve native navigation. A later click
cancels pending navigation; unmount clears its timer. Feedback intentionally shows a short part
of the longer editable source clip before leaving the page. Native state blends are 240 ms,
or 100 ms for one-shots.

## Coordinates, transparency and ownership

Authoring coordinates are logical 960 × 640, converted once by 1.25 to a native 1200 × 800 scene.
Layer positions and spline points are parent-local; anchors are zero. Milo's shoulders use a
narrower 48 px logical offset to connect to the triangle at arm height. High-five palm centers
meet at logical `(255,300)`, `(482.5,332)` and `(707.5,360)`. Native keys retain 0.01 pixel/degree
precision and 0.0001 scale/opacity precision; contact checks allow 0.02 native pixels.

The composition background is `rgba(0,0,0,0)`, the native PNG has a zero-alpha corner and there
is no ground rectangle/oval. Small individual shadows are part of the artwork. The website
figure has no background, border or card. **Hide the poster visually when the transparent canvas
is ready**: otherwise it remains visible underneath moving limbs and creates a duplicate image.
Opacity zero keeps the poster's equivalent alt description available to assistive technology.

The host supplies normalized `[0,1]` pointer parameters, smoothed over 90 ms. Native expression
wires limit pupil movement to 4.5/4 native pixels. Keep spaces around subtraction in expressions;
the current tokenizer can swallow a minus adjacent to a numeric token.

`ChronoPlayer.tick(elapsedMs)` receives time since the current pose was entered. Reset elapsed
on dispatch: this SDK does not make global time state-relative automatically. Do not call
`player.play()` alongside the host RAF. Delta is capped at 80 ms after scheduling gaps. Canvas
bounds are measured on resize/scroll, not every frame. React updates only for semantic state,
pause/readiness changes; pointer and clock data stay outside React renders.

The effect owns fetch cancellation, resize/intersection observers, listeners, RAF and player
destruction. Hidden/offscreen/user-paused playback stops frame requests. Reduced motion starts
paused with explicit Play opt-in. The fixed-aspect poster reserves layout while loading or on
failure; captions have a fixed height. Hotspots use native buttons for keyboard/touch and visible
focus rings. No audio is played.

## Re-authoring with MCP

Use a separate empty connected editor tab, explicitly select its session ID and read the scene,
capabilities and `chorono://scripting`. Preserve other editor work. For each script, use the latest
revision, `run_script({dryRun:true})`, inspect the plan and commit with `apply_script_plan`.

1. Concatenate `design.js` and `author-rig.js`; apply once to an empty scene. Save the logged manifest.
2. For each key in `durations`, concatenate `design.js`, `const selectedState='idle';` (substitute
   its name), `idle-signatures.js`, and `author-motion.js`. Apply each separately to keep sandbox work bounded.
3. Concatenate `design.js` and `author-state-machine.js`; apply once.
4. Inspect actual native PNGs at pose/loop boundaries, anticipation, airborne, landing and contacts.
   Validate and save the portable scene. If live test mode is enabled, disable it afterward and
   restore animation isolation with `timelineIds: []`.
5. Update the generated manifest from native logs if IDs/layout change. Copy saved JSON to the
   public asset; whitespace may be minified, but preserve the data. Refresh the native idle PNG.
6. Stop the owned web preview, run tests/build, then restart local production on port 2011.

Latest source on this machine:
`/Users/nilayerol/Documents/ChatGPT/chorono/projects/chorono-motion-crew-idles.chorono.json`.
The previous v1 and v2 saved projects remain available. The website's public filename
stays stable. These scripts do not modify the editor's implementation.

The lean editor runtime exporter currently omits state machines and wires even with no warnings.
This feature deliberately uses the supported portable-scene input, keeping interaction definitions
and editable source together. Do not substitute that lean export until its coverage changes.

Published SDK 0.1.0 also evaluates spline scalar tracks but its canvas plugin reads the authored
spline records directly. `NativeSplineFrameAdapter` bridges that gap: it compiles references to
the scene's keyed point/handle/quadratic-control coordinates once, resets/project native values
into private reusable spline records, then delegates every drawing operation to the SDK. Source
data remains immutable; scene identity changes rebuild the records. There is no per-frame path
conversion, animation evaluation or geometry generation in this adapter. Unsupported keyed
spline channels fail explicitly. The editor's broader `materializeOverrides` implementation is
not exported by this npm version; avoid copying that private renderer module into the website.
Remove this narrow compatibility bridge once the published SDK materializes those values.

## Validation and local delivery

- `npm test`: native rig, runtime adapter, library and deterministic analytics checks pass.
- `npm run build`: production compilation, TypeScript checks and static generation pass.
- Published SDK tests verify ten events, seven pupils, eye coverage, three contacts, curve/glove
  attachment, bowed arms, planted feet, anticipation/landing, tip deformation, sitting, transparency
  and idle continuity. Native validation returned valid with no warnings after rig/hidden-key changes.
  The final precision-only update was saved and checked through the web SDK tests.
- Compatibility tests exercise actual `CanvasRenderAdapter` quadratic drawing commands with
  evaluated coordinates, source immutability, reusable records, missing-value reset and explicit
  unsupported-channel errors. Testing override maps alone would miss the 0.1.0 rendering gap.
- Actual native renders inspected: idle; all four shy poses at 320 ms; high-five at 330/405 ms;
  celebration at 555 ms; sitting at 0 ms. Native PNG alpha was also checked directly.
- Native evaluation-only benchmark: median 1.57 ms / p95 1.81 ms over 100 idle ticks, excluding
  frame projection and canvas drawing. This is a local diagnostic, not a browser FPS or production Core Web Vitals claim.
- 5,400 invisible feedback keys were removed; numeric precision was bounded without visible loss.
  Public scene is about 1.70 MB raw; initial homepage JS is about 101 KB
  according to Next. These are file/build measurements, not field transfer or loading measurements.
- Browser checks cover all four controls, mixed mouse/keyboard input, both CTA feedback/destination
  routes, scrolling, pause and 390 px layout without horizontal overflow. The canvas projection fix
  was visually compared with native output, including raised arms with attached palms. Final
  desktop/pose proof is in `outputs/hero-crew-v2-2026-11-08/`; browser console errors were empty.
- Existing metadata, canonical, JSON-LD, icons and public sitemap checks pass with `seo:check`.

Preview: `http://localhost:2011/`. Nothing is deployed. The separate editor checkout should not
be stopped or built for website-only changes; preserve the existing docs/library migration.

## Interaction measurements

See [hero analytics](hero-analytics.md) for event names, duration semantics, local inspection
and integration through the existing Google tag. Engagement is reported once at each
10/20/30-second threshold; rendered pose counts share those snapshots, without separate idle events.
