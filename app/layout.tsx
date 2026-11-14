import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { pageMetadata, SITE_URL, SITE_TITLE, SITE_DESCRIPTION, THEME_COLOR } from '@/lib/site'
import { SiteShell } from '@/components/site/SiteShell'
import './globals.css'
import './site.css'

export const metadata: Metadata = {
  ...pageMetadata(SITE_TITLE, SITE_DESCRIPTION),
  metadataBase: new URL(SITE_URL),
  applicationName: 'Chorono',
  category: 'technology',
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: { index: process.env.VERCEL_ENV !== 'preview', follow: process.env.VERCEL_ENV !== 'preview' },
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
}

/** Provides the public site shell and production-only page-view collectors. */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
        {process.env.VERCEL_ENV === 'production' && <Analytics />}
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  )
}
