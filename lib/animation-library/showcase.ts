import { skillExampleMedia, skillExamples, type SkillExample } from '@/lib/agent-skills/catalog'
import { ANIMATION_EXAMPLES } from '@/lib/animation-example'
import { animationEntries, animationHref, type AnimationEntry } from './catalog'
import { samples, type Sample } from './sample-studies'
import { gameIllustrations, showcaseArt } from './showcase-art'
import { showcaseCategoryNames, showcaseDetailHref, type ShowcaseCategoryId } from './routes'

type Image = { src: string; alt: string }

interface ProjectSummary {
  slug: string
  title: string
  description: string
  category: ShowcaseCategoryId
  cover: Image
  format: string
}

type StoryboardBeat = { time: string; title: string; notes: string; image: Image }
export const upcomingRenderStyles = ['3D render', 'Toon render'] as const

type ConceptProject = ProjectSummary & {
  kind: 'concept'
  notes: readonly { label: string; text: string }[]
} & (
  | { category: 'chorono-render'; format: typeof upcomingRenderStyles[number] }
  | { category: '2d-3d-compositing'; format: '2D / 3D composite' }
)

export type ShowcaseProject = ProjectSummary & (
  | { kind: 'native'; entry: AnimationEntry }
  | { kind: 'skill'; example: SkillExample }
  | { kind: 'study'; sample: Sample }
  | { kind: 'video'; src: string }
  | { kind: 'storyboard'; beats: readonly StoryboardBeat[]; prompt: string }
  | ConceptProject
)

const world: Image = { src: '/new-home/studio/world.jpg', alt: 'An explorer robot in a sunlit canyon beneath a moon.' }
const greenhouse: Image = { src: '/chorono-render/cartoon-greenhouse.png', alt: 'A small robot among plants inside an orbital greenhouse.' }
const valley: Image = { src: '/new-home/studio/game-valley.jpg', alt: 'A traveler on a rocky path facing a gateway above waterfalls.' }
const renderCover: Image = { src: '/chorono-render/vfx-hummingbird.png', alt: 'A metallic hummingbird with translucent wings banking through volumetric light.' }

const concepts: readonly ConceptProject[] = [
  {
    kind: 'concept', category: '2d-3d-compositing', slug: 'exploded-camera', title: 'Exploded Camera Assembly', format: '2D / 3D composite',
    description: 'An exploded view of a camera with flat callouts and control panels around the 3D assembly.',
    cover: showcaseArt('camera-exploded-composite', 'An exploded mirrorless camera, with separated lens elements and camera panels, flanked by copper sliders and 2D controls.'),
    notes: [
      { label: 'Explode distance', text: 'Separate the lens, body and rear display along their attachment axes. Bring the components back together on one control.' },
      { label: 'Orbit and zoom', text: 'Inspect the 3D assembly from different angles while keeping the 2D control panels fixed on screen.' },
      { label: 'Part labels', text: 'Reveal or hide flat leader lines that follow the selected component as it moves.' },
    ],
  },
  {
    kind: 'concept', category: '2d-3d-compositing', slug: 'tidal-signal', title: 'Tidal Signal', format: '2D / 3D composite',
    description: 'A 3D marine beacon sits between flat navigation lines, a signal waveform and two layers of depth-mapped rings.',
    cover: showcaseArt('signal-composite', 'An amber marine beacon surrounded by teal contour lines, concentric signal waves and a flat oscilloscope display.'),
    notes: [
      { label: 'Signal range', text: 'Scale the rings from the beacon so drawing layers can pass behind and in front of the model.' },
      { label: 'Display layer', text: 'Keep the waveform and map legend anchored while the camera turns around the light.' },
    ],
  },
  {
    kind: 'concept', category: 'chorono-render', slug: 'cobalt-optics', title: 'Cobalt Optics', format: '3D render',
    description: 'A product lighting study in ceramic, anodized metal and smoked optical glass.',
    cover: showcaseArt('render-precision', 'A studio-lit ceramic gimbal with a smoked blue lens, brushed metal bearings and cobalt base.'),
    notes: [
      { label: 'Material study', text: 'Compare the soft ceramic highlight with the sharper reflections on the bearings and glass.' },
      { label: 'Lighting study', text: 'Sweep a long strip light across the rim and check the lens edge and silhouette from a low angle.' },
    ],
  },
  {
    kind: 'concept', category: 'chorono-render', slug: 'courier-at-dawn', title: 'Courier at Dawn', format: 'Toon render',
    description: 'A one-wheel courier in a coastal street explores hard shadow bands and bold 3D outlines.',
    cover: showcaseArt('render-toon-courier', 'A vermilion toon-rendered courier robot carrying a parcel along a sunny coastal street.'),
    notes: [
      { label: 'Shadow bands', text: 'Separate the unlit side into graphic bands and keep the parcel readable against the sky.' },
      { label: 'Outline weight', text: 'Try a stronger silhouette line and a lighter weight on material details and wheels.' },
    ],
  },
]

