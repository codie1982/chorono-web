import { existingSitemapEntries } from './existing'
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  sitemapTopics,
  serializeSitemap,
  publishedSitemapResponse,
} from "./sitemap";
import { contentPublicationMetadata, publicContentOrigin } from "./publication";

afterEach(() => vi.unstubAllEnvs());

describe("publication and topic sitemap contract", () => {
  it("covers existing and migrated reviewed HTML routes exactly once without downloads or query URLs", () => {
    const paths = sitemapTopics.flatMap((topic) => topic.paths);
    expect(paths).toHaveLength(29);
    expect(paths).toContain('/animations/interactive-motion-crew');
    expect(new Set(paths).size).toBe(paths.length);
    expect(
      paths.every((path) => !path.includes("?") && !path.endsWith("/download")),
    ).toBe(true);
    for (const topic of sitemapTopics) {
      expect(serializeSitemap("https://www.chorono.com", topic.file, true)).toContain(
        `<loc>https://www.chorono.com${topic.paths[0]}</loc>`,
      );
    }
    const index = serializeSitemap("https://www.chorono.com", "sitemap.xml", false, true)!;
    expect(index.match(/<sitemap>/g)).toHaveLength(8);
    expect(index).toContain("https://www.chorono.com/sitemap-animations.xml");
    expect(serializeSitemap('https://www.chorono.com', 'sitemap-docs-start.xml', true)).not.toContain('lastmod')
    const previous = existingSitemapEntries.map(entry => new URL(entry.url).pathname)
    expect(sitemapTopics.filter(topic => !topic.unpublished).flatMap(topic => topic.paths).sort()).toEqual(previous.sort())
    expect(
      serializeSitemap("https://www.chorono.com", "missing.xml"),
    ).toBeNull();
  });

  it("keeps new noindex pages outside the live sitemap while preserving public routes", async () => {
    vi.stubEnv("CHORONO_PUBLISH_CONTENT", "");
    expect(publicContentOrigin()).toBeNull();
    expect(contentPublicationMetadata("/docs").robots).toEqual({
      index: false,
      follow: false,
    });
    expect(publishedSitemapResponse().status).toBe(200)
    expect(await publishedSitemapResponse().text()).toContain('sitemap-site.xml')
    expect(await publishedSitemapResponse().text()).not.toContain('sitemap-docs-start.xml')
    expect(publishedSitemapResponse('sitemap-docs-start.xml').status).toBe(404)
    expect(
      serializeSitemap("http://127.0.0.1:2000", "sitemap.xml", true),
    ).toContain("sitemap-preview.xml?topic=sitemap-docs-start.xml");
  });

  it("uses one validated origin for public canonicals and sitemap URLs and fails invalid release configuration", async () => {
    vi.stubEnv("CHORONO_PUBLISH_CONTENT", "true");
    vi.stubEnv("CHORONO_CONTENT_ORIGIN", "https://www.chorono.com/");
    expect(
      contentPublicationMetadata("/animations/three-dot-loading"),
    ).toMatchObject({
      robots: { index: true, follow: true },
      alternates: {
        canonical: "https://www.chorono.com/animations/three-dot-loading",
      },
    });
    expect(await publishedSitemapResponse().text()).toContain(
      "https://www.chorono.com/sitemap-docs-ai.xml",
    );
    vi.stubEnv('VERCEL_ENV', 'preview')
    expect(publicContentOrigin()).toBeNull()
    expect(contentPublicationMetadata('/docs').robots).toEqual({ index: false, follow: false })
    expect(await publishedSitemapResponse().text()).not.toContain('sitemap-docs-start.xml')
    vi.stubEnv('VERCEL_ENV', '')
    vi.stubEnv("CHORONO_CONTENT_ORIGIN", "http://localhost:2000");
    expect(() => publicContentOrigin()).toThrow();
    vi.stubEnv("CHORONO_CONTENT_ORIGIN", "https://www.chorono.com/private");
    expect(() => publicContentOrigin()).toThrow();
  });
});
