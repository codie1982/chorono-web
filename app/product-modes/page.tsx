import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/site'
import { productModePaths } from '@/lib/product-mode-pages'
import { contentPublicationMetadata } from '@/lib/site-index/publication'

export const metadata: Metadata = {
  ...pageMetadata(
    'Chorono Product Modes: 2D, 3D, Game and Render',
    'Explore the working Chorono 2D editor and the development plan for 3D modeling, game creation and rendering. See what is available today and what is planned.',
    '/product-modes',
  ),
  ...contentPublicationMetadata('/product-modes', false),
}

const modes = [
  {
    id: '2d-animation',
    name: '2D Animation',
    status: 'Available now: editable animation editor',
    work: 'Create layered text and shape motion, edit keyframes on a timeline and save a portable scene. You can create by hand or connect Claude Code or Codex through MCP.',
    direction: 'The broader 2D Mode plan adds drawing, layout, reusable components and asset sharing with Game and Render Mode.',
    links: [
      { href: '/motion-graphics-software', label: 'Play and download a 2D project' },
      { href: '/blog/free-2d-animation-software', label: 'Compare free 2D animation workflows' },
      { href: '/getting-started', label: 'Install the current editor' },
    ],
  },
  {
    id: '3d-animation-modeling',
    name: '3D Animation & Modeling',
    status: 'In development: 3D Mode',
    work: 'The 3D Mode plan gives models, geometry, UVs, materials and rig-ready assets their own source documents. A model could then be referenced by a game scene or a rendered shot without copying its source.',
    direction: 'The 3D Mode team is working toward an asset that can be edited, saved, reopened and used by another mode.',
    links: [{ href: productModePaths.modeling, label: 'Explore 3D animation and modeling' }],
  },
  {
    id: 'chorono-render',
    name: 'Chorono Render',
    status: 'In development: Render Mode',
    work: 'Render Mode is planned to own animation clips, camera shots, compositing, output profiles and render jobs. It is the planned route from 2D, 3D and game assets to a finished frame, image sequence or video.',
    direction: 'Integrated render jobs and final output are in development. Concept studies illustrate the planned workflow.',
    links: [{ href: productModePaths.render, label: 'Explore Chorono Render' }],
  },
  {
    id: 'game-engine',
    name: 'Game Engine',
    status: 'In development: Game Mode is a product priority',
    work: 'Game Mode is planned for interactive scenes that reference 2D and 3D source assets. The plan includes input, game behavior, play and simulate states, prefabs and a build path.',
    direction: 'The current browser prototypes let you explore scene state and player feedback. Playable project builds remain in development.',
    links: [{ href: productModePaths.game, label: 'Explore the Game Engine' }],
  },
] as const

export default function ProductModesPage() {
  return <main className="bg-[#f7f1ed] px-6 py-14 text-[#211612] sm:py-20">
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8F3D27]">Chorono product direction</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">Four ways to create in one Chorono project</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6d5a52]">Chorono has a working, free and open-source 2D animation editor today. Its product plan organizes future work into four equal modes: 2D, 3D, Game and Render. The status of each mode is shown below.</p>
      <nav aria-label="Product modes on this page" className="mt-8 flex flex-wrap gap-3">
        {modes.map(mode => <a key={mode.id} href={`#${mode.id}`} className="inline-flex min-h-[44px] items-center rounded-full border border-[#d9bca9] bg-white px-4 text-sm font-semibold text-[#8F3D27] hover:border-[#8F3D27]">{mode.name}</a>)}
      </nav>
      <div className="mt-12 grid gap-6">
        {modes.map(mode => <section key={mode.id} id={mode.id} aria-labelledby={`${mode.id}-heading`} className="scroll-mt-24 rounded-2xl border border-[#e7d8cf] bg-white p-6 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8F3D27]">{mode.status}</p>
          <h2 id={`${mode.id}-heading`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{mode.name}</h2>
          <p className="mt-4 leading-8 text-[#4a332b]">{mode.work}</p>
          <p className="mt-4 leading-8 text-[#6d5a52]">{mode.direction}</p>
          {mode.links.length > 0 && <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">{mode.links.map(link => <li key={link.href}><Link href={link.href} className="inline-flex min-h-[44px] items-center font-semibold text-[#8F3D27] underline underline-offset-4">{link.label}</Link></li>)}</ul>}
        </section>)}
      </div>
      <section aria-labelledby="how-modes-connect-heading" className="mt-12 max-w-4xl">
        <h2 id="how-modes-connect-heading" className="text-2xl font-bold">How the modes fit together</h2>
        <p className="mt-4 leading-8 text-[#6d5a52]">The plan gives each mode ownership of its source assets. A 2D sprite or 3D model can be referenced in Game Mode; Render Mode can use assets and recorded scenes for animation and final output. The current editor demonstrates the 2D part of that direction. Cross-mode editing and delivery remain development work.</p>
        <p className="mt-4 leading-8 text-[#6d5a52]">Looking for a tool you can use today? <Link href="/getting-started" className="font-semibold text-[#8F3D27] underline underline-offset-4">Install the 2D editor</Link> or <Link href="/motion-graphics-software" className="font-semibold text-[#8F3D27] underline underline-offset-4">inspect a working animation project</Link>.</p>
      </section>
    </div>
  </main>
}
