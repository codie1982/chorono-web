import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { productModePages, productModePaths, type ProductModePageData } from '@/lib/product-mode-pages'
import { pageMetadata, SITE_URL } from '@/lib/site'
import { renderPath } from '@/lib/render-guides'

export function productModeMetadata(mode: ProductModePageData) {
  return {
    ...pageMetadata(`${mode.seoTitle} | Chorono`, mode.description, mode.path, { image: mode.image.src, imageAlt: mode.image.alt }),
  }
}

const bodyLink = 'inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#8F3D27] underline-offset-4 hover:underline'

export function ProductModePage({ mode }: { mode: ProductModePageData }) {
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Chorono', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: mode.label, item: new URL(mode.path, SITE_URL).href },
  ] }
  return <main className="mx-auto max-w-6xl px-6 pb-20 pt-9 text-[#211612] md:pt-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
    <nav className="mb-8 text-sm text-[#6d5a52]" aria-label="Breadcrumb"><ol className="flex flex-wrap gap-2">
      <li><Link href="/">Chorono</Link></li><li aria-hidden="true">/</li><li aria-current="page">{mode.label}</li>
    </ol></nav>
    <header className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div>
        <p className="mb-4 inline-flex rounded-full bg-[#fff0e9] px-3 py-1 text-sm font-semibold text-[#8F3D27]">In development</p>
        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">{mode.title}</h1>
        <p className="mt-5 text-lg leading-8 text-[#6d5a52]">{mode.overview}</p>
        <Link href={mode.example.href} className="mt-6 inline-flex min-h-[44px] items-center gap-3 rounded-lg bg-[#8F3D27] px-5 py-3 text-sm font-semibold text-white hover:bg-[#73301f]">{mode.example.label} <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
      <figure className="overflow-hidden rounded-2xl border border-[#e7d8cf] bg-white">
        <div className="relative aspect-[4/3] bg-[#120d0b]"><Image src={mode.image.src} alt={mode.image.alt} fill priority sizes="(max-width: 768px) 90vw, 48vw" className="object-contain" /></div>
        <figcaption className="px-4 py-3 text-sm text-[#6d5a52]">{mode.image.caption}</figcaption>
      </figure>
    </header>
    <article className="guide mt-12 max-w-3xl space-y-10">
      {mode.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
      <section><h2>Examples and guides</h2>
        <ul className="grid gap-2 sm:grid-cols-2">{[mode.collection, ...(mode.path === productModePaths.render ? [{ href: renderPath, label: 'Explore architectural visualization and 3D walkthroughs' }] : []), { href: '/docs/export/images', label: 'Export frames from the 2D editor' }, { href: '/product-modes', label: 'Check product availability' }].map(link => <li key={link.href}><Link className={bodyLink} href={link.href}>{link.label} <ArrowUpRight size={16} aria-hidden="true" /></Link></li>)}</ul>
      </section>
    </article>
    <nav className="mt-10 flex flex-wrap gap-x-5 border-t border-[#e7d8cf] pt-4 text-sm" aria-label="Chorono product modes">
      <Link className={bodyLink} href="/#product-modes">All product modes</Link>
      <Link className={bodyLink} href={productModePaths.motion}>2D Motion Graphics</Link>
      {Object.values(productModePages).map(item => <Link className={bodyLink} key={item.path} href={item.path} aria-current={item.path === mode.path ? 'page' : undefined}>{item.label}</Link>)}
    </nav>
  </main>
}
