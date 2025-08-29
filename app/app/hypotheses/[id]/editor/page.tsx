import { notFound } from 'next/navigation'
import { api } from '@/app/api'
import BlocksEditor from './ui'

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await api.v1['landing-pages'].hypothesis({ hypothesisId: id }).get()
  const data = res.data
  if (!data || !data.landingPage) notFound()

  return (
    <section className='px-4 py-6 sm:px-6'>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          Landing Page Editor
        </h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Manage content blocks for this hypothesis.
        </p>
      </div>
      <BlocksEditor
        hypothesisId={id}
        initialBlocks={data.blocks.map((b) => ({
          id: b.id,
          content: b.content,
          order: b.order,
          type: b.type as 'hero' | 'features' | 'cta' | 'faq' | 'pricing' | 'footer',
        }))}
      />
    </section>
  )
}
