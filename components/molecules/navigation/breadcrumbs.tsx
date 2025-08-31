'use client'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import React from 'react'

type Crumb = { href: string; label: string }

export function Breadcrumbs() {
  const pathname = usePathname()
  const tApp = useTranslations('app')

  const base = '/app'
  const segmentsAll = pathname.split('/').filter(Boolean)
  const appIndex = segmentsAll.indexOf('app')
  const segments = appIndex === -1 ? [] : segmentsAll.slice(appIndex + 1)

  function humanize(seg: string): string {
    const clean = decodeURIComponent(seg)
    return clean
      .split(/[-_]/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }

  function labelFor(seg: string): string {
    if (isIdLike(seg)) return tApp('breadcrumbs.details')
    switch (seg) {
      case 'hypotheses':
        return tApp('breadcrumbs.hypotheses')
      case 'assets':
        return tApp('pages.assets.title')
      case 'analytics':
        return tApp('pages.analytics.title')
      case 'waitlists':
        return tApp('pages.waitlists.title')
      case 'settings':
        return tApp('pages.settings.title')
      case 'organizations':
        return tApp('pages.organizations.title')
      default:
        return humanize(seg)
    }
  }

  function isIdLike(seg: string): boolean {
    // UUID v4 or similar
    const uuidRe =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    // Mongo-like 24 hex id
    const hex24Re = /^[0-9a-f]{24}$/i
    // ULID (26 Crockford base32 letters and digits)
    const ulidRe = /^[0-9A-HJKMNP-TV-Z]{26}$/
    // Pure numeric ids
    const numericRe = /^\d{6,}$/
    return (
      uuidRe.test(seg) ||
      hex24Re.test(seg) ||
      ulidRe.test(seg) ||
      numericRe.test(seg)
    )
  }

  // Optional: fetch entity names for id-like segments (e.g., /app/hypotheses/:id)
  const [hypoName, setHypoName] = React.useState<string | null>(null)
  React.useEffect(() => {
    const idx = segments.findIndex((s) => s === 'hypotheses')
    if (idx !== -1 && segments[idx + 1] && isIdLike(segments[idx + 1]!)) {
      const id = segments[idx + 1]!
      let ignore = false
      ;(async () => {
        try {
          const res = await fetch(`/api/v1/hypotheses/${id}`)
          if (!res.ok) return
          const data = (await res.json()) as any
          const name = data?.hypothesis?.name as string | undefined
          if (!ignore && name) setHypoName(name)
        } catch {
          /* ignore */
        }
      })()
      return () => {
        ignore = true
      }
    } else {
      setHypoName(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const crumbs: Crumb[] = [{ href: base, label: tApp('breadcrumbs.home') }]
  let acc = base
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!
    const nextAcc = `${acc}/${seg}`
    let label = labelFor(seg)
    if (isIdLike(seg) && i > 0 && segments[i - 1] === 'hypotheses' && hypoName) {
      label = hypoName
    }
    crumbs.push({ href: nextAcc, label })
    acc = nextAcc
  }

  return (
    <nav aria-label='Breadcrumb' className='ml-2'>
      <ol className='flex items-center space-x-3 text-sm'>
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1
          return (
            <Fragment key={`${idx}-${crumb.href}`}>
              <li className='flex'>
                <Link
                  href={crumb.href}
                  aria-current={isLast ? 'page' : undefined}
                  className={
                    isLast
                      ? 'text-gray-900 dark:text-gray-50'
                      : 'text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                >
                  {crumb.label}
                </Link>
              </li>
              {!isLast ? (
                <ChevronRight
                  className='size-4 shrink-0 text-gray-600 dark:text-gray-400'
                  aria-hidden='true'
                />
              ) : null}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
