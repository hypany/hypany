/**
 * Hypotheses API (v1)
 * - CRUD for hypotheses owned by the authenticated user
 * - Aggregated dashboard metrics (signups, growth, readiness)
 * - Per-hypothesis metrics and related resources (landing page, waitlist)
 */

import {
  and,
  count,
  countDistinct,
  desc,
  eq,
  gt,
  inArray,
  isNull,
  lte,
} from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/drizzle'
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
import 'server-only'
import {
  ErrorResponse,
  PaginationQuery,
  SuccessResponse,
  UlidParam,
} from '../docs'
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
    async ({ user, session, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')
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
          and(
            eq(hypotheses.organizationId, orgId),
            isNull(hypotheses.deletedAt),
          ),
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
            count: count(),
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
      let last7Signups = 0
      let prev7Signups = 0
      if (waitlistIds.length > 0) {
        const now = new Date()
        const todayUtcMidnight = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
        )
        const sevenDaysAgo = new Date(
          todayUtcMidnight.getTime() - 7 * 24 * 60 * 60 * 1000,
        )
        const fourteenDaysAgo = new Date(
          todayUtcMidnight.getTime() - 14 * 24 * 60 * 60 * 1000,
        )

        const [{ count: last7 } = { count: 0 }] = await db
          .select({ count: count() })
          .from(waitlistEntries)
          .where(
            and(
              inArray(waitlistEntries.waitlistId, waitlistIds),
              gt(waitlistEntries.createdAt, sevenDaysAgo),
            ),
          )

        const [{ count: prev7 } = { count: 0 }] = await db
          .select({ count: count() })
          .from(waitlistEntries)
          .where(
            and(
              inArray(waitlistEntries.waitlistId, waitlistIds),
              gt(waitlistEntries.createdAt, fourteenDaysAgo),
              lte(waitlistEntries.createdAt, sevenDaysAgo),
            ),
          )

        last7Signups = Number(last7 || 0)
        prev7Signups = Number(prev7 || 0)
        const prev = prev7Signups
        const curr = last7Signups
        growthRate7d =
          prev > 0 ? ((curr - prev) / prev) * 100 : curr > 0 ? 100 : 0
      }

      // Visitors and signups last 30d (org-wide aggregates)
      let uniqueVisitors30d = 0
      let signups30d = 0
      const hypothesisIds = userHypotheses.map((r) => r.hypothesis.id)
      if (hypothesisIds.length > 0) {
        const now = new Date()
        const todayUtcMidnight = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
        )
        const thirtyDaysAgo = new Date(
          todayUtcMidnight.getTime() - 30 * 24 * 60 * 60 * 1000,
        )

        const [{ count: uv } = { count: 0 }] = await db
          .select({ count: countDistinct(pageVisits.visitorId) })
          .from(pageVisits)
          .where(
            and(
              inArray(pageVisits.hypothesisId, hypothesisIds),
              gt(pageVisits.createdAt, thirtyDaysAgo),
              lte(pageVisits.createdAt, todayUtcMidnight),
            ),
          )
        uniqueVisitors30d = Number(uv || 0)

        if (waitlistIds.length > 0) {
          const [{ count: su } = { count: 0 }] = await db
            .select({ count: count() })
            .from(waitlistEntries)
            .where(
              and(
                inArray(waitlistEntries.waitlistId, waitlistIds),
                gt(waitlistEntries.createdAt, thirtyDaysAgo),
                lte(waitlistEntries.createdAt, todayUtcMidnight),
              ),
            )
          signups30d = Number(su || 0)
        }
      }

      return {
        hypotheses: userHypotheses.map((row) => ({
          ...row.hypothesis,
          landingPage: row.landingPage && { id: row.landingPage.id },
          signupCount: row.waitlist?.id
            ? countsByWaitlist.get(row.waitlist.id) || 0
            : 0,
        })),
        metrics: {
          growthRate7d,
          last7Signups,
          prev7Signups,
          readyToLaunch,
          signups30d,
          totalSignups,
          uniqueVisitors30d,
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
      query: t.Composite([
        PaginationQuery,
        t.Object({
          status: t.Optional(
            t.Union([
              t.Literal('draft'),
              t.Literal('published'),
              t.Literal('archived'),
            ]),
          ),
        }),
      ]),
      response: {
        200: t.Object({
          hypotheses: t.Array(
            t.Object({
              description: t.Nullable(t.String()),
              id: t.String(),
              landingPage: t.Nullable(t.Object({ id: t.String() })),
              name: t.String(),
              signupCount: t.Number(),
              slug: t.Nullable(t.String()),
              status: t.String(),
            }),
          ),
          metrics: t.Object({
            growthRate7d: t.Number(),
            last7Signups: t.Number(),
            prev7Signups: t.Number(),
            readyToLaunch: t.Number(),
            signups30d: t.Number(),
            totalSignups: t.Number(),
            uniqueVisitors30d: t.Number(),
          }),
        }),
        401: ErrorResponse,
      },
    },
  )

  // Get single hypothesis
  .get(
    '/:id',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')
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
      if (hypothesisExists.organizationId !== orgId) {
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
            eq(hypotheses.organizationId, orgId),
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
          .select({ count: count() })
          .from(waitlistEntries)
          .where(eq(waitlistEntries.waitlistId, row.waitlist.id))
        signupCount = Number(countAll?.count || 0)

        const now = new Date()
        const todayUtcMidnight = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
        )
        const thirtyDaysAgo = new Date(
          todayUtcMidnight.getTime() - 30 * 24 * 60 * 60 * 1000,
        )

        const [count30] = await db
          .select({ count: count() })
          .from(waitlistEntries)
          .where(
            and(
              eq(waitlistEntries.waitlistId, row.waitlist.id),
              gt(waitlistEntries.createdAt, thirtyDaysAgo),
            ),
          )
        signupsLast30d = Number(count30?.count || 0)
      }

      // Page view metrics for last 30 days
      let pageViews30d = 0
      let uniqueVisitors30d = 0
      if (row.landingPage?.id) {
        const now = new Date()
        const todayUtcMidnight = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
        )
        const thirtyDaysAgo = new Date(
          todayUtcMidnight.getTime() - 30 * 24 * 60 * 60 * 1000,
        )

        const [pv] = await db
          .select({ count: count() })
          .from(pageVisits)
          .where(
            and(
              eq(pageVisits.landingPageId, row.landingPage.id),
              gt(pageVisits.createdAt, thirtyDaysAgo),
            ),
          )
        pageViews30d = Number(pv?.count || 0)

        const [uv] = await db
          .select({ count: countDistinct(pageVisits.visitorId) })
          .from(pageVisits)
          .where(
            and(
              eq(pageVisits.landingPageId, row.landingPage.id),
              gt(pageVisits.createdAt, thirtyDaysAgo),
            ),
          )
        uniqueVisitors30d = Number(uv?.count || 0)
      }

      const conversionRate30d =
        uniqueVisitors30d > 0 ? (signupsLast30d / uniqueVisitors30d) * 100 : 0

      return jsonOk(set, HTTP_STATUS.OK, {
        hypothesis: row.hypothesis,
        landingPage: row.landingPage ? { id: row.landingPage.id } : null,
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
      params: t.Object({ id: UlidParam }),
      response: {
        200: t.Object({
          hypothesis: t.Object({
            description: t.Nullable(t.String()),
            id: t.String(),
            name: t.String(),
            status: t.String(),
          }),
          landingPage: t.Nullable(t.Object({ id: t.String() })),
          metrics: t.Object({
            conversionRate30d: t.Number(),
            pageViews30d: t.Number(),
            signupsLast30d: t.Number(),
            uniqueVisitors30d: t.Number(),
          }),
          signupCount: t.Number(),
          waitlist: t.Nullable(t.Object({ id: t.String() })),
        }),
        401: ErrorResponse,
        403: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Create new hypothesis
  .post(
    '/',
    async ({ user, session, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Use shared data access function to ensure atomicity/consistency
      const { createHypothesis } = await import('@/functions/hypotheses')

      try {
        const {
          id: hypothesisId,
          landingPageId,
          waitlistId,
        } = await createHypothesis({
          description: body.description ?? undefined,
          name: body.name,
          organizationId: orgId,
          slug: body.slug ?? undefined,
          userId: user.id,
        })

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
      response: {
        201: t.Object({
          hypothesis: t.Object({
            description: t.Nullable(t.String()),
            id: t.String(),
            name: t.String(),
            status: t.String(),
          }),
          landingPageId: t.String(),
          waitlistId: t.String(),
        }),
        401: ErrorResponse,
        500: ErrorResponse,
      },
    },
  )

  // Update hypothesis
  .patch(
    '/:id',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')
      // Check ownership
      const [existing] = await db
        .select()
        .from(hypotheses)
        .where(
          and(
            eq(hypotheses.id, params.id),
            eq(hypotheses.organizationId, orgId),
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

      const responseHypothesis = {
        description: (updated as any).description ?? null,
        id: (updated as any).id as string,
        name: (updated as any).name as string,
        status: (updated as any).status as string,
      }

      return jsonOk(set, HTTP_STATUS.OK, { hypothesis: responseHypothesis })
    },
    {
      auth: true,
      body: HypothesisSchema.update,
      detail: {
        description: 'Update hypothesis details',
        summary: 'Update hypothesis',
        tags: ['Hypotheses'],
      },
      params: t.Object({ id: UlidParam }),
      response: {
        200: t.Object({
          hypothesis: t.Object({
            description: t.Nullable(t.String()),
            id: t.String(),
            name: t.String(),
            status: t.String(),
          }),
        }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
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
      params: t.Object({ id: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
