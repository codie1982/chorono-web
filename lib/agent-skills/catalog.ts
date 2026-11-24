import { ANIMATION_LIBRARY_PATH, ANIMATION_SKILLS_PATH, showcaseCategoryNames, showcaseCollectionHref, showcaseDetailHref, type ShowcaseCategoryId } from '@/lib/animation-library/routes'

export const SKILL_CATALOG_PATH = ANIMATION_SKILLS_PATH
export const SKILL_CATALOG_PREVIEW_PATH = '/new-home/agent-skills/examples'
export const SKILL_CATALOG_TITLE = 'Animation prompt examples'
export const SKILL_CATALOG_DESCRIPTION = 'Watch Chorono animation examples, copy a prompt for Codex or Claude Code, and download the editable scene behind each video.'

export const skillCatalogRoutes = {
  public: { home: '/', skills: ANIMATION_LIBRARY_PATH, collection: SKILL_CATALOG_PATH, setup: '/agent-skills#agent-setup-guides', install: '/docs/ai/skills' },
  preview: { home: '/new-home', skills: '/new-home/docs/ai/skills', collection: SKILL_CATALOG_PREVIEW_PATH, setup: '/new-home/docs/ai/mcp', install: '/new-home/docs/ai/skills' },
} as const

export type SkillCatalogSurface = keyof typeof skillCatalogRoutes

export interface SkillExampleComposition {
  readonly width: number
  readonly height: number
  readonly prompt: string
}

/** One finished example. The same record drives both layouts and the public sitemap. */
export interface SkillExample extends SkillExampleComposition {
  readonly slug: string
  readonly title: string
  readonly category: string
  readonly libraryCategory: ShowcaseCategoryId
  readonly description: string
  readonly posterAlt: string
  readonly durationSeconds: number
  readonly frameRate: number
  readonly mediaAdded: string
  readonly portrait?: SkillExampleComposition
  readonly beats: readonly { readonly time: string; readonly label: string; readonly detail: string }[]
  readonly revision: string
  readonly guide: { readonly href: string; readonly label: string; readonly preview?: { readonly href: string; readonly label: string } }
}

export const skillExamples: readonly SkillExample[] = [
  {
    slug: 'small-wins',
    title: 'Small Wins',
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
    slug: 'live-from-studio-04',
    title: 'Live from Studio 04',
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
  return { poster: `${base}/poster${suffix}.jpg`, video: `${base}/${slug}${suffix}.mp4`, project: `${base}/${fileName}`, fileName }
}
