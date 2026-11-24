const apiOrigin = process.env.NEXT_PUBLIC_CHORONO_API_URL
  || (process.env.NODE_ENV === 'development' ? 'http://localhost:6001' : 'https://api.chorono.com')

export const apiV1 = new URL('/api/v1/', apiOrigin)
