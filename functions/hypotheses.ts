import 'server-only'
import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses } from '@/schema'

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

