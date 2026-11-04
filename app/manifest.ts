import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, THEME_COLOR } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Chorono Animator',
    short_name: 'Chorono',
    description: SITE_DESCRIPTION,
    lang: 'en',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#120D0B',
    theme_color: THEME_COLOR,
    icons: [
      { src: '/icons/chorono-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/chorono-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/chorono-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
