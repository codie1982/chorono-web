export const EXAMPLE_MODIFIED = '2026-11-05T11:09:14Z'
export const EXAMPLE_ID_PATH = '/examples/ideas-in-motion#work'
export const USE_CASE_PUBLISHED = '2026-11-05T11:38:33Z'
export const USE_CASE_UPDATED = '2026-11-05T12:14:37Z'

export const CODEX_EXAMPLE_MODIFIED = '2026-11-08T12:37:18Z'

export const UI_EXAMPLES_PUBLISHED = '2026-11-08T12:54:22Z'

export const INTERACTIVE_EXAMPLES_PUBLISHED = '2026-11-08T13:10:00Z'

export const ANIMATION_EXAMPLES = {
  'first-animation': {
    title: 'Make it yours', durationMs: 4000, posterTimeMs: 1800, layers: 8, tracks: 13, bytes: 16656,
    width: 960, height: 540, loop: false,
    alt: 'An editable title card with a headline, caption and three colorful circles on a dark canvas.',
    description: 'A four-second title entrance with eight editable layers, thirteen tracks and fifty-one keyframes.',
    cues: [{ timeMs: 0, label: 'Start' }, { timeMs: 1800, label: 'Visible layout' }, { timeMs: 4000, label: 'End' }],
  },
  'heart-like': {
    title: 'Heart like — A little love', durationMs: 300, posterTimeMs: 0, layers: 3, tracks: 6, bytes: 19925,
    alt: 'An outlined rust heart below A little love on a cream canvas.',
    description: 'An editable click-to-toggle heart with outlined and filled states, a subtle scale change and reversible state transitions.',
    cues: [],
  },
  'hamburger-menu': {
    title: 'Hamburger menu — Open to explore', durationMs: 300, posterTimeMs: 0, layers: 6, tracks: 18, bytes: 14331,
    alt: 'Three rust hamburger menu bars below Open to explore on a cream canvas.',
    description: 'An editable click-to-toggle hamburger icon with closed and open states, rotating outer bars and a fading middle bar.',
    cues: [],
  },
  'progress-bar': {
    title: 'Progress bar — A little closer', durationMs: 6000, posterTimeMs: 2000, layers: 5, tracks: 3, bytes: 5661,
    alt: 'A little closer headline above a rust progress bar filling from the left on a cream canvas.',
    description: 'A six-second editable progress bar animation with a left-anchored fill and a completion message.',
    cues: [{ timeMs: 500, label: 'Empty track' }, { timeMs: 2000, label: 'Filling' }, { timeMs: 4500, label: 'Complete' }],
  },
  'success-confirmation': {
    title: 'Success — All done', durationMs: 4000, posterTimeMs: 2000, layers: 5, tracks: 6, bytes: 7388,
    alt: 'A white checkmark on a rust badge above All done and Your next step starts here.',
    description: 'A four-second editable success animation with a two-stroke checkmark reveal and a readable confirmation hold.',
    cues: [{ timeMs: 500, label: 'First stroke' }, { timeMs: 900, label: 'Checkmark reveal' }, { timeMs: 2000, label: 'Confirmation hold' }],
  },
  'codex-loading-loop': {
    title: 'Three-dot loading loop', durationMs: 4000, posterTimeMs: 1000, layers: 4, tracks: 3, bytes: 7956,
    width: 1024, height: 768, loop: true,
    alt: 'A little progress, every day above three staggered rust circles on a cream canvas.',
    description: 'A four-second seamless loading loop created with Codex and Chorono, with a static headline and three editable animated circles.',
    cues: [{ timeMs: 0, label: 'Starting positions' }, { timeMs: 1000, label: 'Staggered movement' }, { timeMs: 4000, label: 'Loop seam' }],
  },
  'ideas-in-motion': {
    title: 'Ideas in motion', durationMs: 6000, posterTimeMs: 3600, layers: 7, tracks: 9, bytes: 11856,
    alt: 'Ideas in motion title card: dark brown lettering, a rust underline and a moving circle on a cream canvas.',
    description: 'A six-second Chorono title animation with seven editable layers, an extending underline and a moving rust circle.',
    cues: [{ timeMs: 600, label: 'Title entrance' }, { timeMs: 2200, label: 'Circle in motion' }, { timeMs: 3600, label: 'Final hold' }],
  },
  'brief-to-motion': {
    title: 'Brief to motion', durationMs: 8000, posterTimeMs: 4400, layers: 18, tracks: 26, bytes: 29757,
    alt: 'Three cream cards labeled Brief, Build and Refine with a rust marker connecting the steps.',
    description: 'An eight-second process graphic with three staggered cards and a moving progress marker, built from 18 editable Chorono layers.',
    cues: [{ timeMs: 1800, label: 'Second card enters' }, { timeMs: 3000, label: 'Third card enters' }, { timeMs: 4400, label: 'Complete process' }],
  },
  'make-it-clear': {
    title: 'Make it clear', durationMs: 6000, posterTimeMs: 2600, layers: 7, tracks: 8, bytes: 9724,
    alt: 'Cream Make it clear lettering on a dark brown canvas with a rust underline and circular accent.',
    description: 'A six-second text animation with two staggered lines, an extending underline and a reading hold, built from seven editable Chorono layers.',
    cues: [{ timeMs: 600, label: 'Staggered entrance' }, { timeMs: 1600, label: 'Underline extends' }, { timeMs: 2600, label: 'Reading hold' }],
  },
  'pause-then-move': {
    title: 'Pause. Then move.', durationMs: 8000, posterTimeMs: 3600, layers: 8, tracks: 10, bytes: 12506,
    alt: 'Cream PAUSE, THEN and oversized MOVE lettering on a rust canvas beside a vertical beat marker.',
    description: 'An eight-second kinetic typography study with three word beats and a scale emphasis, built from eight editable Chorono layers.',
    cues: [{ timeMs: 1400, label: 'The second beat' }, { timeMs: 2740, label: 'Scale emphasis' }, { timeMs: 3600, label: 'Settled typography' }],
  },
} as const
export type AnimationExampleId = keyof typeof ANIMATION_EXAMPLES

// The deliverable is editable scene data, played on canvas; it is not a video file.
export function animationExampleEntities(SITE_URL: string, id: AnimationExampleId = 'ideas-in-motion') {
  const example = ANIMATION_EXAMPLES[id]
  const file = `${SITE_URL}/examples/${id}.chorono.json`
  return [
    {
      '@type': 'CreativeWork', '@id': `${SITE_URL}/examples/${id}#work`, name: `${example.title} — editable Chorono animation`,
      description: example.description,
      author: { '@id': `${SITE_URL}/#team` }, ...id === 'first-animation' ? {} : { dateModified: id === 'heart-like' || id === 'hamburger-menu' ? INTERACTIVE_EXAMPLES_PUBLISHED : id === 'progress-bar' || id === 'success-confirmation' ? UI_EXAMPLES_PUBLISHED : id === 'codex-loading-loop' ? CODEX_EXAMPLE_MODIFIED : id === 'ideas-in-motion' ? EXAMPLE_MODIFIED : USE_CASE_PUBLISHED },
      thumbnailUrl: `${SITE_URL}/examples/${id}.png`,
      isAccessibleForFree: true, encoding: { '@id': `${file}#download` }, inLanguage: 'en',
    },
    {
      '@type': 'MediaObject', '@id': `${file}#download`, name: `${example.title} portable Chorono project`,
      contentUrl: file, encodingFormat: 'application/json', contentSize: `${example.bytes} bytes`,
    },
  ]
}
