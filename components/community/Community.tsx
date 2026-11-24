'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { watchExitIntent } from '@/lib/community-exit'
import {
  claimCommunityExit, modes, readCommunityValue, roles, saveCommunityResponse, writeCommunityValue,
  type CommunityInvitation, type CommunityMode, type CommunityRole,
} from '@/lib/community'
import styles from './community.module.css'

const CommunityDialog = dynamic(() => import('./CommunityDialog').then(module => module.CommunityDialog), { ssr: false })
const OpenInvitation = createContext<(invitation: CommunityInvitation) => boolean>(() => false)
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
  const dialogOpen = useRef(false)
  const previousFocus = useRef<HTMLElement | null>(null)
  const [invitation, setInvitation] = useState<CommunityInvitation>()
  const [isOpen, setIsOpen] = useState(false)
  const [survey, setSurvey] = useState(false)
  const [role, setRole] = useState<CommunityRole>()
  const [mode, setMode] = useState<CommunityMode>()
  const [savedVote, setSavedVote] = useState<CommunityMode>()
  const [pending, setPending] = useState<'role' | 'vote'>()
  const [error, setError] = useState('')

  const updateOpen = (value: boolean) => {
    dialogOpen.current = value
    setIsOpen(value)
  }
  const open = useCallback((entry: CommunityInvitation) => {
    if (dialogOpen.current) return false
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogOpen.current = true
    setInvitation(entry)
    setSurvey(entry.kind === 'vote')
    setError('')
    setIsOpen(true)
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
      () => !dialogOpen.current && !document.querySelector('dialog[open], [role="dialog"][data-state="open"]'),
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

  return <OpenInvitation.Provider value={open}>
    {children}
    {invitation && <CommunityDialog
      invitation={invitation}
      isOpen={isOpen}
      survey={survey}
      role={role}
      mode={mode}
      savedVote={savedVote}
      pending={pending}
      error={error}
      onOpenChange={updateOpen}
      onReturnFocus={() => { if (previousFocus.current?.isConnected) previousFocus.current.focus() }}
      onSurveyChange={setSurvey}
      onRoleChange={chooseRole}
      onModeChange={nextMode => { setMode(nextMode); setError('') }}
      onVote={vote}
    />}
  </OpenInvitation.Provider>
}
