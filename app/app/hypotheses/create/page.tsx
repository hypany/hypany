import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAuth } from '@/auth/server'
import { CreateHypothesisForm } from '@/components/molecules/hypotheses/create-hypothesis-form'

export const metadata: Metadata = {
  title: 'Create Hypothesis - Hypany',
  description: 'Add a new hypothesis with an initial waitlist and landing page.',
}

export default async function CreateHypothesisPage() {
  await requireAuth()

  return (
    <main className='px-6 py-8'>
      <div className='mx-auto w-full max-w-2xl space-y-6'>
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
            Create a new hypothesis
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            We’ll set up a draft landing page and a waitlist automatically.
          </p>
        </div>

        <CreateHypothesisForm />

        <div className='pt-1'>
          <Link
            href='/app/hypotheses'
            className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'
          >
            Back to hypotheses
          </Link>
        </div>
      </div>
    </main>
  )
}

