'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { trackCodeCopy } from '@/lib/analytics'

export function CopySnippet({ label, text, snippetId, prompt = false }: { label: string; text: string; snippetId: string; prompt?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      trackCodeCopy(snippetId)
      setStatus('copied')
    } catch { setStatus('failed') }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), 2400)
  }
  return <div className="tutorial-snippet">
    <div className="tutorial-snippet-toolbar"><span>{label}</span><button type="button" onClick={copy} aria-label={`Copy ${label}`}>
      {status === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {status === 'copied' ? 'Copied' : 'Copy'}
    </button></div>
    <pre className={prompt ? 'prompt-block' : undefined} tabIndex={0} aria-label={label}><code>{text}</code></pre>
    <span className="tutorial-copy-status" role="status">{status === 'failed' ? 'Clipboard unavailable. Select the text above to copy it.' : status === 'copied' ? 'Copied to clipboard.' : ''}</span>
  </div>
}
