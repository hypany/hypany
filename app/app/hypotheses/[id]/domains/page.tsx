import { requireAuth } from '@/auth/server'
import { Card } from '@/components/atoms/card'
import { getHypothesisById } from '@/functions/hypotheses'
import { getActiveOrganization } from '@/functions/organizations'
import { notFound } from 'next/navigation'
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
      <Card className='p-0 overflow-hidden'>
        <div className='px-4 py-4'>
          <h2 className='text-base font-semibold text-gray-900 dark:text-gray-50'>
            Subdomain & Custom Domain
          </h2>
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            Configure the hypany.app subdomain or connect a custom domain.
          </p>
        </div>
        <div className='border-t border-gray-200 p-4 dark:border-gray-800'>
          <DomainForm
            hypothesisId={id}
            initialSlug={hypothesis.slug}
            initialCustomDomain={hypothesis.customDomain}
          />
        </div>
      </Card>
    </section>
  )
}
