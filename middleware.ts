import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLocale, localeCookieName, locales } from './i18n/config'
import { publishedRootDomain } from '@/lib/url'
import { extractSubdomainFromHost } from '@/lib/domains'

const allowed = new Set(locales)

export async function middleware(request: NextRequest) {
  // Only handle normal page GET requests (avoid APIs/assets)
  if (request.method !== 'GET') return NextResponse.next()
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Subdomain routing
  try {
    const host = request.headers.get('host') || ''
    const root = (publishedRootDomain || '').split(':')[0]
    const sub = extractSubdomainFromHost(host, root)

    // Optional: Platforms-style routing to /s/[subdomain]
    // Enable by setting NEXT_PUBLIC_ENABLE_PLATFORM_SUBDOMAINS=1
    const enablePlatforms =
      process.env.NEXT_PUBLIC_ENABLE_PLATFORM_SUBDOMAINS === '1' ||
      process.env.NEXT_PUBLIC_ENABLE_PLATFORM_SUBDOMAINS === 'true'

    if (sub) {
      // Avoid loops if already on a platform or published route
      if (enablePlatforms && !pathname.startsWith('/s/')) {
        const url = request.nextUrl.clone()
        // Preserve nested paths under subdomain if desired
        url.pathname = `/s/${sub}${pathname === '/' ? '' : pathname}`
        return NextResponse.rewrite(url)
      }

      if (!enablePlatforms && !pathname.startsWith('/published')) {
        // Resolve published landing page id via API and rewrite
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
