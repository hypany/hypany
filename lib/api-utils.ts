import { and, eq, isNull, lte } from 'drizzle-orm'
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
  // Use Drizzle query builder and compute count on server
  const rows = await db
    .select({ id: waitlistEntries.id })
    .from(waitlistEntries)
    .where(
      and(
        eq(waitlistEntries.waitlistId, waitlistId),
        isNull(waitlistEntries.deletedAt),
        lte(waitlistEntries.createdAt, createdAt),
      ),
    )

  const position = rows.length
  return position > 0 ? position : 1
}
