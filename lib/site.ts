import type { Metadata } from 'next'

export const SITE_URL = 'https://www.chorono.com'
export const REPOSITORY_URL = 'https://github.com/codie1982/chorono-editor'
export const SITE_TITLE = 'Chorono | Open-Source Animation Editor for AI Agents'
export const SITE_DESCRIPTION = 'Create editable 2D animations with Chorono. Use timelines, keyframes and particles, or connect Claude and Codex through MCP to build in your browser.'
export const THEME_COLOR = '#B55233'

export function pageMetadata(title: string, description: string, path = '/'): Metadata {
  const url = new URL(path, SITE_URL).href
  const guide = path === '/getting-started' || path === '/agent-skills' ? SITE_PAGES[path] : undefined
  const image = `${SITE_URL}${guide?.image ?? '/opengraph-image.png'}`
  const imageAlt = guide?.imageAlt ?? 'Chorono: create editable 2D animations with your AI agent'
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'Chorono',
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: guide ? 675 : 630, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  }
}

export const SITE_PAGES = {
  '/': {
    title: SITE_TITLE,
    headline: 'Create editable 2D animations.',
    description: SITE_DESCRIPTION,
  },
  '/getting-started': {
    title: 'Set Up the Chorono Animation Editor | Chorono',
    headline: 'Your first editable animation',
    description: 'Install the open-source Chorono editor, connect Claude or Codex through MCP, and create your first editable 2D animation on your computer.',
    intro: 'Run Chorono on your computer, connect your AI agent, and keep every layer and keyframe available for editing.',
    breadcrumb: 'Getting started',
    image: '/guides/getting-started.png',
    imageAlt: 'Chorono setup workflow: install the editor, connect MCP, then create and save an animation.',
    sections: ['1. Install the editor', '2. Start and connect', '3. Ask your agent to animate', 'Keep and reopen your work'],
    dependencies: 'Node.js 20 or later, npm, Git, a modern browser and a separately installed agent client.',
  },
  '/agent-skills': {
    title: 'Chorono Skills for Claude and Codex | Chorono',
    headline: 'Build animations with your agent',
    description: 'Learn how chorono-setup and chorono skills help Claude and Codex install the editor, create editable animations, inspect previews and save projects.',
    intro: 'Two skills teach Claude Code and Codex how to connect to Chorono and create animations that stay editable.',
    breadcrumb: 'Agent skills',
    image: '/guides/agent-skills.png',
    imageAlt: 'Chorono agent workflow: use chorono-setup, create with chorono, then save an editable project.',
    sections: ['Two skills, one workflow', 'Install the bundled skills', 'What the agent reads', 'Create, inspect, refine'],
    dependencies: 'An editor checkout and a Claude Code or Codex client; follow the setup guide to connect MCP.',
  },
} as const

export type PagePath = keyof typeof SITE_PAGES
export type GuidePath = Exclude<PagePath, '/'>

const entityIds = {
  website: `${SITE_URL}/#website`,
  software: `${SITE_URL}/#software`,
  logo: `${SITE_URL}/#logo`,
  image: `${SITE_URL}/#sharing-image`,
}

export function pageStructuredData(path: PagePath) {
  const page = SITE_PAGES[path]
  const url = new URL(path, SITE_URL).href
  const pageId = `${url}#webpage`
  const guide = path !== '/' ? SITE_PAGES[path] : undefined
  const guideImageId = guide ? `${url}#guide-image` : entityIds.image

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': entityIds.website,
        name: 'Chorono',
        alternateName: 'Chorono Animator',
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        image: { '@id': entityIds.logo },
        about: { '@id': entityIds.software },
      },
      {
        '@type': 'ImageObject',
        '@id': entityIds.logo,
        url: `${SITE_URL}/icons/chorono-512.png`,
        contentUrl: `${SITE_URL}/icons/chorono-512.png`,
        width: 512,
        height: 512,
        caption: 'Chorono logo',
        encodingFormat: 'image/png',
      },
      {
        '@type': 'ImageObject',
        '@id': entityIds.image,
        url: `${SITE_URL}/opengraph-image.png`,
        contentUrl: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        caption: 'Chorono: create editable 2D animations with your AI agent',
        encodingFormat: 'image/png',
      },
      ...(guide ? [{
        '@type': 'ImageObject',
        '@id': guideImageId,
        url: `${SITE_URL}${guide.image}`,
        contentUrl: `${SITE_URL}${guide.image}`,
        width: 1200,
        height: 675,
        caption: guide.imageAlt,
        encodingFormat: 'image/png',
      }] : []),
      {
        '@type': 'SoftwareApplication',
        '@id': entityIds.software,
        name: 'Chorono Animator',
        alternateName: 'Chorono',
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Windows, macOS, Linux',
        image: { '@id': entityIds.image },
        isAccessibleForFree: true,
        license: `${REPOSITORY_URL}/blob/main/LICENSE`,
        sameAs: REPOSITORY_URL,
        installUrl: `${SITE_URL}/getting-started`,
        softwareHelp: { '@type': 'CreativeWork', url: `${SITE_URL}/getting-started` },
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', url: REPOSITORY_URL },
        featureList: ['Editable 2D animation', 'Timelines and keyframes', 'Particle effects', 'MCP connection for AI agents', 'Preview and portable project saving'],
      },
      {
        '@type': 'WebPage',
        '@id': pageId,
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'en',
        isPartOf: { '@id': entityIds.website },
        about: { '@id': entityIds.software },
        primaryImageOfPage: { '@id': guideImageId },
        mainEntity: { '@id': guide ? `${url}#article` : entityIds.software },
        ...(guide ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      },
      ...(guide ? [
        {
          '@type': 'TechArticle',
          '@id': `${url}#article`,
          url,
          headline: guide.headline,
          image: { '@id': guideImageId },
          description: guide.description,
          articleSection: [...guide.sections],
          dependencies: guide.dependencies,
          proficiencyLevel: 'Beginner',
          inLanguage: 'en',
          isAccessibleForFree: true,
          mainEntityOfPage: { '@id': pageId },
          isPartOf: { '@id': entityIds.website },
          about: { '@id': entityIds.software },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Chorono', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: guide.breadcrumb, item: url },
          ],
        },
      ] : []),
    ],
  }
}
