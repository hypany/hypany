import { requireAuth } from '@/auth/server'
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
import { getActivityFeed, getAnalyticsMetrics } from '@/functions/analytics'
import {
  getHypothesisById,
  getLandingPagesForHypothesis,
  getWaitlistByHypothesisId,
  getWaitlistEntries,
} from '@/functions/hypotheses'
import { getActiveOrganization } from '@/functions/organizations'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CumulativeAreaChart } from './analytics/cumulative-area'
// Domain edit dialog handled via header button
import { DomainEditButton } from './domains/edit-button'

export default async function HypothesisOverview({
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

  const [hypothesis, pages, waitlistData, orgActivity, metrics, waitlistEntries] = await Promise.all([
    getHypothesisById(id, activeOrgRes.activeOrganizationId),
    getLandingPagesForHypothesis(id, activeOrgRes.activeOrganizationId),
    getWaitlistByHypothesisId(id, activeOrgRes.activeOrganizationId),
    getActivityFeed(activeOrgRes.activeOrganizationId, { limit: 10, range: '30d' }),
    getAnalyticsMetrics(activeOrgRes.activeOrganizationId, { hypothesisId: id, range: '30d' }),
    getWaitlistEntries(id, activeOrgRes.activeOrganizationId, { limit: 10 }),
  ])

  if (!hypothesis) notFound()
  const t = await getTranslations('app')

  type ActivityItem = Awaited<ReturnType<typeof getActivityFeed>>['items'][number]
  const activities: ActivityItem[] = (orgActivity.items || []).filter(
    (a) => a.hypothesisId === id,
  )

  const stats = waitlistData?.stats
  const daily = metrics.daily

  // Remove grid row height coupling by using flex and min-w-0 for columns
  return (
    <section
      aria-label={t('pages.hypotheses.detail.aria')}
    >
      <div className="flex flex-col gap-4 p-4 lg:flex-row">
        {/* Left column: analytics, waitlist, landing pages */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Analytics */}
          <CumulativeAreaChart daily={daily} />

          {/* Waitlist */}
          <Card className='p-0 overflow-hidden'>
            <div className='flex items-center justify-between px-4 py-4'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.hypotheses.detail.headings.waitlist')}
              </h2>
              <div className='flex items-center gap-3'>
                {stats && (
                  <Link href={`/app/hypotheses/${id}/waitlist`} className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'>
                    {t('pages.hypotheses.detail.waitlist.summary', { total: stats.totalEntries, verified: stats.verifiedEntries })}
                  </Link>
                )}
              </div>
            </div>
            <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>{t('pages.hypotheses.detail.waitlist.table.columns.email')}</TableHeaderCell>
                    <TableHeaderCell>{t('pages.hypotheses.detail.waitlist.table.columns.verified')}</TableHeaderCell>
                    <TableHeaderCell>{t('pages.hypotheses.detail.waitlist.table.columns.source')}</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {waitlistEntries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className='text-center text-sm text-gray-500'>
                        {t('pages.hypotheses.detail.waitlist.empty')}
                      </TableCell>
                    </TableRow>
                  ) : (
                    waitlistEntries.map((e, idx) => (
                      <TableRow key={e.id ?? idx}>
                        <TableCell className='font-medium'>{e.email}</TableCell>
                        <TableCell>{e.emailVerified ? t('common.boolean.yes') : t('common.boolean.no')}</TableCell>
                        <TableCell>{e.source ?? t('common.direct')}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableRoot>
          </Card>

          {/* Landing Pages */}
          <Card className='p-0 overflow-hidden'>
            <div className='flex items-center justify-between px-4 py-4'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.hypotheses.detail.headings.landing-pages')}
              </h2>
              <div className='flex items-center gap-2'>
                <Link
                  href={`/app/hypotheses/${id}/landing-pages`}
                  className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'
                >
                  {t('pages.hypotheses.detail.landing-pages.manage')}
                </Link>
              </div>
            </div>
            {pages.length === 0 ? (
              <div className='px-4 py-6 text-sm text-gray-500'>
                {t('pages.hypotheses.detail.landing-pages.empty')}
              </div>
            ) : (
              <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>{t('pages.hypotheses.detail.landing-pages.table.columns.name')}</TableHeaderCell>
                      <TableHeaderCell>{t('pages.hypotheses.detail.landing-pages.table.columns.template')}</TableHeaderCell>
                      <TableHeaderCell>{t('pages.hypotheses.detail.landing-pages.table.columns.published')}</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pages.map((p, idx) => (
                      <TableRow key={p.id ?? idx}>
                        <TableCell className='font-medium'>
                          <div className='max-w-xs truncate'>
                            {p.name || '-'}
                          </div>
                        </TableCell>
                        <TableCell>{p.template || '-'}</TableCell>
                        <TableCell>{p.publishedAt ? t('common.boolean.yes') : t('common.boolean.no')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableRoot>
            )}
          </Card>
        </div>

        {/* Right column: recent activity, domain settings */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 lg:max-w-sm">

          {/* Domain Settings */}
          <Card className='p-0 overflow-hidden'>
            <div className='flex items-center justify-between px-4 py-4'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.hypotheses.detail.headings.domain-settings')}
              </h2>
              <DomainEditButton
                hypothesisId={id}
                initialSlug={hypothesis.slug}
                initialCustomDomain={hypothesis.customDomain}
              />
            </div>
            <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>
                      {t('pages.hypotheses.detail.domains.labels.subdomain')}
                    </TableCell>
                    <TableCell className='text-gray-900 dark:text-gray-50'>
                      {hypothesis.slug ? `${hypothesis.slug}.hypany.app` : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>
                      {t('pages.hypotheses.detail.domains.labels.custom-domain')}
                    </TableCell>
                    <TableCell className='text-gray-900 dark:text-gray-50'>
                      {hypothesis.customDomain || '-'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableRoot>
          </Card>

          {/* Recent Activity */}
          <Card className='p-0 overflow-hidden'>
            <div className='flex items-center justify-between px-4 py-4'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.hypotheses.detail.headings.recent-activity')}
              </h2>
              <Link
                href={`/app/hypotheses/${id}/analytics`}
                className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'
              >
                {t('pages.analytics.title')}
              </Link>
            </div>
            <ul className='divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-800 dark:border-gray-800'>
              {activities.length === 0 ? (
                <li className='py-4 text-center text-sm text-gray-500 dark:text-gray-500'>
                  {t('pages.hypotheses.detail.recent-activity.empty')}
                </li>
              ) : (
                activities.map((a, idx) => {
                  const ts = a.timestamp instanceof Date ? a.timestamp.toISOString() : String(a.timestamp)
                  let label = ''
                  if (a.type === 'page_view') label = t('pages.hypotheses.detail.recent-activity.labels.page_view', { source: a.source })
                  else if (a.type === 'signup') label = a.email ? t('pages.hypotheses.detail.recent-activity.labels.signup-with-email', { email: a.email }) : t('pages.hypotheses.detail.recent-activity.labels.signup')
                  else if (a.type === 'verification') label = a.email ? t('pages.hypotheses.detail.recent-activity.labels.verification-with-email', { email: a.email }) : t('pages.hypotheses.detail.recent-activity.labels.verification')
                  return (
                    <li key={a.hypothesisId ?? idx} className='p-4'>
                      <div className='flex items-center justify-between gap-3'>
                        <div className='min-w-0'>
                          <p className='truncate text-sm font-medium text-gray-900 dark:text-gray-50'>
                            {label}
                          </p>
                          <p className='mt-0.5 truncate text-xs text-gray-500 dark:text-gray-500'>
                            <time dateTime={ts}>{new Date(ts).toLocaleString()}</time>
                          </p>
                        </div>
                        <span className='shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'>
                          {t(`pages.hypotheses.detail.recent-activity.badge.${a.type}`)}
                        </span>
                      </div>
                    </li>
                  )
                })
              )}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
