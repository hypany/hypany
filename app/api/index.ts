// Typed API client for calling the co-located Elysia app from the Next.js frontend.
// Uses Eden Treaty to infer request/response types from the server routes.
import { treaty } from '@elysiajs/eden'
import { serviceUrl } from '@/lib/url'
import type { App } from './[[...slugs]]/route'

const { api } = treaty<App>(serviceUrl)

export { api }
