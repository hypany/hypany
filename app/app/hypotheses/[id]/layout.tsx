import { requireAuth } from '@/auth/server'
import { getHypothesisById } from '@/functions/hypotheses'
import { getActiveOrganization } from '@/functions/organizations'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

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

  const hypothesis = await getHypothesisById(id, activeOrgRes.activeOrganizationId)
  if (!hypothesis) notFound()

  return (
    <div>
      <div className='p-4 border-b border-gray-200 dark:border-gray-800'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          {hypothesis.name}
        </h1>
        {hypothesis.description ? (
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {hypothesis.description}
          </p>
        ) : null}
      </div>

      {children}
    </div>
  )
}
