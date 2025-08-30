import 'server-only'
import { treaty } from '@elysiajs/eden'
import { headers } from 'next/headers'
import { serviceUrl } from '@/lib/url'
import type { App } from './[[...slugs]]/route'

export async function getServerApi() {
  const hdrs = await headers()
  const cookie = hdrs.get('cookie') ?? ''
  const { api } = treaty<App>(serviceUrl, {
    fetcher: (url, init) =>
      fetch(url, { ...init, headers: { ...init?.headers, cookie } }),
  })
  return api
}
