import 'server-only'
import { Elysia, t } from 'elysia'
import { sql } from 'drizzle-orm'
import { db } from '@/database'
import { HTTP_STATUS } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { hypotheses, pageVisits, waitlistEntries, waitlists } from '@/schema'
import { authPlugin } from './auth-plugin'
import { resolveRange } from '@/lib/time-range'


function normalizeHostExpr(column: any) {
  // postgres expr to normalize referrer host -> host or 'direct'
  return sql<string>`COALESCE(NULLIF(split_part(regexp_replace(${column}, '^https?://', ''), '/', 1), ''), 'direct')`
}

// Basic bot filtering (case-insensitive regex matches common bots)
import { BOT_UA_PATTERN } from '@/lib/constants'

function notBotExpr() {
  return sql`(${pageVisits.userAgent} IS NULL OR ${pageVisits.userAgent} !~* ${BOT_UA_PATTERN})`
}

export const analyticsApi = new Elysia({ prefix: '/v1/analytics' })
  .use(authPlugin)
  // Recent activity: page views, signups, verifications (emailVerified)
  .get(
    '/activity',
    async ({ user, session, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const { from, to } = resolveRange(query)
      const limit = Math.min(Math.max(Number(query.limit ?? 50), 1), 100)
      const cursorDate = query.cursor ? new Date(String(query.cursor)) : null
      const hypothesisId = query.hypothesisId ? String(query.hypothesisId) : null

      const filterHypothesis = hypothesisId
        ? sql`AND h.id = ${hypothesisId}`
        : sql``
      const cursorPv = cursorDate ? sql`AND pv.created_at < ${cursorDate}` : sql``
      const cursorSignup = cursorDate
        ? sql`AND e.created_at < ${cursorDate}`
        : sql``
      const cursorVerify = cursorDate
        ? sql`AND e.updated_at < ${cursorDate}`
        : sql``

      const rows = await db.execute(sql<
        Array<{
          type: 'page_view' | 'signup' | 'verification'
          ts: Date
          hypothesis_id: string
          source: string | null
          email: string | null
        }>
      >`SELECT type, ts, hypothesis_id, source, email
        FROM (
          SELECT 'page_view'::text AS type,
                 pv.created_at AS ts,
                 h.id AS hypothesis_id,
                 ${normalizeHostExpr(pageVisits.referrer)} AS source,
                 NULL::text AS email
          FROM ${pageVisits} pv
          JOIN ${hypotheses} h ON h.id = pv.hypothesis_id
          WHERE h.user_id = ${user.id}
            AND pv.created_at >= ${from} AND pv.created_at <= ${to}
            AND ${notBotExpr()}
            ${cursorPv}
            ${filterHypothesis}
          UNION ALL
          SELECT 'signup'::text AS type,
                 e.created_at AS ts,
                 w.hypothesis_id AS hypothesis_id,
                 COALESCE(NULLIF(e.utm_source, ''), NULLIF(e.source, ''), 'organic') AS source,
                 e.email AS email
          FROM ${waitlistEntries} e
          JOIN ${waitlists} w ON w.id = e.waitlist_id
          JOIN ${hypotheses} h ON h.id = w.hypothesis_id
          WHERE h.user_id = ${user.id}
            AND e.created_at >= ${from} AND e.created_at <= ${to}
            ${cursorSignup}
            ${filterHypothesis}
          UNION ALL
          SELECT 'verification'::text AS type,
                 e.updated_at AS ts,
                 w.hypothesis_id AS hypothesis_id,
                 COALESCE(NULLIF(e.utm_source, ''), NULLIF(e.source, ''), 'organic') AS source,
                 e.email AS email
          FROM ${waitlistEntries} e
          JOIN ${waitlists} w ON w.id = e.waitlist_id
          JOIN ${hypotheses} h ON h.id = w.hypothesis_id
          WHERE h.user_id = ${user.id}
            AND e.email_verified = true
            AND e.updated_at >= ${from} AND e.updated_at <= ${to}
            ${cursorVerify}
            ${filterHypothesis}
        ) t
        ORDER BY ts DESC
        LIMIT ${limit}`)

      const items = rows.rows.map((r) => ({
        email: r.email,
        hypothesisId: r.hypothesis_id,
        source: r.source || 'direct',
        timestamp: r.ts,
        type: r.type,
      }))

      const nextCursor = items.length === limit ? items[items.length - 1].timestamp : null

      return jsonOk(set, HTTP_STATUS.OK, {
        items,
        nextCursor: nextCursor ? nextCursor.toISOString() : null,
      })
    },
    {
      auth: true,
      detail: {
        description:
          'Unified recent activity (page view, signup, verification). Supports cursor pagination.',
        summary: 'Recent activity',
        tags: ['Analytics'],
      },
      query: t.Object({
        from: t.Optional(t.String()),
        to: t.Optional(t.String()),
        range: t.Optional(t.Union([t.Literal('7d'), t.Literal('30d'), t.Literal('90d')]))
          .default('30d'),
        hypothesisId: t.Optional(t.String()),
        cursor: t.Optional(t.String()),
        limit: t.Optional(t.Number({ default: 50, maximum: 100, minimum: 1 })),
      }),
    },
  )

  // Traffic sources: UTMs from signups + referrers from page visits
  .get(
    '/sources',
    async ({ user, session, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const { from, to } = resolveRange(query)
      const hypothesisId = query.hypothesisId ? String(query.hypothesisId) : null

      const filterHypothesisW = hypothesisId
        ? sql`AND h.id = ${hypothesisId}`
        : sql``
      const filterHypothesisPv = hypothesisId
        ? sql`AND h.id = ${hypothesisId}`
        : sql``

      const utmRows = await db.execute(sql<
        Array<{ source: string | null; count: number }>
      >`SELECT COALESCE(NULLIF(e.utm_source, ''), 'direct') AS source,
           COUNT(*)::int AS count
         FROM ${waitlistEntries} e
         JOIN ${waitlists} w ON w.id = e.waitlist_id
         JOIN ${hypotheses} h ON h.id = w.hypothesis_id
         WHERE h.user_id = ${user.id}
           AND e.created_at >= ${from} AND e.created_at <= ${to}
           ${filterHypothesisW}
         GROUP BY COALESCE(NULLIF(e.utm_source, ''), 'direct')
         ORDER BY count DESC
         LIMIT 10`)

      const refRows = await db.execute(sql<
        Array<{ referrer: string | null; count: number }>
      >`SELECT ${normalizeHostExpr(pageVisits.referrer)} AS referrer,
           COUNT(*)::int AS count
         FROM ${pageVisits} pv
         JOIN ${hypotheses} h ON h.id = pv.hypothesis_id
         WHERE h.user_id = ${user.id}
           AND pv.created_at >= ${from} AND pv.created_at <= ${to}
           AND ${notBotExpr()}
           ${filterHypothesisPv}
         GROUP BY ${normalizeHostExpr(pageVisits.referrer)}
         ORDER BY count DESC
         LIMIT 10`)

      return jsonOk(set, HTTP_STATUS.OK, {
        range: { from, to },
        utmSources: utmRows.rows.map((r) => ({
          count: Number(r.count || 0),
          source: r.source || 'direct',
        })),
        referrers: refRows.rows.map((r) => ({
          count: Number(r.count || 0),
          referrer: r.referrer || 'direct',
        })),
      })
    },
    {
      auth: true,
      detail: {
        description:
          'Top UTM sources (signups) and referrers (page visits) for the selected range.',
        summary: 'Traffic sources',
        tags: ['Analytics'],
      },
      query: t.Object({
        from: t.Optional(t.String()),
        to: t.Optional(t.String()),
        range: t.Optional(t.Union([t.Literal('7d'), t.Literal('30d'), t.Literal('90d')]))
          .default('30d'),
        hypothesisId: t.Optional(t.String()),
      }),
    },
  )

  // Per-hypothesis metrics with totals and daily series (visitors + signups)
  .get(
    '/metrics',
    async ({ user, session, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const { from, to } = resolveRange(query)
      const hypothesisId = query.hypothesisId ? String(query.hypothesisId) : null

      // Base hypothesis filter
      const hypoFilter = hypothesisId ? sql`AND h.id = ${hypothesisId}` : sql``

      // Page views + unique visitors per hypothesis
      const pvRows = await db.execute(sql<
        Array<{ hypothesis_id: string; page_views: number; unique_visitors: number }>
      >`SELECT h.id AS hypothesis_id,
           COUNT(*)::int AS page_views,
           COUNT(DISTINCT pv.visitor_id)::int AS unique_visitors
         FROM ${hypotheses} h
         JOIN ${pageVisits} pv ON pv.hypothesis_id = h.id
         WHERE h.user_id = ${user.id}
           AND pv.created_at >= ${from} AND pv.created_at <= ${to}
           AND ${notBotExpr()}
           ${hypoFilter}
         GROUP BY h.id`)

      // Signups + verified signups per hypothesis
      const signupRows = await db.execute(sql<
        Array<{ hypothesis_id: string; signups: number; verified_signups: number }>
      >`SELECT h.id AS hypothesis_id,
           COUNT(*)::int AS signups,
           COUNT(*) FILTER (WHERE e.email_verified = true)::int AS verified_signups
         FROM ${hypotheses} h
         JOIN ${waitlists} w ON w.hypothesis_id = h.id
         JOIN ${waitlistEntries} e ON e.waitlist_id = w.id
         WHERE h.user_id = ${user.id}
           AND e.created_at >= ${from} AND e.created_at <= ${to}
           ${hypoFilter}
         GROUP BY h.id`)

      // Daily aggregated across selection (for charts)
      const dailyRows = await db.execute(sql<
        Array<{ date: string; visitors: number; signups: number }>
      >`WITH visitors AS (
           SELECT date(pv.created_at) AS d, COUNT(DISTINCT pv.visitor_id)::int AS v
           FROM ${pageVisits} pv
           JOIN ${hypotheses} h ON h.id = pv.hypothesis_id
           WHERE h.user_id = ${user.id}
             AND pv.created_at >= ${from} AND pv.created_at <= ${to}
             AND ${notBotExpr()}
             ${hypoFilter}
           GROUP BY date(pv.created_at)
         ),
         signups AS (
           SELECT date(e.created_at) AS d, COUNT(*)::int AS s
           FROM ${waitlistEntries} e
           JOIN ${waitlists} w ON w.id = e.waitlist_id
           JOIN ${hypotheses} h ON h.id = w.hypothesis_id
           WHERE h.user_id = ${user.id}
             AND e.created_at >= ${from} AND e.created_at <= ${to}
             ${hypoFilter}
           GROUP BY date(e.created_at)
         )
         SELECT COALESCE(v.d, s.d) AS date,
                COALESCE(v.v, 0)::int AS visitors,
                COALESCE(s.s, 0)::int AS signups
         FROM visitors v
         FULL OUTER JOIN signups s ON v.d = s.d
         ORDER BY date`)

      // Merge per-hypothesis metrics
      const perHypothesisMap = new Map<string, {
        hypothesisId: string
        pageViews: number
        uniqueVisitors: number
        signups: number
        verifiedSignups: number
        conversionVisitorsToSignups: number
        conversionVisitorsToVerified: number
      }>()

      const addOrGet = (id: string) => {
        const existing = perHypothesisMap.get(id)
        if (existing) return existing
        const obj = {
          hypothesisId: id,
          pageViews: 0,
          uniqueVisitors: 0,
          signups: 0,
          verifiedSignups: 0,
          conversionVisitorsToSignups: 0,
          conversionVisitorsToVerified: 0,
        }
        perHypothesisMap.set(id, obj)
        return obj
      }

      for (const r of pvRows.rows) {
        const m = addOrGet(r.hypothesis_id)
        m.pageViews = Number(r.page_views || 0)
        m.uniqueVisitors = Number(r.unique_visitors || 0)
      }
      for (const r of signupRows.rows) {
        const m = addOrGet(r.hypothesis_id)
        m.signups = Number(r.signups || 0)
        m.verifiedSignups = Number(r.verified_signups || 0)
      }
      for (const m of perHypothesisMap.values()) {
        m.conversionVisitorsToSignups =
          m.uniqueVisitors > 0 ? (m.signups / m.uniqueVisitors) * 100 : 0
        m.conversionVisitorsToVerified =
          m.uniqueVisitors > 0 ? (m.verifiedSignups / m.uniqueVisitors) * 100 : 0
      }

      const perHypothesis = Array.from(perHypothesisMap.values())
      const totals = perHypothesis.reduce(
        (acc, m) => {
          acc.pageViews += m.pageViews
          acc.uniqueVisitors += m.uniqueVisitors
          acc.signups += m.signups
          acc.verifiedSignups += m.verifiedSignups
          return acc
        },
        { pageViews: 0, uniqueVisitors: 0, signups: 0, verifiedSignups: 0 },
      )
      const totalsWithConv = {
        ...totals,
        conversionVisitorsToSignups:
          totals.uniqueVisitors > 0
            ? (totals.signups / totals.uniqueVisitors) * 100
            : 0,
        conversionVisitorsToVerified:
          totals.uniqueVisitors > 0
            ? (totals.verifiedSignups / totals.uniqueVisitors) * 100
            : 0,
      }

      return jsonOk(set, HTTP_STATUS.OK, {
        range: { from, to },
        perHypothesis,
        totals: totalsWithConv,
        daily: dailyRows.rows.map((r) => ({
          date: r.date,
          visitors: Number(r.visitors || 0),
          signups: Number(r.signups || 0),
        })),
      })
    },
    {
      auth: true,
      detail: {
        description:
          'Per-hypothesis metrics (page views, visitors, signups, verified, conversions) plus totals and daily aggregates for the selected range.',
        summary: 'Metrics',
        tags: ['Analytics'],
      },
      query: t.Object({
        from: t.Optional(t.String()),
        to: t.Optional(t.String()),
        range: t.Optional(t.Union([t.Literal('7d'), t.Literal('30d'), t.Literal('90d')]))
          .default('30d'),
        hypothesisId: t.Optional(t.String()),
      }),
    },
  )

export type AnalyticsApi = typeof analyticsApi
