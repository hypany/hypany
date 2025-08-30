/**
 * GDPR API (v1)
 * - User data export and account deletion
 */

import { and, eq, inArray, isNull } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/drizzle'
import { HTTP_STATUS } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import {
  accounts,
  hypotheses,
  landingPageBlocks,
  landingPages,
  sessions,
  users,
  waitlistEntries,
  waitlists,
} from '@/schema'
import 'server-only'
import { ErrorResponse } from '../docs'
import { authPlugin } from './auth-plugin'

export const gdprApi = new Elysia({ prefix: '/v1/gdpr' })
  .use(authPlugin)
  // Export a copy of the user's personal data and owned content metadata
  .get(
    '/export',
    async ({ user, session, set, query }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Basic user record
      const [u] = await db
        .select({
          createdAt: users.createdAt,
          email: users.email,
          emailVerified: users.emailVerified,
          id: users.id,
          image: users.image,
          name: users.name,
          role: users.role,
          updatedAt: users.updatedAt,
        })
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1)

      // Sessions for the user
      const sessionConditions = [eq(sessions.userId, user.id)] as any[]
      // Exclude soft-deleted sessions if auth adds `deleted_at` in the future
      if ((sessions as any).deletedAt) {
        sessionConditions.push(isNull((sessions as any).deletedAt))
      }
      const userSessions = await db
        .select({
          createdAt: sessions.createdAt,
          expiresAt: sessions.expiresAt,
          id: sessions.id,
          ipAddress: sessions.ipAddress,
          updatedAt: sessions.updatedAt,
          userAgent: sessions.userAgent,
        })
        .from(sessions)
        .where(and(...sessionConditions))
        .orderBy(sessions.createdAt)

      // Linked auth accounts (exclude secrets)
      const accountConditions = [eq(accounts.userId, user.id)] as any[]
      // Exclude soft-deleted accounts if auth adds `deleted_at` in the future
      if ((accounts as any).deletedAt) {
        accountConditions.push(isNull((accounts as any).deletedAt))
      }
      const linkedAccounts = await db
        .select({
          accountId: accounts.accountId,
          createdAt: accounts.createdAt,
          id: accounts.id,
          providerId: accounts.providerId,
          updatedAt: accounts.updatedAt,
        })
        .from(accounts)
        .where(and(...accountConditions))

      // Owned content metadata
      const userHypotheses = await db
        .select({
          createdAt: hypotheses.createdAt,
          description: hypotheses.description,
          id: hypotheses.id,
          name: hypotheses.name,
          status: hypotheses.status,
          updatedAt: hypotheses.updatedAt,
        })
        .from(hypotheses)
        .where(
          and(
            eq(
              hypotheses.organizationId,
              session.activeOrganizationId as string,
            ),
            isNull(hypotheses.deletedAt),
          ),
        )

      const hypothesisIds = userHypotheses.map((h) => h.id)
      const userLandingPages = hypothesisIds.length
        ? await db
            .select({
              createdAt: landingPages.createdAt,
              customCss: landingPages.customCss,
              customDomain: hypotheses.customDomain,
              favicon: landingPages.favicon,
              hypothesisId: landingPages.hypothesisId,
              id: landingPages.id,
              metaDescription: landingPages.metaDescription,
              metaTitle: landingPages.metaTitle,
              ogImage: landingPages.ogImage,
              publishedAt: landingPages.publishedAt,
              slug: hypotheses.slug,
              template: landingPages.template,
              updatedAt: landingPages.updatedAt,
            })
            .from(landingPages)
            .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
            .where(
              and(
                inArray(landingPages.hypothesisId, hypothesisIds),
                isNull(landingPages.deletedAt),
              ),
            )
        : []

      const landingPageIds = userLandingPages.map((p) => p.id)
      const userBlocks = landingPageIds.length
        ? await db
            .select({
              content: landingPageBlocks.content,
              createdAt: landingPageBlocks.createdAt,
              id: landingPageBlocks.id,
              landingPageId: landingPageBlocks.landingPageId,
              order: landingPageBlocks.order,
              type: landingPageBlocks.type,
              updatedAt: landingPageBlocks.updatedAt,
            })
            .from(landingPageBlocks)
            .where(
              and(
                inArray(landingPageBlocks.landingPageId, landingPageIds),
                isNull(landingPageBlocks.deletedAt),
              ),
            )
        : []

      const userWaitlists = hypothesisIds.length
        ? await db
            .select({
              createdAt: waitlists.createdAt,
              hypothesisId: waitlists.hypothesisId,
              id: waitlists.id,
              name: waitlists.name,
              updatedAt: waitlists.updatedAt,
            })
            .from(waitlists)
            .where(
              and(
                inArray(waitlists.hypothesisId, hypothesisIds),
                isNull(waitlists.deletedAt),
              ),
            )
        : []

      // For GDPR export we avoid including third-party PII by default.
      // Provide counts of waitlist entries per waitlist.
      const waitlistIds = userWaitlists.map((w) => w.id)
      const waitlistEntryCounts: Record<string, number> = {}
      if (waitlistIds.length) {
        const rowCounts = await db
          .select({ waitlistId: waitlistEntries.waitlistId })
          .from(waitlistEntries)
          .where(
            and(
              inArray(waitlistEntries.waitlistId, waitlistIds),
              isNull(waitlistEntries.deletedAt),
            ),
          )
        for (const row of rowCounts) {
          waitlistEntryCounts[row.waitlistId] =
            (waitlistEntryCounts[row.waitlistId] || 0) + 1
        }
      }

      const payload = {
        account: u,
        accounts: linkedAccounts,
        exportGeneratedAt: new Date().toISOString(),
        hypotheses: userHypotheses,
        landingPageBlocks: userBlocks,
        landingPages: userLandingPages,
        sessions: userSessions,
        waitlists: userWaitlists.map((w) => ({
          ...w,
          entryCount: waitlistEntryCounts[w.id] || 0,
        })),
      }

      if (query.download === true || query.download === '1') {
        set.headers['content-type'] = 'application/json'
        const date = new Date().toISOString().slice(0, 10)
        set.headers['content-disposition'] =
          `attachment; filename="gdpr-export-${date}.json"`
      }

      return jsonOk(set, HTTP_STATUS.OK, payload)
    },
    {
      auth: true,
      detail: {
        description:
          'Export a JSON copy of your account data and owned content metadata (excludes third-party PII).',
        summary: 'Export my data',
        tags: ['Auth'],
      },
      query: t.Object({
        download: t.Optional(t.Union([t.Boolean(), t.Literal('1')])),
      }),
      response: {
        200: t.Object({
          account: t.Record(t.String(), t.Any()),
          accounts: t.Array(t.Record(t.String(), t.Any())),
          exportGeneratedAt: t.String(),
          hypotheses: t.Array(t.Record(t.String(), t.Any())),
          landingPageBlocks: t.Array(t.Record(t.String(), t.Any())),
          landingPages: t.Array(t.Record(t.String(), t.Any())),
          sessions: t.Array(t.Record(t.String(), t.Any())),
          waitlists: t.Array(t.Record(t.String(), t.Any())),
        }),
        401: ErrorResponse,
      },
    },
  )

  // Permanently delete the user account and all associated data
  .delete(
    '/account',
    async ({ user, session, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Delete the user record (cascades to sessions/accounts and app data)
      await db.delete(users).where(eq(users.id, user.id))

      return jsonOk(set, HTTP_STATUS.OK, { deleted: true })
    },
    {
      auth: true,
      detail: {
        description:
          'Delete your account and all associated data. This action is irreversible.',
        summary: 'Delete account',
        tags: ['Auth'],
      },
      response: { 200: t.Object({ deleted: t.Boolean() }), 401: ErrorResponse },
    },
  )
