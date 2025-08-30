import { serviceUrl } from '@/lib/url'
import { treaty } from '@elysiajs/eden'
import type { App } from './[[...slugs]]/route'

export function getClientApi() {
  const { api } = treaty<App>(serviceUrl)
  return api
}
