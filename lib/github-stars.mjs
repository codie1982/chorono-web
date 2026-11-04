/**
 * A missing or rate-limited GitHub response must not break the landing page.
 * @param {typeof fetch} request
 * @returns {Promise<number | null>}
 */
export async function loadGitHubStars(request = fetch) {
  try {
    const response = await request('https://api.github.com/repos/codie1982/chorono-editor')
    if (!response.ok) return null
    const data = await response.json()
    const count = data?.stargazers_count
    return typeof count === 'number' && Number.isSafeInteger(count) && count >= 0 ? count : null
  } catch {
    return null
  }
}
