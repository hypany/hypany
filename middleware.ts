import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLocale, localeCookieName, locales } from './i18n/config'
import { publishedRootDomain } from '@/lib/url'

const allowed = new Set(locales)

export async function middleware(request: NextRequest) {
  // Only handle normal page GET requests (avoid APIs/assets)
  if (request.method !== 'GET') return NextResponse.next()
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/api')) return NextResponse.next()

  // Subdomain routing for published sites: slug.hypany.app -> /published/{id}
  try {
    const host = request.headers.get('host') || ''
    const hostNoPort = host.split(':')[0]
    const root = (publishedRootDomain || '').split(':')[0]

    // Dev: slug.localhost:3000
    if (hostNoPort.endsWith('.localhost')) {
      if (pathname.startsWith('/published')) return NextResponse.next()
      if (pathname === '/' || pathname === '') {
        const sub = hostNoPort.split('.')[0]
        if (sub && sub !== 'www') {
          const url = new URL(`/api/v1/public/resolve/${sub}`, request.url)
          const res = await fetch(url, { cache: 'no-store' })
          if (res.ok) {
            const { id } = (await res.json()) as { id?: string }
            if (id) {
              const rewriteUrl = new URL(`/published/${id}`, request.url)
              return NextResponse.rewrite(rewriteUrl)
            }
          }
        }
      }
    }

    // Prod: slug.hypany.app
    if (root && hostNoPort.endsWith(`.${root}`)) {
      // ignore if already on published route
      if (pathname.startsWith('/published')) return NextResponse.next()
      // Only rewrite root path; deeper paths can be handled later if needed
      if (pathname === '/' || pathname === '') {
        const sub = hostNoPort.replace(`.${root}`, '').split('.')[0]
        if (sub && sub !== 'www') {
          const url = new URL(`/api/v1/public/resolve/${sub}`, request.url)
          const res = await fetch(url, { cache: 'no-store' })
          if (res.ok) {
            const { id } = (await res.json()) as { id?: string }
            if (id) {
              const rewriteUrl = new URL(`/published/${id}`, request.url)
              return NextResponse.rewrite(rewriteUrl)
            }
          }
        }
      }
    }
  } catch {}

  const url = new URL(request.url)
  const lang = url.searchParams.get('lang')

  if (!lang || !allowed.has(lang as (typeof locales)[number])) {
    return NextResponse.next()
  }

  // Build a clean URL without the `lang` param, preserving others
  const clean = new URL(request.url)
  clean.searchParams.delete('lang')

  // If nothing else remains, strip the ? entirely
  const redirectTo = new URL(
    clean.pathname + (clean.search ? `?${clean.searchParams.toString()}` : ''),
    clean.origin,
  )

  const res = NextResponse.redirect(redirectTo)
  // Persist for 1 year, path-wide
  res.cookies.set({
    maxAge: 60 * 60 * 24 * 365,
    name: localeCookieName,
    path: '/',
    sameSite: 'lax',
    value: (lang as (typeof locales)[number]) || defaultLocale,
  })
  return res
}

export const config = {
  // Exclude Next internals, static files, and API from matching
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
