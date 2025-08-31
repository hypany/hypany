import 'server-only'
import { and, count, countDistinct, desc, eq, gt, inArray, isNull, lte } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, landingPages, pageVisits, waitlistEntries, waitlists } from '@/schema'
import { WAITLIST_THRESHOLD } from '@/lib/constants'
import { ulid } from 'ulid'

/**
 * Get all hypotheses for an organization with related data
 */
export async function getHypothesesForOrganization(
  organizationId: string,
  options?: { limit?: number; offset?: number }
) {
  const { limit = 20, offset = 0 } = options || {}

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
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )
    .orderBy(desc(hypotheses.createdAt))
    .limit(limit)
    .offset(offset)

  // Get signup counts for waitlists
  const waitlistIds = userHypotheses
    .map((r) => r.waitlist?.id)
    .filter((id): id is string => Boolean(id))

  let signupCounts: Record<string, number> = {}
  if (waitlistIds.length > 0) {
    const counts = await db
      .select({
        waitlistId: waitlistEntries.waitlistId,
        count: count(waitlistEntries.id),
      })
      .from(waitlistEntries)
      .where(inArray(waitlistEntries.waitlistId, waitlistIds))
      .groupBy(waitlistEntries.waitlistId)

    signupCounts = counts.reduce(
      (acc, row) => ({
        ...acc,
        [row.waitlistId]: row.count,
      }),
      {},
    )
  }

  // Map to response format
  const hypothesesWithCounts = userHypotheses.map((row) => ({
    id: row.hypothesis.id,
    name: row.hypothesis.name,
    slug: row.hypothesis.slug,
    description: row.hypothesis.description,
    status: row.hypothesis.status,
    createdAt: row.hypothesis.createdAt,
    updatedAt: row.hypothesis.updatedAt,
    landingPageId: row.landingPage?.id,
    waitlistId: row.waitlist?.id,
    signupCount: row.waitlist?.id ? signupCounts[row.waitlist.id] || 0 : 0,
  }))

  return hypothesesWithCounts
}

/**
 * Get a single hypothesis by ID with ownership verification
 */
