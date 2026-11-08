import { findDocumentationPage, type DocumentationPage } from './manifest'

/** Curated task relationships, separate from the linear previous/next order. */
const relatedSlugs: Readonly<Record<string, readonly string[]>> = {
  '': ['installation', 'first-animation', 'ai/mcp'],
  installation: ['first-animation', 'ai/mcp', 'troubleshooting'],
  'first-animation': ['editor/keyframes', 'editor/timeline', 'animation/loops'],
  'editor/keyframes': ['editor/timeline', 'animation/loops', 'scripting'],
  'editor/timeline': ['editor/keyframes', 'animation/loops', 'scripting'],
  'animation/loops': ['editor/keyframes', 'editor/timeline', 'ai/mcp'],
  'ai/mcp': ['installation', 'ai/skills', 'scripting'],
  'ai/skills': ['ai/mcp', 'scripting', 'troubleshooting'],
  scripting: ['editor/keyframes', 'ai/mcp', 'animation/loops'],
  troubleshooting: ['installation', 'ai/mcp', 'releases/0.2.0'],
  'releases/0.2.0': ['installation', 'first-animation', 'troubleshooting'],
}

/** Reserved reader-section anchor shared by the related cards and contents rail. */
export const relatedGuidesHeading = {
  id: 'docs-related-guides',
  text: 'Related guides',
  depth: 2,
} as const

/**
 * Resolve editorially selected follow-up tasks in stable order. Unknown input
 * returns no recommendations. An invalid configured target throws during the
 * build rather than silently producing a broken link. Returned page records
 * are shared readonly manifest values; callers do not own mutable copies.
 */
export function getRelatedDocumentation(
  slug: string
): readonly DocumentationPage[] {
  return (relatedSlugs[slug] ?? []).map((target) => {
    const page = findDocumentationPage(target)
    if (!page)
      throw new Error(`Unknown related documentation target: ${target}`)
    return page
  })
}
