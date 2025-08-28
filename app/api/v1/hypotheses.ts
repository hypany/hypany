import 'server-only'
import { and, desc, eq, inArray, isNull, sql } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { ulid } from 'ulid'
import { db } from '@/database'
import { HTTP_STATUS, ULID_PATTERN, WAITLIST_THRESHOLD } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { logger } from '@/lib/logger'
import {
  hypotheses,
  landingPages,
  pageVisits,
  waitlistEntries,
  waitlists,
} from '@/schema'
import { authPlugin } from './auth-plugin'

// Validation schemas
const HypothesisSchema = {
  create: t.Object({
    description: t.Optional(t.String({ maxLength: 1000 })),
    name: t.String({ maxLength: 255, minLength: 1 }),
    slug: t.Optional(t.String({ maxLength: 63, minLength: 3 })),
  }),

  params: t.Object({
    id: t.String({ pattern: ULID_PATTERN }), // ULID pattern
  }),

  update: t.Object({
    description: t.Optional(t.String({ maxLength: 1000 })),
    name: t.Optional(t.String({ maxLength: 255, minLength: 1 })),
    status: t.Optional(
      t.Union([
        t.Literal('draft'),
        t.Literal('published'),
        t.Literal('archived'),
      ]),
    ),
  }),
}

