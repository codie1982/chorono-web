'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { trackAction } from '@/lib/analytics'
import { watchExitIntent } from '@/lib/community-exit'
import {
  claimCommunityExit, modes, readCommunityValue, roles, saveCommunityResponse, writeCommunityValue,
  type CommunityMode, type CommunityRole,
} from '@/lib/community'
import { REPOSITORY_URL } from '@/lib/site'
import styles from './community.module.css'

type Invitation = { kind: 'follow' | 'exit' | 'vote' } | { kind: 'install'; href: string }
const OpenInvitation = createContext<(invitation: Invitation) => boolean>(() => false)
const roleKey = 'chorono:community-role'
const modeKey = 'chorono:community-vote'

export function useInstallInvitation() {
  const open = useContext(OpenInvitation)
  return (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false
    if (!open({ kind: 'install', href })) return false
    event.preventDefault()
    return true
  }
}

export function InstallEditorLink({ children, className }: { children: ReactNode; className: string }) {
  const invite = useInstallInvitation()
  const href = '/getting-started'
  return <Link href={href} className={className} aria-haspopup="dialog" onClick={event => invite(event, href)}>{children}</Link>
}

export function CommunityBanner() {
  const open = useContext(OpenInvitation)
  const pathname = usePathname()
  if (pathname === '/account') return null

  return <aside className={styles.banner} aria-label="Chorono community">
    <div className={styles.bannerInner}>
      <p>What should we build next?</p>
      <div className={styles.bannerActions}>
        <button type="button" className={styles.bannerVote} aria-haspopup="dialog" onClick={() => open({ kind: 'vote' })}>
          Vote for a feature <ArrowRight size={16} aria-hidden="true" />
        </button>
        <button type="button" className={styles.bannerFollow} aria-haspopup="dialog" onClick={() => open({ kind: 'follow' })}>Follow Chorono</button>
      </div>
    </div>
  </aside>
}

export function CommunityProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const [invitation, setInvitation] = useState<Invitation>({ kind: 'follow' })
  const [survey, setSurvey] = useState(false)
  const [role, setRole] = useState<CommunityRole>()
  const [mode, setMode] = useState<CommunityMode>()
  const [savedVote, setSavedVote] = useState<CommunityMode>()
  const [pending, setPending] = useState<'role' | 'vote'>()
  const [error, setError] = useState('')

  const close = () => dialog.current?.close()
  const open = useCallback((entry: Invitation) => {
    const modal = dialog.current
    if (!modal || modal.open || typeof modal.showModal !== 'function') return false
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    try { modal.showModal() } catch { return false }
    setInvitation(entry)
    setSurvey(entry.kind === 'vote')
    setError('')
    closeButton.current?.focus()
    return true
  }, [])

  useEffect(() => {
    const initialRole = roles.find(item => item.id === readCommunityValue(roleKey))?.id
    const initialMode = modes.find(item => item.id === readCommunityValue(modeKey))?.id
    setRole(initialRole)
    setMode(initialMode)
    setSavedVote(initialMode)
  }, [])

  useEffect(() => {
    if (pathname === '/account') return
    return watchExitIntent(
      () => Boolean(dialog.current && !dialog.current.open && !document.querySelector('dialog[open]')),
      claimCommunityExit,
      () => open({ kind: 'exit' }),
    )
  }, [open, pathname])

  async function chooseRole(nextRole: CommunityRole) {
    setPending('role')
    setError('')
    try {
      await saveCommunityResponse({ role: nextRole })
      writeCommunityValue(roleKey, nextRole)
      setRole(nextRole)
    } catch {
      setError('Your role could not be saved. Choose it again to retry.')
    } finally {
      setPending(undefined)
    }
  }

  async function vote() {
    if (!mode) return
    setPending('vote')
    setError('')
    try {
      await saveCommunityResponse({ role, mode })
      writeCommunityValue(modeKey, mode)
      setSavedVote(mode)
    } catch {
      setError('Your vote could not be saved. Please try again.')
    } finally {
      setPending(undefined)
    }
  }

  const followUrl = role === 'user' ? REPOSITORY_URL + '/releases' : REPOSITORY_URL
  const followLabel = role === 'user' ? 'See release updates' : 'Follow on GitHub'
  const hasVoted = Boolean(mode && mode === savedVote)

  return <OpenInvitation.Provider value={open}>
    {children}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="community-title"
      onClose={() => {
        if (previousFocus.current?.isConnected) previousFocus.current.focus()
      }}
      onClick={event => {
        if (event.target !== dialog.current) return
        const rect = dialog.current.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
      }}>
      <button ref={closeButton} type="button" aria-label="Close invitation" className={styles.close} onClick={close}>
        <X size={20} aria-hidden="true" />
      </button>
      <h2 id="community-title">{invitation.kind === 'vote' ? 'What should we build next?' : 'Follow Chorono'}</h2>
      {invitation.kind !== 'vote' && <p className={styles.intro}>Keep up with new releases and help shape what comes next.</p>}

      <fieldset className={styles.roles} disabled={Boolean(pending)}>
        <legend>How do you use Chorono?</legend>
        <div>
          {roles.map(item => <button key={item.id} type="button" aria-pressed={role === item.id} onClick={() => void chooseRole(item.id)}>
            {item.label}
          </button>)}
        </div>
      </fieldset>

      {invitation.kind !== 'vote' && <div className={styles.followActions}>
        <a href={followUrl} target="_blank" rel="noopener noreferrer" className={styles.secondary} onClick={() => {
          if (role !== 'user') trackAction('githubStar', `community-${invitation.kind}`)
        }}>
          {followLabel} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        {!survey && <button type="button" className={styles.textButton} onClick={() => setSurvey(true)}>Vote for a feature</button>}
      </div>}

      {survey && <form className={styles.survey} onSubmit={event => { event.preventDefault(); void vote() }}>
        <fieldset disabled={Boolean(pending)}>
          <legend>{invitation.kind === 'vote' ? 'Choose one feature' : 'What should we build next?'}</legend>
          <div className={styles.options}>
            {modes.map(item => <label key={item.id} data-selected={mode === item.id || undefined}>
              <input type="radio" name="community-mode" value={item.id} checked={mode === item.id} onChange={() => { setMode(item.id); setError('') }} />
              <span>{item.label}</span>
            </label>)}
          </div>
        </fieldset>
        <button type="submit" className={styles.primary} disabled={!mode || Boolean(pending) || hasVoted}>
          {pending === 'vote' ? 'Saving vote…' : 'Save vote'}
        </button>
        {hasVoted && <p className={styles.success} role="status">Vote saved. Thank you!</p>}
      </form>}
      {pending === 'role' && <p className={styles.success} role="status">Saving your role…</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}

      {invitation.kind === 'install' && <div className={styles.continue}>
        <Link href={invitation.href} className={styles.primary} onClick={close}>
          Continue to installation <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>}
      {invitation.kind === 'exit' && <button type="button" className={styles.textButton} onClick={close}>Keep browsing</button>}
    </dialog>
  </OpenInvitation.Provider>
}
