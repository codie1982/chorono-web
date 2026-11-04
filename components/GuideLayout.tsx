import Link from 'next/link'
import { REPOSITORY_URL } from '@/lib/site'

export default function GuideLayout({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
      <header className="border-b border-[#e7d8cf] bg-[#120D0B] text-white">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-6 py-6">
          <Link href="/" className="flex items-center gap-3 font-bold tracking-widest">
            <img src="/icon.svg" width={40} height={40} alt="" />
            CHORONO
          </Link>
          <div className="flex flex-wrap gap-5 text-sm text-[#e8c9ba]">
            <Link href="/getting-started">Getting started</Link>
            <Link href="/agent-skills">Agent skills</Link>
            <a href={REPOSITORY_URL}>GitHub</a>
          </div>
        </nav>
      </header>
      <article className="guide mx-auto max-w-3xl px-6 py-14 md:py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#B55233]">Chorono guides</p>
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-[#6d5a52]">{description}</p>
        <div className="mt-12 space-y-10">{children}</div>
      </article>
      <footer className="border-t border-[#e7d8cf] px-6 py-8 text-center text-sm text-[#6d5a52]">
        <Link href="/">Chorono</Link> · <a href={`${REPOSITORY_URL}/blob/main/docs/README.md`}>Full documentation</a>
      </footer>
    </main>
  )
}
