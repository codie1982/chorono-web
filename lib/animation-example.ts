export const EXAMPLE_MODIFIED = '2026-11-05T11:09:14Z'
export const EXAMPLE_ID_PATH = '/examples/ideas-in-motion#work'
export const USE_CASE_PUBLISHED = '2026-11-05T11:38:33Z'
export const USE_CASE_UPDATED = '2026-11-05T12:14:37Z'

export const ANIMATION_EXAMPLES = {
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
      author: { '@id': `${SITE_URL}/#team` }, dateModified: id === 'ideas-in-motion' ? EXAMPLE_MODIFIED : USE_CASE_PUBLISHED,
      thumbnailUrl: `${SITE_URL}/examples/${id}.png`,
      isAccessibleForFree: true, encoding: { '@id': `${file}#download` }, inLanguage: 'en',
    },
    {
      '@type': 'MediaObject', '@id': `${file}#download`, name: `${example.title} portable Chorono project`,
      contentUrl: file, encodingFormat: 'application/json', contentSize: `${example.bytes} bytes`,
    },
  ]
}
