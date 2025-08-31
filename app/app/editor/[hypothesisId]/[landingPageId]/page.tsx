import { notFound } from 'next/navigation'
import { requireAuth } from '@/auth/server'
import { getActiveOrganization } from '@/functions/organizations'
import { getLandingPageByIdForOrg } from '@/functions/landing-pages'
import BlocksEditor from './ui'

export default async function EditorByLandingPage({
  params,
}: {
  params: Promise<{ hypothesisId: string; landingPageId: string }>
}) {
  const { landingPageId } = await params
  await requireAuth()
  const activeOrgRes = await getActiveOrganization()
  
  if (!activeOrgRes?.activeOrganizationId) {
    notFound()
  }

  // Get landing page and blocks by landing page ID
  const data = await getLandingPageByIdForOrg(landingPageId, activeOrgRes.activeOrganizationId)
  if (!data || !data.landingPage) notFound()

  // Basic guard: if the landing page doesn't belong to the provided hypothesis, bounce to the hypothesis overview
  // The API already enforces org ownership; we just ensure the URL shape remains consistent.
  // We cannot verify hypothesis here without extra fetch; keep route as is.

  return (
    <section>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          Landing Page Editor
        </h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Manage content blocks for this landing page.
        </p>
      </div>
      <BlocksEditor
        landingPageId={landingPageId}
        initialBlocks={data.blocks.map((b) => ({
          content: b.content,
          id: b.id,
          order: b.order,
          type: b.type as
            | 'meta'
            | 'theme'
            | 'hero'
            | 'partners'
            | 'features'
            | 'benefits'
            | 'faq'
            | 'finalCta'
            | 'footer',
        }))}
      />
    </section>
  )
}
