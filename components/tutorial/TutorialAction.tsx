'use client'

import Link from 'next/link'
import { trackAction, trackAnimationEvent } from '@/lib/analytics'
import { useInstallInvitation } from '@/components/community/Community'

export function TutorialAction({ href, children, placement, primary = false }: { href: string; children: React.ReactNode; placement: string; primary?: boolean }) {
  const invite = useInstallInvitation()
  return <Link href={href} className={primary ? 'tutorial-button' : 'tutorial-text-link'} aria-haspopup={href === '/getting-started' ? 'dialog' : undefined} onClick={event => {
    if (href === '/getting-started' || href === '#install-editor') trackAction('editorSetup', placement)
    else trackAnimationEvent({ name: 'tutorial_next_click', params: { destination: href, cta_location: placement, page_path: window.location.pathname } })
    if (href === '/getting-started') invite(event, href)
  }}>{children}<span aria-hidden="true"> →</span></Link>
}
