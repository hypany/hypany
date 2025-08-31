import 'server-only'
import { and, count, countDistinct, desc, eq, gt, inArray, isNull, lte, or, sql } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, pageVisits, waitlistEntries, waitlists } from '@/schema'
import { resolveRange } from '@/lib/time-range'

const BOT_PATTERNS = [
  'bot',
  'spider',
  'crawl',
  'scraper',
  'headless',
  'puppeteer',
  'playwright',
]

/**
 * Get activity feed for an organization
 */
export async function getActivityFeed(
  organizationId: string,
  options?: {
    limit?: number
    range?: '7d' | '30d' | '90d'
    cursor?: string
  }
) {
  const { limit = 20, range = '30d', cursor } = options || {}

  // Calculate date range
  const now = new Date()
  const daysMap = { '7d': 7, '30d': 30, '90d': 90 }
  const days = daysMap[range]
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  // Get organization's hypotheses
  const orgHypotheses = await db
    .select({ id: hypotheses.id })
    .from(hypotheses)
    .where(
      and(
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )

  const hypothesisIds = orgHypotheses.map((h) => h.id)
  if (hypothesisIds.length === 0) return { items: [] }

  // Get organization's waitlists
  const orgWaitlists = await db
    .select({ id: waitlists.id })
    .from(waitlists)
    .where(inArray(waitlists.hypothesisId, hypothesisIds))

  const waitlistIds = orgWaitlists.map((w) => w.id)

  // Build cursor condition
  const cursorCondition = cursor
    ? sql`timestamp < ${new Date(cursor)}`
    : sql`1=1`

  // Get page views
  const views = await db
    .select({
      type: sql<string>`'page_view'`,
      hypothesisId: pageVisits.hypothesisId,
      timestamp: pageVisits.createdAt,
      source: pageVisits.referrer,
      email: sql<string | null>`NULL`,
    })
    .from(pageVisits)
    .where(
      and(
        inArray(pageVisits.hypothesisId, hypothesisIds),
        gt(pageVisits.createdAt, startDate),
        cursorCondition,
        // Filter out bots
        or(
          isNull(pageVisits.userAgent),
          ...BOT_PATTERNS.map(pattern => 
            sql`LOWER(${pageVisits.userAgent}) NOT LIKE '%${pattern}%'`
          )
        )
      ),
    )
    .orderBy(desc(pageVisits.createdAt))
    .limit(limit)

  // Get signups
  const signups = await db
    .select({
      type: sql<string>`'signup'`,
      hypothesisId: waitlists.hypothesisId,
      timestamp: waitlistEntries.createdAt,
      source: waitlistEntries.utmSource,
      email: waitlistEntries.email,
    })
    .from(waitlistEntries)
    .innerJoin(waitlists, eq(waitlistEntries.waitlistId, waitlists.id))
    .where(
      and(
        inArray(waitlistEntries.waitlistId, waitlistIds),
        gt(waitlistEntries.createdAt, startDate),
        cursorCondition,
      ),
    )
    .orderBy(desc(waitlistEntries.createdAt))
    .limit(limit)

  // Get verifications (using emailVerified field)
  const verifs = await db
    .select({
      type: sql<string>`'verification'`,
      hypothesisId: waitlists.hypothesisId,
      timestamp: waitlistEntries.createdAt,
      source: waitlistEntries.utmSource,
      email: waitlistEntries.email,
    })
    .from(waitlistEntries)
    .innerJoin(waitlists, eq(waitlistEntries.waitlistId, waitlists.id))
    .where(
      and(
        inArray(waitlistEntries.waitlistId, waitlistIds),
        eq(waitlistEntries.emailVerified, true),
        gt(waitlistEntries.createdAt, startDate),
        cursorCondition,
      ),
    )
    .orderBy(desc(waitlistEntries.createdAt))
    .limit(limit)

  // Combine and sort all activities
  const allActivities = [...views, ...signups, ...verifs]
    .sort((a, b) => {
      const timeA = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime()
      const timeB = b.timestamp instanceof Date ? b.timestamp.getTime() : new Date(b.timestamp).getTime()
      return timeB - timeA
    })
    .slice(0, limit)

  return {
    items: allActivities.map(a => ({
      type: a.type,
      hypothesisId: a.hypothesisId,
      timestamp: a.timestamp,
      source: a.source || 'direct',
      email: a.email,
    })),
  }
}

/**
 * Get traffic sources analysis
 */
export async function getTrafficSources(
  organizationId: string,
  range: '7d' | '30d' | '90d' = '30d'
) {
  const now = new Date()
  const daysMap = { '7d': 7, '30d': 30, '90d': 90 }
  const days = daysMap[range]
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  // Get organization's hypotheses
  const orgHypotheses = await db
    .select({ id: hypotheses.id })
    .from(hypotheses)
    .where(
      and(
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )

  const hypothesisIds = orgHypotheses.map((h) => h.id)
  if (hypothesisIds.length === 0) return { sources: [] }

  // Get organization's waitlists
  const orgWaitlists = await db
    .select({ id: waitlists.id })
    .from(waitlists)
    .where(inArray(waitlists.hypothesisId, hypothesisIds))

  const waitlistIds = orgWaitlists.map((w) => w.id)

  // Get UTM sources from signups
  const utmSources = await db
    .select({
      source: sql<string>`COALESCE(
        ${waitlistEntries.utmSource},
        ${waitlistEntries.utmMedium},
        ${waitlistEntries.utmCampaign},
        'direct'
      )`,
      count: count(),
    })
    .from(waitlistEntries)
    .where(
      and(
        inArray(waitlistEntries.waitlistId, waitlistIds),
        gt(waitlistEntries.createdAt, startDate),
      ),
    )
    .groupBy(sql`COALESCE(
      ${waitlistEntries.utmSource},
      ${waitlistEntries.utmMedium},
      ${waitlistEntries.utmCampaign},
      'direct'
    )`)

  // Get referrers from page visits
  const referrerSources = await db
    .select({
      source: sql<string>`
        CASE 
          WHEN ${pageVisits.referrer} IS NULL OR ${pageVisits.referrer} = '' THEN 'direct'
          ELSE REGEXP_REPLACE(${pageVisits.referrer}, '^https?://([^/]+).*', '\\1')
        END
      `,
      count: countDistinct(pageVisits.visitorId),
    })
    .from(pageVisits)
    .where(
      and(
        inArray(pageVisits.hypothesisId, hypothesisIds),
        gt(pageVisits.createdAt, startDate),
        // Filter out bots
        or(
          isNull(pageVisits.userAgent),
          ...BOT_PATTERNS.map(pattern => 
            sql`LOWER(${pageVisits.userAgent}) NOT LIKE '%${pattern}%'`
          )
        )
      ),
    )
    .groupBy(sql`
      CASE 
        WHEN ${pageVisits.referrer} IS NULL OR ${pageVisits.referrer} = '' THEN 'direct'
        ELSE REGEXP_REPLACE(${pageVisits.referrer}, '^https?://([^/]+).*', '\\1')
      END
    `)

  // Combine sources
  const sourceMap = new Map<string, { signups: number; visitors: number }>()

  utmSources.forEach(s => {
    if (!sourceMap.has(s.source)) {
      sourceMap.set(s.source, { signups: 0, visitors: 0 })
    }
    sourceMap.get(s.source)!.signups = s.count
  })

  referrerSources.forEach(s => {
    if (!sourceMap.has(s.source)) {
      sourceMap.set(s.source, { signups: 0, visitors: 0 })
    }
    sourceMap.get(s.source)!.visitors = s.count
  })

  const sources = Array.from(sourceMap.entries())
    .map(([source, data]) => ({
      source,
      signups: data.signups,
      visitors: data.visitors,
      conversionRate: data.visitors > 0 ? (data.signups / data.visitors) * 100 : 0,
    }))
    .sort((a, b) => b.visitors - a.visitors)

  return { sources }
}

/**
 * Aggregated analytics metrics for charts (daily series + per-hypothesis)
 */
export async function getAnalyticsMetrics(
  organizationId: string,
  opts: { hypothesisId?: string; range?: '7d' | '30d' | '90d' } = {},
) {
  const { range = '30d', hypothesisId } = opts
  const { from, to } = resolveRange({ range })

  // Get all hypothesis IDs for the org
  const orgHypotheses = await db
    .select({ id: hypotheses.id })
    .from(hypotheses)
    .where(eq(hypotheses.organizationId, organizationId))

  const hypothesisIds = orgHypotheses.map((h) => h.id)
  const targetHypothesisIds = hypothesisId
    ? hypothesisIds.filter((id) => id === hypothesisId)
    : hypothesisIds

  if (targetHypothesisIds.length === 0) {
    return { daily: [], perHypothesis: [], totals: { pageViews: 0, uniqueVisitors: 0, signups: 0, verifiedSignups: 0, conversionVisitorsToSignups: 0, conversionVisitorsToVerified: 0 } }
  }

  // Gather page views (aggregate counts and unique visitors in range)
  const pvData = await db
    .select({
      hypothesisId: pageVisits.hypothesisId,
      pageViews: count(pageVisits.id),
      uniqueVisitors: countDistinct(pageVisits.visitorId),
    })
    .from(pageVisits)
    .where(
      and(
        inArray(pageVisits.hypothesisId, targetHypothesisIds),
        gt(pageVisits.createdAt, from),
        lte(pageVisits.createdAt, to),
      ),
    )
    .groupBy(pageVisits.hypothesisId)

  // Daily visitors (unique per day)
  const pvRows = await db
    .select({
      createdAt: pageVisits.createdAt,
      hypothesisId: pageVisits.hypothesisId,
      visitorId: pageVisits.visitorId,
      userAgent: pageVisits.userAgent,
    })
    .from(pageVisits)
    .where(
      and(
        inArray(pageVisits.hypothesisId, targetHypothesisIds),
        gt(pageVisits.createdAt, from),
        lte(pageVisits.createdAt, to),
      ),
    )

  const dailyVisitorsMap = new Map<string, Set<string>>()
  for (const row of pvRows) {
    // A light bot filter similar to API
    const ua = row.userAgent ? String(row.userAgent).toLowerCase() : ''
    if (ua && BOT_PATTERNS.some((p) => ua.includes(p))) continue
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

  // Gather waitlists for hypotheses
  const userWaitlists = await db
    .select({ hypothesisId: waitlists.hypothesisId, id: waitlists.id })
    .from(waitlists)
    .where(inArray(waitlists.hypothesisId, targetHypothesisIds))

  const waitlistIds = userWaitlists.map((w) => w.id)
  const waitlistToHypothesis = new Map<string, string>()
  userWaitlists.forEach((w) => waitlistToHypothesis.set(w.id, w.hypothesisId))

  // Daily signups
  let dailySignups: Array<{ date: string; signups: number }> = []
  if (waitlistIds.length > 0) {
    const rows = await db
      .select({ createdAt: waitlistEntries.createdAt, waitlistId: waitlistEntries.waitlistId })
      .from(waitlistEntries)
      .where(
        and(
          inArray(waitlistEntries.waitlistId, waitlistIds),
          gt(waitlistEntries.createdAt, from),
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
    dailySignups = Array.from(map.entries()).map(([date, signups]) => ({ date, signups }))
  }

  // Merge daily
  const dailyMap = new Map<string, { visitors: number; signups: number }>()
  for (const dv of dailyVisitors) {
    dailyMap.set(dv.date, { visitors: Number(dv.visitors || 0), signups: 0 })
  }
  for (const ds of dailySignups) {
    const ex = dailyMap.get(ds.date)
    if (ex) ex.signups = Number(ds.signups || 0)
    else dailyMap.set(ds.date, { visitors: 0, signups: Number(ds.signups || 0) })
  }
  const daily = Array.from(dailyMap.entries())
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date))

  // Signups/verified per hypothesis
  let signupData: Array<{ waitlistId: string; signups: number; verifiedSignups: number }> = []
  if (waitlistIds.length > 0) {
    const rows = await db
      .select({
        signups: count(waitlistEntries.id),
        verifiedSignups: count(sql<number>`CASE WHEN ${waitlistEntries.emailVerified} = true THEN 1 END`),
        waitlistId: waitlistEntries.waitlistId,
      })
      .from(waitlistEntries)
      .where(
        and(
          inArray(waitlistEntries.waitlistId, waitlistIds),
          gt(waitlistEntries.createdAt, from),
          lte(waitlistEntries.createdAt, to),
        ),
      )
      .groupBy(waitlistEntries.waitlistId)
    signupData = rows
  }

  // Build per-hypothesis metrics
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

  for (const pv of pvData) {
    const m = perHypothesisMap.get(pv.hypothesisId)
    if (m) {
      m.pageViews = Number(pv.pageViews || 0)
      m.uniqueVisitors = Number(pv.uniqueVisitors || 0)
    }
  }

  for (const sd of signupData) {
    const hId = waitlistToHypothesis.get(sd.waitlistId)
    if (hId) {
      const m = perHypothesisMap.get(hId)
      if (m) {
        m.signups = Number(sd.signups || 0)
        m.verifiedSignups = Number(sd.verifiedSignups || 0)
      }
    }
  }

  for (const m of perHypothesisMap.values()) {
    if (m.uniqueVisitors > 0) {
      m.conversionVisitorsToSignups = (m.signups / m.uniqueVisitors) * 100
      m.conversionVisitorsToVerified = (m.verifiedSignups / m.uniqueVisitors) * 100
    }
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
      totals.uniqueVisitors > 0 ? (totals.signups / totals.uniqueVisitors) * 100 : 0,
    conversionVisitorsToVerified:
      totals.uniqueVisitors > 0 ? (totals.verifiedSignups / totals.uniqueVisitors) * 100 : 0,
  }

  return { daily, perHypothesis, totals: totalsWithConv }
}
