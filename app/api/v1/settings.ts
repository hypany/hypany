/**
 * Settings API (v1)
 * - Read/update authenticated user settings (theme, notifications, onboarding)
 */

import { and, eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/drizzle'
import { HTTP_STATUS } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { userSettings } from '@/schema'
import 'server-only'
import { ulid } from 'ulid'
import { ErrorResponse } from '../docs'
import { authPlugin } from './auth-plugin'

const SettingsSchema = {
  update: t.Object({
    emailNotifications: t.Optional(t.Boolean()),
    onboardingComplete: t.Optional(t.Boolean()),
    theme: t.Optional(t.Union([t.Literal('light'), t.Literal('dark'), t.Literal('system')])),
  }),
}

export const settingsApi = new Elysia({ prefix: '/v1/settings' })
  .use(authPlugin)
  // Get current user's settings
  .get(
    '/me',
    async ({ user, session, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const [existing] = await db
        .select()
        .from(userSettings)
        .where(eq(userSettings.userId, user.id))
        .limit(1)

      if (existing) {
        return jsonOk(set, HTTP_STATUS.OK, { settings: existing })
      }

      // Lazily create default settings on first access
      const now = new Date()
      const defaults = {
        createdAt: now,
        emailNotifications: true,
        id: ulid(),
        onboardingComplete: false,
        theme: 'system' as const,
        updatedAt: now,
        userId: user.id,
      }
      await db.insert(userSettings).values(defaults)

      return jsonOk(set, HTTP_STATUS.OK, { settings: defaults })
    },
    {
      auth: true,
      detail: {
        description: 'Get settings for the authenticated user',
        summary: 'Get my settings',
        tags: ['Auth'],
      },
      response: {
        200: t.Object({ settings: t.Record(t.String(), t.Any()) }),
        401: ErrorResponse,
      },
    },
  )

  // Update current user's settings
  .patch(
    '/me',
    async ({ user, session, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const [existing] = await db
        .select({ id: userSettings.id })
        .from(userSettings)
        .where(eq(userSettings.userId, user.id))
        .limit(1)

      const now = new Date()

      if (!existing) {
        // Create with provided partials merged onto defaults
        const record = {
          createdAt: now,
          emailNotifications: body.emailNotifications ?? true,
          id: ulid(),
          onboardingComplete: body.onboardingComplete ?? false,
          theme: body.theme ?? 'system',
          updatedAt: now,
          userId: user.id,
        }
        await db.insert(userSettings).values(record)
        return jsonOk(set, HTTP_STATUS.OK, { settings: record })
      }

      const [updated] = await db
        .update(userSettings)
        .set({
          ...(body.emailNotifications !== undefined && {
            emailNotifications: body.emailNotifications,
          }),
          ...(body.onboardingComplete !== undefined && {
            onboardingComplete: body.onboardingComplete,
          }),
          ...(body.theme !== undefined && { theme: body.theme }),
          updatedAt: now,
        })
        .where(and(eq(userSettings.id, existing.id), eq(userSettings.userId, user.id)))
        .returning()

      return jsonOk(set, HTTP_STATUS.OK, { settings: updated })
    },
    {
      auth: true,
      body: SettingsSchema.update,
      detail: {
        description: 'Update settings for the authenticated user',
        summary: 'Update my settings',
        tags: ['Auth'],
      },
      response: {
        200: t.Object({ settings: t.Record(t.String(), t.Any()) }),
        401: ErrorResponse,
      },
    },
  )

export type SettingsApi = typeof settingsApi
