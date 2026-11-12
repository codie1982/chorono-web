import Link from 'next/link'
import { ANIMATION_GUIDES, ANIMATION_GUIDE_DATE, animationGuideStructuredData, type AnimationGuidePath } from '@/lib/animation-guides'
import { GUIDE_AUTHOR } from '@/lib/site'

export default function AnimationGuideLayout({ path, children }: { path: AnimationGuidePath; children: React.ReactNode }) {
  const page = ANIMATION_GUIDES[path]
  return <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(animationGuideStructuredData(path)).replace(/</g, '\\u003c') }} />
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm leading-6 text-[#6d5a52]"><ol className="flex flex-wrap gap-2"><li><Link href="/">Chorono</Link></li><li aria-hidden="true">/</li><li aria-current="page">{page.label}</li></ol></nav>
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#8F3D27]">Animation fundamentals · A working project</p>
        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">{page.headline}</h1>
        <p className="mt-5 text-sm leading-6 text-[#6d5a52]">By <Link href="/#team" rel="author" className="text-[#8F3D27] underline underline-offset-4">{GUIDE_AUTHOR.name}</Link> · Published <time dateTime={ANIMATION_GUIDE_DATE}>November 6, 2026</time></p>
        <p className="mt-6 text-lg leading-8 text-[#6d5a52]">{page.intro}</p>
        <nav aria-label="Related animation fundamentals" className="mt-6 flex flex-wrap gap-3">{Object.entries(ANIMATION_GUIDES).map(([href, item]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm ${path === href ? 'border-[#8F3D27] bg-[#8F3D27] text-white' : 'border-[#d9bca9] bg-white text-[#8F3D27] hover:border-[#8F3D27]'}`}>{item.label}</Link>)}</nav>
      </div>
      <article className="guide mt-12 max-w-3xl space-y-12">{children}</article>
      <aside className="mt-12 max-w-3xl rounded-2xl border border-[#d9bca9] bg-white p-6 sm:p-8">
        <p className="text-xl font-bold">Try it in the free Chorono editor</p>
        <p className="mt-3 leading-7 text-[#6d5a52]">Run the open-source editor on your computer. Edit the layers and keyframes yourself, or connect Claude Code or Codex through MCP. Agent access is managed separately by those providers.</p>
        <Link href="/getting-started" className="mt-5 inline-flex min-h-[44px] items-center rounded-lg bg-[#8F3D27] px-5 py-3 font-semibold text-white hover:bg-[#73301f]">Install the editor <span aria-hidden="true" className="ml-2">→</span></Link>
      </aside>
    </div>
  </main>
}
