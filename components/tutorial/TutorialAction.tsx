'use client'

import Link from 'next/link'
import { trackAction, trackAnimationEvent } from '@/lib/analytics'

export function TutorialAction({ href, children, placement, primary = false }: { href: string; children: React.ReactNode; placement: string; primary?: boolean }) {
  return <Link href={href} className={primary ? 'tutorial-button' : 'tutorial-text-link'} onClick={() => {
    if (href === '/getting-started' || href === '#install-editor') trackAction('editorSetup', placement)
    else trackAnimationEvent({ name: 'tutorial_next_click', params: { destination: href, cta_location: placement, page_path: window.location.pathname } })
  }}>{children}<span aria-hidden="true"> →</span></Link>
}
