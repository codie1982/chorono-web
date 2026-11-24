import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

function compile(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), 'utf8')
  return ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
}

const communityCode = compile('../lib/community.ts')
const exitCode = compile('../lib/community-exit.ts')
const key = 'chorono:community-exit:v1'

function mount({ elapsed = 31000, desktop = true, scroll = 300, stored = false, storageFails = false, claim = async () => true } = {}) {
  let now = 0
  let shown = 0
  let requests = 0
  let handler
  const storage = new Map(stored ? [[key, '1']] : [])
  const withStorage = action => {
    if (storageFails) throw Error('blocked')
    return action()
  }
  const community = {
    exports: {},
    localStorage: {
      getItem: name => withStorage(() => storage.get(name)),
      setItem: (name, value) => withStorage(() => storage.set(name, value)),
    },
    require: name => {
      assert.equal(name, './chorono-api')
      return {}
    },
  }
  vm.runInNewContext(communityCode, community)
  const context = {
    exports: {},
    Date: { now: () => now },
    document: { visibilityState: 'visible', documentElement: {
      addEventListener: (name, callback) => { assert.equal(name, 'mouseleave'); handler = callback },
      removeEventListener: (name, callback) => { assert.equal(callback, handler) },
    } },
    window: { scrollY: scroll, matchMedia: () => ({ matches: desktop }) },
    require: name => {
      assert.equal(name, './community')
      return community.exports
    },
  }
  vm.runInNewContext(exitCode, context)
  const start = () => {
    const stop = context.exports.watchExitIntent(() => true, () => { requests++; return claim() }, () => { shown++ })
    now += elapsed
    return stop
  }
  const stop = start()
  return {
    exit: (event = {}) => handler({ relatedTarget: null, clientY: -1, ...event }),
    shown: () => shown,
    requests: () => requests,
    stored: () => storage.get(key),
    stop,
    start,
  }
}

test('leaving early, on mobile, or with a recorded invitation does not contact the API', async () => {
  for (const options of [{ elapsed: 1000 }, { desktop: false }, { scroll: 0 }, { stored: true }]) {
    const page = mount(options)
    await page.exit()
    assert.equal(page.requests(), 0)
    page.stop()
  }
})

test('an eligible top-edge exit is claimed and remembered across visits', async () => {
  const page = mount()
  await page.exit({ clientY: 20 })
  await page.exit({ relatedTarget: {} })
  assert.equal(page.requests(), 0)
  await Promise.all([page.exit(), page.exit()])
  assert.equal(page.shown(), 1)
  assert.equal(page.stored(), '1')
  page.stop()
  const stop = page.start()
  await page.exit()
  assert.equal(page.requests(), 1)
  stop()
})

test('an existing server claim suppresses the invitation, and storage failure still guards navigation', async () => {
  const page = mount({ storageFails: true, claim: async () => false })
  await page.exit()
  assert.equal(page.shown(), 0)
  page.stop()
  const stop = page.start()
  await page.exit()
  assert.equal(page.requests(), 1)
  stop()
})

test('an unavailable API does not permanently consume the invitation', async () => {
  let available = false
  const page = mount({ claim: async () => { if (!available) throw Error('offline'); return true } })
  await page.exit()
  assert.equal(page.stored(), undefined)
  available = true
  await page.exit()
  assert.equal(page.shown(), 1)
  page.stop()
})
