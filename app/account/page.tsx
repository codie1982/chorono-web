import type { Metadata } from 'next'
import { AccountSession } from './AccountSession'
import styles from './account.module.css'

export const metadata: Metadata = {
  title: 'Account | Chorono',
  robots: { index: false, follow: false },
}

export default function AccountPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <section className={styles.account}>
      <h1>Account</h1>
      <AccountSession signInFailed={searchParams.error === 'sign-in'} />
    </section>
  )
}
