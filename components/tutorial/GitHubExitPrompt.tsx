'use client'

import { useEffect, useRef } from 'react'
import { Star, X } from 'lucide-react'
import { REPOSITORY_URL } from '@/lib/site'
import { trackAction } from '@/lib/analytics'

const storageKey = 'chorono:star-prompt-shown:v1'
let shownWithoutStorage = false

/** Desktop exit intent: only after 30s and meaningful scrolling; at most once per session. */
export function GitHubExitPrompt() {
  const dialog = useRef<HTMLDialogElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const startedAt = Date.now()
    let shown = false
    function onExit(event: MouseEvent) {
      if (shown || shownWithoutStorage || event.relatedTarget !== null || event.clientY > 0 || document.visibilityState !== 'visible') return
      if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches) return
      if (Date.now() - startedAt < 30000 || window.scrollY < 250) return
      try { if (sessionStorage.getItem(storageKey)) return } catch { /* In-memory guard still applies. */ }
      const modal = dialog.current
      if (!modal || modal.open) return
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      try { modal.showModal() } catch { return }
      shown = true
      shownWithoutStorage = true
      try { sessionStorage.setItem(storageKey, '1') } catch { /* Never block the modal close controls. */ }
    }
    document.documentElement.addEventListener('mouseleave', onExit)
    return () => document.documentElement.removeEventListener('mouseleave', onExit)
  }, [])
  function close() { dialog.current?.close() }
  return <dialog ref={dialog} className="tutorial-star-dialog" aria-labelledby="tutorial-star-title" aria-describedby="tutorial-star-description" onClose={() => previousFocus.current?.focus()} onClick={event => {
    if (event.target !== dialog.current) return
    const bounds = dialog.current.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close()
  }}>
    <button type="button" className="tutorial-star-close" onClick={close} aria-label="Close GitHub star invitation" autoFocus><X size={20} aria-hidden="true" /></button>
    <Star size={28} className="tutorial-star-icon" aria-hidden="true" />
    <p className="tutorial-eyebrow">FREE & OPEN SOURCE</p>
    <h2 id="tutorial-star-title">Found Chorono useful?</h2>
    <p id="tutorial-star-description">A star on GitHub helps more people discover the editor. Thanks for supporting the project.</p>
    <a className="tutorial-button" href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer" onClick={() => { trackAction('githubStar', 'tutorial-exit-intent'); close() }}>Star Chorono on GitHub <span aria-hidden="true">↗</span></a>
    <button type="button" className="tutorial-star-later" onClick={close}>Keep reading</button>
  </dialog>
}
