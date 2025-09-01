import 'server-only'
import { and, desc, eq, isNull, sql } from 'drizzle-orm'
import { db } from '@/drizzle'
import {
  hypotheses,
  landingPages,
  landingPageVersions,
  type LandingPage,
  type LandingPageVersion,
} from '@/schema'
import type { PageDocument } from '@/lib/page-document'

export async function getLandingPageDocument(
  landingPageId: string,
  organizationId?: string,
): Promise<{
  landingPage: Pick<
    LandingPage,
    | 'id'
    | 'hypothesisId'
    | 'name'
    | 'customCss'
    | 'builderDraftJson'
    | 'builderPublishedJson'
    | 'publishedAt'
  > | null
}> {
  const rows = await db
    .select({
      id: landingPages.id,
      hypothesisId: landingPages.hypothesisId,
      name: landingPages.name,
      customCss: landingPages.customCss,
      builderDraftJson: landingPages.builderDraftJson,
      builderPublishedJson: landingPages.builderPublishedJson,
      publishedAt: landingPages.publishedAt,
    })
    .from(landingPages)
    .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(landingPages.id, landingPageId),
        isNull(landingPages.deletedAt),
        organizationId ? eq(hypotheses.organizationId, organizationId) : sql`true`,
      ),
    )
    .limit(1)

  return { landingPage: rows[0] || null }
}

export async function saveLandingPageDraft(
  landingPageId: string,
  doc: PageDocument,
): Promise<void> {
  await db
    .update(landingPages)
    .set({ builderDraftJson: JSON.stringify(doc), updatedAt: new Date() })
    .where(eq(landingPages.id, landingPageId))
}

export async function publishLandingPage(
  landingPageId: string,
): Promise<void> {
  const [lp] = await db
    .select({ draft: landingPages.builderDraftJson })
    .from(landingPages)
    .where(eq(landingPages.id, landingPageId))
    .limit(1)
  if (!lp || !lp.draft) return
  await db
    .update(landingPages)
    .set({
      builderPublishedJson: lp.draft,
      publishedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(landingPages.id, landingPageId))
}

export async function createVersion(
  landingPageId: string,
  snapshotJson: string,
  authorId?: string,
  message?: string,
): Promise<LandingPageVersion['id']> {
  // Compute next version
  const [{ maxVersion }] = await db
    .select({ maxVersion: sql<number>`coalesce(max(${landingPageVersions.version}), 0)` })
    .from(landingPageVersions)
    .where(eq(landingPageVersions.landingPageId, landingPageId))

  const v = (maxVersion || 0) + 1
  const id = crypto.randomUUID()
  await db.insert(landingPageVersions).values({
    id,
    landingPageId,
    version: v,
    snapshotJson,
    message: message || null,
    authorId: authorId || null,
    createdAt: new Date(),
  })
  return id
}

export async function listVersions(landingPageId: string) {
  return db
    .select({
      id: landingPageVersions.id,
      version: landingPageVersions.version,
      message: landingPageVersions.message,
      createdAt: landingPageVersions.createdAt,
    })
    .from(landingPageVersions)
    .where(eq(landingPageVersions.landingPageId, landingPageId))
    .orderBy(desc(landingPageVersions.createdAt))
}

export async function restoreVersion(
  landingPageId: string,
  version: number,
): Promise<void> {
  const [row] = await db
    .select({ snapshotJson: landingPageVersions.snapshotJson })
    .from(landingPageVersions)
    .where(
      and(
        eq(landingPageVersions.landingPageId, landingPageId),
        eq(landingPageVersions.version, version),
      ),
    )
    .limit(1)
  if (!row) return
  await db
    .update(landingPages)
    .set({ builderDraftJson: row.snapshotJson, updatedAt: new Date() })
    .where(eq(landingPages.id, landingPageId))
}

