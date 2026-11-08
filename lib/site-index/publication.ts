import { SITE_URL } from '@/lib/site'
import type { Metadata } from "next";

/**
 * New docs/library content defaults to noindex and stays outside the live
 * sitemap. Existing public page groups remain available. An explicit release
 * supplies the site's HTTPS origin and rebuilds so static page metadata and
 * sitemap eligibility use one configuration. This helper never deploys.
 */
export function publicContentOrigin(): string | null {
  if (process.env.VERCEL_ENV === "preview" || process.env.CHORONO_PUBLISH_CONTENT !== "true") return null;
  const value = process.env.CHORONO_CONTENT_ORIGIN;
  if (!value)
    throw new Error("CHORONO_CONTENT_ORIGIN is required for public content.");
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1"
  ) {
    throw new Error(
      "Public content requires an HTTPS origin without a path or credentials.",
    );
  }
  if (url.origin !== SITE_URL) throw new Error('Content origin must match the existing website canonical origin.')
  return url.origin;
}

/** Keep robots and preferred-URL metadata consistent with sitemap publication. */
export function contentPublicationMetadata(path?: string): Metadata {
  const origin = publicContentOrigin();
  return {
    robots: { index: !!origin, follow: !!origin },
    ...(path
      ? { alternates: { canonical: new URL(path, SITE_URL).href } }
      : {}),
  };
}
