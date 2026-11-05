import { ANIMATION_EXAMPLES, animationExampleEntities, USE_CASE_PUBLISHED, USE_CASE_UPDATED, type AnimationExampleId } from './animation-example'
import { editorialSiteEntities, pageMetadata, SITE_URL } from './site'

export const USE_CASES = {
  '/motion-graphics-software': {
    title: 'Free Open-Source Motion Graphics Software | Chorono',
    headline: 'Free, open-source motion graphics software',
    label: 'Motion graphics software', exampleId: 'brief-to-motion',
    description: 'Create 2D motion graphics with Chorono’s free, open-source editor. Play a real example, download its editable project and build with Claude Code or Codex.',
    intro: 'Chorono is free, open-source motion graphics software for building 2D scenes from text, shapes and keyframes. Work directly in the browser editor or connect Claude Code or Codex to create and revise the same scene. Start with a real project before deciding whether the workflow fits your work.',
    sections: ['A process graphic you can inspect', 'What this project shows about the editor', 'Choose software around your delivery needs', 'Build and revise the process graphic', 'Keep an editable source and a playback export'],
  },
  '/text-animation': {
    title: 'Free Text Animation Editor & Editable Example | Chorono',
    headline: 'Free text animation with editable source files',
    label: 'Text animation', exampleId: 'make-it-clear',
    description: 'Create text animation with Chorono’s free, open-source editor. Inspect a real title, adapt its timing and download the complete editable project.',
    intro: 'Make text animation with Chorono’s free, open-source editor and keep the words, layers and keyframes editable. A fade, a short slide or a stagger can introduce a message without making it harder to read. This six-second example keeps the entrance brief, then leaves the completed title still for the reader.',
    sections: ['Play the Make it clear title', 'Choose an entrance that suits the message', 'Read the timing of this text animation', 'Make this title your own', 'Check reading time, contrast and small screens'],
  },
  '/kinetic-typography': {
    title: 'Free Kinetic Typography Editor & Example | Chorono',
    headline: 'Kinetic typography with a free, open-source editor',
    label: 'Kinetic typography', exampleId: 'pause-then-move',
    description: 'Create kinetic typography with Chorono’s free, open-source editor. Explore word beats and scale emphasis, then download a real editable project.',
    intro: 'Use Chorono’s free, open-source editor to explore how moving type expresses emphasis and pace. In this study, “PAUSE.” arrives first, “THEN” creates a turn, and “MOVE.” grows into the largest word. Download the project to change the words and their timing yourself.',
    sections: ['Inspect Pause. Then move.', 'Turn a sentence into a visual reading rhythm', 'Break down the three word beats', 'Change the emphasis without losing the sentence', 'Review movement, sound and the final hold'],
  },
} as const
export type UseCasePath = keyof typeof USE_CASES

export function useCaseMetadata(path: UseCasePath) {
  const page = USE_CASES[path]
  const example = ANIMATION_EXAMPLES[page.exampleId]
  return pageMetadata(page.title, page.description, path, { image: `/examples/${page.exampleId}.png`, imageAlt: example.alt })
}

export function useCaseStructuredData(path: UseCasePath) {
  const page = USE_CASES[path]
  const url = `${SITE_URL}${path}`
  const image = `${SITE_URL}/examples/${page.exampleId}.png`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...editorialSiteEntities(),
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: 'en', isPartOf: { '@id': `${SITE_URL}/#website` }, primaryImageOfPage: { '@id': `${url}#image` }, mainEntity: { '@id': `${url}#article` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'ImageObject', '@id': `${url}#image`, url: image, contentUrl: image, width: 1200, height: 675, caption: ANIMATION_EXAMPLES[page.exampleId].alt, encodingFormat: 'image/png' },
      { '@type': 'TechArticle', '@id': `${url}#article`, url, headline: page.headline, description: page.description, image: { '@id': `${url}#image` }, author: { '@id': `${SITE_URL}/#team` }, publisher: { '@id': `${SITE_URL}/#team` }, datePublished: USE_CASE_PUBLISHED, dateModified: USE_CASE_UPDATED, inLanguage: 'en', isAccessibleForFree: true, proficiencyLevel: 'Beginner', dependencies: 'A local Chorono editor for editing the portable project; the preview plays directly on this page.', articleSection: [...page.sections], mainEntityOfPage: { '@id': `${url}#webpage` }, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#software` }, hasPart: { '@id': `${SITE_URL}/examples/${page.exampleId}#work` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Chorono', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: page.label, item: url }] },
      ...animationExampleEntities(SITE_URL, page.exampleId as AnimationExampleId),
    ],
  }
}
