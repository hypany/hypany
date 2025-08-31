import 'server-only'
import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@/drizzle'
import { hypotheses, landingPages, landingPageBlocks } from '@/schema'

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
    hypothesis: {
      id: hypothesis.id,
      name: hypothesis.name,
      description: hypothesis.description,
      slug: hypothesis.slug,
    },
    landingPage: {
      id: landingPage.id,
      hypothesisId: landingPage.hypothesisId,
      customCss: landingPage.customCss,
      metaTitle: landingPage.metaTitle,
      metaDescription: landingPage.metaDescription,
      // Schema-aligned fields
      favicon: landingPage.favicon,
      ogImage: landingPage.ogImage,
      name: landingPage.name,
      template: landingPage.template,
      publishedAt: landingPage.publishedAt,
    },
    blocks: blocks.map(block => ({
      id: block.id,
      type: block.type,
      content: block.content,
      order: block.order,
    })),
  }
}