export async function getHypothesisById(id: string, organizationId: string) {
  const [hypothesis] = await db
    .select()
    .from(hypotheses)
    .where(
      and(
        eq(hypotheses.id, id),
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )
    .limit(1)

  return hypothesis
}

/**
 * Calculate dashboard metrics for hypotheses
 */
export async function getHypothesesMetrics(organizationId: string) {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Get all hypothesis IDs for the organization
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

  if (hypothesisIds.length === 0) {
    return {
      uniqueVisitors30d: 0,
      signups30d: 0,
      last7Signups: 0,
      prev7Signups: 0,
      growthRate7d: 0,
      readyToLaunch: 0,
    }
  }

  // Get waitlist IDs for these hypotheses
  const orgWaitlists = await db
    .select({ id: waitlists.id })
    .from(waitlists)
    .where(inArray(waitlists.hypothesisId, hypothesisIds))

  const waitlistIds = orgWaitlists.map((w) => w.id)

  // Unique visitors in last 30 days (excluding bots)
  const [visitorResult] = await db
    .select({ count: countDistinct(pageVisits.visitorId) })
    .from(pageVisits)
    .where(
      and(
        inArray(pageVisits.hypothesisId, hypothesisIds),
        gt(pageVisits.createdAt, thirtyDaysAgo),
        isNull(pageVisits.userAgent), // Simple bot filter
      ),
    )

  const uniqueVisitors30d = visitorResult?.count || 0

  // Signups in different periods
  const signupStats = await Promise.all([
    // Total signups in last 30 days
    db
      .select({ count: count() })
      .from(waitlistEntries)
      .where(
        and(
          inArray(waitlistEntries.waitlistId, waitlistIds),
          gt(waitlistEntries.createdAt, thirtyDaysAgo),
        ),
      ),
    // Signups in last 7 days
    db
      .select({ count: count() })
      .from(waitlistEntries)
      .where(
        and(
          inArray(waitlistEntries.waitlistId, waitlistIds),
          gt(waitlistEntries.createdAt, sevenDaysAgo),
        ),
      ),
    // Signups in previous 7 days (7-14 days ago)
    db
      .select({ count: count() })
      .from(waitlistEntries)
      .where(
        and(
          inArray(waitlistEntries.waitlistId, waitlistIds),
          gt(waitlistEntries.createdAt, fourteenDaysAgo),
          lte(waitlistEntries.createdAt, sevenDaysAgo),
        ),
      ),
  ])

  const signups30d = signupStats[0][0]?.count || 0
  const last7Signups = signupStats[1][0]?.count || 0
  const prev7Signups = signupStats[2][0]?.count || 0

  // Calculate growth rate
  const growthRate7d = prev7Signups > 0 
    ? ((last7Signups - prev7Signups) / prev7Signups) * 100 
    : 0

  // Count hypotheses ready to launch (>= threshold signups)
  const readyHypotheses = await db
    .select({
      hypothesisId: waitlists.hypothesisId,
      signupCount: count(waitlistEntries.id),
    })
    .from(waitlists)
    .leftJoin(waitlistEntries, eq(waitlists.id, waitlistEntries.waitlistId))
    .where(inArray(waitlists.hypothesisId, hypothesisIds))
    .groupBy(waitlists.hypothesisId)
    .having(({ signupCount }) => gt(signupCount, WAITLIST_THRESHOLD))

  const readyToLaunch = readyHypotheses.length

  return {
    uniqueVisitors30d,
    signups30d,
    last7Signups,
    prev7Signups,
    growthRate7d,
    readyToLaunch,
  }
}

/**
 * Create a new hypothesis with landing page and waitlist
 */
export async function createHypothesis(
  data: {
    name: string
    description?: string
    slug?: string
    organizationId: string
    userId: string
  }
) {
  const hypothesisId = ulid()
  const landingPageId = ulid()
  const waitlistId = ulid()

  // Create all three records in parallel
  await Promise.all([
    db.insert(hypotheses).values({
      id: hypothesisId,
      name: data.name,
      description: data.description,
      slug: data.slug || hypothesisId.toLowerCase(),
      status: 'draft',
      organizationId: data.organizationId,
      userId: data.userId,
    }),
    db.insert(landingPages).values({
      id: landingPageId,
      hypothesisId,
    }),
    db.insert(waitlists).values({
      id: waitlistId,
      hypothesisId,
      name: `${data.name} Waitlist`,
    }),
  ])

  return {
    id: hypothesisId,
    landingPageId,
    waitlistId,
  }
}

/**
 * Update a hypothesis
 */
export async function updateHypothesis(
  id: string,
  organizationId: string,
  data: {
    name?: string
    description?: string
    status?: 'draft' | 'published' | 'archived'
  }
) {
  const updates: any = { updatedAt: new Date() }
  if (data.name !== undefined) updates.name = data.name
  if (data.description !== undefined) updates.description = data.description
  if (data.status !== undefined) updates.status = data.status

  await db
    .update(hypotheses)
    .set(updates)
    .where(
      and(
        eq(hypotheses.id, id),
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )

  return { success: true }
}

/**
 * Soft delete a hypothesis
 */
export async function deleteHypothesis(id: string, organizationId: string) {
  await db
    .update(hypotheses)
    .set({ deletedAt: new Date() })
    .where(
      and(
        eq(hypotheses.id, id),
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )

  return { success: true }
}

/**
 * Get waitlist by hypothesis ID with stats
 */
export async function getWaitlistByHypothesisId(hypothesisId: string, organizationId: string) {
  // First verify the hypothesis belongs to the organization
  const hypothesis = await getHypothesisById(hypothesisId, organizationId)
  if (!hypothesis) return null

  const [waitlist] = await db
    .select()
    .from(waitlists)
    .where(eq(waitlists.hypothesisId, hypothesisId))
    .limit(1)

  if (!waitlist) return null

  // Get stats for the waitlist
  const [statsResult] = await db
    .select({
      totalEntries: count(waitlistEntries.id),
      verifiedEntries: count(waitlistEntries.id).mapWith(Number),
    })
    .from(waitlistEntries)
    .where(
      and(
        eq(waitlistEntries.waitlistId, waitlist.id),
        isNull(waitlistEntries.deletedAt),
      ),
    )

  const [verifiedResult] = await db
    .select({
      verifiedEntries: count(waitlistEntries.id),
    })
    .from(waitlistEntries)
    .where(
      and(
        eq(waitlistEntries.waitlistId, waitlist.id),
        eq(waitlistEntries.emailVerified, true),
        isNull(waitlistEntries.deletedAt),
      ),
    )

  return {
    waitlist,
    stats: {
      totalEntries: statsResult?.totalEntries || 0,
      verifiedEntries: verifiedResult?.verifiedEntries || 0,
    },
  }
}

/**
 * Get waitlist entries for a hypothesis
 */
export async function getWaitlistEntries(
  hypothesisId: string,
  organizationId: string,
  options?: { limit?: number; offset?: number }
) {
  const { limit = 50, offset = 0 } = options || {}

  // First verify the hypothesis belongs to the organization
  const hypothesis = await getHypothesisById(hypothesisId, organizationId)
  if (!hypothesis) return []

  const [waitlist] = await db
    .select()
    .from(waitlists)
    .where(eq(waitlists.hypothesisId, hypothesisId))
    .limit(1)

  if (!waitlist) return []

  const entries = await db
    .select()
    .from(waitlistEntries)
    .where(
      and(
        eq(waitlistEntries.waitlistId, waitlist.id),
        isNull(waitlistEntries.deletedAt),
      ),
    )
    .orderBy(desc(waitlistEntries.createdAt))
    .limit(limit)
    .offset(offset)

  return entries
}

/**
 * Get landing pages for a hypothesis
 */
export async function getLandingPagesForHypothesis(
  hypothesisId: string,
  organizationId: string
) {
  // First verify the hypothesis belongs to the organization
  const hypothesis = await getHypothesisById(hypothesisId, organizationId)
  if (!hypothesis) return []

  const pages = await db
    .select()
    .from(landingPages)
    .where(
      and(
        eq(landingPages.hypothesisId, hypothesisId),
        isNull(landingPages.deletedAt),
      ),
    )
    .orderBy(desc(landingPages.createdAt))

  return pages
}