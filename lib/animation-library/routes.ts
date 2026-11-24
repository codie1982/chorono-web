export const ANIMATION_LIBRARY_PATH = '/animations'
export const ANIMATION_SKILLS_PATH = `${ANIMATION_LIBRARY_PATH}/skills`
export const ANIMATION_RENDER_PATH = `${ANIMATION_LIBRARY_PATH}/chorono-render`

export const showcaseCategoryNames = {
  'style-animations': 'Style animations',
  'interactive-web': 'Interactive web',
  'long-form': 'Long-form animations',
  games: 'Games',
  freeform: 'Freeform studies',
  '2d-3d-compositing': '2D / 3D Compositing',
  'chorono-render': 'Chorono Render',
} as const

export type ShowcaseCategoryId = keyof typeof showcaseCategoryNames

export function showcaseCollectionHref(slug: string) {
  return `${ANIMATION_LIBRARY_PATH}/${slug}`
}

export function showcaseDetailHref(category: ShowcaseCategoryId, slug: string) {
  return `${showcaseCollectionHref(category)}/${slug}`
}

export function animationDownloadHref(slug: string) {
  return `${showcaseCollectionHref(slug)}/download`
}
