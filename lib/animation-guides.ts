import { animationExampleEntities } from './animation-example'
import { editorialSiteEntities, pageMetadata, SITE_URL } from './site'

export const ANIMATION_GUIDE_DATE = '2026-11-06T20:00:00Z'
export const ANIMATION_GUIDES = {
  '/keyframe-animation': {
    title: 'Keyframe Animation: A Practical Guide & Example | Chorono',
    headline: 'Keyframe animation, explained with a real project',
    label: 'Keyframe animation',
    description: 'Learn how keyframe animation works with a real editable project. Inspect position, opacity and timing, then change the animation in Chorono’s free editor.',
    intro: 'Keyframe animation records a property’s value at specific times. The animation system calculates the values between those points. Start with two positions, then adjust the timing and easing to control how an object gets from one to the other.',
    sections: ['What is a keyframe?', 'Read the keyframes in a real animation', 'Build your first keyframe animation', 'Timing, spacing and easing do different jobs', 'A checklist for debugging keyframes'],
  },
  '/animation-easing': {
    title: 'Animation Easing: Compare Curves & Examples | Chorono',
    headline: 'Animation easing: see how speed changes the motion',
    label: 'Animation easing',
    description: 'Compare linear, ease-in, ease-out and ease-in-out animation. Scrub an interactive easing example, inspect the curves and apply them to an editable Chorono project.',
    intro: 'Animation easing controls how progress changes between keyframes. Two objects can start together, travel the same distance and finish together, yet feel different because one accelerates while the other slows down. Compare those choices before adding more keyframes.',
    sections: ['Compare four easing curves', 'Choose an easing for the action', 'Find easing in a real Chorono project', 'Change the curve without changing the brief', 'Review the movement in context'],
  },
} as const
export type AnimationGuidePath = keyof typeof ANIMATION_GUIDES

export function animationGuideMetadata(path: AnimationGuidePath) {
  const page = ANIMATION_GUIDES[path]
  return pageMetadata(page.title, page.description, path, { image: '/examples/ideas-in-motion.png', imageAlt: 'Ideas in motion: an editable Chorono title with a rust circle and underline.' })
}

export function animationGuideStructuredData(path: AnimationGuidePath) {
  const page = ANIMATION_GUIDES[path]
  const url = `${SITE_URL}${path}`
  const image = `${SITE_URL}/examples/ideas-in-motion.png`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...editorialSiteEntities(),
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: 'en', isPartOf: { '@id': `${SITE_URL}/#website` }, primaryImageOfPage: { '@id': `${url}#image` }, mainEntity: { '@id': `${url}#article` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'ImageObject', '@id': `${url}#image`, url: image, contentUrl: image, width: 1200, height: 675, caption: 'Ideas in motion — editable Chorono animation', encodingFormat: 'image/png' },
      { '@type': 'TechArticle', '@id': `${url}#article`, url, headline: page.headline, description: page.description, image: { '@id': `${url}#image` }, author: { '@id': `${SITE_URL}/#team` }, publisher: { '@id': `${SITE_URL}/#team` }, datePublished: ANIMATION_GUIDE_DATE, dateModified: ANIMATION_GUIDE_DATE, inLanguage: 'en', isAccessibleForFree: true, proficiencyLevel: 'Beginner', dependencies: 'A local Chorono editor to edit the downloadable example; previews can be inspected on this page.', articleSection: [...page.sections], mainEntityOfPage: { '@id': `${url}#webpage` }, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#software` }, hasPart: { '@id': `${SITE_URL}/examples/ideas-in-motion#work` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Chorono', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: page.label, item: url }] },
      ...animationExampleEntities(SITE_URL),
    ],
  }
}
