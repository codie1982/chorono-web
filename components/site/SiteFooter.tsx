import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'
import { GUIDE_AUTHOR, REPOSITORY_URL, RUNTIME_URL } from '@/lib/site'

/** Shared footer preserves established discovery links and the author anchor.
 * Animation library has a distinct section on every page, including home;
 * all links use the existing canonical routes and downloadable collection. */
export function SiteFooter() {
  return <footer className="site-footer" data-site-footer>
    <div className="site-footer-inner">
      <div className="site-footer-brand">
        <Link href="/" className="site-brand" aria-label="Chorono home"><img src="/icon.svg" width={40} height={40} alt="" /><span>CHORONO<small>ANIMATOR</small></span></Link>
        <p>Editable animation,<br />with your AI agent.</p>
        <p id="team">Guides by {GUIDE_AUTHOR.name}</p>
      </div>
      <nav className="site-footer-links" aria-label="Learning resources">
        <h2>Learn & create</h2>
        <Link href="/getting-started">Getting started</Link>
        <Link href="/docs">Documentation</Link>
        <Link href="/agent-skills">Agent skills</Link>
        <Link href="/blog">Blog</Link>
      </nav>
      <nav className="site-footer-links" aria-label="Developer resources">
        <h2>Build with Chorono</h2>
        <Link href="/docs/runtime">Runtime & SDKs</Link>
        <Link href="/docs/export">Export guides</Link>
        <a href={REPOSITORY_URL}>GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
        <a href={RUNTIME_URL}>NPM <ArrowUpRight size={14} aria-hidden="true" /></a>
      </nav>
      <section className="site-footer-library" aria-labelledby="footer-animation-library">
        <span className="site-footer-kicker"><Play size={14} aria-hidden="true" /> EDITABLE PROJECTS</span>
        <h2 id="footer-animation-library">Animation library</h2>
        <p>Play a scene. Explore the layers.<br />Make the next version yours.</p>
        <Link href="/animations">Explore the collection <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </section>
      <nav className="site-footer-topics" aria-label="Animation examples and guides">
        <Link href="/motion-graphics-software">Motion graphics</Link><Link href="/text-animation">Text animation</Link>
        <Link href="/kinetic-typography">Kinetic typography</Link><Link href="/keyframe-animation">Keyframe animation</Link>
        <Link href="/animation-easing">Animation easing</Link><Link href="/blog/progress-bar-and-success-animation">Progress & success</Link>
      </nav>
      <div className="site-footer-bottom"><span>© {new Date().getFullYear()} Chorono</span><span>Free & open source. Made to be edited.</span></div>
    </div>
  </footer>
}
