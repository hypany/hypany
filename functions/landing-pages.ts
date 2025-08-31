import 'server-only'
import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, landingPageBlocks, landingPages } from '@/schema'

export async function getLandingPageByIdForOrg(
  landingPageId: string,
  organizationId: string,
) {
  const [lp] = await db
    .select({
      customDomain: hypotheses.customDomain,
      id: landingPages.id,
      slug: hypotheses.slug,
      template: landingPages.template,
    })
    .from(landingPages)
    .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(landingPages.id, landingPageId),
        eq(hypotheses.organizationId, organizationId),
        isNull(landingPages.deletedAt),
      ),
    )
    .limit(1)

  if (!lp) return null

  const blocks = await db
    .select({ id: landingPageBlocks.id, type: landingPageBlocks.type, content: landingPageBlocks.content, order: landingPageBlocks.order })
    .from(landingPageBlocks)
    .where(
      and(
        eq(landingPageBlocks.landingPageId, landingPageId),
        isNull(landingPageBlocks.deletedAt),
      ),
    )
    .orderBy(landingPageBlocks.order)

  return { landingPage: lp, blocks }
}

export async function getLandingPageIdForOrg(
  hypothesisId: string,
  organizationId: string,
) {
  const [lp] = await db
    .select({ id: landingPages.id })
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

