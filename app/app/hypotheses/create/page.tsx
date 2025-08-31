import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/auth/server'
import { CreateHypothesisForm } from '@/components/molecules/hypotheses/create-hypothesis-form'

export const metadata: Metadata = {
  description:
    'Add a new hypothesis with an initial waitlist and landing page.',
  title: 'Create Hypothesis - Hypany',
}

export default async function CreateHypothesisPage() {
  await requireAuth()
  const t = await getTranslations('app.pages.hypotheses.create')

  return (
    <main className='px-6 py-8'>
      <div className='mx-auto w-full max-w-2xl space-y-6'>
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
            {t('title')}
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {t('subtitle')}
          </p>
        </div>

        <CreateHypothesisForm />

        <div className='pt-1'>
          <Link
            href='/app/hypotheses'
            className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'
          >
            {t('back-link')}
          </Link>
        </div>
      </div>
    </main>
  )
}
