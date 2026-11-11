import { documentationPages, findDocumentationPage, type DocumentationPage } from './manifest'

/** Curated task relationships, separate from the linear previous/next order. */
const relatedSlugs: Readonly<Record<string, readonly string[]>> = {
  '': ['installation', 'first-animation', 'editor'],
  installation: ['first-animation', 'ai/mcp', 'troubleshooting'],
  'first-animation': ['editor/keyframes', 'editor/timeline', 'animation/loops'],
  'editor/keyframes': ['editor/timeline', 'animation/loops', 'scripting'],
  'editor/timeline': ['editor/keyframes', 'animation/loops', 'scripting'],
  'animation/loops': ['editor/keyframes', 'editor/timeline', 'ai/mcp'],
  'ai/mcp': ['installation', 'ai/skills', 'scripting'],
  'ai/skills': ['ai/mcp', 'scripting', 'troubleshooting'],
  scripting: ['editor/keyframes', 'ai/mcp', 'integrations'],
  troubleshooting: ['installation', 'ai/mcp', 'releases/0.2.0'],
  'releases/0.2.0': ['installation', 'first-animation', 'troubleshooting'],
  "editor": ["editor/projects", "editor/layers", "editor/properties"],
  "editor/canvas": ["editor/layers", "editor/properties", "editor/keyframes"],
  "editor/layers": ["editor/canvas", "editor/properties", "editor/resources"],
  "editor/properties": ["editor/keyframes", "editor/state-machines", "editor/layers"],
  "editor/resources": ["editor", "export/images", "runtime/downloads"],
  "editor/state-machines": ["editor/timeline", "export/runtime-json", "runtime/javascript"],
  "integrations": ["ai/mcp", "runtime", "export"],
  "runtime": ["runtime/javascript", "runtime/downloads", "export/runtime-json"],
  "runtime/javascript": ["runtime/react", "runtime/vue", "runtime/downloads"],
  "runtime/react": ["runtime/javascript", "runtime/vue", "export/runtime-json"],
  "runtime/vue": ["runtime/javascript", "runtime/react", "runtime/downloads"],
  "runtime/downloads": ["runtime/android", "runtime", "runtime/javascript"],
  "export": ["export/project-json", "export/runtime-json", "export/images"],
  "export/project-json": ["first-animation", "export/runtime-json", "export/html"],
  "export/runtime-json": ["runtime/javascript", "export/project-json", "runtime"],
  "export/images": ["editor/timeline", "export/html", "export"],
  "export/html": ["export/project-json", "runtime/javascript", "export/images"],
}

/** Reserved reader-section anchor shared by the related cards and contents rail. */
export const relatedGuidesHeading = {
  id: 'docs-related-guides',
  text: 'Related guides',
  depth: 2,
} as const

/**
 * Resolve curated tasks or explicit parent/sibling relationships in stable order. Unknown input
 * returns no recommendations. An invalid configured target throws during the
 * build rather than silently producing a broken link. Returned page records
 * are shared readonly manifest values; callers do not own mutable copies.
 */
export function getRelatedDocumentation(
  slug: string
): readonly DocumentationPage[] {
  const current = findDocumentationPage(slug)
  if (!current) return []
  const children = documentationPages.filter(page => page.parentSlug === slug)
  const peers = documentationPages.filter(page => page.section === current.section && page.parentSlug === current.parentSlug)
  const nextPeer = peers.length > 1 ? peers[(peers.indexOf(current) + 1) % peers.length] : undefined
  const candidates = relatedSlugs[slug] ?? [
    ...children.slice(0, 1).map(page => page.slug),
    ...(nextPeer ? [nextPeer.slug] : []),
    ...(current.parentSlug ? [current.parentSlug] : []),
    ...peers.map(page => page.slug),
    'editor', 'first-animation', 'export',
  ]
  return [...new Set(candidates)].filter(target => target !== slug).slice(0, 3).map((target) => {
    const page = findDocumentationPage(target)
    if (!page)
      throw new Error(`Unknown related documentation target: ${target}`)
    return page
  })
}
