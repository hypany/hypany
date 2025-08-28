import { and, eq, isNull, sql } from 'drizzle-orm'
import { db } from '@/database'
import { hypotheses, landingPages, waitlistEntries, waitlists } from '@/schema'

export async function getLandingPageIdForUser(
  userId: string,
  hypothesisId: string,
) {
  const [lp] = await db
    .select({ customDomain: landingPages.customDomain, id: landingPages.id })
    .from(landingPages)
    .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(hypotheses.id, hypothesisId),
        eq(hypotheses.userId, userId),
        isNull(landingPages.deletedAt),
      ),
    )
    .limit(1)
  return lp || null
}

export async function getWaitlistIdForUser(
  userId: string,
  hypothesisId: string,
) {
  const [wl] = await db
    .select({ id: waitlists.id })
    .from(waitlists)
    .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
    .where(and(eq(hypotheses.id, hypothesisId), eq(hypotheses.userId, userId)))
    .limit(1)
  return wl || null
}

export async function computeWaitlistPositionByCreatedAt(
  waitlistId: string,
  createdAt: Date,
) {
  const [pos] = await db
    .select({ position: sql<number>`COUNT(*)::int` })
    .from(waitlistEntries)
    .where(
      and(
        eq(waitlistEntries.waitlistId, waitlistId),
        isNull(waitlistEntries.deletedAt),
        sql`${waitlistEntries.createdAt} <= ${createdAt}`,
      ),
    )
  return Number(pos?.position || 1)
}
