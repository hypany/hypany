import { notFound } from 'next/navigation'
import { DocumentRenderer } from '@/components/public-landing/document-renderer'
import { PublicLandingRenderer } from '@/components/public-landing/renderer'
import { parseDocument } from '@/lib/page-document'
import { getLandingPageDocument } from '@/functions/landing-page-docs'
import { getLandingPageBlocksById } from '@/functions/public'

export const dynamic = 'force-dynamic'

export default async function PublishedById({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { landingPage } = await getLandingPageDocument(id)
  if (!landingPage) notFound()

  const publishedDoc = parseDocument((landingPage as any).builderPublishedJson ?? null)

  if (publishedDoc) {
    return <DocumentRenderer doc={publishedDoc} customCss={landingPage.customCss} />
  }

  // Fallback to legacy blocks if no published doc exists
  const blocks = await getLandingPageBlocksById(id)
  return <PublicLandingRenderer blocks={blocks} customCss={landingPage.customCss} />
}

