import type { Metadata } from 'next'
import { SITE_URL, pageMetadata } from '@/lib/site'
import { contentPublicationMetadata } from '@/lib/site-index/publication'
import {
  SKILL_CATALOG_DESCRIPTION, SKILL_CATALOG_PATH,
  skillBreadcrumbs, skillExampleLibraryHref, skillExampleMedia, skillExamples, type SkillExample,
} from './catalog'

const absolute = (path: string) => new URL(path, SITE_URL).href
const pageTitle = (example?: SkillExample) => example
  ? `${example.title}: ${example.category} Prompt & Project | Chorono`
  : 'Animation Prompt Examples for Claude Code & Codex | Chorono'

/** Both views share canonical URLs. The redesign preview stays noindex in production as well. */
export function skillCatalogMetadata(example?: SkillExample, preview = false): Metadata {
  const path = example ? skillExampleLibraryHref(example) : SKILL_CATALOG_PATH
  const cover = example ?? skillExamples[0]
  const scale = cover ? Math.min(1, 1200 / Math.max(cover.width, cover.height)) : 1
  return {
    ...pageMetadata(pageTitle(example), example?.description ?? SKILL_CATALOG_DESCRIPTION, path,
      cover ? { image: skillExampleMedia(cover.slug).poster, imageAlt: cover.posterAlt, imageWidth: Math.round(cover.width * scale), imageHeight: Math.round(cover.height * scale) } : undefined),
    title: { absolute: pageTitle(example) },
    ...contentPublicationMetadata(path),
    ...(preview ? { robots: { index: false, follow: false } } : {}),
  }
}

export function skillCatalogStructuredData(example: SkillExample) {
  const crumbs = skillBreadcrumbs(example)
  const url = absolute(crumbs[crumbs.length - 1].path)
  const breadcrumbId = `${url}#breadcrumb`
  const breadcrumbs = {
    '@type': 'BreadcrumbList', '@id': breadcrumbId,
    itemListElement: crumbs.map(({ label, path }, index) => ({
      '@type': 'ListItem', position: index + 1, name: label, item: absolute(path),
    })),
  }
  const page = {
    '@id': `${url}#webpage`, url, inLanguage: 'en', breadcrumb: { '@id': breadcrumbId },
  }
  const media = skillExampleMedia(example.slug)
  const videoId = `${url}#video`
  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbs, {
      ...page, '@type': 'WebPage', name: example.title, description: example.description,
      mainEntity: { '@id': videoId },
      isPartOf: { '@id': `${absolute(SKILL_CATALOG_PATH)}#webpage` },
    }, {
      '@type': 'VideoObject', '@id': videoId, name: `${example.title} — ${example.category}`,
      description: example.description, thumbnailUrl: absolute(media.poster), contentUrl: absolute(media.video),
      uploadDate: example.mediaAdded, duration: `PT${example.durationSeconds}S`,
    }],
  }
}
