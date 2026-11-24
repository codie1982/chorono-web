import Link from 'next/link'
import { productModePaths } from '@/lib/product-mode-pages'

const modes = [
  {
    id: '2d-animation',
    name: '2D Animation',
    status: 'Available now',
    description: 'Animate editable text, shapes and layered motion with keyframes in the current Chorono editor.',
    link: productModePaths.motion,
    linkText: 'Explore a working 2D project',
  },
  {
    id: '3d-animation-modeling',
    name: '3D Animation & Modeling',
    status: 'In development',
    description: 'The 3D Mode plan covers models, materials and rig-ready assets that can be used across a project.',
    link: productModePaths.modeling,
    linkText: 'Explore 3D animation and modeling',
  },
  {
    id: 'chorono-render',
    name: 'Chorono Render',
    status: 'In development',
    description: 'Render Mode is planned to animate and combine 2D, 3D and game scenes into final output.',
    link: productModePaths.render,
    linkText: 'Explore Chorono Render',
  },
  {
    id: 'game-engine',
    name: 'Game Engine',
    status: 'In development',
    description: 'Game Mode is planned for interactive 2D and 3D scenes, behavior and playable builds.',
    link: productModePaths.game,
    linkText: 'Explore the Game Engine',
  },
] as const

export default function ProductModes() {
  return <section id="product-modes" aria-labelledby="product-modes-heading" className="scroll-mt-8 border-b border-[#e7d8cf] bg-[#f7f1ed] px-6 py-14 sm:py-20">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8F3D27]">One creative project · Four directions</p>
      <h2 id="product-modes-heading" className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[#211612] sm:text-4xl">Explore what you can create with Chorono</h2>
      <p className="mt-4 max-w-3xl leading-7 text-[#6d5a52]">Start with the working 2D editor. Explore how 3D production, rendering and game creation fit into the four-mode product plan.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modes.map(mode => <article key={mode.id} className="flex h-full flex-col rounded-2xl border border-[#e7d8cf] bg-white p-6 shadow-sm">
          <span className="w-fit rounded-full bg-[#fff0e9] px-3 py-1 text-xs font-semibold text-[#8F3D27]">{mode.status}</span>
          <h3 className="mt-5 text-xl font-bold text-[#211612]">{mode.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-[#6d5a52]">{mode.description}</p>
          <Link href={mode.link} className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#8F3D27] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F3D27]">{mode.linkText} <span aria-hidden="true" className="ml-2">→</span></Link>
        </article>)}
      </div>
    </div>
  </section>
}
