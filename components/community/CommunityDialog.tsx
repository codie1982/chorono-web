'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Dialog, IconButton, Theme } from '@radix-ui/themes'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import '@radix-ui/themes/styles.css'
import { modes, roles, subscribeToCommunityUpdates, type CommunityInvitation, type CommunityMode, type CommunityRole } from '@/lib/community'
import styles from './community.module.css'

type Props = {
  invitation: CommunityInvitation
  isOpen: boolean
  survey: boolean
  role?: CommunityRole
  mode?: CommunityMode
  savedVote?: CommunityMode
  pending?: 'role' | 'vote'
  error: string
  onOpenChange: (open: boolean) => void
  onReturnFocus: () => void
  onSurveyChange: (survey: boolean) => void
  onRoleChange: (role: CommunityRole) => Promise<void>
  onModeChange: (mode: CommunityMode) => void
  onVote: () => Promise<void>
}

export function CommunityDialog({
  invitation, isOpen, survey, role, mode, savedVote, pending, error,
  onOpenChange, onReturnFocus, onSurveyChange, onRoleChange, onModeChange, onVote,
}: Props) {
  const router = useRouter()
  const title = useRef<HTMLHeadingElement>(null)
  const subscriptionAttempt = useRef(0)
  const [email, setEmail] = useState('')
  const [subscription, setSubscription] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [countdown, setCountdown] = useState<number | null>(null)
  const hasVoted = Boolean(mode && mode === savedVote)
  const installHref = invitation.kind === 'install' ? invitation.href : null
  const busy = Boolean(pending) || subscription === 'saving' || countdown !== null

  const changeOpen = useCallback((open: boolean) => {
    if (!open) {
      subscriptionAttempt.current += 1
      setEmail('')
      setSubscription('idle')
      setCountdown(null)
    }
    onOpenChange(open)
  }, [onOpenChange])

  useEffect(() => {
    if (!isOpen || !installHref || countdown === null) return
    const timer = window.setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1)
      } else {
        changeOpen(false)
        router.push(installHref)
      }
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [changeOpen, countdown, installHref, isOpen, router])

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (invitation.kind === 'vote' || busy) return
    const attempt = ++subscriptionAttempt.current
    setSubscription('saving')
    try {
      await subscribeToCommunityUpdates(email, invitation.kind, role)
      if (attempt !== subscriptionAttempt.current) return
      setSubscription('saved')
      if (installHref) setCountdown(3)
    } catch {
      if (attempt === subscriptionAttempt.current) setSubscription('error')
    }
  }

  function continueToInstallation(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (countdown === null && subscription !== 'saving') setCountdown(3)
  }

  function switchView(showSurvey: boolean) {
    onSurveyChange(showSurvey)
    title.current?.focus()
  }

  return <Theme appearance="light" accentColor="bronze" grayColor="sand" radius="medium" hasBackground={false} asChild>
    <div className={styles.theme}>
      <Dialog.Root open={isOpen} onOpenChange={changeOpen}>
        <Dialog.Content className={styles.dialog} maxWidth="456px"
          onCloseAutoFocus={event => { event.preventDefault(); onReturnFocus() }}>
          <div className={styles.heading}>
            <Dialog.Title ref={title} tabIndex={-1} className={styles.title} size="6" mb="0">
              {survey ? 'What should we build next?' : 'Stay in the loop'}
            </Dialog.Title>
            <Dialog.Close>
              <IconButton className={styles.close} color="gray" variant="ghost" type="button" aria-label="Close invitation">
                <X size={19} aria-hidden="true" />
              </IconButton>
            </Dialog.Close>
          </div>
          <Dialog.Description className={styles.intro} size="2">
            {survey ? 'Choose one area you’d like us to focus on.' : 'Get new releases, creative examples, and what’s next for Chorono in your inbox.'}
          </Dialog.Description>

          {!survey && <Image src="/community/newsletter-studio.jpg" alt="" width={1080} height={360}
            sizes="(max-width: 480px) 90vw, 420px" className={styles.newsletterArt} />}

          <fieldset className={styles.roles} disabled={busy}>
            <legend>How do you use Chorono?</legend>
            <div>
              {roles.map(item => <Button key={item.id} type="button" size="2" variant={role === item.id ? 'soft' : 'ghost'}
                aria-pressed={role === item.id} onClick={() => void onRoleChange(item.id)}>
                {item.label}
              </Button>)}
            </div>
          </fieldset>

          {survey ? <form className={styles.survey} onSubmit={event => { event.preventDefault(); void onVote() }}>
            <fieldset disabled={busy}>
              <legend className="sr-only">Choose one feature</legend>
              {modes.map(item => <label key={item.id}>
                <input type="radio" name="community-mode" value={item.id} checked={mode === item.id}
                  onChange={() => onModeChange(item.id)} />
                <span>{item.label}</span>
              </label>)}
            </fieldset>
            <div className={styles.voteActions}>
              <Button type="submit" size="2" disabled={!mode || busy || hasVoted}>
                {pending === 'vote' ? 'Saving vote…' : 'Save vote'}
              </Button>
              {hasVoted && <p className={styles.status} role="status">Vote saved. Thank you!</p>}
            </div>
          </form> : subscription === 'saved'
            ? <p className={styles.subscribed} role="status">You’re on the list. Thanks for following Chorono!</p>
            : <form className={styles.subscription} onSubmit={event => void subscribe(event)}>
              <label htmlFor="chorono-updates-email">Email address</label>
              <div className={styles.emailRow}>
                <input type="email" id="chorono-updates-email" name="email" value={email}
                  autoComplete="email" inputMode="email" maxLength={254} required disabled={busy}
                  onChange={event => { setEmail(event.target.value); setSubscription('idle') }} />
                <Button type="submit" size="2" disabled={busy}>
                  {subscription === 'saving' ? 'Signing up…' : 'Get updates'}
                </Button>
              </div>
              {subscription === 'error' && <p className={styles.error} role="alert">We couldn’t sign you up. Check your email and try again.</p>}
            </form>}

          {pending === 'role' && <p className={styles.status} role="status">Saving your role…</p>}
          {error && <p className={styles.error} role="alert">{error}</p>}

          {invitation.kind !== 'vote' && <div className={styles.footer}>
            <Button type="button" color="gray" variant="ghost" disabled={busy}
              onClick={() => switchView(!survey)}>
              {survey ? <><ArrowLeft size={15} aria-hidden="true" /> Back</> : 'Vote for a feature'}
            </Button>
            {installHref &&
              <Button asChild size="3" variant={survey ? 'outline' : 'solid'} className={styles.install}>
                <Link href={installHref} onClick={continueToInstallation}
                  aria-disabled={countdown !== null || subscription === 'saving'}>
                  <span aria-live="polite" aria-atomic="true">
                    {countdown === null ? 'Continue to installation' : `Opening installation in ${countdown}s`}
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            }
            {invitation.kind === 'exit' && <Dialog.Close>
              <Button type="button" color="gray" variant="soft">Keep browsing</Button>
            </Dialog.Close>}
          </div>}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  </Theme>
}
