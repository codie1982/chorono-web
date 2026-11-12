import type { ReactNode } from 'react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

/** One site-wide frame for marketing, guides, docs and editable animations.
 * Page layouts own their content/navigation only; branding and footer links
 * belong here. Server children retain their existing metadata and landmarks. */
export function SiteShell({ children }: { children: ReactNode }) {
  return <>
    <a href="#site-content" className="site-skip">Skip to content</a>
    <SiteHeader />
    <div id="site-content" className="site-content" tabIndex={-1}>{children}</div>
    <SiteFooter />
  </>
}
