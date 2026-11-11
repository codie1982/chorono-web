import { pageMetadata } from '@/lib/site'
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadDocumentation } from "@/lib/documentation/loader";
import { documentationPages } from "@/lib/documentation/manifest";
import { DocumentationArticle } from "@/components/documentation/DocumentationArticle";
import { contentPublicationMetadata } from "@/lib/site-index/publication";
import { documentationHref } from "@/lib/documentation/manifest";

export const dynamicParams = false;

/** Statically enumerate only the curated English source-backed articles. */
export function generateStaticParams() {
  return documentationPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : [],
  }));
}

/** Per-article search metadata comes from the same manifest as navigation. */
export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const article = await loadDocumentation(params.slug?.join("/") ?? "");
  if (!article) return { title: "Page not found" };
  return {
    ...pageMetadata(article.page.title, article.page.description, documentationHref(article.page.slug)),
    ...contentPublicationMetadata(documentationHref(article.page.slug), article.page.availability !== 'coming-soon'),
  };
}

/** Resolve a curated slug to one Markdown article, or return Next's real 404. */
export default async function DocumentationPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const article = await loadDocumentation(params.slug?.join("/") ?? "");
  if (!article) notFound();
  return <DocumentationArticle article={article} />;
}