export const showcaseProjects: readonly ShowcaseProject[] = [
  ...skillExamples.map((example): ShowcaseProject => ({
    kind: 'skill', example, slug: example.slug, title: example.title, description: example.description,
    category: example.libraryCategory, cover: { src: skillExampleMedia(example.slug).poster, alt: example.posterAlt },
    format: 'Video · Agent prompt',
  })),
  ...animationEntries.map((entry): ShowcaseProject => ({
    kind: 'native', entry, slug: entry.slug, title: entry.title, description: entry.description,
    category: entry.libraryCategory, format: 'Editable project',
    cover: entry.preview.kind !== 'example'
      ? { src: entry.preview.poster, alt: entry.preview.alt }
      : { src: `/examples/${entry.preview.exampleId}.png`, alt: ANIMATION_EXAMPLES[entry.preview.exampleId].alt },
  })),
  ...samples.filter(sample => sample.id !== 'first-animation').map((sample): ShowcaseProject => ({
    kind: 'study', sample, slug: sample.slug, title: sample.title, description: sample.description,
    category: ({ game: 'games', motion: 'style-animations', 'web-components': 'interactive-web', render: 'freeform' } as const)[sample.category],
    cover: sample.category === 'game' ? gameIllustrations[sample.id] : { src: sample.image, alt: sample.alt },
    format: { game: '2D browser prototype', motion: 'Editable project', 'web-components': 'Interactive demo', render: 'Render concept' }[sample.category],
  })),
  {
    kind: 'storyboard', slug: 'the-explorers-route', title: 'The Explorer’s Route', category: 'long-form',
    description: 'A 75-second animation storyboard that follows a small explorer from a canyon crossing to an orbital greenhouse.',
    cover: world, format: 'Storyboard · 75 s planned',
    beats: [
      { time: '0–15 s', title: 'Establish the route', notes: 'Open wide on the canyon. Let the headlamp and the first step set the scale before the camera moves.', image: world },
      { time: '15–35 s', title: 'Find the crossing', notes: 'Cut to the gateway. Hold on the explorer checking the footing, then follow the movement over the crossing.', image: valley },
      { time: '35–60 s', title: 'Reach the greenhouse', notes: 'Match the copper gateway to the curved greenhouse frame. An interior push reveals the plants one row at a time.', image: greenhouse },
      { time: '60–75 s', title: 'Leave a light behind', notes: 'End on the explorer setting down the lamp. Hold on the leaves as the score resolves and the room tone carries the fade.', image: showcaseArt('explorer-final-frame', 'A copper robot hand places a glowing lantern beside two seedlings.') },
    ],
    prompt: 'Build a 75-second animatic from the four storyboard beats. Give each shot its own editable scene. Use the canyon, gate and greenhouse stills as color and composition references. Begin with a wide establishing shot, use a match cut from the gateway to the greenhouse, and keep the final hold long enough to read the lamp gesture. Spot footsteps, a quiet greenhouse room tone and a sustained instrumental score. Keep music and effects on separate tracks. Export a timed preview for review before building final animation.',
  },
  {
    kind: 'video', slug: 'render-studies', title: 'Chorono Render studies', category: 'freeform',
    cover: { src: '/new-home/studio/render-explorer.jpg', alt: 'An explorer with copper goggles looks across a mountain valley at sunset.' },
    description: 'A ten-second silent montage of concept frames exploring materials, architecture and stylized environments.',
    format: 'Showcase film · 10 s', src: '/new-home/studio/render-intro.mp4',
  },
  ...concepts,
]

interface ShowcaseCollection {
  slug: string
  name: string
  title: string
  description: string
  cover: Image
  projects: readonly ShowcaseProject[]
  upcoming?: string
}

