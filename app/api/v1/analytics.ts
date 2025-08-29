/**
 * Analytics API (v1)
 * - Recent activity feed (page views, signups, verifications)
 * - Traffic sources (UTM & referrers)
 * - Aggregated metrics per hypothesis
 */

import { and, desc, eq, gte, inArray, lt, lte } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/drizzle'
import { BOT_UA_REGEX, HTTP_STATUS } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { resolveRange } from '@/lib/time-range'
import { hypotheses, pageVisits, waitlistEntries, waitlists } from '@/schema'
import 'server-only'
import { authPlugin } from './auth-plugin'

function extractReferrerDomain(referrer?: string | null): string {
  if (!referrer) return 'direct'
  const r = String(referrer).trim()
  if (!r) return 'direct'
  try {
    // If it looks like a URL with scheme
    const url =
      r.startsWith('http://') || r.startsWith('https://') ? new URL(r) : null
    if (url?.hostname) return url.hostname
  } catch {}
  // Fallback: strip scheme manually and take first segment before '/'
  const withoutScheme = r.replace(/^https?:\/\//i, '')
  const domain = withoutScheme.split('/')[0]?.trim()
  return domain || 'direct'
}

function coalesceUtmSource(
  utmSource?: string | null,
  source?: string | null,
  fallback: 'direct' | 'organic' = 'direct',
): string {
  const u = (utmSource ?? '').trim()
  if (u) return u
  const s = (source ?? '').trim()
  if (s) return s
  return fallback
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
      const hypothesisId = query.hypothesisId
        ? String(query.hypothesisId)
        : null

      // Get all organization's hypotheses
      const userHypotheses = await db
        .select()
        .from(hypotheses)
        .where(eq(hypotheses.organizationId, session.activeOrganizationId))

      const hypothesisIds = userHypotheses.map((h) => h.id)

      // Filter by specific hypothesis if provided
      const targetHypothesisIds = hypothesisId
        ? hypothesisIds.filter((id) => id === hypothesisId)
        : hypothesisIds

      if (targetHypothesisIds.length === 0) {
        return jsonOk(set, HTTP_STATUS.OK, {
          items: [],
          nextCursor: null,
        })
      }

      // Get page views (filter bot UAs in JS)
      const pageViewConditions = [
        inArray(pageVisits.hypothesisId, targetHypothesisIds),
        gte(pageVisits.createdAt, from),
        lte(pageVisits.createdAt, to),
      ]
      if (cursorDate) {
        pageViewConditions.push(lt(pageVisits.createdAt, cursorDate))
      }

      const rawPageViews = await db
        .select({
          createdAt: pageVisits.createdAt,
          hypothesisId: pageVisits.hypothesisId,
          referrer: pageVisits.referrer,
          userAgent: pageVisits.userAgent,
        })
        .from(pageVisits)
        .where(and(...pageViewConditions))
        .orderBy(desc(pageVisits.createdAt))
        .limit(limit)

      const pageViewsData = rawPageViews
        .filter((pv) => !pv.userAgent || !BOT_UA_REGEX.test(pv.userAgent))
        .map((pv) => ({
          email: null as string | null,
          hypothesisId: pv.hypothesisId,
          source: extractReferrerDomain(pv.referrer),
          timestamp: pv.createdAt,
          type: 'page_view' as const,
        }))

      // Get waitlists for hypotheses
      const userWaitlists = await db
        .select()
        .from(waitlists)
        .where(inArray(waitlists.hypothesisId, targetHypothesisIds))

      const waitlistIds = userWaitlists.map((w) => w.id)

      let signupsData: Array<{
        type: 'signup'
        timestamp: Date | null
        hypothesisId: string
        source: string
        email: string | null
      }> = []

      let verificationsData: Array<{
        type: 'verification'
        timestamp: Date | null
        hypothesisId: string
        source: string
        email: string | null
      }> = []

      if (waitlistIds.length > 0) {
        // Get signups
        const signupConditions = [
          inArray(waitlistEntries.waitlistId, waitlistIds),
          gte(waitlistEntries.createdAt, from),
          lte(waitlistEntries.createdAt, to),
        ]
        if (cursorDate) {
          signupConditions.push(lt(waitlistEntries.createdAt, cursorDate))
        }

        const signups = await db
          .select({
            email: waitlistEntries.email,
            source: waitlistEntries.source,
            timestamp: waitlistEntries.createdAt,
            utmSource: waitlistEntries.utmSource,
            waitlistId: waitlistEntries.waitlistId,
          })
          .from(waitlistEntries)
          .where(and(...signupConditions))
          .orderBy(desc(waitlistEntries.createdAt))
          .limit(limit)

        // Map signups to include hypothesis ID
        const waitlistToHypothesis = new Map(
          userWaitlists.map((w) => [w.id, w.hypothesisId]),
        )
        signupsData = signups.map((s) => ({
          email: s.email,
          hypothesisId: waitlistToHypothesis.get(s.waitlistId) || '',
          source: coalesceUtmSource(s.utmSource, s.source, 'organic'),
          timestamp: s.timestamp,
          type: 'signup' as const,
        }))

        // Get verifications
        const verificationConditions = [
          inArray(waitlistEntries.waitlistId, waitlistIds),
          eq(waitlistEntries.emailVerified, true),
          gte(waitlistEntries.updatedAt, from),
          lte(waitlistEntries.updatedAt, to),
        ]
        if (cursorDate) {
          verificationConditions.push(lt(waitlistEntries.updatedAt, cursorDate))
        }

        const verifications = await db
          .select({
            email: waitlistEntries.email,
            source: waitlistEntries.source,
            timestamp: waitlistEntries.updatedAt,
            utmSource: waitlistEntries.utmSource,
            waitlistId: waitlistEntries.waitlistId,
          })
          .from(waitlistEntries)
          .where(and(...verificationConditions))
          .orderBy(desc(waitlistEntries.updatedAt))
          .limit(limit)

        verificationsData = verifications.map((v) => ({
          email: v.email,
          hypothesisId: waitlistToHypothesis.get(v.waitlistId) || '',
          source: coalesceUtmSource(v.utmSource, v.source, 'organic'),
          timestamp: v.timestamp,
          type: 'verification' as const,
        }))
      }

      // Combine and sort all activities
      const allActivities = [
        ...pageViewsData.map((pv) => ({
          email: pv.email,
          hypothesisId: pv.hypothesisId,
          source: pv.source,
          timestamp: pv.timestamp,
          type: pv.type,
        })),
        ...signupsData,
        ...verificationsData,
      ]
        .filter((a) => a.timestamp !== null)
        .sort((a, b) => {
          const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0
          const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0
          return dateB - dateA
        })
        .slice(0, limit)

      const items = allActivities.map((a) => ({
        email: a.email,
        hypothesisId: a.hypothesisId,
        source: a.source || 'direct',
        timestamp: a.timestamp!,
        type: a.type,
      }))

      const lastItem = items[items.length - 1]
      const nextCursor =
        items.length === limit && lastItem ? lastItem.timestamp : null

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
        cursor: t.Optional(t.String()),
        from: t.Optional(t.String()),
        hypothesisId: t.Optional(t.String()),
        limit: t.Optional(t.Number({ default: 50, maximum: 100, minimum: 1 })),
        range: t.Optional(
          t.Union([t.Literal('7d'), t.Literal('30d'), t.Literal('90d')]),
        ),
        to: t.Optional(t.String()),
      }),
      response: {
        200: t.Object({
          items: t.Array(
            t.Object({
              email: t.Nullable(t.String()),
              hypothesisId: t.String(),
              source: t.String(),
              timestamp: t.Date(),
              type: t.Union([
                t.Literal('page_view'),
                t.Literal('signup'),
                t.Literal('verification'),
              ]),
            }),
          ),
          nextCursor: t.Nullable(t.String()),
        }),
        401: t.Object({ error: t.String(), reason: t.Optional(t.String()) }),
      },
    },
  )

  // Traffic sources: UTMs from signups + referrers from page visits
  .get(
    '/sources',
    async ({ user, session, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const { from, to } = resolveRange(query)
      const hypothesisId = query.hypothesisId
        ? String(query.hypothesisId)
        : null

      // Get organization's hypotheses
      const userHypotheses = await db
        .select()
        .from(hypotheses)
        .where(eq(hypotheses.organizationId, session.activeOrganizationId))

      const hypothesisIds = userHypotheses.map((h) => h.id)
      const targetHypothesisIds = hypothesisId
        ? hypothesisIds.filter((id) => id === hypothesisId)
        : hypothesisIds

      // Get UTM sources from signups
      let utmSources: Array<{ source: string; count: number }> = []

      if (targetHypothesisIds.length > 0) {
        const userWaitlists = await db
          .select()
          .from(waitlists)
          .where(inArray(waitlists.hypothesisId, targetHypothesisIds))

        const waitlistIds = userWaitlists.map((w) => w.id)

        if (waitlistIds.length > 0) {
          const utmRows = await db
            .select({
              createdAt: waitlistEntries.createdAt,
              utmSource: waitlistEntries.utmSource,
            })
            .from(waitlistEntries)
            .where(
              and(
                inArray(waitlistEntries.waitlistId, waitlistIds),
                gte(waitlistEntries.createdAt, from),
                lte(waitlistEntries.createdAt, to),
              ),
            )

          const counter = new Map<string, number>()
          for (const row of utmRows) {
            const src = coalesceUtmSource(row.utmSource, null, 'direct')
            counter.set(src, (counter.get(src) ?? 0) + 1)
          }
          utmSources = Array.from(counter.entries())
            .map(([source, count]) => ({ count, source }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)
        }
      }

      // Get referrers from page visits
      let referrers: Array<{ referrer: string; count: number }> = []

      if (targetHypothesisIds.length > 0) {
        const pvRows = await db
          .select({
            createdAt: pageVisits.createdAt,
            referrer: pageVisits.referrer,
            userAgent: pageVisits.userAgent,
          })
          .from(pageVisits)
          .where(
            and(
              inArray(pageVisits.hypothesisId, targetHypothesisIds),
              gte(pageVisits.createdAt, from),
              lte(pageVisits.createdAt, to),
            ),
          )

        const counter = new Map<string, number>()
        for (const row of pvRows) {
          if (row.userAgent && BOT_UA_REGEX.test(row.userAgent)) continue
          const domain = extractReferrerDomain(row.referrer)
          counter.set(domain, (counter.get(domain) ?? 0) + 1)
        }
        referrers = Array.from(counter.entries())
          .map(([referrer, count]) => ({ count, referrer }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      }

      return jsonOk(set, HTTP_STATUS.OK, {
        range: { from, to },
        referrers,
        utmSources,
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
        hypothesisId: t.Optional(t.String()),
        range: t.Optional(
          t.Union([t.Literal('7d'), t.Literal('30d'), t.Literal('90d')]),
        ),
        to: t.Optional(t.String()),
      }),
      response: {
        200: t.Object({
          range: t.Object({ from: t.Date(), to: t.Date() }),
          referrers: t.Array(
            t.Object({ count: t.Number(), referrer: t.String() }),
          ),
          utmSources: t.Array(
            t.Object({ count: t.Number(), source: t.String() }),
          ),
        }),
        401: t.Object({ error: t.String(), reason: t.Optional(t.String()) }),
      },
    },
  )

  // Per-hypothesis metrics with totals and daily series (visitors + signups)
  .get(
    '/metrics',
    async ({ user, session, query, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const { from, to } = resolveRange(query)
      const hypothesisId = query.hypothesisId
        ? String(query.hypothesisId)
        : null

      // Get user's hypotheses
      const userHypotheses = await db
        .select()
        .from(hypotheses)
        .where(eq(hypotheses.userId, user.id))

      const hypothesisIds = userHypotheses.map((h) => h.id)
      const targetHypothesisIds = hypothesisId
        ? hypothesisIds.filter((id) => id === hypothesisId)
        : hypothesisIds

      if (targetHypothesisIds.length === 0) {
        return jsonOk(set, HTTP_STATUS.OK, {
          daily: [],
          perHypothesis: [],
          range: { from, to },
          totals: {
            conversionVisitorsToSignups: 0,
            conversionVisitorsToVerified: 0,
            pageViews: 0,
            signups: 0,
            uniqueVisitors: 0,
            verifiedSignups: 0,
          },
        })
      }

      // Get page views and unique visitors per hypothesis
      const pvRows = await db
        .select({
          createdAt: pageVisits.createdAt,
          hypothesisId: pageVisits.hypothesisId,
          userAgent: pageVisits.userAgent,
          visitorId: pageVisits.visitorId,
        })
        .from(pageVisits)
        .where(
          and(
            inArray(pageVisits.hypothesisId, targetHypothesisIds),
            gte(pageVisits.createdAt, from),
            lte(pageVisits.createdAt, to),
          ),
        )

      const pvByHypothesis = new Map<
        string,
        { pageViews: number; uniqueVisitors: number; visitorsSet: Set<string> }
      >()
      for (const row of pvRows) {
        if (row.userAgent && BOT_UA_REGEX.test(row.userAgent)) continue
        const hId = row.hypothesisId
        const entry = pvByHypothesis.get(hId) ?? {
          pageViews: 0,
          uniqueVisitors: 0,
          visitorsSet: new Set<string>(),
        }
        entry.pageViews += 1
        if (row.visitorId) entry.visitorsSet.add(row.visitorId)
        pvByHypothesis.set(hId, entry)
      }
      const pvData = Array.from(pvByHypothesis.entries()).map(
        ([hypothesisId, v]) => ({
          hypothesisId,
          pageViews: v.pageViews,
          uniqueVisitors: v.visitorsSet.size,
        }),
      )

      // Get waitlists and signups
      const userWaitlists = await db
        .select()
        .from(waitlists)
        .where(inArray(waitlists.hypothesisId, targetHypothesisIds))

      const waitlistIds = userWaitlists.map((w) => w.id)
      const waitlistToHypothesis = new Map(
        userWaitlists.map((w) => [w.id, w.hypothesisId]),
      )

      let signupData: Array<{
        waitlistId: string
        signups: number
        verifiedSignups: number
      }> = []

      if (waitlistIds.length > 0) {
        const rows = await db
          .select({
            createdAt: waitlistEntries.createdAt,
            emailVerified: waitlistEntries.emailVerified,
            waitlistId: waitlistEntries.waitlistId,
          })
          .from(waitlistEntries)
          .where(
            and(
              inArray(waitlistEntries.waitlistId, waitlistIds),
              gte(waitlistEntries.createdAt, from),
              lte(waitlistEntries.createdAt, to),
            ),
          )

        const agg = new Map<
          string,
          { signups: number; verifiedSignups: number }
        >()
        for (const r of rows) {
          const a = agg.get(r.waitlistId) ?? { signups: 0, verifiedSignups: 0 }
          a.signups += 1
          if (r.emailVerified) a.verifiedSignups += 1
          agg.set(r.waitlistId, a)
        }
        signupData = Array.from(agg.entries()).map(([waitlistId, v]) => ({
          signups: v.signups,
          verifiedSignups: v.verifiedSignups,
          waitlistId,
        }))
      }

      // Daily aggregated data
      const dailyVisitorsMap = new Map<string, Set<string>>()
      for (const row of pvRows) {
        if (row.userAgent && BOT_UA_REGEX.test(row.userAgent)) continue
        const d = row.createdAt ? new Date(row.createdAt) : null
        if (!d) continue
        const dateStr = d.toISOString().slice(0, 10)
        if (row.visitorId) {
          const set = dailyVisitorsMap.get(dateStr) ?? new Set<string>()
          set.add(row.visitorId)
          dailyVisitorsMap.set(dateStr, set)
        }
      }
      const dailyVisitors = Array.from(dailyVisitorsMap.entries()).map(
        ([date, set]) => ({ date, visitors: set.size }),
      )

      let dailySignups: Array<{ date: string; signups: number }> = []

      if (waitlistIds.length > 0) {
        const rows = await db
          .select({
            createdAt: waitlistEntries.createdAt,
            waitlistId: waitlistEntries.waitlistId,
          })
          .from(waitlistEntries)
          .where(
            and(
              inArray(waitlistEntries.waitlistId, waitlistIds),
              gte(waitlistEntries.createdAt, from),
              lte(waitlistEntries.createdAt, to),
            ),
          )
        const map = new Map<string, number>()
        for (const r of rows) {
          const d = r.createdAt ? new Date(r.createdAt) : null
          if (!d) continue
          const dateStr = d.toISOString().slice(0, 10)
          map.set(dateStr, (map.get(dateStr) ?? 0) + 1)
        }
        dailySignups = Array.from(map.entries()).map(([date, signups]) => ({
          date,
          signups,
        }))
      }

      // Merge daily data
      const dailyMap = new Map<string, { visitors: number; signups: number }>()

      for (const dv of dailyVisitors) {
        dailyMap.set(dv.date, {
          signups: 0,
          visitors: Number(dv.visitors || 0),
        })
      }

      for (const ds of dailySignups) {
        const existing = dailyMap.get(ds.date)
        if (existing) {
          existing.signups = Number(ds.signups || 0)
        } else {
          dailyMap.set(ds.date, {
            signups: Number(ds.signups || 0),
            visitors: 0,
          })
        }
      }

      const daily = Array.from(dailyMap.entries())
        .map(([date, data]) => ({ date, ...data }))
        .sort((a, b) => a.date.localeCompare(b.date))

      // Merge per-hypothesis metrics
      const perHypothesisMap = new Map<
        string,
        {
          conversionVisitorsToSignups: number
          conversionVisitorsToVerified: number
          hypothesisId: string
          pageViews: number
          signups: number
          uniqueVisitors: number
          verifiedSignups: number
        }
      >()

      // Initialize with all target hypotheses
      for (const hId of targetHypothesisIds) {
        perHypothesisMap.set(hId, {
          conversionVisitorsToSignups: 0,
          conversionVisitorsToVerified: 0,
          hypothesisId: hId,
          pageViews: 0,
          signups: 0,
          uniqueVisitors: 0,
          verifiedSignups: 0,
        })
      }

      // Add page view data
      for (const pv of pvData) {
        const metrics = perHypothesisMap.get(pv.hypothesisId)
        if (metrics) {
          metrics.pageViews = Number(pv.pageViews || 0)
          metrics.uniqueVisitors = Number(pv.uniqueVisitors || 0)
        }
      }

      // Add signup data
      for (const sd of signupData) {
        const hypothesisId = waitlistToHypothesis.get(sd.waitlistId)
        if (hypothesisId) {
          const metrics = perHypothesisMap.get(hypothesisId)
          if (metrics) {
            metrics.signups = Number(sd.signups || 0)
            metrics.verifiedSignups = Number(sd.verifiedSignups || 0)
          }
        }
      }

      // Calculate conversion rates
      for (const metrics of perHypothesisMap.values()) {
        if (metrics.uniqueVisitors > 0) {
          metrics.conversionVisitorsToSignups =
            (metrics.signups / metrics.uniqueVisitors) * 100
          metrics.conversionVisitorsToVerified =
            (metrics.verifiedSignups / metrics.uniqueVisitors) * 100
        }
      }

      const perHypothesis = Array.from(perHypothesisMap.values())

      // Calculate totals
      const totals = perHypothesis.reduce(
        (acc, m) => {
          acc.pageViews += m.pageViews
          acc.uniqueVisitors += m.uniqueVisitors
          acc.signups += m.signups
          acc.verifiedSignups += m.verifiedSignups
          return acc
        },
        { pageViews: 0, signups: 0, uniqueVisitors: 0, verifiedSignups: 0 },
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
        daily,
        perHypothesis,
        range: { from, to },
        totals: totalsWithConv,
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
        hypothesisId: t.Optional(t.String()),
        range: t.Optional(
          t.Union([t.Literal('7d'), t.Literal('30d'), t.Literal('90d')]),
        ),
        to: t.Optional(t.String()),
      }),
      response: {
        200: t.Object({
          daily: t.Array(
            t.Object({
              date: t.String(),
              signups: t.Number(),
              visitors: t.Number(),
            }),
          ),
          perHypothesis: t.Array(
            t.Object({
              conversionVisitorsToSignups: t.Number(),
              conversionVisitorsToVerified: t.Number(),
              hypothesisId: t.String(),
              pageViews: t.Number(),
              signups: t.Number(),
              uniqueVisitors: t.Number(),
              verifiedSignups: t.Number(),
            }),
          ),
          range: t.Object({ from: t.Date(), to: t.Date() }),
          totals: t.Object({
            conversionVisitorsToSignups: t.Number(),
            conversionVisitorsToVerified: t.Number(),
            pageViews: t.Number(),
            signups: t.Number(),
            uniqueVisitors: t.Number(),
            verifiedSignups: t.Number(),
          }),
        }),
        401: t.Object({ error: t.String(), reason: t.Optional(t.String()) }),
      },
    },
  )

export type AnalyticsApi = typeof analyticsApi
