'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Menu, ChevronDown } from 'lucide-react'
import { GitHubStarButton } from './GitHubStarButton'

const links = [
  { href: '/getting-started', label: 'Getting started' },
  { href: '/agent-skills', label: 'Agent skills' },
  { href: '/motion-graphics-software', label: 'Examples' },
  { href: '/docs', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
] as const

/** Shared brand and route-aware navigation. The native mobile disclosure is
 * keyboard accessible and closes on navigation or Escape without trapping focus.
 * The animation collection is a dedicated destination in the shared footer. */
export function SiteHeader() {
  const pathname = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)
  useEffect(() => { if (menu.current) menu.current.open = false }, [pathname])
  const navigation = links.map(link => <Link key={link.href} href={link.href}
    aria-current={pathname === link.href ? 'page' : undefined}
    data-active={pathname === link.href || pathname.startsWith(link.href + '/') || undefined}
  >{link.label}</Link>)
  return <header className="site-header" data-site-header>
    <div className="site-header-inner">
      <Link className="site-brand" href="/" aria-label="Chorono home">
        <img src="/icon.svg" width={40} height={40} alt="" />
        <span>CHORONO<small>ANIMATOR</small></span>
      </Link>
      <nav className="site-desktop-nav" aria-label="Main navigation">{navigation}</nav>
      <div className="site-header-actions"><GitHubStarButton />
        <details ref={menu} className="site-mobile-navigation" onKeyDown={event => {
          if (event.key === 'Escape' && menu.current?.open) {
            menu.current.open = false
            menu.current.querySelector('summary')?.focus()
          }
        }}>
          <summary><Menu size={18} aria-hidden="true" /><span>Menu</span><ChevronDown size={14} aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation" onClick={() => { if (menu.current) menu.current.open = false }}>{navigation}</nav>
        </details>
      </div>
    </div>
  </header>
}
