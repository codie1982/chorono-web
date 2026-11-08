'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { DocumentationSearchEntry } from '@/lib/documentation/content'
import { searchDocumentation } from '@/lib/documentation/search'
import { DocumentationIcon as Icon } from './DocumentationIcon'

/**
 * Local full-text article/section search in a native modal dialog. The browser
 * owns focus trapping and Escape; closing restores the originating control.
 * No query leaves the page. Arrow keys and Enter choose anchored results.
 */
export function DocumentationSearch({
  entries,
  open,
  onClose,
}: {
  entries: readonly DocumentationSearchEntry[]
  open: boolean
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const router = useRouter()
  const results = useMemo(
    () => searchDocumentation(entries, query),
    [entries, query]
  )
  useEffect(() => {
    if (open && !dialog.current?.open) {
      setQuery('')
      setSelected(0)
      dialog.current?.showModal()
      input.current?.focus()
    }
    if (!open && dialog.current?.open) dialog.current.close()
  }, [open])
  useEffect(() => {
    document
      .getElementById(`docs-result-${selected}`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [selected])
  const select = (href: string) => {
    onClose()
    router.push(href)
  }
  return (
    <dialog
      ref={dialog}
      className="cd-search-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      aria-label="Search documentation"
    >
      <div className="cd-search-panel">
        <div className="cd-search-field">
          <Icon name="search" size={21} />
          <input
            ref={input}
            aria-label="Search documentation"
            placeholder="What would you like to learn?"
            value={query}
            role="combobox"
            aria-expanded="true"
            aria-controls="docs-search-results"
            aria-activedescendant={
              results.length ? `docs-result-${selected}` : undefined
            }
            autoComplete="off"
            onChange={(event) => {
              setQuery(event.target.value)
              setSelected(0)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()
                setSelected((value) =>
                  results.length
                    ? (value +
                        (event.key === 'ArrowDown' ? 1 : -1) +
                        results.length) %
                      results.length
                    : 0
                )
              }
              if (event.key === 'Enter' && results[selected]) {
                event.preventDefault()
                select(results[selected].href)
              }
            }}
          />
          <button
            onClick={onClose}
            className="cd-search-escape"
            aria-label="Close search"
          >
            Esc
          </button>
        </div>
        <div className="cd-search-caption" aria-live="polite">
          {query
            ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
            : 'A good place to start'}
        </div>
        <div
          id="docs-search-results"
          role="listbox"
          aria-label="Documentation results"
          className="cd-search-results"
        >
          {results.map((result, index) => (
            <Link
              id={`docs-result-${index}`}
              key={result.id}
              href={result.href}
              role="option"
              aria-selected={index === selected}
              className={
                index === selected
                  ? 'cd-search-result cd-result-selected'
                  : 'cd-search-result'
              }
              onMouseEnter={() => setSelected(index)}
              onClick={onClose}
            >
              <span className="cd-search-result-icon">
                <Icon name={result.section ? 'layers' : 'book'} size={19} />
              </span>
              <span>
                <small>
                  {result.group} / {result.title}
                </small>
                <strong>{result.section || result.title}</strong>
                <span>{result.excerpt}</span>
              </span>
              <Icon name="arrow" size={17} />
            </Link>
          ))}
        </div>
        {!results.length && (
          <div className="cd-search-empty">
            <Icon name="search" size={30} />
            <h3>No pages found</h3>
            <p>Try “keyframes”, “loop” or “connect”.</p>
          </div>
        )}
        <div className="cd-search-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> to navigate <kbd>↵</kbd> to open
          </span>
          <span>Search stays on your device</span>
        </div>
      </div>
    </dialog>
  )
}
