'use client'

import type { AnchorHTMLAttributes } from 'react'
import { trackExampleAction } from '@/lib/analytics'

/** Keep native download behavior; only record the activation of a reviewed public asset. */
export default function ExampleDownload({ exampleId, href, onClick, onAuxClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { exampleId: string; href: string }) {
  const record = () => trackExampleAction(exampleId, 'download', href)
  return <a {...props} href={href} onClick={event => { onClick?.(event); if (!event.defaultPrevented) record() }} onAuxClick={event => { onAuxClick?.(event); if (event.button === 1 && !event.defaultPrevented) record() }} />
}
