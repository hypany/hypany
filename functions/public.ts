import 'server-only'
import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, landingPageBlocks, landingPages } from '@/schema'

/**
 * Get public landing page data by slug
 */
export async function getPublicPageBySlug(slug: string) {
  // Find the hypothesis by slug
  const [hypothesis] = await db
    .select()
    .from(hypotheses)
    .where(
      and(
        eq(hypotheses.slug, slug),
        eq(hypotheses.status, 'published'),
        isNull(hypotheses.deletedAt),
      ),
    )
    .limit(1)

  if (!hypothesis) {
    return null
  }

  // Get the landing page
  const [landingPage] = await db
    .select()
    .from(landingPages)
    .where(
      and(
        eq(landingPages.hypothesisId, hypothesis.id),
        isNull(landingPages.deletedAt),
      ),
    )
    .limit(1)

  if (!landingPage) {
    return null
  }

  // Get landing page blocks
  const blocks = await db
    .select()
    .from(landingPageBlocks)
    .where(eq(landingPageBlocks.landingPageId, landingPage.id))
    .orderBy(landingPageBlocks.order)

  return {
    blocks: blocks.map((block) => ({
      content: block.content,
      id: block.id,
      order: block.order,
      type: block.type,
    })),
    hypothesis: {
      description: hypothesis.description,
      id: hypothesis.id,
      name: hypothesis.name,
      slug: hypothesis.slug,
    },
    landingPage: {
      customCss: landingPage.customCss,
      // Schema-aligned fields
      builderDraftJson: (landingPage as { builderDraftJson?: string | null }).builderDraftJson ?? null,
      builderPublishedJson:
        (landingPage as { builderPublishedJson?: string | null }).builderPublishedJson ?? null,
      favicon: landingPage.favicon,
      hypothesisId: landingPage.hypothesisId,
      id: landingPage.id,
      metaDescription: landingPage.metaDescription,
      metaTitle: landingPage.metaTitle,
      name: landingPage.name,
      ogImage: landingPage.ogImage,
      publishedAt: landingPage.publishedAt,
      template: landingPage.template,
    },
  }
}
