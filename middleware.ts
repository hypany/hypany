import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { locales, localeCookieName, defaultLocale } from './i18n/config'

const allowed = new Set(locales)

export function middleware(request: NextRequest) {
  // Only handle normal page GET requests (avoid APIs/assets)
  if (request.method !== 'GET') return NextResponse.next()
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/api')) return NextResponse.next()

  const url = new URL(request.url)
  const lang = url.searchParams.get('lang')

  if (!lang || !allowed.has(lang as typeof locales[number])) {
    return NextResponse.next()
  }

  // Build a clean URL without the `lang` param, preserving others
  const clean = new URL(request.url)
  clean.searchParams.delete('lang')

  // If nothing else remains, strip the ? entirely
  const redirectTo = new URL(clean.pathname + (clean.search ? `?${clean.searchParams.toString()}` : ''), clean.origin)

  const res = NextResponse.redirect(redirectTo)
  // Persist for 1 year, path-wide
  res.cookies.set({
    name: localeCookieName,
    value: (lang as typeof locales[number]) || defaultLocale,
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return res
}

export const config = {
  // Exclude Next internals, static files, and API from matching
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

