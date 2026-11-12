import Link from 'next/link'
import { BLOG_POSTS, blogPath, type BlogPost, readingMinutes } from '@/lib/blog'

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
