import 'server-only'
import { and, desc, eq, inArray, gte, lte } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/database'
import { getWaitlistIdForUser } from '@/lib/api-utils'
import { resolveRange } from '@/lib/time-range'
import { HTTP_STATUS } from '@/lib/constants'
import { toCsv } from '@/lib/csv'
import { jsonError, jsonOk } from '@/lib/http'
import { hypotheses, waitlistEntries, waitlists } from '@/schema'
import { authPlugin } from './auth-plugin'

// Validation schemas
const WaitlistSchema = {
  exportFormat: t.Union([t.Literal('csv'), t.Literal('json')]),
  update: t.Object({
    name: t.Optional(t.String({ maxLength: 255, minLength: 1 })),
  }),
}

export const waitlistsApi = new Elysia({ prefix: '/v1/waitlists' })
  .use(authPlugin)
  // Get waitlist by hypothesis ID
  .get(
    '/hypothesis/:hypothesisId',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Verify hypothesis ownership
      const [hypothesis] = await db
        .select()
        .from(hypotheses)
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.userId, user.id),
          ),
        )
        .limit(1)

      if (!hypothesis)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Hypothesis not found')

      // Get waitlist
      const [waitlist] = await db
        .select()
        .from(waitlists)
        .where(eq(waitlists.hypothesisId, params.hypothesisId))
        .limit(1)

      if (!waitlist)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Waitlist not found')

      // Get entries and compute counts server-side
      const entryFlags = await db
        .select({ emailVerified: waitlistEntries.emailVerified })
        .from(waitlistEntries)
        .where(eq(waitlistEntries.waitlistId, waitlist.id))

      const totalEntries = entryFlags.length
      const verifiedEntries = entryFlags.reduce(
        (acc, e) => acc + (e.emailVerified ? 1 : 0),
        0,
      )

      return jsonOk(set, HTTP_STATUS.OK, {
        stats: {
          totalEntries,
          verifiedEntries,
        },
        waitlist,
      })
    },
    {
      auth: true,
      detail: {
        description:
          'Get waitlist configuration and statistics for a hypothesis',
        summary: 'Get waitlist by hypothesis',
        tags: ['Waitlists'],
      },
      params: t.Object({
        hypothesisId: t.String(),
      }),
    },
  )

  // Update waitlist settings by hypothesis ID
  .patch(
    '/hypothesis/:hypothesisId',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Find waitlist via hypothesis ownership
      const wl = await getWaitlistIdForUser(user.id, params.hypothesisId)

      if (!wl)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Waitlist not found')

      await db
        .update(waitlists)
        .set({
          ...body,
          updatedAt: new Date(),
        })
        .where(eq(waitlists.id, wl.id))

      return jsonOk(set)
    },
    {
      auth: true,
      body: WaitlistSchema.update,
      detail: {
        description: 'Update waitlist configuration by hypothesis ID',
        summary: 'Update waitlist (by hypothesis)',
        tags: ['Waitlists'],
      },
      params: t.Object({
        hypothesisId: t.String(),
      }),
    },
  )

  // Get waitlist entries by hypothesis ID
  .get(
    '/hypothesis/:hypothesisId/entries',
    async ({ user, session, params, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Resolve waitlist via hypothesis ownership
      const wl = await getWaitlistIdForUser(user.id, params.hypothesisId)

      if (!wl)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Waitlist not found')

      // Build query with filters
      let entriesQuery = db
        .select()
        .from(waitlistEntries)
        .where(eq(waitlistEntries.waitlistId, wl.id))
        .$dynamic()

      if (query.emailVerified !== undefined) {
        entriesQuery = entriesQuery.where(
          eq(waitlistEntries.emailVerified, query.emailVerified),
        )
      }
      // Reveal filtering removed

      const entries = await entriesQuery
        .orderBy(desc(waitlistEntries.createdAt))
        .limit(query.limit ?? 50)
        .offset(query.offset ?? 0)

      return jsonOk(set, HTTP_STATUS.OK, { entries })
    },
    {
      auth: true,
      detail: {
        description: 'List entries by hypothesis ID',
        summary: 'Get entries (by hypothesis)',
        tags: ['Waitlist Entries'],
      },
      params: t.Object({ hypothesisId: t.String() }),
      query: t.Object({
        emailVerified: t.Optional(t.Boolean()),
        limit: t.Optional(t.Number({ default: 50, maximum: 100, minimum: 1 })),
        offset: t.Optional(t.Number({ default: 0, minimum: 0 })),
        source: t.Optional(t.String()),
      }),
    },
  )

  // Export waitlist entries by hypothesis ID
  .get(
    '/hypothesis/:hypothesisId/export',
    async ({ user, session, params, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const [wl] = await db
        .select({ hypothesisName: hypotheses.name, id: waitlists.id })
        .from(waitlists)
        .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.userId, user.id),
          ),
        )
        .limit(1)

      if (!wl)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Waitlist not found')

      const entries = await db
        .select()
        .from(waitlistEntries)
        .where(eq(waitlistEntries.waitlistId, wl.id))
        .orderBy(waitlistEntries.createdAt)

      if (query.format === 'csv') {
        const headers = [
          'Email',
          'Name',
          'Verified',
          'Source',
          'Created At',
          'UTM Source',
          'UTM Medium',
          'UTM Campaign',
        ]
        const rows = entries.map((entry) => [
          entry.email,
          entry.name || '',
          entry.emailVerified ? 'Yes' : 'No',
          entry.source || '',
          entry.createdAt.toISOString(),
          entry.utmSource || '',
          entry.utmMedium || '',
          entry.utmCampaign || '',
        ])
        const csv = toCsv(headers, rows)
        set.headers['content-type'] = 'text/csv'
        set.headers['content-disposition'] =
          `attachment; filename="${wl.hypothesisName}-waitlist.csv"`
        return csv
      }

      return jsonOk(set, HTTP_STATUS.OK, {
        entries,
        exportedAt: new Date(),
        exportedEntries: entries.length,
        hypothesis: wl.hypothesisName,
        totalEntries: entries.length,
      })
    },
    {
      auth: true,
      detail: {
        description: 'Export waitlist entries by hypothesis ID',
        summary: 'Export waitlist (by hypothesis)',
        tags: ['Waitlist Analytics'],
      },
      params: t.Object({ hypothesisId: t.String() }),
      query: t.Object({ format: t.Optional(WaitlistSchema.exportFormat) }),
    },
  )

  // Export all waitlists for the authenticated user
  .get(
    '/export-all',
    async ({ user, session, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Get all waitlists owned by the user (via hypotheses)
      const userWaitlists = await db
        .select({ hypothesisName: hypotheses.name, id: waitlists.id })
        .from(waitlists)
        .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
        .where(eq(hypotheses.userId, user.id))

      if (userWaitlists.length === 0) {
        if (query.format === 'csv') {
          set.headers['content-type'] = 'text/csv'
          set.headers['content-disposition'] =
            'attachment; filename="waitlists-empty.csv"'
          return 'Hypothesis,Waitlist ID,Email,Name,Verified,Source,Created At,UTM Source,UTM Medium,UTM Campaign\n'
        }

        return jsonOk(set, HTTP_STATUS.OK, {
          entries: [],
          exportedAt: new Date(),
          exportedEntries: 0,
          totalWaitlists: 0,
        })
      }

      const waitlistIds = userWaitlists.map((w) => w.id)

      // Fetch all entries for these waitlists ordered by waitlist + createdAt
      const entries = await db
        .select()
        .from(waitlistEntries)
        .where(inArray(waitlistEntries.waitlistId, waitlistIds))
        .orderBy(waitlistEntries.waitlistId, waitlistEntries.createdAt)

      // Group by waitlistId, then filter exportable entries per waitlist
      const byWaitlist = new Map<string, typeof entries>()
      for (const e of entries) {
        const arr = byWaitlist.get(e.waitlistId) || []
        arr.push(e)
        byWaitlist.set(e.waitlistId, arr)
      }

      type ExportRow = {
        hypothesisName: string
        waitlistId: string
        email: string
        name: string | null
        emailVerified: boolean | null
        source: string | null
        createdAt: Date
        utmSource: string | null
        utmMedium: string | null
        utmCampaign: string | null
      }

      const exportRows: ExportRow[] = []
      for (const [wId, list] of byWaitlist.entries()) {
        const meta = userWaitlists.find((w) => w.id === wId)
        for (const e of list) {
          exportRows.push({
            createdAt: e.createdAt,
            email: e.email,
            emailVerified: e.emailVerified,
            hypothesisName: meta?.hypothesisName || '',
            name: e.name,
            source: e.source,
            utmCampaign: e.utmCampaign || null,
            utmMedium: e.utmMedium || null,
            utmSource: e.utmSource || null,
            waitlistId: wId,
          })
        }
      }

      if (query.format === 'csv') {
        const headers = [
          'Hypothesis',
          'Waitlist ID',
          'Email',
          'Name',
          'Verified',
          'Source',
          'Created At',
          'UTM Source',
          'UTM Medium',
          'UTM Campaign',
        ]

        const rows = exportRows.map((r) => [
          r.hypothesisName,
          r.waitlistId,
          r.email,
          r.name || '',
          r.emailVerified ? 'Yes' : 'No',
          r.source || '',
          r.createdAt.toISOString(),
          r.utmSource || '',
          r.utmMedium || '',
          r.utmCampaign || '',
        ])

        const csv = toCsv(headers, rows)

        set.headers['content-type'] = 'text/csv'
        set.headers['content-disposition'] =
          'attachment; filename="waitlists-all.csv"'

        return csv
      }

      return jsonOk(set, HTTP_STATUS.OK, {
        entries: exportRows,
        exportedAt: new Date(),
        exportedEntries: exportRows.length,
        totalWaitlists: userWaitlists.length,
      })
    },
    {
      auth: true,
      detail: {
        description: 'Export CSV across all owned waitlists',
        summary: 'Export all waitlists',
        tags: ['Waitlist Analytics'],
      },
      query: t.Object({
        format: t.Optional(WaitlistSchema.exportFormat),
      }),
    },
  )

  // Get analytics for waitlist by hypothesis ID
  .get(
    '/hypothesis/:hypothesisId/analytics',
    async ({ user, session, params, set, query }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const [wl] = await db
        .select({ id: waitlists.id })
        .from(waitlists)
        .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.userId, user.id),
          ),
        )
        .limit(1)

      if (!wl)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Waitlist not found')

      const { from, to } = resolveRange(query)

      const filtered = await db
        .select({
          createdAt: waitlistEntries.createdAt,
          emailVerified: waitlistEntries.emailVerified,
          source: waitlistEntries.source,
        })
        .from(waitlistEntries)
        .where(
          and(
            eq(waitlistEntries.waitlistId, wl.id),
            gte(waitlistEntries.createdAt, from),
            lte(waitlistEntries.createdAt, to),
          ),
        )

      // Compute stats
      const total = filtered.length
      const verified = filtered.reduce(
        (acc, e) => acc + (e.emailVerified ? 1 : 0),
        0,
      )

      // Compute sources breakdown
      const sourceMap = new Map<string, number>()
      for (const e of filtered) {
        const key = e.source || 'direct'
        sourceMap.set(key, (sourceMap.get(key) || 0) + 1)
      }
      const sources = Array.from(sourceMap.entries()).map(([source, count]) => ({
        source,
        count,
      }))

      // Compute daily signups
      const dailyMap = new Map<string, number>()
      for (const e of filtered) {
        const day = e.createdAt.toISOString().slice(0, 10)
        dailyMap.set(day, (dailyMap.get(day) || 0) + 1)
      }
      const dailySignups = Array.from(dailyMap.entries())
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([date, count]) => ({ date, count }))

      return jsonOk(set, HTTP_STATUS.OK, {
        dailySignups,
        sources,
        stats: {
          total,
          verificationRate: total > 0 ? ((verified / total) * 100).toFixed(1) : 0,
          verified,
        },
      })
    },
    {
      auth: true,
      detail: {
        description:
          'Get analytics by hypothesis ID with optional date range (from/to or 7d/30d/90d).',
        summary: 'Analytics (by hypothesis)',
        tags: ['Waitlist Analytics'],
      },
      params: t.Object({ hypothesisId: t.String() }),
      query: t.Object({
        from: t.Optional(t.String()),
        to: t.Optional(t.String()),
        range: t.Optional(
          t.Union([t.Literal('7d'), t.Literal('30d'), t.Literal('90d')]),
        ),
      }),
    },
  )
