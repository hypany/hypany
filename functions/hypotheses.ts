import 'server-only'
import { and, eq, isNull, gt, gte, lt, sql } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, landingPages, waitlists, waitlistEntries, pageVisits } from '@/schema'
import { ulid } from 'ulid'

export async function getHypothesisDomainAndSlugById(
  hypothesisId: string,
  organizationId: string,
): Promise<{ customDomain: string | null; slug: string | null } | null> {
  const [row] = await db
    .select({ customDomain: hypotheses.customDomain, slug: hypotheses.slug })
    .from(hypotheses)
    .where(
      and(
        eq(hypotheses.id, hypothesisId),
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )
    .limit(1)
  if (!row) return null
  return { customDomain: (row.customDomain as unknown as string) || null, slug: (row.slug as unknown as string) || null }
}

export async function getHypothesisById(
  hypothesisId: string,
  organizationId: string,
) {
  const [row] = await db
    .select({
      activeLandingPageId: hypotheses.activeLandingPageId,
      customDomain: hypotheses.customDomain,
      description: hypotheses.description,
      id: hypotheses.id,
      name: hypotheses.name,
      slug: hypotheses.slug,
      status: hypotheses.status,
    })
    .from(hypotheses)
    .where(
      and(
        eq(hypotheses.id, hypothesisId),
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )
    .limit(1)
  return row || null
}

export async function getLandingPagesForHypothesis(
  hypothesisId: string,
  _organizationId: string,
) {
  // Ownership is enforced at usage sites; landing pages are scoped by hypothesisId
  const rows = await db
    .select({
      id: landingPages.id,
      name: landingPages.name,
      template: landingPages.template,
      publishedAt: landingPages.publishedAt,
    })
    .from(landingPages)
    .where(and(eq(landingPages.hypothesisId, hypothesisId), isNull(landingPages.deletedAt)))
  return rows
}

export async function getHypothesesForOrganization(organizationId: string) {
  const hyps = await db
    .select({
      id: hypotheses.id,
      name: hypotheses.name,
      slug: hypotheses.slug,
      status: hypotheses.status,
      // Map active page to landingPageId for UI consumption
      landingPageId: (hypotheses as any).activeLandingPageId as unknown as string | null,
    })
    .from(hypotheses)
    .where(and(eq(hypotheses.organizationId, organizationId), isNull(hypotheses.deletedAt)))

  // Aggregate signups by hypothesis via waitlists
  const signupCounts = await db
    .select({
      hypothesisId: waitlists.hypothesisId,
      count: sql<number>`count(*)`,
    })
    .from(waitlistEntries)
    .innerJoin(waitlists, eq(waitlistEntries.waitlistId, waitlists.id))
    .where(isNull(waitlists.deletedAt))
    .groupBy(waitlists.hypothesisId)

  const countMap = new Map<string, number>()
  for (const r of signupCounts) countMap.set(r.hypothesisId, Number(r.count))

  return hyps.map((h) => ({ ...h, signupCount: countMap.get(h.id) || 0 }))
}

export async function getHypothesesMetrics(organizationId: string) {
  const now = new Date()
  const last7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const prev7 = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
  const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Unique visitors (30d) across org
  const [visitorsRow] = await db
    .select({
      count: sql<number>`count(distinct ${pageVisits.visitorId})`,
    })
    .from(pageVisits)
    .innerJoin(hypotheses, eq(pageVisits.hypothesisId, hypotheses.id))
    .where(and(eq(hypotheses.organizationId, organizationId), gt(pageVisits.createdAt, last30)))

  // Signups last 30d
  const [signups30Row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(waitlistEntries)
    .innerJoin(waitlists, eq(waitlistEntries.waitlistId, waitlists.id))
    .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
    .where(and(eq(hypotheses.organizationId, organizationId), gt(waitlistEntries.createdAt, last30)))

  // Last 7d and prev 7d signups
  const [last7Row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(waitlistEntries)
    .innerJoin(waitlists, eq(waitlistEntries.waitlistId, waitlists.id))
    .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
    .where(and(eq(hypotheses.organizationId, organizationId), gt(waitlistEntries.createdAt, last7)))

  const [prev7Row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(waitlistEntries)
    .innerJoin(waitlists, eq(waitlistEntries.waitlistId, waitlists.id))
    .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(hypotheses.organizationId, organizationId),
        gte(waitlistEntries.createdAt, prev7),
        lt(waitlistEntries.createdAt, last7),
      ),
    )

  const [readyRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(hypotheses)
    .where(and(eq(hypotheses.organizationId, organizationId), isNull(hypotheses.deletedAt), eq(hypotheses.status, 'published')))

  const last7Signups = Number(last7Row?.count || 0)
  const prev7Signups = Number(prev7Row?.count || 0)
  const growthRate7d = prev7Signups > 0 ? ((last7Signups - prev7Signups) / prev7Signups) * 100 : last7Signups > 0 ? 100 : 0

  return {
    growthRate7d,
    last7Signups,
    prev7Signups,
    readyToLaunch: Number(readyRow?.count || 0),
    signups30d: Number(signups30Row?.count || 0),
    uniqueVisitors30d: Number(visitorsRow?.count || 0),
  }
}

export async function createHypothesis({
  name,
  organizationId,
  userId,
  description,
  slug,
}: {
  name: string
  organizationId: string
  userId: string
  description?: string
  slug?: string
}): Promise<{ id: string; landingPageId: string; waitlistId: string }> {
  const hypothesisId = ulid()
  const landingPageId = ulid()
  const waitlistId = ulid()

  const now = new Date()

  await db.transaction(async (tx) => {
    await tx.insert(hypotheses).values({
      id: hypothesisId,
      name,
      organizationId,
      userId,
      description: description ?? null,
      slug: slug ?? null,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    } as any)

    await tx.insert(landingPages).values({
      id: landingPageId,
      hypothesisId,
      name: null,
      template: 'default',
      createdAt: now,
      updatedAt: now,
    } as any)

    await tx.insert(waitlists).values({
      id: waitlistId,
      hypothesisId,
      name: `${name} Waitlist`,
      createdAt: now,
      updatedAt: now,
    } as any)

    // Set activeLandingPageId on hypothesis to this first page (best-effort)
    await tx
      .update(hypotheses)
      .set({ activeLandingPageId: landingPageId, updatedAt: new Date() } as any)
      .where(eq(hypotheses.id, hypothesisId))
  })

  return { id: hypothesisId, landingPageId, waitlistId }
}

export async function getWaitlistByHypothesisId(
  hypothesisId: string,
  organizationId: string,
) {
  // Resolve waitlist by hypothesis, ensure org ownership
  const [wl] = await db
    .select({ id: waitlists.id })
    .from(waitlists)
    .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(waitlists.hypothesisId, hypothesisId),
        eq(hypotheses.organizationId, organizationId),
        isNull(waitlists.deletedAt),
        isNull(hypotheses.deletedAt),
      ),
    )
    .limit(1)

  if (!wl) return null

  // Aggregate stats
  const [totalRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(waitlistEntries)
    .where(eq(waitlistEntries.waitlistId, wl.id))

  const [verifiedRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(waitlistEntries)
    .where(and(eq(waitlistEntries.waitlistId, wl.id), eq(waitlistEntries.emailVerified, true as unknown as boolean)))

  return {
    id: wl.id,
    stats: {
      totalEntries: Number(totalRow?.count || 0),
      verifiedEntries: Number(verifiedRow?.count || 0),
    },
  }
}

export async function getWaitlistEntries(
  hypothesisId: string,
  organizationId: string,
  opts?: { limit?: number },
) {
  const limit = Math.max(1, Math.min(100, opts?.limit ?? 10))
  const rows = await db
    .select({
      email: waitlistEntries.email,
      emailVerified: waitlistEntries.emailVerified,
      id: waitlistEntries.id,
      name: waitlistEntries.name,
      source: waitlistEntries.source,
      createdAt: waitlistEntries.createdAt,
    })
    .from(waitlistEntries)
    .innerJoin(waitlists, eq(waitlistEntries.waitlistId, waitlists.id))
    .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(waitlists.hypothesisId, hypothesisId),
        eq(hypotheses.organizationId, organizationId),
        isNull(waitlists.deletedAt),
        isNull(hypotheses.deletedAt),
      ),
    )
    .orderBy(sql`"waitlist_entries"."created_at" desc`)
    .limit(limit)
  return rows
}
