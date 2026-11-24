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
