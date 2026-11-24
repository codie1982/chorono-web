import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnimationDetail } from '@/components/animation-library/AnimationDetail'
import { animationEntries, animationHref, findAnimation } from '@/lib/animation-library/catalog'
import { loadAnimation } from '@/lib/animation-library/loader'
import { LibraryCollection } from '@/components/animation-library/LibraryShowcase'
import { collectionIsIndexable, findShowcaseCollection, showcaseCollections } from '@/lib/animation-library/showcase'
import { showcaseCollectionHref } from '@/lib/animation-library/routes'
import { pageMetadata } from '@/lib/site'
import { contentPublicationMetadata } from '@/lib/site-index/publication'

type Props = { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return [...showcaseCollections, ...animationEntries].map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = findAnimation(params.slug)
  if (entry) {
    const path = animationHref(entry.slug)
    const image = entry.preview.kind === 'video' ? { image: entry.preview.poster, imageAlt: entry.preview.alt } : undefined
    return { ...pageMetadata(entry.searchTitle ?? entry.title, entry.description, path, image), ...contentPublicationMetadata(path) }
  }
  const collection = findShowcaseCollection(params.slug)
  if (!collection) return {}
  const path = showcaseCollectionHref(collection.slug)
  return {
    ...pageMetadata(collection.title, collection.description, path, { image: collection.cover.src, imageAlt: collection.cover.alt }),
    ...contentPublicationMetadata(path, collectionIsIndexable(collection)),
  }
}

export default async function AnimationCollectionPage({ params }: Props) {
  const animation = findAnimation(params.slug) ? await loadAnimation(params.slug) : null
  if (animation) return <AnimationDetail animation={animation} />
  const collection = findShowcaseCollection(params.slug)
  if (!collection) notFound()
  return <LibraryCollection collection={collection} />
}
