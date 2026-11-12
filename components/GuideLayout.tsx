import Link from 'next/link'
import { DOCS_LINKS_UPDATED, GUIDE_AUTHOR, SITE_PAGES, type GuidePath } from '@/lib/site'
import StructuredData from './StructuredData'

export default function GuideLayout({ path, children }: { path: GuidePath; children: React.ReactNode }) {
  const page = SITE_PAGES[path]
  return (
    <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
      <StructuredData path={path} />

      <article className="guide mx-auto max-w-3xl px-6 py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#6d5a52]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/">Chorono</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{page.breadcrumb}</li>
          </ol>
        </nav>
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">{page.headline}</h1>
        <p className="mt-4 text-sm">By <Link href="/#team" rel="author">{GUIDE_AUTHOR.name}</Link></p>
        {path === '/agent-skills' && <p className="text-sm">Updated <time dateTime={DOCS_LINKS_UPDATED}>November 10, 2026</time></p>}
        <p className="mt-5 text-lg leading-8 text-[#6d5a52]">{page.intro}</p>
        <img src={page.image} alt={page.imageAlt} width={1200} height={675} className="mt-8 h-auto w-full rounded-2xl border border-[#e7d8cf]" />
        <div className="mt-12 space-y-10">{children}</div>
      </article>

    </main>
  )
}
