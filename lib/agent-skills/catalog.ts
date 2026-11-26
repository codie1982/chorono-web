import { catalogMotionExamples } from './catalog-motion-examples'
import { ANIMATION_LIBRARY_PATH, ANIMATION_SKILLS_PATH, showcaseCategoryNames, showcaseCollectionHref, showcaseDetailHref, type ShowcaseCategoryId } from '@/lib/animation-library/routes'

export const SKILL_CATALOG_PATH = ANIMATION_SKILLS_PATH
export const SKILL_CATALOG_PREVIEW_PATH = '/new-home/agent-skills/examples'
export const SKILL_CATALOG_TITLE = 'Animation Prompt Examples for Claude and Codex'
export const SKILL_CATALOG_DESCRIPTION = 'Copy animation prompts for Claude Code or Codex. Watch results from real Chorono scenes and download editable projects for typography, charts, and more.'

export const skillCatalogRoutes = {
  public: { home: '/', skills: ANIMATION_LIBRARY_PATH, collection: SKILL_CATALOG_PATH, setup: '/agent-skills#agent-setup-guides', install: '/docs/ai/skills' },
  preview: { home: '/new-home', skills: '/new-home/docs/ai/skills', collection: SKILL_CATALOG_PREVIEW_PATH, setup: '/new-home/docs/ai/mcp', install: '/new-home/docs/ai/skills' },
} as const

export type SkillCatalogSurface = keyof typeof skillCatalogRoutes

export interface SkillExampleComposition {
  readonly width: number
  readonly height: number
  readonly prompt: string
  readonly englishCaptions?: boolean
}

/** One finished example. The same record drives both layouts and the public sitemap. */
export const skillExampleFamilies = {
  typography: 'Typography',
  interface: 'Interface animation',
  data: 'Data visualization',
  'spline-shape': 'Splines & shapes',
  character: 'Character animation',
  'effects-physics': 'Effects & physics',
  product: 'Product animation',
  education: 'Education & interaction',
} as const

export type SkillExampleFamily = keyof typeof skillExampleFamilies

export interface SkillExample extends SkillExampleComposition {
  readonly family: SkillExampleFamily
  readonly slug: string
  readonly title: string
  readonly category: string
  readonly libraryCategory: ShowcaseCategoryId
  readonly description: string
  readonly posterAlt: string
  readonly durationSeconds: number
  readonly frameRate: number
  readonly mediaAdded: string
  readonly interactiveDemo?: 'plant-cards' | 'artifact-card' | 'coastal-radar' | 'hero-panels'
  readonly portrait?: SkillExampleComposition
  readonly beats: readonly { readonly time: string; readonly label: string; readonly detail: string }[]
  readonly revision: string
  readonly guide: { readonly href: string; readonly label: string; readonly preview?: { readonly href: string; readonly label: string } }
}

