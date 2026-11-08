import Link from 'next/link'
import { BLOG_DESCRIPTION, BLOG_POSTS, BLOG_TITLE, blogStructuredData } from '@/lib/blog'
import { pageMetadata } from '@/lib/site'
import { BlogFooter, BlogHeader, PostCard } from '@/components/BlogLayout'

export const metadata = pageMetadata(BLOG_TITLE, BLOG_DESCRIPTION, '/blog')

export default function BlogPage() {
  return <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData()).replace(/</g, '\\u003c') }} />
    <BlogHeader />
    <div className="bg-[#120D0B] text-white">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pb-20">
        <nav aria-label="Breadcrumb" className="mb-12 text-sm text-[#d7bbb0]"><ol className="flex gap-3"><li><Link href="/" className="hover:text-white">Chorono</Link></li><li aria-hidden="true">/</li><li aria-current="page">Blog</li></ol></nav>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#edae94]">The Chorono notebook</p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">From a prompt to<br /><span className="text-[#df8a65]">editable motion.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d7bbb0]">Practical guides to making animations with Claude Code and Codex. Set up your editor, write a clear brief and shape the result in Chorono.</p>
        <div className="mt-8 flex flex-wrap gap-3 text-xs text-[#f3d5ca]">{['Claude Code', 'Codex', 'MCP setup', 'Animation prompts'].map(label => <span key={label} className="rounded-full border border-[#694537] px-4 py-2">{label}</span>)}</div>
      </div>
    </div>
    <section aria-label="Animation guides" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold uppercase tracking-widest text-[#8F3D27]">Start here · {BLOG_POSTS.length} practical guides</p><p className="text-sm text-[#6d5a52]">By Chorono ekibi</p></div>
      <div className="grid gap-6 md:grid-cols-3">{BLOG_POSTS.map(post => <PostCard key={post.slug} post={post} />)}</div>
      <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-[#e7d8cf] bg-[#ede0d7] p-7 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-2xl font-bold tracking-tight">Get your editor ready.</h2><p className="mt-2 max-w-xl leading-7 text-[#6d5a52]">Install Chorono locally and connect your agent through MCP. Keep every layer and keyframe available for the next idea.</p></div>
        <Link href="/getting-started" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#8F3D27] px-6 py-3 font-semibold text-white hover:bg-[#73311f]">Install Chorono <span aria-hidden="true" className="ml-3">→</span></Link>
      </div>
    </section>
    <BlogFooter />
  </main>
}
