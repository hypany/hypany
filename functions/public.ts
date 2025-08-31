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
      slug: landingPage.slug,
      customDomain: landingPage.customDomain,
      primaryColor: landingPage.primaryColor,
      secondaryColor: landingPage.secondaryColor,
      fontFamily: landingPage.fontFamily,
      logoUrl: landingPage.logoUrl,
      faviconUrl: landingPage.faviconUrl,
      socialImageUrl: landingPage.socialImageUrl,
      headline: landingPage.headline,
      subheadline: landingPage.subheadline,
      ctaText: landingPage.ctaText,
      footerText: landingPage.footerText,
      customCss: landingPage.customCss,
      customJs: landingPage.customJs,
      metaTitle: landingPage.metaTitle,
      metaDescription: landingPage.metaDescription,
      ogTitle: landingPage.ogTitle,
      ogDescription: landingPage.ogDescription,
      showSocialProof: landingPage.showSocialProof,
      socialProofText: landingPage.socialProofText,
      thankYouMessage: landingPage.thankYouMessage,
      waitlistMessage: landingPage.waitlistMessage,
      privacyPolicyUrl: landingPage.privacyPolicyUrl,
      termsUrl: landingPage.termsUrl,
      analyticsId: landingPage.analyticsId,
    },
    blocks: blocks.map(block => ({
      id: block.id,
      type: block.type,
      content: block.content,
      order: block.order,
      settings: block.settings,
    })),
  }
}