export const skillExamples: readonly SkillExample[] = [
  {
    slug: 'small-wins',
    title: 'Small Wins',
    family: 'typography',
    category: 'Kinetic typography',
    libraryCategory: 'style-animations',
    description: 'A Swiss-style kinetic typography poster with two masked word reveals, a slight overshoot and an extending copper underline.',
    posterAlt: 'Small Wins in large black letters above a copper underline, with three ascending bars on an ivory poster.',
    durationSeconds: 6,
    width: 1920,
    height: 1080,
    frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: 'Use the chorono skill to create a six-second, 1920 × 1080 kinetic typography scene at 30 fps. Set SMALL and WINS on separate lines in heavy black type on warm ivory. Reveal them upwards through separate rectangular masks, starting at 0.40 and 0.65 seconds. Give WINS a 13 px overshoot before it settles at 1.53 seconds. Grow three copper bars of different lengths on the right with 240 ms between starts. Extend a copper underline from 1.60 to 2.28 seconds and hold the finished poster after 2.84 seconds. Keep the text, masks and graphic elements editable. Inspect the entrances and the final frame, then validate and save the portable Chorono project.',
    portrait: {
      width: 1080,
      height: 1920,
      prompt: 'Use the chorono skill to create Small Wins as a six-second, 1080 × 1920 poster at 30 fps. Use warm ivory and set SMALL and WINS in heavy black type on separate lines within the central portrait area. Reveal each word upwards through its own mask at 0.40 and 0.65 seconds. Give WINS a 13 px overshoot before settling at 1.53 seconds. Draw the copper underline from 1.60 to 2.28 seconds. Stack three copper bars of increasing width below the underline on the right, with 240 ms between starts. Place ONE MOVE AT A TIME to their left and hold the complete poster from 2.84 seconds. Keep the type, masks, rules and bars editable. Inspect the entrances and final layout, then validate and save a portable portrait project.',
    },
    beats: [
      { time: '0.40–1.53 s', label: 'Reveal the words', detail: 'SMALL rises through its own mask. WINS enters a quarter of a second later and overshoots by 13 px.' },
      { time: '0.93–2.28 s', label: 'Build the accents', detail: 'Three bars grow from their left edges, followed by the extending copper underline.' },
      { time: '2.84–6.00 s', label: 'Hold the poster', detail: 'The caption finishes appearing and the full composition stays on screen.' },
    ],
    revision: 'Open the poster timeline and move the WINS entrance position and opacity keys from 0.65 s to 0.80 s. Compare the longer gap between the two words and keep the final pose.',
    guide: {
      href: '/kinetic-typography', label: 'Kinetic typography guide',
      preview: { href: '/new-home/docs/editor/keyframes', label: 'Keyframes handbook' },
    },
  },
  {
    slug: 'interactive-hero-panels',
    title: 'Chorono Hero Panels',
    family: 'interface',
    category: 'Interactive website hero',
    libraryCategory: 'interactive-web',
    description: 'Four curved panels expand into focused views for Render, Motion, Model and Game. A 600 ms blend brings in the selected panel’s message while its artwork cycles.',
    posterAlt: 'Four curved panels showing a sunset explorer, blue motion trails, a sci-fi helmet and a lush game environment.',
    durationSeconds: 18,
    width: 1440,
    height: 520,
    frameRate: 30,
    mediaAdded: '2026-11-25',
    interactiveDemo: 'hero-panels',
    prompt: 'Use Chorono to build a 1440 × 520 interactive website hero. Draw an S-curve panel boundary and reuse it for four textured Mesh2D panels. Build an overview plus focused states for Render, Motion, Model and Game. In each focus state expand the chosen panel, contract its neighbors, and reveal a headline, description and action. Blend between states over 600 ms. Keep a separate 18-second loop for cycling three images per panel. Save the state machine, artwork and text in one portable Chorono project.',
    beats: [
      { time: '0–1.5 s', label: 'Show the overview', detail: 'The curved panels show four different visual directions.' },
      { time: '1.5–15 s', label: 'Focus each panel', detail: 'The selected panel expands over 600 ms and shows its own headline, description and action.' },
      { time: '15–18 s', label: 'Return to the overview', detail: 'The four panels return to their original widths as the artwork loop completes.' },
    ],
    revision: 'Open the Artwork timeline to swap the three images used by a panel. Then change its focus message and preview the 600 ms transition from Overview.',
    guide: { href: '/docs/editor/keyframes', label: 'Keyframes handbook' },
  },
  {
    slug: 'coastal-radar',
    title: 'Kıyı Radarı — Gece Vardiyası',
    family: 'interface',
    category: 'Interactive 3D turntable',
    libraryCategory: 'interactive-web',
    description: 'Turn a 3D coastal radar left and right against a night harbor. The project connects click targets to three angle states, a copper signal light and a readout.',
    posterAlt: 'A silver radar dish on a wet concrete platform beside two Turkish turn controls in a moonlit coastal scene.',
    durationSeconds: 4,
    width: 1440,
    height: 810,
    frameRate: 30,
    mediaAdded: '2026-11-25',
    interactiveDemo: 'coastal-radar',
    prompt: 'Use Chorono to create a 1440 × 810 interactive 3D turntable on a 2D coastal landing page. Place an editable GLB radar dish over a coastal photograph and add readable turn controls. Define a neutral state and two states offset by −60° and +60° from the neutral yaw. Route click targets to the states, then wire the state track to the 3D model’s yaw parameter. Blend between turn states over 620 ms. Update the angle label and trigger a 960 ms signal pulse when the direction changes. Keep the model, controls and state machine editable in a portable project.',
    beats: [
      { time: '0–0.4 s', label: 'Inspect the starting angle', detail: 'The radar faces the viewer above the wet platform. The readout shows 0° relative to the starting pose.' },
      { time: '0.4–1.6 s', label: 'Turn left', detail: 'The model turns 60° to the left and the copper signal pulses.' },
      { time: '1.6–4 s', label: 'Turn right and center', detail: 'The model crosses to the opposite view before the demo returns to its starting angle.' },
    ],
    revision: 'Try a narrower inspection range by adjusting the left and right tracks. Keep the readout in sync with the angle offsets and test both button targets after editing.',
    guide: { href: '/docs/editor/keyframes', label: 'Keyframes handbook' },
  },
  {
    slug: 'the-small-delay',
    title: 'The Small Delay',
    family: 'character',
    category: 'Talking character & hand animation',
    libraryCategory: 'style-animations',
    description: 'Mara counts from one to five in English, opening one finger per number. The camera pushes in on her hand and the UV-mapped copper jacket follows two editable arm IK chains.',
    posterAlt: 'Mara holds up all five fingers beside a large numeral five during a close-up.',
    durationSeconds: 9.4,
    width: 1280,
    height: 720,
    frameRate: 30,
    mediaAdded: '2026-11-26',
    englishCaptions: true,
    prompt: 'Create an editable talking character in Chorono at 1280 × 720 and 30 fps. Generate a conversational English count from one to five in ElevenLabs. Use the speech alignment to time the mouth shapes, the numerals and a different finger opening on each number. Bind the wrists and palms with two-bone arm IK. Put the upper and lower sleeve Mesh2D layers on their corresponding shoulder and elbow groups, using the same UV texture as the bodice. Push the camera in on the raised hand and return to the wide shot after five. Embed the voice and UV texture.',
    beats: [
      { time: '0.34–1.24 s', label: 'Raise the hand and push in', detail: 'Mara invites the viewer to count as she lifts her hand. The camera moves in just before “one.”' },
      { time: '1.24–7.22 s', label: 'Count from one to five', detail: 'The index, middle, ring and little fingers open in sequence. The thumb opens on “five” as the fifth numeral appears.' },
      { time: '7.44–9.40 s', label: 'Lower the hand and pull back', detail: 'Mara says “and relax,” lowers her wrist and returns to the wide studio shot.' },
    ],
    revision: 'Move a wrist target at a counting pose. Watch the palm, forearm mesh and upper sleeve follow the IK solution. Then adjust one finger’s timing and compare it to the recorded number.',
    guide: { href: '/docs/editor/keyframes', label: 'Keyframes handbook' },
  },
  {
    slug: 'night-dispatch',
    title: 'Night Dispatch',
    family: 'character',
    category: '2D motorcycle animation',
    libraryCategory: 'style-animations',
    description: 'A motorcycle courier crosses an uneven harbor road from sunset to moonrise, with fixed-length rider IK, animated suspension, a woven Mesh2D scarf and synchronized engine audio.',
    posterAlt: 'A motorcyclist with an orange scarf rides a rolling harbor road under a pale moon and the words Night Dispatch.',
    durationSeconds: 7.5,
    width: 1080,
    height: 1080,
    frameRate: 60,
    mediaAdded: '2026-11-26',
    englishCaptions: true,
    prompt: 'Use Chorono to build a 7.5-second square motorcycle scene at 1080 × 1080 and 60 fps. Center an illustrated courier with smooth Bézier contours. Scroll the harbor and road at different speeds and sample the uneven road for each axle. Use two fixed-length IK chains for the rider’s near arm and leg. Link their wrist and ankle targets to the handlebar and footrest. Link the front mudguard to the non-spinning front axle and let the torso and helmet settle through damped motion. Deform the woven scarf with Mesh2D. Slide LAST LIGHT in by day and replace it with NIGHT DISPATCH as the moon rises and the headlamp comes on. Mix engine and suspension sounds against the ride and save a portable, editable Chorono project.',
    beats: [
      { time: '0–2 s', label: 'Set off in daylight', detail: 'LAST LIGHT slides in as the wheels pick up speed and the harbor scrolls behind the courier.' },
      { time: '2–5 s', label: 'Ride through sunset', detail: 'The front and rear wheels cross the bumps in sequence. The sun drops behind the hills and the title fades.' },
      { time: '5–7.5 s', label: 'Finish under the moon', detail: 'NIGHT DISPATCH takes over as the headlamp lights the road and the progress marker reaches its destination.' },
    ],
    revision: 'Adjust a crest in the road profile, then update the axle and suspension keys. Scrub through the impact and use IK diagnostics to check both contact targets and the joint limits.',
    guide: { href: '/docs/editor/keyframes', label: 'Keyframes handbook' },
  },
  {
    slug: 'live-from-studio-04',
    title: 'Live from Studio 04',
    family: 'typography',
    category: 'Broadcast lower third',
    libraryCategory: 'style-animations',
    description: 'A seven-second broadcast lower third with a red rule, two masked text reveals and a staggered exit. The upper two-thirds of the frame stay clear for footage.',
    posterAlt: 'A red LIVE badge, studio identifier, and ivory LUMA WELLS and FIELD NOTES labels in the lower left of a charcoal frame.',
    durationSeconds: 7,
    width: 1920,
    height: 1080,
    frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: 'Use the chorono skill to build a seven-second, 1920 × 1080 broadcast lower third at 30 fps. Keep the top two-thirds clear for footage. At 0.50 seconds, grow a thin red rule from the left. Bring in the LIVE badge and studio identifier, then lift LUMA WELLS and FIELD NOTES into view through two separate rectangular masks. Hold the typography until 5.60 seconds. Retract FIELD NOTES first, then the name, then the red rule. Keep the type, masks and accents editable. Check a frame during the entrance, a fully visible frame and the empty closing frame. Save the portable scene and render an MP4.',
    beats: [
      { time: '0.50–1.42 s', label: 'Reveal the lower third', detail: 'The red rule extends. The studio identifier fades in as the presenter and program labels enter through separate masks.' },
      { time: '1.42–5.60 s', label: 'Hold for reading', detail: 'The graphics stay in the lower third with a clear upper frame for a presenter.' },
      { time: '5.60–6.56 s', label: 'Clear the frame', detail: 'The program label retracts first. The presenter name follows, then the red rule closes.' },
    ],
    revision: 'Replace the presenter and program text, then inspect the final pose and the reveal at one second. Widen the individual mask if the new name is longer.',
    guide: { href: '/docs/editor/keyframes', label: 'Keyframes handbook' },
  },
  {
    slug: 'night-service',
    title: 'Night Service',
    family: 'typography',
    category: 'Dot matrix typography',
    libraryCategory: 'style-animations',
    description: 'An amber departure board lights up its editable dot-matrix letters column by column in a seven-second vertical animation.',
    posterAlt: 'Amber dots spell NIGHT SERVICE on a dark intercity departure board with a 23:48 time display.',
    durationSeconds: 7,
    width: 1080,
    height: 1920,
    frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: 'Build a 7-second, 1080 × 1920 dot-matrix departure board in Chorono at 30 fps. Use a dark recessed panel, warm amber circles and sparse dim standby dots. Group populated dots by column and reveal each column 60 ms after the previous one. Start NIGHT at 0.52 s and SERVICE at 1.69 s. Pulse the two separator lamps once per second and settle to a fully readable board at 6 s. Keep the dots, panel and text labels editable. Check the first columns and the final hold before saving the portable project and rendering an MP4.',
    beats: [
      { time: '0.52–2.36 s', label: 'Light the first line', detail: 'NIGHT builds from left to right as each column brightens.' },
      { time: '1.69–4.25 s', label: 'Scan the second line', detail: 'SERVICE follows beneath the separator lamps, with dim standby dots between the letters.' },
      { time: '4.25–7.00 s', label: 'Hold the departure board', detail: 'Both words stay readable and the separator lamps settle.' },
    ],
    revision: 'Move the second line’s column keys by the same amount to change the gap between the words. Preserve the 60 ms spacing within each line.',
    guide: { href: '/docs/editor/keyframes', label: 'Keyframes handbook' },
  },
  {
    slug: 'word-in-balance',
    title: 'Word in Balance',
    family: 'typography',
    category: 'Bauhaus kinetic typography',
    libraryCategory: 'style-animations',
    description: 'Four colored TILT tiles slide into alignment, tip around their bottom edges and settle with staggered follow-through.',
    posterAlt: 'Four aligned letter tiles spell TILT in red, blue, ochre and green on a warm geometric poster.',
    durationSeconds: 6,
    width: 1080,
    height: 1080,
    frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: 'In Chorono, build a 6-second square Bauhaus poster at 1080 × 1080 and 30 fps. Group each of the four TILT letters with its tile. Bring the groups onto one baseline by 1.80 s. Place each group pivot at its bottom center. Turn the first T to 12 degrees, overshoot to minus 4 degrees and settle at zero. Give the blue, ochre and green tiles smaller staggered rotations and keep the final word aligned. Save the scene with each letter, color and pivot editable, then render an MP4.',
    beats: [
      { time: '0.18–1.80 s', label: 'Assemble the word', detail: 'Four colored tiles slide into place from different positions and angles.' },
      { time: '2.09–3.78 s', label: 'Pivot and follow through', detail: 'The red T tips twelve degrees, overshoots and settles while the remaining tiles respond in order.' },
      { time: '3.78–6.00 s', label: 'Align the baseline', detail: 'The four letters end upright on the registration line.' },
    ],
    revision: 'Choose the first tile group and increase its peak rotation. Keep the group pivot at the bottom edge and check contact with the baseline.',
    guide: { href: '/docs/editor/keyframes', label: 'Keyframes handbook' },
  },
  {
    slug: 'price-of-the-everyday',
    title: 'Price of the Everyday',
    family: 'typography',
    category: 'Editorial typography',
    libraryCategory: 'style-animations',
    description: 'A newspaper-style title asks why bread gets costly, then unfolds three illustrated paper strips for flour, heat and transport.',
    posterAlt: 'A newspaper-style headline reads Why Bread Gets Costly beside illustrated Flour, Heat and Transport paper strips.',
    durationSeconds: 9,
    width: 1920,
    height: 1080,
    frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: 'Build a 9-second newspaper-style scene at 1920 × 1080 and 30 fps. Use warm paper, monochrome ink, a serif masthead and editable headings for WHY BREAD and GETS COSTLY. Sweep a two-stroke ink underline beneath BREAD from 1.20 s. Reveal the standfirst in two beats. At 5.68 s begin unfolding separate paper strips for Flour, Heat and Transport, 350 ms apart. Use simple diagrams of wheat, heat and a delivery van. Hold the completed front page after 6.95 s and save the editable Chorono scene and MP4.',
    beats: [
      { time: '0.11–1.97 s', label: 'Set and underline the headline', detail: 'The two serif lines appear, then a paired ink stroke sweeps under BREAD.' },
      { time: '2.36–4.76 s', label: 'Introduce the story', detail: 'Two lines of copy establish the subject before the sidebar heading appears.' },
      { time: '5.68–9.00 s', label: 'Fold in the three costs', detail: 'Flour, Heat and Transport unfold 350 ms apart before a two-second reading hold.' },
    ],
    revision: 'Change one sidebar label, then check the ending frame for type fit and inspect the strip halfway through its fold.',
    guide: { href: '/kinetic-typography', label: 'Kinetic typography guide' },
  },
  {
    slug: "upload-complete",
    title: "Upload Complete",
    family: "interface",
    category: "Upload progress animation",
    libraryCategory: 'style-animations',
    description: "A graphite upload card fills a copper progress track, pauses at 75 percent and draws a mint check at completion.",
    posterAlt: "Graphite upload panel with a full copper progress bar, 100% label and mint checkmark.",
    durationSeconds: 7, width: 1920, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 7-second scene at 1920 × 1080 and 30 fps. Build a graphite upload panel with one filename. Grow a separate copper progress layer from the left, reach 75% at 2.33s and hold that value until 2.81s. Reach 100% at 4s, then replace the status label and draw a mint checkmark with stroke trim. Keep the filename, status, percentage, progress bar and check editable. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "0.33–2.33 s", label: "Start the transfer", detail: "The copper bar advances to 75% and the percentage updates." },
      { time: "2.33–4.00 s", label: "Pause and finish", detail: "The bar holds at 75%, then reaches full width." },
      { time: "4.10–4.59 s", label: "Confirm completion", detail: "The mint check draws beside the completed label." },
    ],
    revision: "Lengthen the pause by moving the second 75% key. Shift the completion label and checkmark together if the 100% key moves.",
    guide: { href: "/docs/editor/keyframes", label: "Keyframes handbook" },
  },
  {
    slug: "three-signals",
    title: "Three Signals",
    family: "interface",
    category: "Loading indicator loop",
    libraryCategory: 'style-animations',
    description: "Three mint indicators lift and stretch in a translucent status capsule, with 150 ms offsets across a four-second loop.",
    posterAlt: "Three mint jelly dots and their reflections centered in a teal translucent capsule.",
    durationSeconds: 4, width: 1080, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 4-second scene at 1080 × 1080 and 30 fps. Create a frosted teal capsule with three separate mint indicators. For each indicator, animate an 18 px lift and a brief vertical stretch. Offset the indicators by 150 ms, fit two pulses into four seconds and match the opening and closing transforms. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "0.42–1.34 s", label: "Pass the first pulse", detail: "Each dot rises 18 px and then returns to its baseline." },
      { time: "2.19–3.11 s", label: "Repeat with the same phase", detail: "The second pulse repeats the 150 ms offsets." },
      { time: "3.11–4.00 s", label: "Close the loop", detail: "The dots return to their starting size and position." },
    ],
    revision: "Change each lift to 24 px. Update the peaks together and leave the first and last frames identical.",
    guide: { href: "/docs/animation/loops", label: "Looping animations handbook" },
  },
  {
    slug: "four-fridays",
    title: "Four Fridays",
    englishCaptions: true,
    family: "data",
    category: "Bar chart animation",
    libraryCategory: 'style-animations',
    description: "Four bars show 18, 24, 21 and 32 on a shared 0–40 scale. The final copper bar marks a 14-point increase from the first Friday.",
    posterAlt: "A light paper bar chart with three green bars and one copper bar labeled 18, 24, 21 and 32.",
    durationSeconds: 8, width: 1920, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 8-second scene at 1920 × 1080 and 30 fps. Draw a fixed 0–40 scale for four Friday values: 18, 24, 21 and 32. Animate one column every 250 ms from a shared baseline and have its value label rise with it. After 4.5s recolor only Friday 04 in copper and reveal a +14 comparison against Friday 01. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "0.68–2.43 s", label: "Build the chart", detail: "Each column grows from the 0 line while its value moves with its top." },
      { time: "4.50–5.10 s", label: "Highlight the change", detail: "Friday 04 turns copper and the +14 comparison appears." },
    ],
    revision: "Edit the first and final values, then update the comparison and recalculate each bar height from the common scale.",
    guide: { href: "/docs/editor/keyframes", label: "Keyframes handbook" },
  },
  {
    slug: "goal-ring",
    title: "Goal Ring",
    family: "data",
    category: "Radial progress animation",
    libraryCategory: 'style-animations',
    description: "A cyan arc grows clockwise from twelve o’clock and stops beside the 72-of-100 target tick.",
    posterAlt: "A dark telemetry dial with a cyan 72 percent ring and a matching target marker.",
    durationSeconds: 7, width: 1080, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 7-second scene at 1080 × 1080 and 30 fps. Build a dark instrument dial with a fixed capacity track and separate 72% target tick. Use an editable arc from twelve o’clock and animate stroke Trim End from zero to 0.72 between 0.6s and 3.6s. Step the readout through legible values and illuminate the final marker. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "0.60–3.60 s", label: "Trace the capacity arc", detail: "A teal stroke grows clockwise while the number advances." },
      { time: "3.37–3.94 s", label: "Confirm the target", detail: "The arc stops at 72% and the target marker brightens." },
    ],
    revision: "Use a target such as 80. Update the arc trim, the stationary tick angle and the final counter value together.",
    guide: { href: "/docs/editor/keyframes", label: "Keyframes handbook" },
  },
  {
    slug: "parcel-route",
    title: "Parcel Route",
    family: "spline-shape",
    category: "Spline path animation",
    libraryCategory: 'style-animations',
    description: "A small parcel follows an editable S-curve, pausing at two waypoints as a copper stroke follows its progress.",
    posterAlt: "Copper delivery route and parcel marker crossing a labeled graphite map.",
    durationSeconds: 8, width: 1920, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 8-second scene at 1920 × 1080 and 30 fps. Build a graphite route map with pickup, West Depot, Canal Crossing and arrival. Use one editable path as the parcel’s Follow Path driver. Match its normalized progress to a copper stroke trim. Pause at both named waypoints and turn the parcel tangent-first before the final hold. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "1.00–2.91 s", label: "Travel to West Depot", detail: "The parcel turns into the curve and pauses at the first waypoint." },
      { time: "2.91–4.95 s", label: "Cross the canal", detail: "The copper trace follows the parcel to the second stop." },
      { time: "4.95–8.00 s", label: "Deliver the parcel", detail: "The marker reaches the destination, then the arrival stamp appears." },
    ],
    revision: "Move a waypoint and update both the Follow Path progress and stroke trim keys for the stop.",
    guide: { href: "/docs/editor/canvas/motion-keys", label: "Motion Keys guide" },
  },
  {
    slug: "circle-to-seed",
    title: "Circle to Seed",
    family: "spline-shape",
    category: "Spline morph animation",
    libraryCategory: 'style-animations',
    description: "A circular silhouette uses the same four anchors as it morphs into a pointed seed, tilts and reveals a thin interior vein.",
    posterAlt: "A pale tilted seed with a visible interior vein against a deep green geometry grid.",
    durationSeconds: 7, width: 1080, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 7-second scene at 1080 × 1080 and 30 fps. Start with a four-anchor editable spline circle. Key the existing points and handles into a seed silhouette from 1s to 3s. Keep the winding and anchor count fixed. Tilt the settled seed by 25 degrees and draw a separate interior vein using stroke trim. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "1.00–3.00 s", label: "Morph the contour", detail: "Four native spline anchors and their handles reshape the circle." },
      { time: "3.10–4.93 s", label: "Tilt and draw the vein", detail: "The seed rotates while a thin dark vein is drawn inside it." },
    ],
    revision: "Lengthen one pair of handles to soften the tip. Keep the existing point IDs and compare the start and ending silhouettes.",
    guide: { href: "/docs/editor/canvas/splines", label: "Splines handbook" },
  },
  {
    slug: "bounce-study",
    title: "Bounce Study",
    family: "character",
    category: "Squash and stretch animation",
    libraryCategory: 'style-animations',
    description: "A rubber-orange character follows three gravity-shaped arcs, compresses on contact and settles with staggered blinks.",
    posterAlt: "An orange rubber character with separate eyes and a soft shadow during its jump.",
    durationSeconds: 7, width: 1080, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-26',
    prompt: "Build a seven-second Chorono scene with separate editable body, face and floor-shadow layers. Put the body pivot at floor contact. Anticipate before 1.25 seconds, then use a parabolic flight to land at 2.49 seconds. Add smaller arcs with damped squash on each impact. Compensate width as height changes, and derive shadow width and opacity from the same height samples. Add a small downward glance on descent and stagger the final blink across the two eyes.",
    beats: [
      { time: "0.77–1.78 s", label: "Anticipate and rise", detail: "The body compresses against the floor and stretches into the jump." },
      { time: "2.49–3.65 s", label: "Contact and settle", detail: "The landing squash gives way to smaller rebounds." },
      { time: "4.51–5.80 s", label: "Blink twice", detail: "The separate eye groups finish the character beat." },
    ],
    revision: "Adjust the landing scale on both axes. Check that the pivot stays at floor contact and the face stays readable.",
    guide: { href: "/docs/editor/keyframes", label: "Keyframes handbook" },
  },
  {
    slug: "quiet-orbit",
    title: "Quiet Orbit",
    family: "character",
    category: "Character eye tracking animation",
    libraryCategory: 'style-animations',
    description: "An astronaut follows a passing star with delayed gaze, a collar-pivoted helmet and a springy antenna tip.",
    posterAlt: "Illustrated astronaut in a warm cream helmet and mauve spacesuit following an amber star.",
    durationSeconds: 8, width: 1080, height: 1920, frameRate: 30,
    mediaAdded: '2026-11-26',
    prompt: "Build an eight-second vertical Chorono scene with separate helmet, visor, pupils, antenna and suit. Link the helmet to the torso at its collar and link the antenna tip to its stem. Move the star across the visor from 1 to 5 seconds. Calculate each pupil’s delayed gaze in helmet coordinates and clamp it to the eye shape. Add a staggered blink and a small antenna recoil after the head follows the star.",
    beats: [
      { time: "1.00–5.00 s", label: "Follow the star", detail: "An amber star crosses the visor and the pupils track it with a delay." },
      { time: "3.70–3.99 s", label: "Blink", detail: "The two eye groups briefly flatten." },
      { time: "5.18–7.40 s", label: "Tilt the helmet", detail: "The star fades and the helmet settles into a small tilt." },
    ],
    revision: "Change the timing of the blink without moving the star. Keep the pupils inside their eye shapes throughout the glance.",
    guide: { href: "/docs/editor/keyframes", label: "Keyframes handbook" },
  },
  {
    slug: "copper-sparks",
    title: "Copper Sparks",
    family: "effects-physics",
    category: "Particle burst and Voronoi fracture",
    libraryCategory: 'style-animations',
    description: "A deterministic copper plate fracture and a separate seeded particle emitter throw warm sparks across a dark casting chamber.",
    posterAlt: "An etched dark casting chamber with irregular copper fragments and bright amber sparks.",
    durationSeconds: 6, width: 1080, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 6-second scene at 1080 × 1080 and 30 fps. Draw one closed copper plate in a dark casting chamber. At 1.5s fracture it with a fixed-seed native Voronoi bake. Use a separate seeded spark emitter with a warm color ramp, varied launch positions and a fading life envelope. Inspect both the burst and the clear final frame. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "0.00–1.50 s", label: "Establish the copper plate", detail: "The copper blank sits on the chamber’s center datum." },
      { time: "1.50–2.70 s", label: "Fracture and spark", detail: "Editable baked fragments move independently from the native particle burst." },
      { time: "2.70–6.00 s", label: "Clear the field", detail: "The sparks fade and the fragments fall away." },
    ],
    revision: "Change the particle seed independently of the Voronoi seed. Re-bake the fracture after changing its plate or solver settings.",
    guide: { href: "/docs/editor/keyframes", label: "Keyframes handbook" },
  },
  {
    slug: "drop-and-settle",
    title: "Drop and Settle",
    family: "effects-physics",
    category: "Rigid body physics animation",
    libraryCategory: 'style-animations',
    description: "A round orange body and two rounded blocks fall in staggered native rigid-body bakes, bounce or tumble and settle on a common floor.",
    posterAlt: "An orange ball and two colored blocks at different heights in a rigid-body drop test.",
    durationSeconds: 8, width: 1920, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 8-second scene at 1920 × 1080 and 30 fps. Create a rounded orange body and two rounded blocks above a fixed level floor. Use native rigid body bakes for three staggered release times with individual damping, friction and restitution. Offset the releases by 300 ms. Keep the resulting editable transform tracks and at least two seconds of settled motion. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "0.00–0.60 s", label: "Stagger the releases", detail: "Three bodies start falling at 300 ms intervals." },
      { time: "0.60–4.00 s", label: "Compare impact and tumble", detail: "The rounded body rebounds and the blocks rotate on contact." },
      { time: "4.00–8.00 s", label: "Read the settled pose", detail: "The bodies stay in view on the fixed collider." },
    ],
    revision: "Adjust restitution on the first body and re-bake its motion. Inspect the inherited rounded rectangle collision proxy before changing the body silhouette.",
    guide: { href: "/docs/editor/keyframes", label: "Keyframes handbook" },
  },
  {
    slug: "field-recorder",
    title: "Field Recorder",
    englishCaptions: true,
    family: "product",
    category: "Product assembly animation",
    libraryCategory: 'style-animations',
    description: "A fictional recorder assembles from editable panels, lights the record control and moves into a tighter product view.",
    posterAlt: "An illustrated green field recorder with a backlit waveform display and a copper record indicator.",
    durationSeconds: 12, width: 1920, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 12-second scene at 1920 × 1080 and 30 fps. Draw an original vector field recorder with separately grouped chassis, microphone grille, controls and display. Assemble the parts in the first three seconds. Highlight the record control near 5s and move the meter bars. Scale the grouped device toward a close view near 8s and finish with the wordmark. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "0.00–3.00 s", label: "Assemble the recorder", detail: "The four major parts enter and lock into position." },
      { time: "5.00–7.40 s", label: "Show the recording state", detail: "The record ring lights and the LCD bars respond." },
      { time: "7.85–12.00 s", label: "Move in and close", detail: "The device scales toward a tighter crop, then resolves to its wordmark." },
    ],
    revision: "Try a different case finish by editing the chassis layers. Keep the controls and LCD linked to the same device group.",
    guide: { href: "/docs/editor/layers", label: "Layers handbook" },
  },
  {
    slug: "desk-lamp",
    title: "Desk Lamp",
    family: "product",
    category: "Articulated product lighting animation",
    libraryCategory: 'style-animations',
    description: "An amber lamp unfolds at two joints, adjusts its shade and lights a desk with an editable gradient cone.",
    posterAlt: "An amber articulated lamp casting a soft warm cone across a dark desk.",
    durationSeconds: 10, width: 1920, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 10-second scene at 1920 × 1080 and 30 fps. Create a desk lamp with a base, two nested arm pivots and an independent shade. Unfold the arms from 1s to 4s, counter-rotate the shade until it faces the desk, then fade in an editable gradient cone around 5s. Keep labels and callout lines on layers beside the lamp. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "1.00–4.05 s", label: "Unfold the arms", detail: "Shoulder and elbow joints open in a coordinated movement." },
      { time: "3.31–4.76 s", label: "Aim the shade", detail: "The shade rotates independently of the parent arm." },
      { time: "4.86–6.44 s", label: "Turn on the light", detail: "The gradient cone and lit area fade onto the desk." },
    ],
    revision: "Change the elbow angle, then align the light cone to the new aperture position.",
    guide: { href: "/docs/editor/layers", label: "Layers handbook" },
  },
  {
    slug: "how-light-gets-in",
    title: "How Light Gets In",
    englishCaptions: true,
    family: "education",
    category: "Circuit explainer animation",
    libraryCategory: 'style-animations',
    description: "A blueprint explains four elements of a light circuit as a copper line identifies the signal path and a warm lamp lights up.",
    posterAlt: "Copper trace connects labeled supply, switch, wire and lamp nodes on a charcoal blueprint.",
    durationSeconds: 11, width: 1920, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 11-second scene at 1920 × 1080 and 30 fps. Build a conceptual light circuit on charcoal graph paper. Introduce four editable nodes for supply, switch, wire and lamp. Change OFF to ON, draw a copper trace over the existing path from 3s to 7s and light up the lamp while keeping the labels readable. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "0.42–2.04 s", label: "Introduce the nodes", detail: "The supply, switch, wire and lamp labels appear in order." },
      { time: "3.00–6.95 s", label: "Trace the circuit", detail: "The switch reads ON as a copper stroke follows the wire." },
      { time: "6.58–11.00 s", label: "Light the lamp", detail: "The fixture glows and the completed diagram holds." },
    ],
    revision: "Change the route in the blueprint and update both the guide spline and the trimmed highlight in the same way.",
    guide: { href: "/docs/editor/keyframes", label: "Keyframes handbook" },
  },
  {
    slug: "same-distance-different-feel",
    title: "Same Distance, Different Feel",
    englishCaptions: true,
    family: "education",
    category: "Easing comparison animation",
    libraryCategory: 'style-animations',
    description: "Three identical dots travel equal distances in equal time with Linear, Ease Out and Ease In-Out curves, then repeat the comparison.",
    posterAlt: "Three black dots on equal parallel lanes illustrating differences between linear and eased motion.",
    durationSeconds: 8, width: 1920, height: 1080, frameRate: 30,
    mediaAdded: '2026-11-24',
    prompt: "Use Chorono to make a 8-second scene at 1920 × 1080 and 30 fps. Create three parallel lanes labeled Linear, Ease Out and Ease In-Out. Use identical dots and the same start and end positions. Start all three at 1s and finish at 4s. Reset them together for a second three-second pass, keeping only the easing curve different in each lane. Save the editable scene and render an MP4 preview.",
    beats: [
      { time: "1.00–4.00 s", label: "Compare the speeds", detail: "All dots start and arrive together despite different positions along the way." },
      { time: "4.20–4.79 s", label: "Return to the start", detail: "The first pass fades out so all dots reset together." },
      { time: "4.80–7.80 s", label: "Run a second pass", detail: "The same curve comparison repeats at equal distance and duration." },
    ],
    revision: "Change the same start and end times in all three lanes, then compare their positions halfway through the pass.",
    guide: { href: "/animation-easing", label: "Animation easing guide" },
  },
  ...catalogMotionExamples,
]

