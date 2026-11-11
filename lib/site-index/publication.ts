import { SITE_URL } from '@/lib/site'
import type { Metadata } from "next";

/**
 * Publish reviewed docs/library content only in Vercel's production environment.
 * Local builds (including `next start`), development and preview deployments
 * stay noindex and omit these topics from the public sitemap. NODE_ENV and the
 * former CHORONO_* release flags cannot opt those environments into indexing.
 * The canonical origin always comes from SITE_URL, never a deployment hostname.
 * Static metadata and sitemaps share this gate; environment changes need a rebuild.
 */
export function publicContentOrigin(): string | null {
  return process.env.VERCEL_ENV === "production" ? SITE_URL : null;
}

/** Keep robots and preferred-URL metadata consistent with sitemap publication.
 * indexable=false leaves a public status page readable and followable while
 * preventing search indexing. The default preserves existing docs/library
 * callers. All nonproduction pages retain noindex/nofollow regardless. */
export function contentPublicationMetadata(path?: string, indexable = true): Metadata {
  const origin = publicContentOrigin();
  return {
    robots: { index: !!origin && indexable, follow: !!origin },
    ...(path
      ? { alternates: { canonical: new URL(path, SITE_URL).href } }
      : {}),
  };
}
