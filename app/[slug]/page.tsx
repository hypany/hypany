import { and, desc, eq, isNull } from 'drizzle-orm'
import { cookies, headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { db } from '@/drizzle'
import { BOT_UA_REGEX } from '@/lib/constants'
import { logger } from '@/lib/logger'
import { normalizeReferrerHost } from '@/lib/referrer'
import { hypotheses, landingPageBlocks, landingPages, pageVisits } from '@/schema'
import { Template1 } from '@/templates/template-1'
import type { LandingConfig } from '@/templates/types'

export default async function PublicBySlug({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Resolve hypothesis by slug
  const [hypothesis] = await db
    .select()
    .from(hypotheses)
    .where(and(eq(hypotheses.slug, slug), isNull(hypotheses.deletedAt)))
    .limit(1)

  if (!hypothesis || hypothesis.status !== 'published') {
    notFound()
  }

  // Pick one landing page for this hypothesis
  const [lp] = await db
    .select()
    .from(landingPages)
    .where(and(eq(landingPages.hypothesisId, hypothesis.id), isNull(landingPages.deletedAt)))
    .orderBy(desc(landingPages.publishedAt), desc(landingPages.updatedAt))
    .limit(1)
  if (!lp) notFound()

  // Get landing page blocks
  const blocks = await db
    .select()
    .from(landingPageBlocks)
    .where(
      and(
        eq(landingPageBlocks.landingPageId, lp.id),
        isNull(landingPageBlocks.deletedAt),
      ),
    )
    .orderBy(landingPageBlocks.order)

  // Convert blocks to config
  const config = blocksToConfig(blocks)

  // Add metadata from landing page
  if (lp.metaTitle || lp.metaDescription) {
    config.meta = {
      ...config.meta,
      description: lp.metaDescription || config.meta.description,
      ogImage: lp.ogImage || config.meta.ogImage,
      title: lp.metaTitle || config.meta.title,
    }
  }

  // Track page view (simple server-side logging)
  try {
    const h = await headers()
    const referrerRaw = h.get('referer') || null
    const userAgent = h.get('user-agent') || null

    // Skip bot traffic
    if (userAgent && BOT_UA_REGEX.test(userAgent)) {
      // Do not log bot page views
      return (
        <Template1
          config={config}
          hypothesisId={hypothesis.id}
          customCss={lp.customCss}
        />
      )
    }

    const referrer = normalizeReferrerHost(referrerRaw)
    const visitorId = (await cookies()).get('hp_vid')?.value || null

    await db.insert(pageVisits).values({
      createdAt: new Date(),
      hypothesisId: hypothesis.id,
      landingPageId: lp.id,
      path: `/p/${slug}`,
      referrer,
      userAgent,
      visitorId,
    })
  } catch (err) {
    logger.error('Failed to log page visit', { error: String(err) })
  }

  return (
    <Template1
      config={config}
      hypothesisId={hypothesis.id}
      customCss={lp.customCss}
    />
  )
}

function blocksToConfig(
  blocks: Array<{
    id: string
    type: string
    content: string
    order: string
  }>,
): LandingConfig {
  const config: Partial<LandingConfig> = {}

  blocks.forEach((block) => {
    try {
      const content = JSON.parse(block.content)
      switch (block.type) {
        case 'meta':
          config.meta = content
          break
        case 'theme':
          config.theme = content
          break
        case 'hero':
          config.hero = content
          break
        case 'finalCta':
          config.finalCta = content
          break
        case 'partners':
          config.partners = content
          break
        case 'features':
          config.features = content
          break
        case 'benefits':
          config.benefits = content
          break

        case 'faq':
          config.faq = content
          break
        case 'footer':
          config.footer = content
          break
      }
    } catch (e) {
      console.error(`Failed to parse block ${block.id}:`, e)
    }
  })

  // Ensure required fields
  if (!config.meta) {
    config.meta = {
      description: 'Welcome to our landing page',
      title: 'Landing Page',
    }
  }
  if (!config.hero) {
    config.hero = {
      headline: 'Welcome',
      subhead: 'Get started today',
    }
  }

  return config as LandingConfig
}