export const hypothesesApi = new Elysia({ prefix: '/v1/hypotheses' })
  .use(authPlugin)
  // List all hypotheses for the user
  .get(
    '/',
    async ({ user, query }) => {
      // Verify user is authenticated
      const userHypotheses = await db
        .select({
          hypothesis: hypotheses,
          landingPage: landingPages,
          waitlist: waitlists,
        })
        .from(hypotheses)
        .leftJoin(landingPages, eq(hypotheses.id, landingPages.hypothesisId))
        .leftJoin(waitlists, eq(hypotheses.id, waitlists.hypothesisId))
        .where(
          and(eq(hypotheses.userId, user.id), isNull(hypotheses.deletedAt)),
        )
        .orderBy(desc(hypotheses.createdAt))
        .limit(query.limit ?? 20)
        .offset(query.offset ?? 0)

      // Build a map of waitlistId -> signupCount
      const waitlistIds = userHypotheses
        .map((r) => r.waitlist?.id)
        .filter((id): id is string => Boolean(id))

      let countsByWaitlist = new Map<string, number>()
      if (waitlistIds.length > 0) {
        const counts = await db
          .select({
            count: sql<number>`count(*)::int`,
            waitlistId: waitlistEntries.waitlistId,
          })
          .from(waitlistEntries)
          .where(inArray(waitlistEntries.waitlistId, waitlistIds))
          .groupBy(waitlistEntries.waitlistId)

        countsByWaitlist = new Map(
          counts.map((c) => [c.waitlistId, Number(c.count)]),
        )
      }

      // Aggregate metrics for dashboard top cards
      const totalSignups = Array.from(countsByWaitlist.values()).reduce(
        (a, b) => a + b,
        0,
      )
      const readyToLaunch = userHypotheses.reduce((acc, r) => {
        const c = r.waitlist?.id ? countsByWaitlist.get(r.waitlist.id) || 0 : 0
        return acc + (c >= WAITLIST_THRESHOLD ? 1 : 0)
      }, 0)

      // Growth rate: last 7d vs previous 7d
      let growthRate7d = 0
      if (waitlistIds.length > 0) {
        const [{ count: last7 } = { count: 0 }] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(waitlistEntries)
          .where(
            and(
              inArray(waitlistEntries.waitlistId, waitlistIds),
              sql`${waitlistEntries.createdAt} > current_date - interval '7 days'`,
            ),
          )
        const [{ count: prev7 } = { count: 0 }] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(waitlistEntries)
          .where(
            and(
              inArray(waitlistEntries.waitlistId, waitlistIds),
              sql`${waitlistEntries.createdAt} > current_date - interval '14 days' and ${waitlistEntries.createdAt} <= current_date - interval '7 days'`,
            ),
          )

        const prev = Number(prev7 || 0)
        const curr = Number(last7 || 0)
        growthRate7d =
          prev > 0 ? ((curr - prev) / prev) * 100 : curr > 0 ? 100 : 0
      }

      return {
        hypotheses: userHypotheses.map((row) => ({
          ...row.hypothesis,
          landingPage: row.landingPage,
          signupCount: row.waitlist?.id
            ? countsByWaitlist.get(row.waitlist.id) || 0
            : 0,
        })),
        metrics: {
          growthRate7d,
          readyToLaunch,
          totalSignups,
        },
      }
    },
    {
      auth: true,
      detail: {
        description: 'Get all hypotheses for the authenticated user',
        summary: 'List all hypotheses',
        tags: ['Hypotheses'],
      },
      query: t.Object({
        limit: t.Optional(t.Number({ default: 20, maximum: 100, minimum: 1 })),
        offset: t.Optional(t.Number({ default: 0, minimum: 0 })),
        status: t.Optional(
          t.Union([
            t.Literal('draft'),
            t.Literal('published'),
            t.Literal('archived'),
          ]),
        ),
      }),
    },
  )

  // Get single hypothesis
  .get(
    '/:id',
    async ({ user, params, set }) => {
      // First check if hypothesis exists at all
      const [hypothesisExists] = await db
        .select()
        .from(hypotheses)
        .where(eq(hypotheses.id, params.id))
        .limit(1)

      if (!hypothesisExists) {
        return jsonError(
          set,
          HTTP_STATUS.NOT_FOUND,
          'Hypothesis not found',
          'does_not_exist',
        )
      }

      // Check if it's soft deleted
      if (hypothesisExists.deletedAt) {
        return jsonError(
          set,
          HTTP_STATUS.NOT_FOUND,
          'Hypothesis not found',
          'deleted',
        )
      }

      // Check ownership
      if (hypothesisExists.userId !== user.id) {
        return jsonError(
          set,
          HTTP_STATUS.FORBIDDEN,
          'Access denied',
          'not_owner',
        )
      }

      // Get hypothesis with landing page
      const result = await db
        .select({
          hypothesis: hypotheses,
          landingPage: landingPages,
          waitlist: waitlists,
        })
        .from(hypotheses)
        .leftJoin(landingPages, eq(landingPages.hypothesisId, hypotheses.id))
        .leftJoin(waitlists, eq(waitlists.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(hypotheses.id, params.id),
            eq(hypotheses.userId, user.id),
            isNull(hypotheses.deletedAt),
          ),
        )
        .limit(1)

      const [row] = result

      if (!row?.hypothesis) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Hypothesis not found')
      }

      // Get signup count and 30d metrics
      let signupCount = 0
      let signupsLast30d = 0
      if (row.waitlist?.id) {
        const [countAll] = await db
          .select({ count: sql<number>`COUNT(*)::int` })
          .from(waitlistEntries)
          .where(eq(waitlistEntries.waitlistId, row.waitlist.id))
        signupCount = Number(countAll?.count || 0)

        const [count30] = await db
          .select({ count: sql<number>`COUNT(*)::int` })
          .from(waitlistEntries)
          .where(
            and(
              eq(waitlistEntries.waitlistId, row.waitlist.id),
              sql`${waitlistEntries.createdAt} > current_date - interval '30 days'`,
            ),
          )
        signupsLast30d = Number(count30?.count || 0)
      }

      // Page view metrics for last 30 days
      let pageViews30d = 0
      let uniqueVisitors30d = 0
      if (row.landingPage?.id) {
        const [pv] = await db
          .select({ count: sql<number>`COUNT(*)::int` })
          .from(pageVisits)
          .where(
            and(
              eq(pageVisits.landingPageId, row.landingPage.id),
              sql`${pageVisits.createdAt} > current_date - interval '30 days'`,
            ),
          )
        pageViews30d = Number(pv?.count || 0)

        const [uv] = await db
          .select({
            count: sql<number>`COUNT(DISTINCT ${pageVisits.visitorId})::int`,
          })
          .from(pageVisits)
          .where(
            and(
              eq(pageVisits.landingPageId, row.landingPage.id),
              sql`${pageVisits.createdAt} > current_date - interval '30 days'`,
            ),
          )
        uniqueVisitors30d = Number(uv?.count || 0)
      }

      const conversionRate30d =
        uniqueVisitors30d > 0 ? (signupsLast30d / uniqueVisitors30d) * 100 : 0

      return jsonOk(set, HTTP_STATUS.OK, {
        hypothesis: row.hypothesis,
        landingPage: row.landingPage,
        metrics: {
          conversionRate30d,
          pageViews30d,
          signupsLast30d,
          uniqueVisitors30d,
        },
        signupCount,
        waitlist: row.waitlist,
      })
    },
    {
      auth: true,
      detail: {
        description:
          'Get a single hypothesis with its landing page and waitlist',
        summary: 'Get hypothesis details',
        tags: ['Hypotheses'],
      },
      params: HypothesisSchema.params,
    },
  )

  // Create new hypothesis
  .post(
    '/',
    async ({ user, body, set }) => {
      // Verify user is authenticated

      const hypothesisId = ulid()
      const landingPageId = ulid()
      const waitlistId = ulid()

      try {
        // Create hypothesis, landing page, and waitlist in parallel
        await Promise.all([
          db.insert(hypotheses).values({
            createdAt: new Date(),
            description: body.description || null,
            id: hypothesisId,
            name: body.name,
            status: 'draft',
            updatedAt: new Date(),
            userId: user.id,
          }),
          db.insert(landingPages).values({
            createdAt: new Date(),
            hypothesisId,
            id: landingPageId,
            slug: body.slug || hypothesisId,
            template: 'default',
            updatedAt: new Date(),
          }),
          db.insert(waitlists).values({
            createdAt: new Date(),
            hypothesisId,
            id: waitlistId,
            name: `${body.name} Waitlist`,
            updatedAt: new Date(),
          }),
        ])

        return jsonOk(set, HTTP_STATUS.CREATED, {
          hypothesis: {
            description: body.description || null,
            id: hypothesisId,
            name: body.name,
            status: 'draft',
          },
          landingPageId,
          waitlistId,
        })
      } catch (error) {
        logger.error('Failed to create hypothesis', { error: String(error) })
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Failed to create hypothesis',
        )
      }
    },
    {
      auth: true,
      body: HypothesisSchema.create,
      detail: {
        description:
          'Create a new hypothesis with associated landing page and waitlist',
        summary: 'Create new hypothesis',
        tags: ['Hypotheses'],
      },
    },
  )

  // Update hypothesis
  .patch(
    '/:id',
    async ({ user, params, body, set }) => {
      // Check ownership
      const [existing] = await db
        .select()
        .from(hypotheses)
        .where(
          and(
            eq(hypotheses.id, params.id),
            eq(hypotheses.userId, user.id),
            isNull(hypotheses.deletedAt),
          ),
        )
        .limit(1)

      if (!existing) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Hypothesis not found')
      }

      const [updated] = await db
        .update(hypotheses)
        .set({
          ...(body.name !== undefined && { name: body.name }),
          ...(body.description !== undefined && {
            description: body.description,
          }),
          ...(body.status !== undefined && { status: body.status }),
          updatedAt: new Date(),
        })
        .where(eq(hypotheses.id, params.id))
        .returning()

      return jsonOk(set, HTTP_STATUS.OK, { hypothesis: updated })
    },
    {
      auth: true,
      body: HypothesisSchema.update,
      detail: {
        description: 'Update hypothesis details',
        summary: 'Update hypothesis',
        tags: ['Hypotheses'],
      },
      params: HypothesisSchema.params,
    },
  )

  // Delete hypothesis (soft delete)
  .delete(
    '/:id',
    async ({ user, params, set }) => {
      // Check ownership before deletion
      const [existing] = await db
        .select()
        .from(hypotheses)
        .where(
          and(
            eq(hypotheses.id, params.id),
            eq(hypotheses.userId, user.id),
            isNull(hypotheses.deletedAt), // Only find non-deleted items
          ),
        )
        .limit(1)

      if (!existing) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Hypothesis not found')
      }

      // Soft delete by setting deletedAt timestamp
      await db
        .update(hypotheses)
        .set({ deletedAt: new Date() })
        .where(eq(hypotheses.id, params.id))

      return jsonOk(set)
    },
    {
      auth: true,
      detail: {
        description:
          'Delete a hypothesis and all associated data (landing page, waitlist, entries)',
        summary: 'Delete hypothesis',
        tags: ['Hypotheses'],
      },
      params: HypothesisSchema.params,
    },
  )
