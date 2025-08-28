import 'server-only'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { auth } from '@/auth'
import { swaggerInfo, swaggerTags } from '../docs'
import { assetsApi } from '../v1/assets'
import { gdprApi } from '../v1/gdpr'
import { hypothesesApi } from '../v1/hypotheses'
import { landingPagesApi } from '../v1/landing-pages'
import { publicApi } from '../v1/public'
import { sessionsApi } from '../v1/sessions'
import { uploadsApi } from '../v1/uploads'
import { analyticsApi } from '../v1/analytics'
import { waitlistsApi } from '../v1/waitlists'

const app = new Elysia({ prefix: '/api' })
  .use(
    swagger({
      documentation: { info: swaggerInfo, tags: swaggerTags },
      path: '/docs',
    }),
  )
  .get('/', () => ({ service: 'Hypany API', status: 'ok' }), {
    detail: {
      description: 'Check API service status',
      summary: 'Health Check',
      tags: ['Health'],
    },
  })
  // V1 API endpoints
  .use(hypothesesApi)
  .use(landingPagesApi)
  .use(waitlistsApi)
  .use(sessionsApi)
  .use(gdprApi)
  .use(publicApi)
  .use(assetsApi)
  .use(uploadsApi)
  .use(analyticsApi)
  // Mount Better Auth handler last to avoid interfering with other routes
  .mount(auth.handler)

export type App = typeof app

export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
export const PATCH = app.handle
export const OPTIONS = app.handle
