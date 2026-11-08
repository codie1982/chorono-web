'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface LoadingMeasurement {
  readonly path: string
  readonly navigationMatchesPage: boolean
  readonly ttfbMs: number | null
  readonly domContentLoadedMs: number | null
  readonly loadEventMs: number | null
  readonly firstContentfulPaintMs: number | null
  readonly documentTransferBytes: number | null
  readonly resourcesWithZeroTransfer: number
  readonly resourceCount: number
  readonly visibility: string
}

/**
 * Opt-in local diagnostics at ?measure=1. Normal docs render no diagnostic UI
 * and register no observers. Browser navigation/paint entries are exposed as
 * readable DOM output, never sent to an analytics service. One full navigation
 * is required per measurement; client-side route changes are explicitly marked
 * rather than attributed to the new article. Observers, listeners and pending
 * animation frames are released when the route changes or the shell unmounts.
 * All durations are milliseconds from this document's navigation start.
 */
export function LoadingMetrics() {
  const pathname = usePathname()
  const [measurement, setMeasurement] = useState<LoadingMeasurement | null>(
    null
  )
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('measure') !== '1') {
      setMeasurement(null)
      return
    }
    const capture = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as
        PerformanceNavigationTiming | undefined
      const paint = performance
        .getEntriesByType('paint')
        .find((entry) => entry.name === 'first-contentful-paint')
      const resources = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[]
      const round = (value: number | undefined) =>
        value === undefined || value === 0
          ? null
          : Math.round(value * 100) / 100
      setMeasurement({
        path: pathname,
        navigationMatchesPage:
          !!navigation && new URL(navigation.name).pathname === pathname,
        ttfbMs: round(
          navigation
            ? navigation.responseStart - navigation.startTime
            : undefined
        ),
        domContentLoadedMs: round(navigation?.domContentLoadedEventEnd),
        loadEventMs: round(navigation?.loadEventEnd),
        firstContentfulPaintMs: round(paint?.startTime),
        documentTransferBytes: navigation?.transferSize ?? null,
        resourcesWithZeroTransfer: resources.filter(
          (entry) => entry.transferSize === 0 && entry.decodedBodySize > 0
        ).length,
        resourceCount: resources.length,
        visibility: document.visibilityState,
      })
    }
    let frame = requestAnimationFrame(capture)
    const loaded = () => {
      frame = requestAnimationFrame(capture)
    }
    window.addEventListener('load', loaded, { once: true })
    let observer: PerformanceObserver | undefined
    if ('PerformanceObserver' in window) {
      observer = new PerformanceObserver(capture)
      observer.observe({ type: 'paint', buffered: true })
    }
    return () => {
      observer?.disconnect()
      window.removeEventListener('load', loaded)
      cancelAnimationFrame(frame)
    }
  }, [pathname])
  if (!measurement) return null
  return (
    <aside
      className="cd-loading-metrics"
      aria-label="Local page loading diagnostics"
    >
      <strong>Local page-load measurement</strong>
      <output aria-label="Page load metrics">
        {JSON.stringify(measurement)}
      </output>
      <span>Lab observation · existing cache · no throttling</span>
    </aside>
  )
}
