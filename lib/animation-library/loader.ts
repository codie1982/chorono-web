import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { ChronoPlayer } from "@chorono/runtime";
import { findAnimation } from "./catalog";

/**
 * Read an allowlisted, reviewed portable project on the server. Original bytes
 * feed downloads; the corresponding reviewed runtime export feeds playback.
 * Specifications come from source data rather than duplicated catalogue copy.
 * Unknown slugs return null; I/O/JSON failures propagate to the build/request.
 * Times are milliseconds, dimensions composition pixels. No editor code is
 * imported or normalization performed. Validate new assets in the editor and
 * through the website's runtime checks before adding them to the allowlist.
 */
export async function loadAnimation(slug: string) {
  const entry = findAnimation(slug);
  if (!entry) return null;
  const json = await readFile(path.join(process.cwd(), entry.source), "utf8");
  const scene: Parameters<ChronoPlayer['load']>[0] = JSON.parse(json);
  const tracks = scene.timelines.flatMap((timeline) => timeline.tracks);
  const downloads = await Promise.all((entry.downloads ?? []).map(async asset => {
    if (!asset.source.startsWith('public/') || asset.source.split('/').includes('..')) throw new Error('Download assets must be allowlisted public files');
    const info = await stat(path.join(process.cwd(), asset.source));
    return { ...asset, href: `/${asset.source.slice('public/'.length)}`, bytes: info.size };
  }));
  return {
    entry,
    json,
    downloads,
    stats: {
      width: scene.composition.width,
      height: scene.composition.height,
      durationMs: scene.composition.durationMs,
      frameRate: scene.composition.frameRate,
      layers: scene.layers.length,
      states: (scene.stateMachines ?? []).reduce((count, machine) => count + machine.states.length, 0),
      tracks: tracks.length,
      keyframes: tracks.reduce(
        (count, track) => count + track.keyframes.length,
        0,
      ),
      loop: scene.timelines.some((timeline) => timeline.loop),
      bytes: Buffer.byteLength(json, "utf8"),
    },
  };
}

export type LoadedAnimation = NonNullable<
  Awaited<ReturnType<typeof loadAnimation>>
>;
