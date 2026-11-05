import { ANIMATION_EXAMPLES, animationExampleEntities, USE_CASE_PUBLISHED, type AnimationExampleId } from './animation-example'
import { editorialSiteEntities, pageMetadata, SITE_URL } from './site'

export const USE_CASES = {
  '/motion-graphics-software': {
    title: 'Motion Graphics Software with Editable Projects | Chorono',
    headline: 'Motion graphics software for work you can keep editing',
    label: 'Motion graphics software', exampleId: 'brief-to-motion',
    description: 'Explore Chorono’s editable 2D motion graphics workflow. Play a real process animation, download its project and see where the editor and AI agents fit.',
    intro: 'Chorono is open-source motion graphics software for building 2D scenes from text, shapes and keyframes. Work directly in the browser editor or connect Claude Code or Codex to create and revise the same scene. Start with a real project before deciding whether the workflow fits your work.',
    sections: ['A process graphic you can inspect', 'What this project shows about the editor', 'Choose software around your delivery needs', 'Build and revise the process graphic', 'Keep an editable source and a playback export'],
  },
  '/text-animation': {
    title: 'Text Animation: Editable Example & Timing Guide | Chorono',
    headline: 'Text animation that gives the words time to land',
    label: 'Text animation', exampleId: 'make-it-clear',
    description: 'Make readable text animation with an editable Chorono example. Inspect the staggered entrance, adapt the prompt and download the complete title project.',
    intro: 'Text animation changes how written words appear over time. A fade, a short slide or a stagger can introduce a message without making it harder to read. This six-second example keeps the entrance brief, then leaves the completed title still for the reader.',
    sections: ['Play the Make it clear title', 'Choose an entrance that suits the message', 'Read the timing of this text animation', 'Make this title your own', 'Check reading time, contrast and small screens'],
  },
  '/kinetic-typography': {
    title: 'Kinetic Typography: Word Beats & Editable Example | Chorono',
    headline: 'Kinetic typography: make timing carry the meaning',
    label: 'Kinetic typography', exampleId: 'pause-then-move',
    description: 'Learn kinetic typography through an editable three-word study. Inspect word beats, scale and reading rhythm, then download the Chorono project.',
    intro: 'Kinetic typography uses moving type to express emphasis, pace and relationships between words. In this study, “PAUSE.” arrives first, “THEN” creates a turn, and “MOVE.” grows into the largest word. The design makes a short sentence unfold rather than revealing every word at once.',
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
      { '@type': 'TechArticle', '@id': `${url}#article`, url, headline: page.headline, description: page.description, image: { '@id': `${url}#image` }, author: { '@id': `${SITE_URL}/#team` }, publisher: { '@id': `${SITE_URL}/#team` }, datePublished: USE_CASE_PUBLISHED, dateModified: USE_CASE_PUBLISHED, inLanguage: 'en', isAccessibleForFree: true, proficiencyLevel: 'Beginner', dependencies: 'A local Chorono editor for editing the portable project; the preview plays directly on this page.', articleSection: [...page.sections], mainEntityOfPage: { '@id': `${url}#webpage` }, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#software` }, hasPart: { '@id': `${SITE_URL}/examples/${page.exampleId}#work` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Chorono', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: page.label, item: url }] },
      ...animationExampleEntities(SITE_URL, page.exampleId as AnimationExampleId),
    ],
  }
}
