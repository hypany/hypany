import { notFound } from 'next/navigation'
import { requireAuth } from '@/auth/server'
import { getLandingPageByIdForOrg } from '@/functions/landing-pages'
import { getActiveOrganization } from '@/functions/organizations'
import { getLandingPageDocument } from '@/functions/landing-page-docs'
import { parseDocument } from '@/lib/page-document'
import EditorApp from './editor-app'
import { serviceUrl } from '@/lib/url'

export default async function EditorByLandingPage({
  params,
}: {
  params: Promise<{ hypothesisId: string; landingPageId: string }>
}) {
  const { landingPageId, hypothesisId } = await params
  await requireAuth()
  const activeOrgRes = await getActiveOrganization()

  if (!activeOrgRes?.activeOrganizationId) {
    notFound()
  }

  // Get builder draft document and legacy blocks
  const [docRes, legacy] = await Promise.all([
    getLandingPageDocument(landingPageId, activeOrgRes.activeOrganizationId),
    getLandingPageByIdForOrg(landingPageId, activeOrgRes.activeOrganizationId),
  ])
  if (!legacy || !legacy.landingPage || !docRes.landingPage) notFound()
  const initialDoc = parseDocument(docRes.landingPage.builderDraftJson)

  // Basic guard: if the landing page doesn't belong to the provided hypothesis, bounce to the hypothesis overview
  // The API already enforces org ownership; we just ensure the URL shape remains consistent.
  // We cannot verify hypothesis here without extra fetch; keep route as is.

  // Compute preview URL (custom domain or slug)
  const cd = legacy.landingPage.customDomain
  const slug = legacy.landingPage.slug
  const previewUrl = cd ? `https://${cd}` : slug ? `${serviceUrl}/${slug}` : null

  return (
    <EditorApp
      landingPageId={landingPageId}
      hypothesisId={hypothesisId}
      initialDoc={initialDoc}
      previewUrl={previewUrl}
    />
  )
}
