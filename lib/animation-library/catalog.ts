import { ANIMATION_EXAMPLES, type AnimationExampleId } from '@/lib/animation-example'

/** One reviewed, editable scene. No keyword-only or generated placeholder entries. */
export interface AnimationEntry {
  readonly slug: string;
  readonly preview: { readonly kind: 'example'; readonly exampleId: AnimationExampleId } | { readonly kind: 'motion-crew'; readonly poster: string; readonly alt: string };
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly source: string;
  readonly initialTimeMs: number;
  readonly guideSlug: string;
  readonly provenanceUrl: string;
  readonly sourceLinkLabel?: string;
  readonly about: string;
  readonly revision: string;
  readonly use: string;
  readonly downloads?: readonly { readonly source: string; readonly fileName: string; readonly label: string }[];
}

/** The curated allowlist drives library pages, previews and attachment downloads. */
export const animationEntries: readonly AnimationEntry[] = [
  {
    slug: "three-dot-loading",
    preview: { kind: 'example', exampleId: 'codex-loading-loop' },
    title: "Three-dot loading animation",
    description:
      "A four-second, staggered loading loop with three editable dots. Preview the scene, download the Chorono project and change its timing or colors.",
    category: "Loading & feedback",
    source: "public/examples/codex-loading-loop.chorono.json",
    initialTimeMs: ANIMATION_EXAMPLES["codex-loading-loop"].posterTimeMs,
    guideSlug: "animation/loops",
    provenanceUrl: "https://www.chorono.com/blog/make-animations-with-codex",
    about:
      "Three dots rise in sequence against a warm background. Each dot follows the previous one by 180 milliseconds, returns to its resting position and repeats on a four-second timeline. The headline stays still.",
    revision:
      "Change the peak y values from 398 to 418 to halve the upward travel. Keep the resting values at 438 and preserve the stagger. The loop guide walks through the exact keyframes and boundary checks.",
    use: "Use it as an editable motion study for waiting and feedback states. In a real application, connect loading visibility to the pending operation, provide status text outside the canvas and stop the animation when work finishes.",
  },
  {
    slug: "editable-title-card",
    preview: { kind: 'example', exampleId: 'first-animation' },
    title: "Editable title card animation",
    description:
      "An editable title entrance with colorful circles, eight layers and a four-second timeline. Download the native Chorono project and make it yours.",
    category: "Titles & typography",
    source: "public/examples/first-animation.chorono.json",
    initialTimeMs: ANIMATION_EXAMPLES["first-animation"].posterTimeMs,
    guideSlug: "first-animation",
    provenanceUrl:
      "https://github.com/codie1982/chorono-editor/tree/main/examples/first-animation",
    about:
      "A short title entrance combines a headline, caption, three animated circles and a card background. The scene plays once. Pause around 1.8 seconds to inspect the fully visible layout before changing it.",
    revision:
      "Select Editable headline to change the words, then select Motion dot 1 to change its fill. The first-animation guide shows how to inspect the tracks, save a portable revision and reopen it.",
    use: "Start a short product title, introduction or motion exercise with an existing layered scene. The download keeps its native layers and keyframes so you can revise the wording, colors and timing in the editor.",
  },
  {
    slug: 'interactive-motion-crew',
    preview: { kind: 'motion-crew', poster: '/hero/motion-crew.png', alt: 'Four editable characters: coral teardrop Pip, lilac triangle Milo, sage blob Fig and blue robot Dot.' },
    title: 'Interactive character animation',
    description: 'Meet four editable characters with mouse tracking, peekaboo, celebration and high-five reactions. Preview the scene and download the Chorono project.',
    category: 'Characters & interaction',
    source: 'public/hero/motion-crew.chorono.json',
    initialTimeMs: 0,
    guideSlug: 'editor/keyframes',
    provenanceUrl: '/',
    sourceLinkLabel: 'See this animation on the homepage →',
    about: 'Pip, Milo, Fig and Dot are the motion crew from the Chorono homepage. Each has its own idle gesture: Pip waves, Milo stretches, Fig takes a jelly-like breath and Dot scans. They follow your cursor, cover their faces when hovered or focused, cheer, celebrate, high-five and sit. The transparent scene combines curved limbs, planted feet, squash and stretch, and staggered reactions across ten native states.',
    revision: 'Choose a character group to change its colors or shape. Open a crew timeline to inspect a reaction, or the state machine to follow its named transitions. Keep the existing layer IDs when reusing the included web reference source.',
    use: 'Use the scene as an editable character study or a starting point for an interactive website hero. The native project includes the layers, pose timelines, state machine and pointer parameters. Browser buttons, mouse input and scroll behavior come from the host application; the source bundle includes the matching React/Next.js reference code and canvas compatibility adapter.',
    downloads: [
      { source: 'public/hero/motion-crew.png', fileName: 'motion-crew-transparent.png', label: 'Transparent PNG' },
      { source: 'public/hero/motion-crew-project.zip', fileName: 'motion-crew-project.zip', label: 'Project & source bundle' },
    ],
  },
];

/** Resolve an exact curated slug; arbitrary filesystem paths are never accepted. */
export function findAnimation(slug: string): AnimationEntry | undefined {
  return animationEntries.find((entry) => entry.slug === slug);
}

/** Return the stable local detail route for a reviewed animation entry. */
export function animationHref(slug: string): string {
  return `/animations/${slug}`;
}
