import { notFound, redirect } from 'next/navigation'
import { api } from '@/app/api'
import BlocksEditor from './ui'

export default async function EditorByLandingPage({
  params,
}: {
  params: Promise<{ hypothesisId: string; landingPageId: string }>
}) {
  const { hypothesisId, landingPageId } = await params

  // Get landing page and blocks by landing page ID
  const res = await api.v1['landing-pages']['by-id']({ landingPageId }).get()
  const data = res.data
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
        hypothesisId={hypothesisId}
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

