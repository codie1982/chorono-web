'use client'

import { useEffect, useState } from 'react'
import styles from './account.module.css'

type Profile = { email: string; displayName?: string; username?: string }
type AccountState =
  | { status: 'loading' }
  | { status: 'anonymous' }
  | { status: 'unavailable' }
  | { status: 'ready'; profile: Profile }

const apiOrigin = process.env.NEXT_PUBLIC_CHORONO_API_URL
  || (process.env.NODE_ENV === 'development' ? 'http://localhost:6001' : 'https://api.chorono.com')
const api = new URL('/api/v1/', apiOrigin)

export function AccountSession({ signInFailed }: { signInFailed: boolean }) {
  const [account, setAccount] = useState<AccountState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const response = await fetch(new URL('me', api), {
          credentials: 'include',
          cache: 'no-store',
          signal: controller.signal,
        })
        if (response.status === 401) {
          setAccount({ status: 'anonymous' })
          return
        }
        if (!response.ok) throw new Error('Account request failed')
        const { data } = await response.json()
        if (typeof data?.email !== 'string') throw new Error('Invalid account response')
        setAccount({ status: 'ready', profile: data })
      } catch {
        if (!controller.signal.aborted) setAccount({ status: 'unavailable' })
      }
    }
    void load()
    return () => controller.abort()
  }, [])

  if (account.status === 'loading') return <p role="status">Checking your session…</p>
  if (account.status === 'unavailable') {
    return <p role="alert">Your account is temporarily unavailable. Reload the page to try again.</p>
  }
  if (account.status === 'anonymous') {
    return <>
      {signInFailed && <p role="alert">Sign-in could not be completed. Try again.</p>}
      <a className={styles.primaryAction} href={new URL('session/login', api).href}>Sign in</a>
    </>
  }

  const profile = account.profile
  return <>
    <div className={styles.profile}>
      {(profile.displayName || profile.username) && <h2>{profile.displayName || profile.username}</h2>}
      <p>{profile.email}</p>
    </div>
    <form action={new URL('session/logout', api).href} method="post">
      <button className={styles.secondaryAction} type="submit">Sign out</button>
    </form>
  </>
}
