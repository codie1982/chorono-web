'use client'

import { useEffect, useRef, useState } from 'react'
import type { DocumentationHeading } from '@/lib/documentation/content'
import { DocumentationIcon as Icon } from './DocumentationIcon'

/** Track visible headings without changing browser history or scroll position. */
export function TableOfContents({
  headings,
}: {
  headings: readonly DocumentationHeading[]
}) {
  const [active, setActive] = useState(headings[0]?.id ?? '')
  const mobileDetails = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const update = () => {
      const passed = headings.filter(
        (heading) =>
          (document.getElementById(heading.id)?.getBoundingClientRect().top ??
            Infinity) <= 150
      )
      setActive(passed[passed.length - 1]?.id ?? headings[0]?.id ?? '')
    }
    const observer = new IntersectionObserver(update, {
      rootMargin: '-90px 0px -65% 0px',
    })
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })
    update()
    window.addEventListener('hashchange', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', update)
    }
  }, [headings])
  const links = (
    <nav aria-label="On this page">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={heading.depth === 3 ? 'cd-toc-subheading' : undefined}
          aria-current={active === heading.id ? 'location' : undefined}
          onClick={() => {
            setActive(heading.id)
            if (mobileDetails.current) mobileDetails.current.open = false
          }}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
  return (
    <aside className="cd-toc">
      <div className="cd-toc-sticky">
        <span className="cd-toc-title">On this page</span>
        {links}
        <div className="cd-toc-help">
          <span>Something unclear?</span>
          <a href="https://github.com/codie1982/chorono-editor/issues">
            Let us know <Icon name="external" size={12} />
          </a>
          <a href="#docs-main">
            Back to top <span>↑</span>
          </a>
        </div>
      </div>
      <details ref={mobileDetails} className="cd-toc-mobile">
        <summary>
          On this page <Icon name="chevron" size={14} />
        </summary>
        {links}
      </details>
    </aside>
  )
}
