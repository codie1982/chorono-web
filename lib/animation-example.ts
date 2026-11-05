export const EXAMPLE_MODIFIED = '2026-11-05T11:09:14Z'
export const EXAMPLE_ID_PATH = '/examples/ideas-in-motion#work'

// The deliverable is editable scene data, played on canvas; it is not a video file.
export function animationExampleEntities(SITE_URL: string) {
  const file = `${SITE_URL}/examples/ideas-in-motion.chorono.json`
  return [
    {
      '@type': 'CreativeWork', '@id': `${SITE_URL}${EXAMPLE_ID_PATH}`, name: 'Ideas in motion — editable text animation',
      description: 'A six-second Chorono title animation with seven editable layers, an extending underline and a moving rust circle.',
      author: { '@id': `${SITE_URL}/#team` }, dateModified: EXAMPLE_MODIFIED,
      thumbnailUrl: `${SITE_URL}/examples/ideas-in-motion.png`,
      isAccessibleForFree: true, encoding: { '@id': `${file}#download` }, inLanguage: 'en',
    },
    {
      '@type': 'MediaObject', '@id': `${file}#download`, name: 'Ideas in motion portable Chorono project',
      contentUrl: file, encodingFormat: 'application/json', contentSize: '11856 bytes',
    },
  ]
}