const categoryDetails = {
  'style-animations': { title: 'Motion Graphics Examples & Kinetic Typography', description: 'Watch typography animate through masked reveals, a dot-matrix display, rotating tiles and editorial paper folds. Download editable Chorono scenes and copy the production prompts.', cover: showcaseArt('motion-style-cover', 'A Swiss-style In Motion poster with black typography and a cobalt square.') },
  'interactive-web': { title: 'Web Animation Examples & Interactive Components', description: 'Try a reversible like button, a keyboard-accessible menu and characters that react to your cursor. Inspect their states and download the editable scenes.', cover: showcaseArt('interactive-web-cover', 'A graphic study of three animated web controls on a warm white canvas.') },
  'long-form': { title: 'Animation Storyboard Example for Long-Form Projects', description: 'Follow a 75-second storyboard from a canyon crossing to an orbital greenhouse. Review the shot order, timing and sound direction before building an animatic.', cover: showcaseArt('storyboard-cover', 'Three painted storyboard frames of an explorer’s journey.'), upcoming: 'Full-length animation. Explore the storyboard now.' },
  games: { title: '2D Game Prototypes', description: 'Try Valley Gate and the Moonlit Observatory, two browser puzzles with original 2D level art and simple state changes.', cover: showcaseArt('games-cover-2d', 'A top-down pixel-art locomotive crossing a teal estuary.'), upcoming: 'Full game projects. Play the browser prototypes now.' },
  freeform: { title: 'Experimental Animation & Render Studies', description: 'Experiment with the timing of an editable loading loop and inspect concept studies in light, glass, architecture and stylized characters.', cover: { src: '/new-home/studio/motion-filaments.jpg', alt: 'An abstract study of fine curved filaments in motion.' } },
  '2d-3d-compositing': { title: '2D and 3D Compositing Examples', description: 'Explore concept images that combine 3D subjects with 2D callouts, controls and graphics.', cover: showcaseArt('compositing-cover', 'Floating three-dimensional shapes layered with flat circles and an angled cyan grid.'), upcoming: 'Interactive composites. View the concept images now.' },
} satisfies Record<Exclude<ShowcaseCategoryId, 'chorono-render'>, Omit<ShowcaseCollection, 'slug' | 'name' | 'projects'>>

export const showcaseCategories: readonly ShowcaseCollection[] = (Object.keys(categoryDetails) as (keyof typeof categoryDetails)[]).map(slug => ({
  slug, name: showcaseCategoryNames[slug], ...categoryDetails[slug],
  projects: showcaseProjects.filter(project => project.category === slug),
}))

const renderProjects = showcaseProjects.filter(project => project.category === 'chorono-render' || project.kind === 'video' || project.kind === 'study' && project.sample.category === 'render')

export const showcaseResourceCollections: readonly ShowcaseCollection[] = [
  {
    slug: 'skills', name: 'Skills & prompts', title: 'Animation Prompts for Editable Chorono Projects',
    description: 'Copy animation prompts and download skill instructions for Codex or Claude Code. Explore playable demos, editable Chorono scenes and visual studies.',
    cover: showcaseProjects[0].cover, projects: showcaseProjects.filter(project => ['skill', 'study', 'storyboard'].includes(project.kind)),
  },
  {
    slug: 'chorono-render', name: 'Chorono Render', title: 'Chorono Render Showcase & Concept Studies',
    description: 'Browse realistic 3D lighting, toon shading and a short showcase film.',
    cover: renderCover, projects: renderProjects,
    upcoming: 'Editable render projects. View the concept gallery and showcase film now.',
  },
]

export const showcaseCollections = [...showcaseCategories, ...showcaseResourceCollections]

export function collectionIsIndexable(collection: ShowcaseCollection) {
  return collection.projects.some(project => project.kind !== 'concept')
}

export function findShowcaseCollection(slug: string) {
  return showcaseCollections.find(collection => collection.slug === slug)
}

export function findShowcaseProject(category: string, slug: string) {
  return showcaseProjects.find(project => project.category === category && project.slug === slug)
}

export function showcaseProjectHref(project: ShowcaseProject) {
  return project.kind === 'native' ? animationHref(project.slug) : showcaseDetailHref(project.category, project.slug)
}
