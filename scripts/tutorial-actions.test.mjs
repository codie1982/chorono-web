import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

function compile(path, jsx = false) {
  return ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, ...(jsx ? { jsx: ts.JsxEmit.ReactJSX } : {}) },
  }).outputText
}
const analyticsCode = compile('../lib/analytics.ts')
const actionCode = compile('../components/tutorial/TutorialAction.tsx', true)

function setup(gtag) {
  const analyticsContext = { exports: {}, window: { gtag, location: { pathname: '/docs/editor/keyframes' } } }
  vm.runInNewContext(analyticsCode, analyticsContext)
  const jsx = (type, props) => ({ type, props })
  const actionContext = { exports: {}, window: analyticsContext.window, require: name => {
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx }
    if (name === 'next/link') return { default: 'a' }
    if (name === '@/lib/analytics') return analyticsContext.exports
    if (name === '@/components/community/Community') return { useInstallInvitation: () => () => false }
    throw Error(`Unexpected dependency: ${name}`)
  } }
  vm.runInNewContext(actionCode, actionContext)
  return { action: actionContext.exports.TutorialAction, analytics: analyticsContext.exports }
}

test('blog and docs install buttons emit the homepage event with distinct placement', () => {
  const calls = []
  const { action, analytics } = setup((...args) => calls.push(args))
  analytics.trackAction('editorSetup', 'hero')
  for (const placement of ['blog-index', 'blog-make-animations-with-codex', 'docs-index', 'docs-editor/keyframes']) {
    const link = action({ href: '/getting-started', children: 'Install the free editor', placement, primary: true })
    assert.equal(link.props.href, '/getting-started')
    link.props.onClick()
    assert.deepEqual(JSON.parse(JSON.stringify(calls.at(-1))), ['event', 'editor_setup_click', { cta_location: placement }])
  }
  assert.equal(calls.length, 5)
  assert.equal(calls.every(call => call[1] === calls[0][1]), true)
})

test('an install click does not send a second navigation event and suppresses rapid repeats', () => {
  const calls = []
  const { action } = setup((...args) => calls.push(args))
  const link = action({ href: '/getting-started', children: 'Install', placement: 'docs-test' })
  link.props.onClick(); link.props.onClick()
  assert.equal(calls.length, 1)
  assert.equal(calls[0][1], 'editor_setup_click')
})

test('reading a banner emits nothing and an unavailable analytics tag never blocks the link', () => {
  const calls = []
  setup((...args) => calls.push(args)).action({ href: '/getting-started', children: 'Install', placement: 'docs-idle' })
  assert.equal(calls.length, 0)
  for (const tag of [undefined, () => { throw Error('blocked') }]) {
    const link = setup(tag).action({ href: '/getting-started', children: 'Install', placement: 'docs-failure' })
    assert.doesNotThrow(() => link.props.onClick())
    assert.equal(link.props.href, '/getting-started')
  }
})
