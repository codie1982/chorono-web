import Link from 'next/link'
import AnimationExample from './AnimationExample'
import { BlogFooter, BlogHeader } from './BlogLayout'
import { ANIMATION_EXAMPLES, USE_CASE_PUBLISHED } from '@/lib/animation-example'
import { USE_CASES, USE_CASE_CONTENT_UPDATED, useCaseStructuredData, type UseCasePath } from '@/lib/use-cases'
import { GUIDE_AUTHOR, REPOSITORY_URL } from '@/lib/site'

export default function UseCaseLayout({ path, children }: { path: UseCasePath; children: React.ReactNode }) {
  const page = USE_CASES[path]
  const example = ANIMATION_EXAMPLES[page.exampleId]
  const updated = USE_CASE_CONTENT_UPDATED[path]
  const updatedLabel = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(updated))
  return <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(useCaseStructuredData(path)).replace(/</g, '\\u003c') }} />
    <BlogHeader section="examples" />
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm leading-6 text-[#6d5a52]"><ol className="flex flex-wrap gap-2"><li><Link href="/">Chorono</Link></li><li aria-hidden="true">/</li><li aria-current="page">{page.label}</li></ol></nav>
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#8F3D27]">Free and open source · <a href={`${REPOSITORY_URL}/blob/main/LICENSE`} className="underline underline-offset-4">MIT license</a></p>
        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">{page.headline}</h1>
        <p className="mt-5 text-sm leading-6 text-[#6d5a52]">By <Link href="/#team" rel="author" className="text-[#8F3D27] underline underline-offset-4">{GUIDE_AUTHOR.name}</Link> · Published <time dateTime={USE_CASE_PUBLISHED}>November 5, 2026</time> · Updated <time dateTime={updated}>{updatedLabel}</time></p>
        <p className="mt-6 text-lg leading-8 text-[#6d5a52]">{page.intro}</p>
        <p className="mt-4 text-sm leading-7 text-[#6d5a52]">The local Chorono editor is free to download, run and modify under the MIT license. Access to Claude Code or Codex is managed separately by those providers.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/getting-started" className="inline-flex min-h-[44px] items-center rounded-lg bg-[#8F3D27] px-5 py-3 text-sm font-semibold text-white hover:bg-[#73301f]">Install the free editor</Link><a href={REPOSITORY_URL} className="inline-flex min-h-[44px] items-center rounded-lg border border-[#d9bca9] bg-white px-5 py-3 text-sm font-semibold text-[#8F3D27] hover:border-[#8F3D27]">View source on GitHub <span aria-hidden="true" className="ml-2">↗</span></a></div>
      </div>
      <nav aria-label="Animation topics" className="mt-7 flex flex-wrap gap-2">{Object.entries(USE_CASES).map(([href, item]) => <Link key={href} href={href} aria-current={href === path ? 'page' : undefined} className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm ${href === path ? 'border-[#8F3D27] bg-[#8F3D27] text-white' : 'border-[#d9bca9] bg-white text-[#8F3D27] hover:border-[#8F3D27]'}`}>{item.label}</Link>)}</nav>
      {'sectionIds' in page && <nav aria-label="On this page" className="mt-8 max-w-3xl rounded-xl border border-[#d9bca9] bg-white p-5"><p className="mb-3 text-sm font-semibold text-[#211612]">On this page</p><ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2">{page.sectionIds.map((id, index) => <li key={id}><Link href={`#${id}`} className="inline-flex min-h-[44px] items-center py-2 text-sm leading-6 text-[#8F3D27] underline decoration-[#d9a08b] underline-offset-4 hover:decoration-current">{page.sections[index]}</Link></li>)}</ol></nav>}
      <article className="guide mt-12 max-w-3xl space-y-12">
        <section id="example" className="scroll-mt-6">
          <h2>{page.sections[0]}</h2>
          <p>{example.description} Preview the animation here, or select a marked moment to examine the design.</p>
          <AnimationExample exampleId={page.exampleId} />
          <p className="!text-sm">Project notes: 1200 × 675 · 30 fps · {example.layers} named layers · {example.tracks} animation tracks. Authored through Chorono MCP with AI assistance; representative frames and the actual exports were checked on November 5, 2026. Scene validation and runtime export returned no warnings. These projects use Arial and native shapes, with no external media files.</p>
        </section>
        {children}
      </article>
      <nav aria-label="Continue learning" className="mt-12 max-w-3xl border-t border-[#d9bca9] pt-7"><p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#8F3D27]">Continue with a working project</p><div className="grid gap-3 sm:grid-cols-2">{Object.entries(USE_CASES).filter(([href]) => href !== path).map(([href, item]) => <Link key={href} href={href} className="rounded-xl border border-[#e7d8cf] bg-white p-5 font-semibold leading-7 hover:border-[#8F3D27]">{item.label} <span aria-hidden="true">→</span></Link>)}</div></nav>
    </div>
    <BlogFooter />
  </main>
}

export function TimingTable({ caption, rows }: { caption: string; rows: [string, string, string][] }) {
  return <div className="my-6 overflow-x-auto rounded-xl border border-[#d9bca9]"><table className="w-full text-left text-sm leading-6"><caption className="bg-white p-4 text-left font-semibold text-[#211612]">{caption}</caption><thead className="bg-[#ede0d7]"><tr><th scope="col" className="px-4 py-3">Time</th><th scope="col" className="px-4 py-3">What happens</th><th scope="col" className="px-4 py-3">What to inspect</th></tr></thead><tbody>{rows.map(([time, action, check]) => <tr key={time} className="border-t border-[#e7d8cf] align-top text-[#6d5a52]"><th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-[#211612]">{time}</th><td className="px-4 py-3">{action}</td><td className="px-4 py-3">{check}</td></tr>)}</tbody></table></div>
}
