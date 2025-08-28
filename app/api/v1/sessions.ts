import 'server-only'
import { and, eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/database'
import { HTTP_STATUS } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { sessions } from '@/schema'
import { authPlugin } from './auth-plugin'

export const sessionsApi = new Elysia({ prefix: '/v1/sessions' })
  .use(authPlugin)
  // Revoke a session by ID (must belong to current user and not be current session)
  .post(
    '/revoke',
    async ({ user, session, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      if (body.id === session.id) {
        return jsonError(
          set,
          HTTP_STATUS.BAD_REQUEST,
          'Cannot revoke current session',
        )
      }

      const result = await db
        .delete(sessions)
        .where(and(eq(sessions.userId, user.id), eq(sessions.id, body.id)))
        .returning({ id: sessions.id })

      if (result.length === 0) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Session not found')
      }

      return jsonOk(set, HTTP_STATUS.OK, { id: result[0].id, revoked: true })
    },
    {
      auth: true,
      body: t.Object({ id: t.String() }),
      detail: {
        description: 'Revoke a session by ID for current user',
        summary: 'Revoke session',
        tags: ['Auth'],
      },
    },
  )
