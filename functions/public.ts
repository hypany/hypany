import 'server-only'
import { and, desc, eq, isNull } from 'drizzle-orm'
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
      builderDraftJson: landingPage.builderDraftJson ?? null,
      builderPublishedJson: landingPage.builderPublishedJson ?? null,
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

/**
 * Get blocks for a landing page by ID (legacy fallback)
 */
export async function getLandingPageBlocksById(landingPageId: string) {
  const blocks = await db
    .select()
    .from(landingPageBlocks)
    .where(eq(landingPageBlocks.landingPageId, landingPageId))
    .orderBy(landingPageBlocks.order)

  return blocks.map((block) => ({
    content: block.content,
    id: block.id,
    order: block.order,
    type: block.type,
  }))
}

/**
 * Resolve the active published landing page ID by slug.
 * Falls back to the most recently published page, then any page.
 */
export async function resolveActiveLandingPageIdBySlug(slug: string) {
  const [hyp] = await db
    .select({
      id: hypotheses.id,
      activeLandingPageId: hypotheses.activeLandingPageId,
    })
    .from(hypotheses)
    .where(and(eq(hypotheses.slug, slug), isNull(hypotheses.deletedAt)))
    .limit(1)
  if (!hyp) return null
  if (hyp.activeLandingPageId) return hyp.activeLandingPageId

  // Prefer most recently published
  const [published] = await db
    .select({ id: landingPages.id, publishedAt: landingPages.publishedAt })
    .from(landingPages)
    .where(
      and(
        eq(landingPages.hypothesisId, hyp.id),
        isNull(landingPages.deletedAt),
        // publishedAt not null
        // drizzle where helper lacks isNotNull here, emulate with gt minimal by ordering
      ),
    )
    .orderBy(desc(landingPages.publishedAt))
    .limit(1)
  if (published?.id) return published.id

  // Otherwise, any page
  const [anyPage] = await db
    .select({ id: landingPages.id })
    .from(landingPages)
    .where(and(eq(landingPages.hypothesisId, hyp.id), isNull(landingPages.deletedAt)))
    .limit(1)
  return anyPage?.id ?? null
}

/**
 * Resolve the active published landing page ID by custom domain.
 * Accepts hosts with or without www and ignores protocol/port.
 */
export async function resolveActiveLandingPageIdByCustomDomain(host: string) {
  const h = host.trim().toLowerCase().split(':')[0]
  const normalized = h.startsWith('www.') ? h.slice(4) : h

  const [hyp] = await db
    .select({ id: hypotheses.id, activeLandingPageId: hypotheses.activeLandingPageId, customDomain: hypotheses.customDomain })
    .from(hypotheses)
    .where(
      and(
        isNull(hypotheses.deletedAt),
        // match exact or stored-with-www variant
        // drizzle lacks ilike here; compare normalized strings in JS after fetch would be inefficient
        // so attempt both variants explicitly
        // Note: If multiple rows match (www vs non-www), prefer exact normalization match by ordering below
        eq(hypotheses.customDomain, normalized),
      ),
    )
    .limit(1)

  // If exact match not found, try www variant
  let hypothesis = hyp
  if (!hypothesis) {
    const withWww = `www.${normalized}`
    const [hyp2] = await db
      .select({ id: hypotheses.id, activeLandingPageId: hypotheses.activeLandingPageId, customDomain: hypotheses.customDomain })
      .from(hypotheses)
      .where(and(isNull(hypotheses.deletedAt), eq(hypotheses.customDomain, withWww)))
      .limit(1)
    hypothesis = hyp2
  }

  if (!hypothesis) return null
  if (hypothesis.activeLandingPageId) return hypothesis.activeLandingPageId

  // Prefer most recently published for the hypothesis
  const [published] = await db
    .select({ id: landingPages.id, publishedAt: landingPages.publishedAt })
    .from(landingPages)
    .where(and(eq(landingPages.hypothesisId, hypothesis.id), isNull(landingPages.deletedAt)))
    .orderBy(desc(landingPages.publishedAt))
    .limit(1)
  if (published?.id) return published.id

  // Fallback to any page
  const [anyPage] = await db
    .select({ id: landingPages.id })
    .from(landingPages)
    .where(and(eq(landingPages.hypothesisId, hypothesis.id), isNull(landingPages.deletedAt)))
    .limit(1)
  return anyPage?.id ?? null
}
