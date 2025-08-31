import 'server-only'
import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, landingPages, waitlists } from '@/schema'

export type ResolvedEntity =
  | { type: 'hypothesis'; id: string; name: string }
  | {
      type: 'landing_page'
      id: string
      name: string | null
      hypothesisId: string
    }
  | { type: 'waitlist'; id: string; name: string; hypothesisId: string }

/**
 * Resolve an entity name by ULID within an organization scope.
 * Checks hypotheses, landing pages, and waitlists owned by the organization.
 */
export async function resolveEntityNameById(
  id: string,
  organizationId: string,
): Promise<ResolvedEntity | null> {
  // Hypothesis direct match
  const [hypo] = await db
    .select({ id: hypotheses.id, name: hypotheses.name })
    .from(hypotheses)
    .where(
      and(
        eq(hypotheses.id, id),
        eq(hypotheses.organizationId, organizationId),
        isNull(hypotheses.deletedAt),
      ),
    )
    .limit(1)
  if (hypo) return { id: hypo.id, name: hypo.name, type: 'hypothesis' }

  // Landing page by id (join to hypotheses for org check)
  const [lp] = await db
    .select({
      hypothesisId: landingPages.hypothesisId,
      id: landingPages.id,
      name: landingPages.name,
    })
    .from(landingPages)
    .where(eq(landingPages.id, id))
    .limit(1)
  if (lp) {
    const [lpHypo] = await db
      .select({ id: hypotheses.id })
      .from(hypotheses)
      .where(
        and(
          eq(hypotheses.id, lp.hypothesisId),
          eq(hypotheses.organizationId, organizationId),
          isNull(hypotheses.deletedAt),
        ),
      )
      .limit(1)
    if (lpHypo) {
      return {
        hypothesisId: lp.hypothesisId,
        id: lp.id,
        name: lp.name ?? null,
        type: 'landing_page',
      }
    }
  }

  // Waitlist by id (join to hypotheses for org check)
  const [wl] = await db
    .select({
      hypothesisId: waitlists.hypothesisId,
      id: waitlists.id,
      name: waitlists.name,
    })
    .from(waitlists)
    .where(eq(waitlists.id, id))
    .limit(1)
  if (wl) {
    const [wlHypo] = await db
      .select({ id: hypotheses.id })
      .from(hypotheses)
      .where(
        and(
          eq(hypotheses.id, wl.hypothesisId),
          eq(hypotheses.organizationId, organizationId),
          isNull(hypotheses.deletedAt),
        ),
      )
      .limit(1)
    if (wlHypo) {
      return {
        hypothesisId: wl.hypothesisId,
        id: wl.id,
        name: wl.name,
        type: 'waitlist',
      }
    }
  }

  return null
}
