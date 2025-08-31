import { and, eq, isNull, lte } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, landingPages, waitlistEntries, waitlists } from '@/schema'

export async function getLandingPageIdForOrg(
  organizationId: string,
  hypothesisId: string,
) {
  const [lp] = await db
    .select({ customDomain: hypotheses.customDomain, id: landingPages.id })
    .from(landingPages)
    .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(hypotheses.id, hypothesisId),
        eq(hypotheses.organizationId, organizationId),
        isNull(landingPages.deletedAt),
      ),
    )
    .limit(1)
  return lp || null
}

export async function getWaitlistIdForOrg(
  organizationId: string,
  hypothesisId: string,
) {
  const [wl] = await db
    .select({ id: waitlists.id })
    .from(waitlists)
    .innerJoin(hypotheses, eq(waitlists.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(hypotheses.id, hypothesisId),
        eq(hypotheses.organizationId, organizationId),
      ),
    )
    .limit(1)
  return wl || null
}

export async function computeWaitlistPositionByCreatedAt(
  waitlistId: string,
  createdAt: Date,
) {
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

