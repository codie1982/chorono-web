import { pageMetadata } from '@/lib/site'
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  animationEntries,
  animationHref,
  findAnimation,
} from "@/lib/animation-library/catalog";
import { contentPublicationMetadata } from "@/lib/site-index/publication";
import { loadAnimation } from "@/lib/animation-library/loader";
import { AnimationDetail } from "@/components/animation-library/AnimationDetail";

export const dynamicParams = false;

/** Generate exactly the reviewed entries; unknown and placeholder slugs are real 404s. */
export function generateStaticParams() {
  return animationEntries.map(({ slug }) => ({ slug }));
}

/** Keep descriptive search metadata aligned with each animation's actual content. */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const entry = findAnimation(params.slug);
  return entry
    ? {
        ...pageMetadata(entry.title, entry.description, animationHref(entry.slug)),
        ...contentPublicationMetadata(animationHref(entry.slug)),
      }
    : { title: "Animation not found" };
}

/** Resolve one source-backed scene with its download and relevant editing guide. */
export default async function AnimationPage({
  params,
}: {
  params: { slug: string };
}) {
  const animation = await loadAnimation(params.slug);
  if (!animation) notFound();
  return <AnimationDetail animation={animation} />;
}
