import { describe, expect, it } from "vitest";
import { animationEntries, animationHref } from "./catalog";
import { loadAnimation } from "./loader";
import { findDocumentationPage } from "@/lib/documentation/manifest";
import { GET } from "@/app/animations/[slug]/download/route";
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ChronoPlayer } from '@chorono/runtime'

describe("reviewed animation library contract", () => {
  it("derives native stats and valid editing handoffs from the unchanged scene sources", async () => {
    expect(new Set(animationEntries.map((entry) => entry.slug)).size).toBe(3);
    const loading = await loadAnimation("three-dot-loading");
    const title = await loadAnimation("editable-title-card");
    expect(loading?.stats).toMatchObject({
      width: 1024,
      height: 768,
      durationMs: 4000,
      frameRate: 30,
      layers: 4,
      tracks: 3,
      keyframes: 24,
      loop: true,
    });
    expect(title?.stats).toMatchObject({
      width: 960,
      height: 540,
      durationMs: 4000,
      frameRate: 30,
      layers: 8,
      tracks: 13,
      keyframes: 51,
      loop: false,
    });
    for (const entry of animationEntries) {
      expect(findDocumentationPage(entry.guideSlug)).toBeDefined();
      expect(animationHref(entry.slug)).toBe(`/animations/${entry.slug}`);
    }
  });

  it("downloads exact source bytes with an attachment header and rejects arbitrary slugs", async () => {
    const source = await loadAnimation("three-dot-loading");
    const response = await GET(
      new Request("http://localhost/animations/three-dot-loading/download"),
      { params: { slug: "three-dot-loading" } },
    );
    expect(response.status).toBe(200);
    expect(await response.text()).toBe(source?.json);
    expect(response.headers.get("Content-Disposition")).toBe(
      'attachment; filename="three-dot-loading.chorono.json"',
    );
    expect(await loadAnimation("../../package.json")).toBeNull();
    expect(
      (
        await GET(new Request("http://localhost"), {
          params: { slug: "missing" },
        })
      ).status,
    ).toBe(404);
  });

  it('plays reviewed runtime exports with the original composition and timeline', async () => {
    for (const entry of animationEntries) {
      const source = await loadAnimation(entry.slug)
      const original = JSON.parse(source!.json)
      if (entry.preview.kind === 'motion-crew') {
        const player = new ChronoPlayer(original)
        expect(player.tick(0).overrides.size).toBeGreaterThan(0)
        expect([...player.smRuntimes.values()][0].activeTimelineId).toBe('crew-idle')
        player.destroy()
        continue
      }
      const exported = JSON.parse(await readFile(path.join(process.cwd(), 'public/examples', `${entry.preview.exampleId}.runtime.json`), 'utf8'))
      expect(exported.warnings).toEqual([])
      expect(exported.runtime.composition).toEqual(original.composition)
      expect(exported.runtime.timelines).toEqual(original.timelines)
      const player = new ChronoPlayer(exported.runtime)
      expect(player.tick(entry.initialTimeMs).overrides.size).toBeGreaterThan(0)
      player.destroy()
    }
  })

  it('serves the hero project unchanged and exposes existing PNG/source bundle attachments', async () => {
    const animation = await loadAnimation('interactive-motion-crew')
    expect(animation?.stats).toMatchObject({width:1200,height:800,frameRate:30,layers:192,states:10,durationMs:8000})
    expect(animation?.downloads.map(d=>d.href)).toEqual(['/hero/motion-crew.png','/hero/motion-crew-project.zip'])
    expect(animation?.downloads.every(d=>d.bytes>0)).toBe(true)
    const response = await GET(new Request('http://localhost/animations/interactive-motion-crew/download'),{params:{slug:'interactive-motion-crew'}})
    expect(response.headers.get('Content-Disposition')).toBe('attachment; filename="interactive-motion-crew.chorono.json"')
    expect(await response.text()).toBe(await readFile(path.join(process.cwd(),'public/hero/motion-crew.chorono.json'),'utf8'))
    const zip=await readFile(path.join(process.cwd(),'public/hero/motion-crew-project.zip'))
    expect(zip.subarray(0,4).toString('hex')).toBe('504b0304')
  })
});
