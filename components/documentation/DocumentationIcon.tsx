export type DocumentationIconName =
  | 'pause'
  | 'arrow'
  | 'search'
  | 'menu'
  | 'close'
  | 'github'
  | 'code'
  | 'book'
  | 'spark'
  | 'check'
  | 'chevron'
  | 'sun'
  | 'moon'
  | 'external'
  | 'copy'
  | 'play'
  | 'layers'
  | 'clock'
  | 'terminal'
  | 'circle'

/** Small, consistently stroked decorative symbols used only by the docs UI. */
export function DocumentationIcon({
  name,
  size = 18,
}: {
  name: DocumentationIconName
  size?: number
}) {
  const paths = {
    pause: <path d="M8 5v14M16 5v14" />,
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    github: (
      <>
        <path d="M9 20c-4 1-4-2-6-2m12 4v-4a3.5 3.5 0 0 0-1-2.5c3-.4 6-1.5 6-6.5a5 5 0 0 0-1.5-3.5A4.6 4.6 0 0 0 18 2s-1.5-.5-4 1a13 13 0 0 0-6 0C5.5 1.5 4 2 4 2a4.6 4.6 0 0 0-.5 3.5A5 5 0 0 0 2 9c0 5 3 6.1 6 6.5A3.5 3.5 0 0 0 7 18v4" />
      </>
    ),
    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />,
    book: (
      <>
        <path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15" />
      </>
    ),
    spark: (
      <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 5 7 7-7 7" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    moon: <path d="M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z" />,
    external: <path d="M14 3h7v7m0-7L10 14m0-10H4v16h16v-6" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7Z" />,
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    terminal: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m6 9 3 3-3 3m7 0h5" />
      </>
    ),
    circle: <circle cx="12" cy="12" r="7" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
