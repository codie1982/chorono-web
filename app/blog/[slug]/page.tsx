import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, blogPostMetadata, blogStructuredData, getPost, readingMinutes, type ContentBlock } from '@/lib/blog'
import { GUIDE_AUTHOR } from '@/lib/site'
import { BlogFooter, BlogHeader, RelatedPosts } from '@/components/BlogLayout'

export const dynamicParams = false
export function generateStaticParams() { return BLOG_POSTS.map(post => ({ slug: post.slug })) }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()
  return blogPostMetadata(post)
}

function Block({ block }: { block: ContentBlock }) {
  if (block.type === 'text') return <p>{block.text}</p>
  if (block.type === 'code' || block.type === 'prompt') return <div className="my-6 min-w-0"><div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8F3D27]">{block.label}</div><pre className={block.type === 'prompt' ? 'prompt-block' : ''}><code>{block.text}</code></pre></div>
  if (block.type === 'list') return <ul className="mb-5 list-disc space-y-2 pl-6 leading-8 text-[#6d5a52]">{block.items.map(item => <li key={item}>{item}</li>)}</ul>
  if (block.type === 'links') return <ul className="mb-5 flex flex-col gap-3 text-sm leading-7">{block.items.map(item => <li key={item.href}><Link href={item.href}>{item.label} <span aria-hidden="true">↗</span></Link></li>)}</ul>
  return null
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()
  return <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData(post)).replace(/</g, '\\u003c') }} />
    <BlogHeader />
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm leading-6 text-[#6d5a52]"><ol className="flex flex-wrap gap-x-3 gap-y-1"><li><Link href="/">Chorono</Link></li><li aria-hidden="true">/</li><li><Link href="/blog">Blog</Link></li><li aria-hidden="true">/</li><li aria-current="page">{post.headline}</li></ol></nav>
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8F3D27]">{post.category} · Field guide</p>
        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">{post.headline}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-6 text-[#6d5a52]"><span>By <Link href="/#team" rel="author" className="font-medium text-[#8F3D27] underline underline-offset-4">{GUIDE_AUTHOR.name}</Link></span><span aria-hidden="true">·</span><time dateTime={post.published}>November 4, 2026</time><span aria-hidden="true">·</span><span>{readingMinutes(post)} min read</span></div>
        <p className="mt-6 text-lg leading-8 text-[#6d5a52]">{post.intro}</p>
        <img src={post.image} alt={post.imageAlt} width={1200} height={675} className="mt-8 h-auto w-full rounded-2xl border border-[#e7d8cf]" />
      </div>
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,48rem)_1fr]">
        <article className="guide min-w-0">
          <nav aria-label="In this article" className="mb-10 rounded-2xl border border-[#e7d8cf] bg-white p-6 lg:hidden"><p className="!mb-3 text-xs font-semibold uppercase tracking-widest">In this guide</p><ol className="space-y-3 text-sm leading-6">{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol></nav>
          <div className="space-y-12">{post.sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-6"><h2>{section.heading}</h2>{section.blocks.map((block, index) => <Block key={index} block={block} />)}</section>)}</div>
        </article>
        <aside className="sticky top-8 hidden lg:block">
          <nav aria-label="In this article" className="border-l border-[#d9bca9] pl-5"><p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#8F3D27]">In this guide</p><ol className="space-y-4 text-sm leading-6 text-[#6d5a52]">{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`} className="hover:text-[#8F3D27]">{section.heading}</a></li>)}</ol></nav>
          <Link href="/getting-started" className="mt-7 block rounded-xl bg-[#ede0d7] p-5 text-sm font-semibold leading-6 text-[#8F3D27]">New to Chorono?<br />Install the editor <span aria-hidden="true">→</span></Link>
        </aside>
      </div>
      <div className="max-w-3xl"><RelatedPosts current={post} /></div>
    </div>
    <BlogFooter />
  </main>
}
