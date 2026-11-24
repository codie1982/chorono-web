import { apiV1 } from './chorono-api'

export const roles = [
  { id: 'developer', label: 'I’m a developer' },
  { id: 'user', label: 'I’m a user' },
] as const

export const modes = [
  { id: 'game-engine', label: 'Game engine' },
  { id: 'animation-video', label: 'Animation & video editing' },
  { id: '3d-modeling', label: '3D modeling' },
  { id: 'render', label: 'Rendering' },
] as const

export type CommunityRole = typeof roles[number]['id']
export type CommunityMode = typeof modes[number]['id']
export type CommunityInvitation = { kind: 'follow' | 'exit' | 'vote' } | { kind: 'install'; href: string }
type SubscriptionSource = Exclude<CommunityInvitation['kind'], 'vote'>

const values = new Map<string, string>()

export function readCommunityValue(key: string) {
  if (values.has(key)) return values.get(key)
  try { return localStorage.getItem(key) ?? undefined } catch { return undefined }
}

export function writeCommunityValue(key: string, value: string) {
  values.set(key, value)
  try { localStorage.setItem(key, value) } catch { /* Keep the current visit usable. */ }
}

function getVisitorId() {
  const key = 'chorono:community-visitor'
  const visitorId = readCommunityValue(key) ?? crypto.randomUUID()
  writeCommunityValue(key, visitorId)
  return visitorId
}

async function request(path: string, method: 'POST' | 'PUT', data: object) {
  const response = await fetch(new URL('community/' + path, apiV1), {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error('Community request failed')
  return response
}

export async function saveCommunityResponse(data: { role?: CommunityRole; mode?: CommunityMode }) {
  await request('response', 'PUT', { ...data, visitorId: getVisitorId() })
}

export async function claimCommunityExit() {
  const response = await request('exit-prompt', 'POST', { visitorId: getVisitorId() })
  const data = await response.json()
  return data.show === true
}

export async function subscribeToCommunityUpdates(email: string, source: SubscriptionSource, role?: CommunityRole) {
  await request('subscribe', 'POST', { email, source, role })
}
