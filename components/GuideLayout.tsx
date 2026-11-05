import Link from 'next/link'
import { GUIDE_AUTHOR, REPOSITORY_URL, SITE_PAGES, type GuidePath } from '@/lib/site'
import StructuredData from './StructuredData'
import { EXAMPLE_MODIFIED } from '@/lib/animation-example'

export default function GuideLayout({ path, children }: { path: GuidePath; children: React.ReactNode }) {
  const page = SITE_PAGES[path]
  return (
    <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
      <StructuredData path={path} />
      <header className="border-b border-[#e7d8cf] bg-[#120D0B] text-white">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-6 py-6">
          <Link href="/" className="flex items-center gap-3 font-bold tracking-widest">
            <img src="/icon.svg" width={40} height={40} alt="" />
            CHORONO
          </Link>
          <div className="flex flex-wrap gap-5 text-sm text-[#e8c9ba]">
            <Link href="/getting-started">Getting started</Link>
            <Link href="/agent-skills">Agent skills</Link>
            <Link href="/blog">Blog</Link>
            <a href={REPOSITORY_URL}>GitHub</a>
          </div>
        </nav>
      </header>
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
        {path === '/agent-skills' && <p className="text-sm">Updated <time dateTime={EXAMPLE_MODIFIED}>November 5, 2026</time></p>}
        <p className="mt-5 text-lg leading-8 text-[#6d5a52]">{page.intro}</p>
        <img src={page.image} alt={page.imageAlt} width={1200} height={675} className="mt-8 h-auto w-full rounded-2xl border border-[#e7d8cf]" />
        <div className="mt-12 space-y-10">{children}</div>
      </article>
      <footer className="border-t border-[#e7d8cf] px-6 py-8 text-center text-sm text-[#6d5a52]">
        <Link href="/">Chorono</Link> · <a href={`${REPOSITORY_URL}/blob/main/docs/README.md`}>Full documentation</a>
      </footer>
    </main>
  )
}
