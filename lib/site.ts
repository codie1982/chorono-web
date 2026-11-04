import type { Metadata } from 'next'

export const SITE_URL = 'https://www.chorono.com'
export const REPOSITORY_URL = 'https://github.com/codie1982/chorono-editor'
export const SITE_TITLE = 'Chorono | Open-Source Animation Editor for AI Agents'
export const SITE_DESCRIPTION = 'Create editable 2D animations with Chorono. Use timelines, keyframes and particles, or connect Claude and Codex through MCP to build in your browser.'
export const THEME_COLOR = '#B55233'

export function pageMetadata(title: string, description: string, path = '/'): Metadata {
  const url = new URL(path, SITE_URL).href
  const image = `${SITE_URL}/opengraph-image.png`
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
      images: [{ url: image, width: 1200, height: 630, alt: 'Chorono: create editable 2D animations with your AI agent' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image, alt: 'Chorono: create editable 2D animations with your AI agent' }],
    },
  }
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Chorono',
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'Chorono Animator',
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Windows, macOS, Linux',
      image: `${SITE_URL}/opengraph-image.png`,
      isAccessibleForFree: true,
      license: `${REPOSITORY_URL}/blob/main/LICENSE`,
      sameAs: REPOSITORY_URL,
      installUrl: `${SITE_URL}/getting-started`,
      softwareHelp: { '@type': 'CreativeWork', url: `${SITE_URL}/getting-started` },
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', url: REPOSITORY_URL },
      featureList: ['Editable 2D animation', 'Timelines and keyframes', 'Particle effects', 'MCP connection for AI agents', 'Preview and portable project saving'],
    },
  ],
}
