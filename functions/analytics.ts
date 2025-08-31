import 'server-only'
import { and, count, countDistinct, desc, eq, gt, inArray, isNull, or, sql } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, pageVisits, waitlistEntries, waitlists } from '@/schema'

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