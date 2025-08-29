/**
 * Assets API (v1)
 * - List and soft-delete uploaded assets
 */

import { and, eq, isNull } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/drizzle'
import { HTTP_STATUS } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { assets } from '@/schema'
import 'server-only'
import { ErrorResponse, SuccessResponse } from '../docs'
import { authPlugin } from './auth-plugin'

export const assetsApi = new Elysia({ prefix: '/v1/assets' })
  .use(authPlugin)
  // List assets for current user
  .get(
    '/',
    async ({ user, session, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const { hypothesisId, includeDeleted } = query

      const where = [eq(assets.userId, user.id)] as any[]
      if (hypothesisId) where.push(eq(assets.hypothesisId, hypothesisId))
      if (!includeDeleted) where.push(isNull(assets.deletedAt))

      const rows = await db
        .select()
        .from(assets)
        .where(and(...where))
        .orderBy(assets.createdAt)

      return jsonOk(set, HTTP_STATUS.OK, { assets: rows })
    },
    {
      auth: true,
      detail: {
        description: 'List uploaded assets for the current user',
        summary: 'List assets',
        tags: ['Uploads'],
      },
      query: t.Object({
        hypothesisId: t.Optional(t.String()),
        includeDeleted: t.Optional(t.Boolean()),
      }),
      response: {
        200: t.Object({ assets: t.Array(t.Record(t.String(), t.Any())) }),
        401: ErrorResponse,
      },
    },
  )
  // Soft delete an asset
  .delete(
    '/:id',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const id = params.id
      // Ensure the asset belongs to the user
      const [row] = await db
        .select({ id: assets.id })
        .from(assets)
        .where(and(eq(assets.id, id), eq(assets.userId, user.id)))
        .limit(1)

      if (!row) return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Asset not found')

      await db
        .update(assets)
        .set({ deletedAt: new Date() })
        .where(eq(assets.id, id))

      return jsonOk(set)
    },
    {
      auth: true,
      detail: {
        description: 'Soft delete an asset',
        summary: 'Delete asset',
        tags: ['Uploads'],
      },
      params: t.Object({ id: t.String() }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
