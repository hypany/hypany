import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { requireAuth } from '@/auth/server'
import { getHypothesisById } from '@/functions/hypotheses'
import { getActiveOrganization } from '@/functions/organizations'
import { HypothesisEditButton } from './details/edit-button'

export default async function HypothesisLayout({
  children,
  params,
}: {
  params: Promise<{ id: string }>
  children: ReactNode
}) {
  const { id } = await params
  await requireAuth()
  const activeOrgRes = await getActiveOrganization()

  if (!activeOrgRes?.activeOrganizationId) {
    notFound()
  }

  const hypothesis = await getHypothesisById(
    id,
    activeOrgRes.activeOrganizationId,
  )
  if (!hypothesis) notFound()

  return (
    <div>
      <div className='p-4 border-b border-gray-200 dark:border-gray-800'>
        <div className='flex justify-between gap-4 items-stretch'>
          <div className='flex flex-col justify-center'>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
              {hypothesis.name}
            </h1>
            {hypothesis.description ? (
              <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                {hypothesis.description}
              </p>
            ) : null}
          </div>
          <div className='flex items-center self-center'>
            <HypothesisEditButton
              hypothesisId={hypothesis.id}
              initialName={hypothesis.name}
              initialDescription={hypothesis.description ?? null}
            />
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
