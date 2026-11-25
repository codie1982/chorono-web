import { LibraryShowcase, libraryDescription, libraryTitle } from '@/components/animation-library/LibraryShowcase'
import { ANIMATION_LIBRARY_PATH } from '@/lib/animation-library/routes'
import { pageMetadata } from '@/lib/site'
import { contentPublicationMetadata } from '@/lib/site-index/publication'

export const metadata = {
  ...pageMetadata(`${libraryTitle} | Chorono`, libraryDescription, ANIMATION_LIBRARY_PATH),
  ...contentPublicationMetadata(ANIMATION_LIBRARY_PATH),
}

export default function AnimationLibraryPage() {
  return <LibraryShowcase />
}
