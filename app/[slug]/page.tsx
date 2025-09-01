import { notFound } from 'next/navigation'
import { getPublicPageBySlug } from '@/functions/public'
import { PublicLandingRenderer } from '@/components/public-landing/renderer'
import { DocumentRenderer } from '@/components/public-landing/document-renderer'
import { parseDocument } from '@/lib/page-document'

export default async function PublicBySlug({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const data = await getPublicPageBySlug(slug)
  if (!data) notFound()

  const { landingPage, blocks } = data
  const doc = parseDocument(landingPage.builderPublishedJson)

  if (doc) {
    return <DocumentRenderer doc={doc} customCss={landingPage.customCss} />
  }

  return <PublicLandingRenderer blocks={blocks} customCss={landingPage.customCss} />
}
