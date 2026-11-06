import { ANIMATION_EXAMPLES, animationExampleEntities, USE_CASE_PUBLISHED, USE_CASE_UPDATED, type AnimationExampleId } from './animation-example'
import { editorialSiteEntities, pageMetadata, SITE_URL } from './site'

export const USE_CASES = {
  '/motion-graphics-software': {
    title: 'Free Open-Source Motion Graphics Software | Chorono',
    headline: 'Free, open-source motion graphics software',
    label: 'Motion graphics software', exampleId: 'brief-to-motion',
    description: 'Explore free, open-source motion graphics software for editable 2D scenes. Compare workflow and output needs, play an example and download its project.',
    intro: 'Chorono is free, open-source motion graphics software for animated titles, process diagrams and 2D text-and-shape scenes. Run the editor locally in your browser, work with layers and keyframes, or connect Claude Code or Codex through MCP. Inspect a working project and compare the editing and delivery workflow with the motion graphics tools your task needs.',
    sections: ['A process graphic you can inspect', 'What this project shows about the editor', 'What can you make with these motion graphics tools?', 'Compare motion graphics programs around your delivery needs', 'Build and revise the process graphic', 'Keep an editable source and a playback export'],
    sectionIds: ['example', 'editor-workflow', 'motion-graphics-projects', 'choose-your-workflow', 'build-and-revise', 'source-and-playback'],
  },
  '/text-animation': {
    title: 'Free Text Animation Editor: Create Animated Text | Chorono',
    headline: 'Free text animation with editable source files',
    label: 'Text animation', exampleId: 'make-it-clear',
    description: 'Create animated text with Chorono’s free text animation editor. Download an editable title, change the words and compare fades, slides and staggered timing.',
    intro: 'Create animated text with Chorono’s free, open-source text animation editor. Keep the words, text layers and keyframes editable while you adjust a fade, slide or stagger. The editor runs locally in your browser after setup. Start with this downloadable six-second title, then change the wording and timing to suit your message.',
    sections: ['Play the Make it clear title', 'Choose an entrance that suits the message', 'Read the timing of this text animation', 'How to create animated text in Chorono', 'Choose a text animator around your next edit', 'Check reading time, contrast and small screens'],
    sectionIds: ['example', 'choose-an-entrance', 'timing', 'adapt-the-project', 'choose-a-text-animator', 'readability-check'],
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

// Editorial revisions have their own dates; the downloadable scenes retain theirs.
export const USE_CASE_CONTENT_UPDATED: Record<UseCasePath, string> = {
  '/motion-graphics-software': '2026-11-06T20:32:00Z',
  '/text-animation': '2026-11-06T20:32:00Z',
  '/kinetic-typography': USE_CASE_UPDATED,
}

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
      { '@type': 'TechArticle', '@id': `${url}#article`, url, headline: page.headline, description: page.description, image: { '@id': `${url}#image` }, author: { '@id': `${SITE_URL}/#team` }, publisher: { '@id': `${SITE_URL}/#team` }, datePublished: USE_CASE_PUBLISHED, dateModified: USE_CASE_CONTENT_UPDATED[path], inLanguage: 'en', isAccessibleForFree: true, proficiencyLevel: 'Beginner', dependencies: 'A local Chorono editor for editing the portable project; the preview plays directly on this page.', articleSection: [...page.sections], mainEntityOfPage: { '@id': `${url}#webpage` }, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#software` }, hasPart: { '@id': `${SITE_URL}/examples/${page.exampleId}#work` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Chorono', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: page.label, item: url }] },
      ...animationExampleEntities(SITE_URL, page.exampleId as AnimationExampleId),
    ],
  }
}
