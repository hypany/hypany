/**
 * Uploads API (v1)
 * - Upload images to Vercel Blob and persist metadata
 */

import { put } from '@vercel/blob'
import { and, eq, isNull } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/drizzle'
import { HTTP_STATUS, ULID_PATTERN } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { logger } from '@/lib/logger'
import { assets, hypotheses } from '@/schema'
import 'server-only'
import { ulid } from 'ulid'
import { ErrorResponse } from '../docs'
import { authPlugin } from './auth-plugin'

const MAX_BYTES = 2 * 1024 * 1024 // 2MB

function sanitizeFilename(name: string): string {
  const trimmed = name.trim().toLowerCase()
  const replaced = trimmed.replace(/[^a-z0-9._-]+/g, '-')
  return replaced.replace(/^-+|-+$/g, '') || 'file'
}

export const uploadsApi = new Elysia({ prefix: '/v1/uploads' })
  .use(authPlugin)
  .post(
    '/image',
    async ({ user, session, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const file = body.file as File
      if (!file)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No file provided')

      const type = file.type || 'application/octet-stream'
      if (!type.startsWith('image/'))
        return jsonError(
          set,
          HTTP_STATUS.BAD_REQUEST,
          'Only image files are allowed',
        )

      const size = (file as any).size as number
      if (typeof size === 'number' && size > MAX_BYTES)
        return jsonError(
          set,
          HTTP_STATUS.BAD_REQUEST,
          'We limit images to 2MB because bigger files slow down load times and cause users to leave the site.',
        )

      // Optional association to a hypothesis (must belong to active organization)
      const hypothesisId = (body as any).hypothesisId as string | undefined
      if (hypothesisId) {
        const [row] = await db
          .select({ id: hypotheses.id })
          .from(hypotheses)
          .where(
            and(
              eq(hypotheses.id, hypothesisId),
              eq(hypotheses.organizationId, session.activeOrganizationId as string),
              isNull(hypotheses.deletedAt),
            ),
          )
          .limit(1)
        if (!row) {
          return jsonError(set, HTTP_STATUS.FORBIDDEN, 'Invalid hypothesis')
        }
      }

      const originalName = (file as any).name || 'image'
      const safeName = sanitizeFilename(originalName)
      const key = `uploads/${user.id}/${ulid()}-${safeName}`

      try {
        const { url } = await put(key, file, {
          access: 'public',
          contentType: type,
        })

        // Persist asset record (best-effort)
        try {
          await db.insert(assets).values({
            contentType: type,
            createdAt: new Date(),
            filename: safeName,
            hypothesisId: hypothesisId,
            id: ulid(),
            key,
            size: String(size),
            updatedAt: new Date(),
            url,
            userId: user.id,
          })
        } catch (e) {
          logger.error('Failed to save asset record', { error: String(e) })
        }

        return jsonOk(set, HTTP_STATUS.OK, { url })
      } catch (e) {
        logger.error('Blob upload failed', { error: String(e) })
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Upload failed',
        )
      }
    },
    {
      auth: true,
      body: t.Object({
        file: t.File(),
        hypothesisId: t.Optional(t.String({ pattern: ULID_PATTERN })),
      }),
      detail: {
        description: 'Upload an image to Vercel Blob (max 2MB)',
        summary: 'Upload image',
        tags: ['Uploads'],
      },
      response: {
        200: t.Object({ url: t.String() }),
        400: ErrorResponse,
        401: ErrorResponse,
        500: ErrorResponse,
      },
    },
  )
