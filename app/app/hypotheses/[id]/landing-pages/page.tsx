import { requireAuth } from '@/auth/server'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import {
  getHypothesisById,
  getLandingPagesForHypothesis,
} from '@/functions/hypotheses'
import { getActiveOrganization } from '@/functions/organizations'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  EmptyStateIllustration,
  LandingPageCard,
} from './ui'

export default async function LandingPagesGallery({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await requireAuth()
  const activeOrgRes = await getActiveOrganization()
  const t = await getTranslations('app')

  if (!activeOrgRes?.activeOrganizationId) {
    notFound()
  }

  const [hypothesis, pages] = await Promise.all([
    getHypothesisById(id, activeOrgRes.activeOrganizationId),
    getLandingPagesForHypothesis(id, activeOrgRes.activeOrganizationId),
  ])

  if (!hypothesis) notFound()

  const hyp = {
    customDomain: hypothesis.customDomain ?? null,
    id: hypothesis.id,
    name: hypothesis.name,
    slug: hypothesis.slug ?? null,
    activeLandingPageId: hypothesis.activeLandingPageId ?? null,
  }

  return (
    <section className='m-6'>

      {pages.length === 0 ? (
        /* Enhanced Empty State */
        <Card className='p-0 overflow-hidden border-dashed border-2'>
          <div className='px-8 py-16 text-center'>
            <div className='mx-auto mb-6'>
              <EmptyStateIllustration />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
              No landing pages yet
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto'>
              {t('pages.hypotheses.detail.landing-pages.empty-hint')}
            </p>
            <div className='flex items-center justify-center gap-4'>
              <Button variant='secondary' asChild>
                <Link href='/docs/landing-pages'>
                  Learn more
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        /* Modern Card Grid Layout */
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {pages.map((p) => (
            <LandingPageCard
              key={p.id}
              page={p}
              hypothesis={hyp}
              hypothesisId={id}
            />
          ))}
        </div>
      )}
    </section>
  )
}
