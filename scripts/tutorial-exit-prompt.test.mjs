import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync(new URL('../components/tutorial/GitHubExitPrompt.tsx', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText

// Exercise the actual effect/event handler with browser boundaries controlled independently.
function mount({ elapsed = 31000, desktop = true, scroll = 300, stored = false, storageFails = false } = {}) {
  let now = 0
  let showCount = 0
  let open = false
  let handler
  let cleanup
  const storage = new Map(stored ? [['chorono:star-prompt-shown:v1', '1']] : [])
  const element = { get open() { return open }, showModal() { open = true; showCount++ }, close() { open = false } }
  const jsx = (type, props) => ({ type, props })
  const context = {
    exports: {},
    Date: { now: () => now },
    HTMLElement: class {},
    document: { visibilityState: 'visible', activeElement: null, documentElement: {
      addEventListener: (name, callback) => { assert.equal(name, 'mouseleave'); handler = callback },
      removeEventListener: (name, callback) => { assert.equal(callback, handler) },
    } },
    window: { scrollY: scroll, matchMedia: () => ({ matches: desktop }) },
    sessionStorage: {
      getItem: key => { if (storageFails) throw Error('blocked'); return storage.get(key) },
      setItem: (key, value) => { if (storageFails) throw Error('blocked'); storage.set(key, value) },
    },
    require: name => {
      if (name === 'react') return { useEffect: callback => { cleanup = callback() }, useRef: () => ({ current: element }) }
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx }
      if (name === 'lucide-react') return { Star: 'star', X: 'x' }
      if (name === '@/lib/site') return { REPOSITORY_URL: 'https://github.com/codie1982/chorono-editor' }
      if (name === '@/lib/analytics') return { trackAction: () => {} }
      throw Error(`Unexpected dependency: ${name}`)
    },
  }
  vm.runInNewContext(compiled, context)
  context.exports.GitHubExitPrompt()
  now = elapsed
  return { exit: (event = {}) => handler({ relatedTarget: null, clientY: -1, ...event }), close: () => element.close(), count: () => showCount, stored: () => storage.size, cleanup: () => cleanup(), remount: () => context.exports.GitHubExitPrompt() }
}

test('does not interrupt initial reading, small screens or unengaged visitors', () => {
  for (const options of [{ elapsed: 1000 }, { desktop: false }, { scroll: 0 }, { stored: true }]) {
    const page = mount(options); page.exit(); assert.equal(page.count(), 0); page.cleanup()
  }
})

test('only leaving through the upper edge opens the star request once', () => {
  const page = mount()
  page.exit({ clientY: 500 }); page.exit({ relatedTarget: {} }); assert.equal(page.count(), 0)
  page.exit(); assert.equal(page.count(), 1); assert.equal(page.stored(), 1)
  page.close(); page.exit(); assert.equal(page.count(), 1); page.cleanup()
})

test('blocked session storage never prevents closing or allows repeated prompts across routes', () => {
  const page = mount({ storageFails: true })
  page.exit(); assert.equal(page.count(), 1)
  page.close(); page.cleanup(); page.remount(); page.exit(); assert.equal(page.count(), 1)
})
