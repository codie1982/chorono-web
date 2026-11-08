import { animationEntries } from "@/lib/animation-library/catalog";
import { loadAnimation } from "@/lib/animation-library/loader";

export const dynamicParams = false;

/** Build only the allowlisted portable attachments alongside their detail pages. */
export function generateStaticParams() {
  return animationEntries.map(({ slug }) => ({ slug }));
}

/** Return unchanged native JSON as an attachment, never an arbitrary file read. */
export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const animation = await loadAnimation(params.slug);
  if (!animation) return new Response("Animation not found", { status: 404 });
  return new Response(animation.json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${animation.entry.slug}.chorono.json"`,
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}
