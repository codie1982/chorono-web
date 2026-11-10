import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync(new URL('../lib/analytics.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText

function load(window, clock = () => 0) {
  const context = { exports: {}, Date: { now: clock }, ...(window === undefined ? {} : { window }) }
  vm.runInNewContext(compiled, context)
  return context.exports
}

test('initializing analytics sends no interaction or count-load event', () => {
  const calls = []
  load({ gtag: (...args) => calls.push(args) })
  assert.equal(calls.length, 0)
})

test('each explicit activation emits one event with placement and no completion claim', () => {
  const calls = []
  const analytics = load({ gtag: (...args) => calls.push(args) })
  for (const [action, event] of Object.entries({ githubStar: 'github_star_click', editorSetup: 'editor_setup_click', agentSkills: 'agent_skills_click', androidSdk: 'android_sdk_click' })) {
    calls.length = 0
    analytics.trackAction(action, 'hero')
    assert.equal(calls.length, 1)
    assert.equal(JSON.stringify(calls[0]), JSON.stringify(['event', event, { cta_location: 'hero' }]))
  }
})

test('copy event contains only the snippet label', () => {
  const calls = []
  load({ gtag: (...args) => calls.push(args) }).trackCodeCopy('player.js')
  assert.equal(JSON.stringify(calls), JSON.stringify([['event', 'code_copy', { snippet_name: 'player.js' }]]))
})

test('SSR, missing tag and failed transport cannot break user actions', () => {
  for (const window of [undefined, {}, { gtag: null }, { gtag: () => { throw Error('blocked') } }]) {
    const analytics = load(window)
    assert.doesNotThrow(() => analytics.trackAction('githubStar', 'header'))
    assert.doesNotThrow(() => analytics.trackCodeCopy('terminal'))
    assert.doesNotThrow(() => analytics.trackAnimationEvent({name:'animation_engagement_10s',params:{engagement_seconds:10}}))
  }
})

test('animation metrics keep numeric durations on the existing Google tag', () => {
  const calls=[]
  load({gtag:(...args)=>calls.push(args)}).trackAnimationEvent({name:'animation_engagement_10s',params:{engagement_seconds:10,interaction_ms:10000,placement:'hero'}})
  assert.equal(JSON.stringify(calls),JSON.stringify([['event','animation_engagement_10s',{engagement_seconds:10,interaction_ms:10000,placement:'hero'}]]))
})


test('rapid duplicate CTA events are suppressed while placements and actions stay independent', () => {
  let now = 0
  const calls = []
  const analytics = load({ gtag: (...args) => calls.push(args) }, () => now)
  for (let index = 0; index < 100; index++) analytics.trackAction('editorSetup', 'hero')
  assert.equal(calls.length, 1)
  analytics.trackAction('editorSetup', 'header')
  analytics.trackAction('agentSkills', 'hero')
  assert.equal(calls.length, 3)
  now = 1999; analytics.trackAction('editorSetup', 'hero')
  assert.equal(calls.length, 3)
  now = 2000; analytics.trackAction('editorSetup', 'hero')
  assert.equal(calls.length, 4)
})

test('successful copy telemetry is limited per snippet, without exposing contents', () => {
  let now = 0
  const calls = []
  const analytics = load({ gtag: (...args) => calls.push(args) }, () => now)
  analytics.trackCodeCopy('install'); analytics.trackCodeCopy('install'); analytics.trackCodeCopy('player')
  assert.equal(calls.length, 2)
  now = 2000; analytics.trackCodeCopy('install')
  assert.equal(calls.length, 3)
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0])), ['event', 'code_copy', {snippet_name: 'install'}])
})
