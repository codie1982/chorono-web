import test from 'node:test'
import assert from 'node:assert/strict'
import { loadGitHubStars } from '../lib/github-stars.mjs'

test('accepts a real count, including zero', async () => {
  for (const count of [0, 7]) {
    assert.equal(await loadGitHubStars(async () => ({ ok: true, json: async () => ({ stargazers_count: count }) })), count)
  }
})

test('an API rate limit is optional data rather than a rendering failure', async () => {
  assert.equal(await loadGitHubStars(async () => ({ ok: false, status: 403, json: async () => { throw new Error('Should not parse a rejected response') } })), null)
})

test('missing, invalid and non-numeric counts cannot reach number formatting', async () => {
  for (const count of [undefined, null, '7', -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal(await loadGitHubStars(async () => ({ ok: true, json: async () => ({ stargazers_count: count }) })), null)
  }
  assert.equal(await loadGitHubStars(async () => ({ ok: true, json: async () => null })), null)
})

test('network failures and malformed JSON leave the GitHub link usable', async () => {
  assert.equal(await loadGitHubStars(async () => { throw new Error('Network unavailable') }), null)
  assert.equal(await loadGitHubStars(async () => ({ ok: true, json: async () => { throw new SyntaxError('Not JSON') } })), null)
})
