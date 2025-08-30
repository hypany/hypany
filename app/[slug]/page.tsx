import { notFound } from 'next/navigation'
import { getServerApi } from '@/app/api/server'
import { Template1 } from '@/templates/template-1'
import type { LandingConfig } from '@/templates/types'

export default async function PublicBySlug({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const api = await getServerApi()
  const res = await api.v1.public['by-slug']({ slug }).get()
  const data = res.data
  if (!data || !('hypothesis' in data)) notFound()
  const ok = data as {
    blocks: Array<{ id: string; type: string; order: string; content: string }>
    hypothesis: { id: string; name: string; description: string | null }
    landingPage: {
      customCss: string | null
      favicon: string | null
      metaDescription: string | null
      metaTitle: string | null
      ogImage: string | null
      template: string
    }
  }

  // Convert blocks to config
  const config = blocksToConfig(
    ok.blocks.map((b) => ({
      content: b.content,
      id: b.id,
      order: b.order,
      type: b.type,
    })),
  )

  // Add metadata from landing page
  if (ok.landingPage.metaTitle || ok.landingPage.metaDescription) {
    config.meta = {
      ...config.meta,
      description: ok.landingPage.metaDescription || config.meta.description,
      ogImage: ok.landingPage.ogImage || config.meta.ogImage,
      title: ok.landingPage.metaTitle || config.meta.title,
    }
  }

  return (
    <Template1
      config={config}
      hypothesisId={ok.hypothesis.id}
      customCss={ok.landingPage.customCss}
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
