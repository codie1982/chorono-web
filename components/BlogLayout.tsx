import Link from 'next/link'
import { REPOSITORY_URL } from '@/lib/site'
import { BLOG_POSTS, blogPath, type BlogPost, readingMinutes } from '@/lib/blog'

export function BlogHeader({ section = 'blog' }: { section?: 'blog' | 'examples' }) {
  return <header className="border-b border-[#52382d] bg-[#120D0B] text-white">
    <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
      <Link href="/" className="flex items-center gap-3 font-bold tracking-widest"><img src="/icon.svg" width={36} height={36} alt="" />CHORONO</Link>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#e8c9ba]">
        <Link href="/getting-started" className="py-2 hover:text-white">Getting started</Link>
        <Link href="/agent-skills" className="py-2 hover:text-white">Agent skills</Link>
        <Link href="/motion-graphics-software" className={`py-2 hover:text-white ${section === 'examples' ? 'font-semibold text-white' : ''}`}>Examples</Link>
        <Link href="/docs">Docs</Link>
            <Link href="/animations">Animations</Link>
            <Link href="/blog" className={`py-2 hover:text-white ${section === 'blog' ? 'font-semibold text-white' : ''}`}>Blog</Link>
        <a href={REPOSITORY_URL} className="py-2 hover:text-white">GitHub ↗</a>
      </div>
    </nav>
  </header>
}

export function BlogFooter() {
  return <footer className="border-t border-[#e7d8cf] bg-white px-6 py-8 text-sm text-[#6d5a52]">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
      <Link href="/" className="font-semibold text-[#211612]">Chorono · Editable animation, with your AI agent.</Link>
      <div className="flex flex-wrap gap-5"><Link href="/blog">Blog</Link><Link href="/getting-started">Install Chorono</Link><a href={REPOSITORY_URL}>Source on GitHub</a></div>
    </div>
    <nav aria-label="Animation examples and guides" className="mx-auto mt-5 flex max-w-6xl flex-wrap gap-x-5 gap-y-3 border-t border-[#e7d8cf] pt-5"><Link href="/motion-graphics-software">Motion graphics software</Link><Link href="/text-animation">Text animation</Link><Link href="/kinetic-typography">Kinetic typography</Link><Link href="/keyframe-animation">Keyframe animation</Link><Link href="/animation-easing">Animation easing</Link><Link href="/blog/progress-bar-and-success-animation">Progress &amp; success animation</Link></nav>
  </footer>
}

export function PostCard({ post }: { post: BlogPost }) {
  return <Link href={blogPath(post)} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e7d8cf] bg-white transition-colors hover:border-[#B55233]">
    <img src={post.image} alt={post.imageAlt} width={1200} height={675} loading="lazy" className="aspect-video w-full object-cover" />
    <div className="flex flex-1 flex-col p-6">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold text-[#8F3D27]"><span>{post.category}</span><span className="font-normal text-[#6d5a52]">{readingMinutes(post)} min read</span></div>
      <h2 className="text-xl font-bold leading-snug tracking-tight text-[#211612] group-hover:text-[#8F3D27]">{post.headline}</h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-[#6d5a52]">{post.description}</p>
      <span className="mt-6 text-sm font-semibold text-[#8F3D27]">Read the guide <span aria-hidden="true">→</span></span>
    </div>
  </Link>
}

export function RelatedPosts({ current }: { current: BlogPost }) {
  return <nav aria-label="Related articles" className="mt-12 border-t border-[#e7d8cf] pt-8">
    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#8F3D27]">Keep creating</p>
    <div className="grid gap-4 sm:grid-cols-2">{BLOG_POSTS.filter(post => post.slug !== current.slug).map(post => <Link key={post.slug} href={blogPath(post)} className="rounded-xl border border-[#e7d8cf] bg-white p-5 font-semibold leading-7 hover:border-[#B55233]">{post.headline} <span aria-hidden="true">→</span></Link>)}</div>
  </nav>
}
