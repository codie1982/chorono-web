import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { prepareDocumentation } from "./content";
import { documentationPages, findDocumentationPage } from "./manifest";
import { animationEntries } from "@/lib/animation-library/catalog";
import { loadAnimation } from "@/lib/animation-library/loader";

/**
 * Read an allowlisted source on the server and memoize per React render.
 * Unknown slugs return null; I/O errors propagate to Next's error handling.
 * Repository sources remain authoritative and never enter mutable UI state.
 */
export const loadDocumentation = cache(async (slug: string) => {
  const page = findDocumentationPage(slug);
  if (!page) return null;
  const markdown = await readFile(
    path.join(process.cwd(), page.source),
    "utf8",
  );
  return { page, ...prepareDocumentation(markdown, page) };
});

/** Build the bounded client-side search payload from the same reader sources. */
export const loadDocumentationSearch = cache(async () => {
  const documents = await Promise.all(
    documentationPages.map((page) => loadDocumentation(page.slug)),
  );
  return documents.flatMap((document) => document?.search ?? []);
});

/** Reuse basic timeline examples for beginner guides. Interactive entries keep their dedicated detail preview. */
export const loadDocumentationExample = cache(async (slug: string) => {
  const entry = animationEntries.find((item) => item.guideSlug === slug && item.preview.kind === 'example');
  if (!entry || entry.preview.kind !== 'example') return null;
  const animation = await loadAnimation(entry.slug);
  if (!animation) return null;
  return {
    title: entry.title,
    exampleId: entry.preview.exampleId,
    initialTimeMs: entry.initialTimeMs,
    slug: entry.slug,
    json: animation.json,
  };
});
