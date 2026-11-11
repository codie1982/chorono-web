import { documentationPages } from '@/lib/documentation/manifest'
import { animationEntries } from '@/lib/animation-library/catalog'
import { existingSitemapEntries } from './existing'
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  sitemapTopics,
  serializeSitemap,
  publishedSitemapResponse,
  validateSitemapInventory,
} from "./sitemap";
import { siteRobots } from './robots'
import { GET as previewSitemap } from '@/app/sitemap-preview.xml/route'
import { contentPublicationMetadata, publicContentOrigin } from "./publication";

afterEach(() => vi.unstubAllEnvs());

describe("publication and topic sitemap contract", () => {
  it('rejects duplicated, noncanonical and payload URLs before publishing XML', () => {
    for (const paths of [['/docs', '/docs'], ['/docs/'], ['/docs?query=x'], ['/docs#section'], ['//other.example/path'], ['/docs/../hidden'], ['/animations/example/download']]) {
      expect(() => validateSitemapInventory([{ file: 'sitemap-docs.xml', paths }])).toThrow()
    }
    expect(() => validateSitemapInventory([{ file: '../sitemap.xml', paths: ['/docs'] }])).toThrow()
    expect(() => validateSitemapInventory([{ file: 'sitemap-docs.xml', paths: ['/docs/releases/0.2.0'] }])).not.toThrow()
  })

  it('allows production docs/assets and lists only the canonical index in robots.txt', () => {
    vi.stubEnv('VERCEL_ENV', 'production')
    expect(siteRobots()).toEqual({ rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: 'https://www.chorono.com/sitemap.xml' })
    expect(sitemapTopics.flatMap(topic => topic.paths).some(path => path.startsWith('/api/'))).toBe(false)
    expect(previewSitemap(new Request('https://www.chorono.com/sitemap-preview.xml')).status).toBe(404)
  })

  it('does not advertise preview deployments or expose their inspection XML for indexing', () => {
    vi.stubEnv('VERCEL_ENV', 'preview')
    expect(siteRobots()).toEqual({ rules: { userAgent: '*', disallow: '/' } })
    const response = previewSitemap(new Request('http://localhost:2011/sitemap-preview.xml'))
    expect(response.status).toBe(200)
    expect(response.headers.get('X-Robots-Tag')).toContain('noindex')
  })
  it("covers existing and migrated reviewed HTML routes exactly once without downloads or query URLs", () => {
    const paths = sitemapTopics.flatMap((topic) => topic.paths);
    expect(paths).toHaveLength(existingSitemapEntries.length + documentationPages.filter(page => page.availability !== 'coming-soon').length + animationEntries.length + 1);
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
    expect(index.match(/<sitemap>/g)).toHaveLength(sitemapTopics.length);
    expect(index).toContain("https://www.chorono.com/sitemap-animations.xml");
    expect(serializeSitemap('https://www.chorono.com', 'sitemap-docs-start.xml', true)).not.toContain('lastmod')
    const previous = existingSitemapEntries.map(entry => new URL(entry.url).pathname)
    expect(sitemapTopics.filter(topic => !topic.unpublished).flatMap(topic => topic.paths).sort()).toEqual(previous.sort())
    expect(
      serializeSitemap("https://www.chorono.com", "missing.xml"),
    ).toBeNull();
  });

  it.each([undefined, "development", "preview"])("keeps docs/library noindex outside production (%s), even with legacy release flags", async (environment) => {
    vi.stubEnv("VERCEL_ENV", environment);
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CHORONO_PUBLISH_CONTENT", "true");
    vi.stubEnv("CHORONO_CONTENT_ORIGIN", "https://www.chorono.com");
    expect(publicContentOrigin()).toBeNull();
    for (const path of sitemapTopics.filter(topic => topic.unpublished).flatMap(topic => topic.paths)) {
      expect(contentPublicationMetadata(path)).toMatchObject({
        robots: { index: false, follow: false },
        alternates: { canonical: `https://www.chorono.com${path}` },
      });
    }
    expect(publishedSitemapResponse().status).toBe(200)
    const index = await publishedSitemapResponse().text();
    expect(index.match(/<sitemap>/g)).toHaveLength(3);
    for (const topic of sitemapTopics) {
      expect(publishedSitemapResponse(topic.file).status).toBe(topic.unpublished ? 404 : 200);
      expect(index.includes(topic.file)).toBe(!topic.unpublished);
    }
    expect(
      serializeSitemap("http://127.0.0.1:2000", "sitemap.xml", true),
    ).toContain("sitemap-preview.xml?topic=sitemap-docs-start.xml");
  });

  it.each([undefined, "false"])("publishes every reviewed page and topic sitemap in production without a legacy opt-in (%s)", async (legacyFlag) => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("CHORONO_PUBLISH_CONTENT", legacyFlag);
    vi.stubEnv("CHORONO_CONTENT_ORIGIN", undefined);
    expect(publicContentOrigin()).toBe("https://www.chorono.com");
    const releasedPaths = sitemapTopics.filter(topic => topic.unpublished).flatMap(topic => topic.paths);
    expect(releasedPaths).toHaveLength(documentationPages.filter(page => page.availability !== 'coming-soon').length + animationEntries.length + 1);
    for (const path of releasedPaths) {
      expect(contentPublicationMetadata(path)).toMatchObject({
        robots: { index: true, follow: true },
        alternates: { canonical: `https://www.chorono.com${path}` },
      });
    }
    const index = await publishedSitemapResponse().text();
    expect(index.match(/<sitemap>/g)).toHaveLength(sitemapTopics.length);
    const urls: string[] = [];
    for (const topic of sitemapTopics) {
      expect(index).toContain(`<loc>https://www.chorono.com/${topic.file}</loc>`);
      const response = publishedSitemapResponse(topic.file);
      expect(response.status).toBe(200);
      urls.push(...[...((await response.text()).matchAll(/<loc>(.*?)<\/loc>/g))].map(match => match[1]));
    }
    expect(urls).toHaveLength(sitemapTopics.flatMap(topic => topic.paths).length);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.sort()).toEqual(sitemapTopics.flatMap(topic => topic.paths).map(path => `https://www.chorono.com${path}`).sort());
    expect(urls.every(url => !url.includes("?") && !new URL(url).pathname.endsWith("/download"))).toBe(true);
  });

  it("keeps the production canonical origin independent of legacy and deployment hostnames", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("CHORONO_CONTENT_ORIGIN", "https://preview.example/private");
    vi.stubEnv("VERCEL_URL", "preview.example");
    expect(publicContentOrigin()).toBe("https://www.chorono.com");
    expect(contentPublicationMetadata("/docs").alternates).toEqual({ canonical: "https://www.chorono.com/docs" });
  });
});
