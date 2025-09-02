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
  params: Promise<{ landingPageId: string }>
}) {
  const { landingPageId } = await params

  const { landingPage } = await getLandingPageDocument(landingPageId)
  if (!landingPage) notFound()

  const publishedDoc = parseDocument(landingPage.builderPublishedJson ?? null)
  if (publishedDoc) {
    return <DocumentRenderer doc={publishedDoc} customCss={landingPage.customCss ?? null} />
  }

  // Fallback to legacy blocks if nothing published yet
  const blocks = await getLandingPageBlocksById(landingPageId)
  return <PublicLandingRenderer blocks={blocks} customCss={landingPage.customCss ?? null} />
}

