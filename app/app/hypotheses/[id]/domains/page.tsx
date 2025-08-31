import { notFound } from 'next/navigation'
import { requireAuth } from '@/auth/server'
import { getActiveOrganization } from '@/functions/organizations'
import { getHypothesisById } from '@/functions/hypotheses'
import DomainForm from './ui'

export default async function DomainsPage({
  params,
}: {
  params: Promise<{ id: string }>
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
    <section>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          Subdomain & Custom Domain
        </h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Configure the hypany.app subdomain or connect a custom domain.
        </p>
      </div>
      <DomainForm
        hypothesisId={id}
        initialSlug={hypothesis.slug}
        initialCustomDomain={hypothesis.customDomain}
      />
    </section>
  )
}
