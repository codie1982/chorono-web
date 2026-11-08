'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { DocumentationIcon as Icon } from './DocumentationIcon'

/** Copy exactly the rendered block text; clipboard denial is shown inline. */
export function CodeBlock({ children }: { children: ReactNode }) {
  const content = useRef<HTMLPreElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const [status, setStatus] = useState('Copy')
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content.current?.textContent ?? '')
      setStatus('Copied')
    } catch {
      setStatus('Select to copy')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('Copy'), 2200)
  }
  return (
    <div className="cd-code-block">
      <div className="cd-code-toolbar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <button onClick={copy} aria-live="polite">
          <Icon name={status === 'Copied' ? 'check' : 'copy'} size={13} />
          {status}
        </button>
      </div>
      <pre ref={content}>{children}</pre>
    </div>
  )
}
