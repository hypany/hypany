import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/auth/server'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import {
  getHypothesisById,
  getLandingPagesForHypothesis,
} from '@/functions/hypotheses'
import { getActiveOrganization } from '@/functions/organizations'
import {
  CreateLandingPageButton,
  DuplicateLandingPageButton,
  RenameLandingPageInline,
  SetActiveLandingPageButton,
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
    <section>
      <Card className='p-0 overflow-hidden'>
        <div className='flex items-center justify-between px-4 py-4'>
          <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
            {t('pages.hypotheses.detail.headings.landing-pages')}
          </h2>
          <CreateLandingPageButton hypothesisId={id} />
        </div>
      </Card>

      {pages.length === 0 ? (
        <Card className='mt-4 p-0 overflow-hidden'>
          <div className='px-4 py-6 text-sm text-gray-600 dark:text-gray-400'>
            {t('pages.hypotheses.detail.landing-pages.empty-hint')}
          </div>
        </Card>
      ) : (
        <Card className='mt-4 p-0 overflow-hidden'>
          <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    {t(
                      'pages.hypotheses.detail.landing-pages.table.columns.name',
                    )}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {t(
                      'pages.hypotheses.detail.landing-pages.table.columns.template',
                    )}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {t(
                      'pages.hypotheses.detail.landing-pages.table.columns.published',
                    )}
                  </TableHeaderCell>
                  <TableHeaderCell className='text-right'>
                    {t(
                      'pages.hypotheses.detail.landing-pages.table.columns.actions',
                    )}
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pages.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className='font-medium'>
                      <div className='max-w-xs'>
                        <RenameLandingPageInline
                          landingPageId={p.id}
                          initialName={p.name || null}
                        />
                        {hyp.activeLandingPageId === p.id ? (
                          <div className='mt-1 text-[10px] uppercase tracking-wide text-emerald-600 dark:text-emerald-500'>
                            Active
                          </div>
                        ) : null}
                        {(hyp.customDomain || hyp.slug) && (
                          <div className='mt-1 text-xs text-gray-500'>
                            {hyp.customDomain ||
                              (hyp.slug ? `${hyp.slug}.hypany.app` : '')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{p.template}</TableCell>
                    <TableCell>
                      {p.publishedAt
                        ? t('common.boolean.yes')
                        : t('common.boolean.no')}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button asChild variant='secondary'>
                          <Link href={`/app/editor/${id}/${p.id}`}>
                            {t(
                              'pages.hypotheses.detail.landing-pages.actions.open-editor',
                            )}
                          </Link>
                        </Button>
                        <DuplicateLandingPageButton
                          hypothesisId={id}
                          landingPageId={p.id}
                        />
                        {hyp.slug && (
                          <Button asChild variant='secondary'>
                            <Link href={hyp.customDomain ? `https://${hyp.customDomain}` : `https://${hyp.slug}.hypany.app`} target='_blank' rel='noopener noreferrer'>
                              {t(
                                'pages.hypotheses.detail.landing-pages.actions.view',
                              )}
                            </Link>
                          </Button>
                        )}
                        {hyp.activeLandingPageId !== p.id && (
                          // client button to set active
                          <SetActiveLandingPageButton hypothesisId={id} landingPageId={p.id} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableRoot>
        </Card>
      )}
    </section>
  )
}
