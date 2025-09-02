import 'server-only'
import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, landingPages } from '@/schema'

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
      customDomain: hypotheses.customDomain,
      id: hypotheses.id,
      name: hypotheses.name,
      slug: hypotheses.slug,
      // activeLandingPageId may not exist in all schemas; cast when present
      activeLandingPageId: (hypotheses as any).activeLandingPageId as unknown as string | null,
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
