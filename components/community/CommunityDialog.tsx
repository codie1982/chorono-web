'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Button, Dialog, IconButton, Theme } from '@radix-ui/themes'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import '@radix-ui/themes/styles.css'
import { trackAction } from '@/lib/analytics'
import { modes, roles, type CommunityInvitation, type CommunityMode, type CommunityRole } from '@/lib/community'
import { REPOSITORY_URL } from '@/lib/site'
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
  const title = useRef<HTMLHeadingElement>(null)
  const followUrl = role === 'user' ? REPOSITORY_URL + '/releases' : REPOSITORY_URL
  const followLabel = role === 'user' ? 'See release updates' : 'Follow on GitHub'
  const hasVoted = Boolean(mode && mode === savedVote)
  const installHref = invitation.kind === 'install' ? invitation.href : null

  function switchView(showSurvey: boolean) {
    onSurveyChange(showSurvey)
    title.current?.focus()
  }

  return <Theme appearance="light" accentColor="bronze" grayColor="sand" radius="medium" hasBackground={false} asChild>
    <div className={styles.theme}>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Content className={styles.dialog} maxWidth="456px"
          onCloseAutoFocus={event => { event.preventDefault(); onReturnFocus() }}>
          <div className={styles.heading}>
            <Dialog.Title ref={title} tabIndex={-1} className={styles.title} size="6" mb="0">
              {survey ? 'What should we build next?' : 'Follow Chorono'}
            </Dialog.Title>
            <Dialog.Close>
              <IconButton className={styles.close} color="gray" variant="ghost" type="button" aria-label="Close invitation">
                <X size={19} aria-hidden="true" />
              </IconButton>
            </Dialog.Close>
          </div>
          <Dialog.Description className={styles.intro} size="2">
            {survey ? 'Choose one area you’d like us to focus on.' : 'Get release notes and see what we’re working on.'}
          </Dialog.Description>

          <fieldset className={styles.roles} disabled={Boolean(pending)}>
            <legend>How do you use Chorono?</legend>
            <div>
              {roles.map(item => <Button key={item.id} type="button" size="2" variant={role === item.id ? 'soft' : 'ghost'}
                aria-pressed={role === item.id} onClick={() => void onRoleChange(item.id)}>
                {item.label}
              </Button>)}
            </div>
          </fieldset>

          {survey ? <form className={styles.survey} onSubmit={event => { event.preventDefault(); void onVote() }}>
            <fieldset disabled={Boolean(pending)}>
              <legend className="sr-only">Choose one feature</legend>
              {modes.map(item => <label key={item.id}>
                <input type="radio" name="community-mode" value={item.id} checked={mode === item.id}
                  onChange={() => onModeChange(item.id)} />
                <span>{item.label}</span>
              </label>)}
            </fieldset>
            <div className={styles.voteActions}>
              <Button type="submit" size="2" disabled={!mode || Boolean(pending) || hasVoted}>
                {pending === 'vote' ? 'Saving vote…' : 'Save vote'}
              </Button>
              {hasVoted && <p className={styles.status} role="status">Vote saved. Thank you!</p>}
            </div>
          </form> : <a href={followUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}
            onClick={() => { if (role !== 'user') trackAction('githubStar', `community-${invitation.kind}`) }}>
            {followLabel} <ArrowUpRight size={16} aria-hidden="true" />
          </a>}

          {pending === 'role' && <p className={styles.status} role="status">Saving your role…</p>}
          {error && <p className={styles.error} role="alert">{error}</p>}

          {invitation.kind !== 'vote' && <div className={styles.footer}>
            <Button type="button" color="gray" variant="ghost"
              onClick={() => switchView(!survey)}>
              {survey ? <><ArrowLeft size={15} aria-hidden="true" /> Back</> : 'Vote for a feature'}
            </Button>
            {installHref && <Dialog.Close>
              <Button asChild size="3" variant={survey ? 'outline' : 'solid'} className={styles.install}>
                <Link href={installHref}>Continue to installation <ArrowRight size={16} aria-hidden="true" /></Link>
              </Button>
            </Dialog.Close>}
            {invitation.kind === 'exit' && <Dialog.Close>
              <Button type="button" color="gray" variant="soft">Keep browsing</Button>
            </Dialog.Close>}
          </div>}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  </Theme>
}
