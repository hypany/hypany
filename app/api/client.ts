import { serviceUrl } from '@/lib/url'
import { treaty } from '@elysiajs/eden'
import type { App } from './[[...slugs]]/route'

const { api } = treaty<App>(serviceUrl)

export function getClientApi() {
  return api
}
