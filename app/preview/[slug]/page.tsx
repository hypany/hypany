import { notFound } from 'next/navigation'
import { getPublicPageBySlug } from '@/functions/public'
import { DocumentRenderer } from '@/components/public-landing/document-renderer'
import { PublicLandingRenderer } from '@/components/public-landing/renderer'
import { parseDocument } from '@/lib/page-document'

export const dynamic = 'force-dynamic'

export default async function PreviewBySlug({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getPublicPageBySlug(slug)
  if (!data) notFound()

  const { landingPage, blocks } = data
  const draftDoc = parseDocument((landingPage as any).builderDraftJson ?? null)

  if (draftDoc) {
    return <DocumentRenderer doc={draftDoc} customCss={landingPage.customCss} />
  }

  // Fallback to legacy blocks if no draft exists
  return <PublicLandingRenderer blocks={blocks} customCss={landingPage.customCss} />
}
