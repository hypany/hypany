import { api } from '@/app/api'
import { notFound } from 'next/navigation'
import DomainForm from './ui'

export default async function DomainsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await api.v1['landing-pages']
    .hypothesis({ hypothesisId: id })
    .get()
  const data = res.data
  if (!data || !data.landingPage) notFound()

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
        initialSlug={data.landingPage.slug}
        initialCustomDomain={data.landingPage.customDomain}
      />
    </section>
  )
}
