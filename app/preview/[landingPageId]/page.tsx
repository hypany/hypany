import { notFound } from 'next/navigation'
import { DocumentRenderer } from '@/components/public-landing/document-renderer'
import { PublicLandingRenderer } from '@/components/public-landing/renderer'
import { parseDocument } from '@/lib/page-document'
import { getLandingPageDocument } from '@/functions/landing-page-docs'
import { getLandingPageBlocksById } from '@/functions/public'

export const dynamic = 'force-dynamic'

export default async function PreviewById({
  params,
}: {
  params: Promise<{ landingPageId: string }>
}) {
  const { landingPageId } = await params

  const { landingPage } = await getLandingPageDocument(landingPageId)
  if (!landingPage) notFound()

  const draftDoc = parseDocument(landingPage.builderDraftJson ?? null)
  if (draftDoc) {
    return <DocumentRenderer doc={draftDoc} customCss={landingPage.customCss ?? null} />
  }

  // Fallback to legacy blocks if no draft exists
  const blocks = await getLandingPageBlocksById(landingPageId)
  return <PublicLandingRenderer blocks={blocks} customCss={landingPage.customCss ?? null} />
}