/** Use a collection path supplied by the caller to keep preview navigation in its own shell. */
export function skillExampleHref(slug: string, collectionPath: string) {
  return `${collectionPath}/${slug}`
}

export function skillExampleLibraryHref(example: SkillExample) {
  return showcaseDetailHref(example.libraryCategory, example.slug)
}

/** Canonical links describe public pages, while the preview stays in its own navigation. */
export function skillBreadcrumbs(example?: SkillExample, surface: SkillCatalogSurface = 'public') {
  const routes = skillCatalogRoutes[surface]
  if (surface === 'public') return [
    { label: 'Chorono', path: routes.home },
    { label: 'Animation library', path: ANIMATION_LIBRARY_PATH },
    ...(example ? [
      { label: showcaseCategoryNames[example.libraryCategory], path: showcaseCollectionHref(example.libraryCategory) },
      { label: example.title, path: skillExampleLibraryHref(example) },
    ] : [{ label: 'Skills & prompts', path: routes.collection }]),
  ]
  return [
    { label: 'Chorono', path: routes.home },
    { label: 'Agent skills', path: routes.skills },
    { label: SKILL_CATALOG_TITLE, path: routes.collection },
    ...(example ? [{ label: example.title, path: skillExampleHref(example.slug, routes.collection) }] : []),
  ]
}

export function findSkillExample(slug: string) {
  return skillExamples.find(example => example.slug === slug)
}

export function skillExampleMedia(slug: string, format: 'landscape' | 'portrait' = 'landscape') {
  const base = `/agent-skill-examples/${slug}`
  const suffix = format === 'portrait' ? '-portrait' : ''
  const fileName = `${slug}${suffix}.chorono.json`
  return {
    poster: `${base}/poster${suffix}.jpg`,
    video: `${base}/${slug}${suffix}.mp4`,
    captions: `${base}/${slug}${suffix}.en.vtt`,
    project: `${base}/${fileName}`,
    fileName,
  }
}
