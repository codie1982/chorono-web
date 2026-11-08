import { ArrowDown, ArrowRight } from 'lucide-react'

const projectHref = '/animations/interactive-motion-crew'
const steps = [
  { number: '01', title: 'Explore the project', text: 'Try the reactions and take the source with you.', href: projectHref },
  { number: '02', title: 'Make your first edit', text: 'Open Chorono and change a character.', href: '/getting-started' },
  { number: '03', title: 'Create with your agent', text: 'Connect Claude or Codex to your scene.', href: '/agent-skills' },
]

/** Connects the playful hero to editing and integration with a crisp, inset light surface.
 * All steps are real links; no scroll animation or extra loading is required.
 */
export default function HeroProjectBridge() {
  return <section aria-labelledby="hero-project-title" className="bg-[#120D0B]">
    <div className="rounded-t-[2rem] bg-[#f7f1ed] sm:rounded-t-[3rem]">
      <div className="mx-auto max-w-7xl px-6 pb-3 pt-10 sm:pt-12">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center lg:gap-14">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="flex gap-1"><span className="h-1.5 w-5 rounded-full bg-[#F1845D]" /><span className="h-1.5 w-5 rounded-full bg-[#B1A0F0]" /><span className="h-1.5 w-5 rounded-full bg-[#A7CC91]" /><span className="h-1.5 w-5 rounded-full bg-[#6EACED]" /></span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#856D5D]">The scene is just the start</span>
            </div>
            <h2 id="hero-project-title" className="text-2xl font-bold tracking-tight text-[#211612] sm:text-3xl">Take the characters with you.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#6d5a52] sm:text-base">Open the hero project, explore the reactions and make a version of your own. Every character stays editable.</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-2">
            <a href={projectHref} className="inline-flex min-h-[48px] items-center justify-center gap-6 rounded-xl bg-[#B55233] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8F3D27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8F3D27]">Explore this animation <ArrowRight size={17} aria-hidden="true" /></a>
            <a href={`${projectHref}/download`} download className="inline-flex min-h-[44px] items-center gap-2 px-1 text-sm font-semibold text-[#8F3D27] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F3D27]"><ArrowDown size={15} aria-hidden="true" />Download the project</a>
          </div>
        </div>
        <div className="mt-8 grid border-y border-[#e3d5cb] md:grid-cols-3">
          {steps.map(step=><a key={step.number} href={step.href} className="group flex min-h-[102px] items-start gap-4 border-b border-[#e3d5cb] py-6 last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8F3D27] md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0">
            <span className="pt-1 font-mono text-xs text-[#AD8E77]">{step.number}</span>
            <span><span className="flex items-center gap-3 text-sm font-semibold text-[#35251D] group-hover:text-[#8F3D27]">{step.title}<ArrowRight size={14} aria-hidden="true" /></span><span className="mt-2 block text-xs leading-5 text-[#79685D]">{step.text}</span></span>
          </a>)}
        </div>
      </div>
    </div>
  </section>
}
