# Google Analytics measurement contract

Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX` for the intended environment. `app/layout.tsx` loads the existing Google tag. Keep this variable unset in local/preview builds unless using a dedicated test property.

## Homepage custom events

| Event | Trigger | Parameter | Does not prove |
| --- | --- | --- | --- |
| `github_star_click` | Header Star on GitHub link activation | `cta_location=header` | A star was added |
| `editor_setup_click` | Hero installation link activation | `cta_location=hero` | Installation completed |
| `agent_skills_click` | Hero agent skills link activation | `cta_location=hero` | Skills installed |
| `android_sdk_click` | Android implementation link activation | `cta_location=integration` | SDK installed |
| `code_copy` | Clipboard write succeeds | `snippet_name` (code panel title) | Code executed |

These are event counts, not unique people. Other links currently rely on GA's configured automatic measurement; this is not site-wide custom link coverage. Loading the public GitHub count emits no custom event. We do not infer visibility, user identity or completed stars from that request.

`lib/analytics.ts` owns event names and dispatch; `components/LandingPage.tsx` calls it only from activation handlers or after a successful clipboard write. Missing/blocked analytics is a no-op and transport errors do not interrupt navigation or copying.

## Migration

- `github_star_view` is retired. Historical values meant successful count loads, not views, clicks or stars. Exclude it from conversion reports; old rows are not rewritten.
- `button_click` with `button_name=github_star_intent`, `hero_agent_skills` or `android_implementation_link` is replaced by the corresponding explicit events above. Do not emit both schemas.
- `hero_editor_button_click` becomes `editor_setup_click`; `copied_code` becomes `code_copy`.
- Unused legacy event names/helpers were removed. This app has no other callers.
- GA enhanced measurement may also emit `click` for an outbound link. Do not sum generic `click` and a custom click event as separate visitors/actions. Automatic `page_view`, `session_start`, `first_visit`, `user_engagement` and configured `scroll` remain independent.
- These source changes do not change GA Admin settings or historical key-event flags. Do not label a click as a completed star or completed install.

## Verification and reporting

Run `npm test` and `npm run build`. With a test GA property, inspect Realtime/DebugView: opening/reloading the homepage must not emit `github_star_view` or any custom click event. Activate each instrumented CTA once; expect one corresponding custom event. Successful copying emits `code_copy`; a rejected clipboard write must not. Enhanced-measurement events can appear separately.

Use event-scoped custom dimensions for `cta_location` and `snippet_name` if needed in reports. Evaluate GitHub star growth separately from click counts; total repository stars cannot identify which visitor converted.

Official reference: https://developers.google.com/analytics/devguides/collection/ga4/events
