import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/auth/server'
import { getActiveOrganization } from '@/functions/organizations'
import {
  getHypothesisById,
  getLandingPagesForHypothesis,
  getWaitlistByHypothesisId,
  getWaitlistEntries,
} from '@/functions/hypotheses'
import { getActivityFeed, getAnalyticsMetrics } from '@/functions/analytics'
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
import DomainForm from './domains/ui'
import { RenameLandingPageInline } from './landing-pages/ui'
import { ComboChart } from '@/components/atoms/combo-chart'

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
    getActivityFeed(activeOrgRes.activeOrganizationId, { limit: 20, range: '30d' }),
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
  const comboData = daily.map((d) => ({
    date: d.date,
    Signups: d.signups,
    Visitors: d.visitors,
  }))
  const exportCsvHref = `/api/v1/waitlists/hypothesis/${id}/export?format=csv`

  return (
    <section
      aria-label={t('pages.hypotheses.detail.aria')}
      className='bg-gray-50 dark:bg-gray-950'
    >
      <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-3'>
        {/* Left column: analytics, waitlist, landing pages */}
        <div className='grid grid-cols-1 gap-4 lg:col-span-2'>
          {/* Analytics */}
          <Card className='p-0 overflow-hidden'>
            <div className='px-4 py-4'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.hypotheses.detail.headings.analytics')}
              </h2>
            </div>
            <div className='border-t border-gray-200 dark:border-gray-800'>
              <ComboChart
                data={comboData}
                index='date'
                enableBiaxial
                barSeries={{ categories: ['Signups'] }}
                lineSeries={{ categories: ['Visitors'], colors: ['lightGray'] }}
                className='h-64'
              />
            </div>
          </Card>

          {/* Waitlist */}
          <Card className='p-0 overflow-hidden'>
            <div className='flex items-center justify-between px-4 py-4'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.hypotheses.detail.headings.waitlist')}
              </h2>
              <div className='flex items-center gap-3'>
                {stats && (
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    {t('pages.hypotheses.detail.waitlist.summary', { total: stats.totalEntries, verified: stats.verifiedEntries })}
                  </span>
                )}
                <Link
                  href={`/app/hypotheses/${id}/waitlist`}
                  className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'
                >
                  {t('pages.root.view-all')}
                </Link>
                <a
                  className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'
                  href={exportCsvHref}
                >
                  {t('pages.hypotheses.detail.waitlist.exportCsv')}
                </a>
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
                    waitlistEntries.map((e) => (
                      <TableRow key={e.id}>
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
                    {pages.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className='font-medium'>
                          <div className='max-w-xs'>
                            <RenameLandingPageInline
                              landingPageId={p.id}
                              initialName={p.name || null}
                            />
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

        {/* Right column: overview, recent activity, domain settings */}
        <div className='grid grid-cols-1 gap-4 lg:col-span-1'>
          {/* Overview */}
          <Card className='p-0 overflow-hidden'>
            <div className='px-4 py-4'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.hypotheses.detail.headings.overview')}
              </h2>
            </div>
            <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>
                      {t('pages.hypotheses.detail.table.columns.field')}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {t('pages.hypotheses.detail.table.columns.value')}
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>
                      {t('pages.hypotheses.detail.table.columns.status')}
                    </TableCell>
                    <TableCell className='capitalize'>
                      {hypothesis.status}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>
                      {t('pages.hypotheses.detail.table.columns.signups')}
                    </TableCell>
                    <TableCell>
                      {stats ? (
                        <span>
                          {stats.totalEntries} total • {stats.verifiedEntries} verified
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>
                      {t('pages.hypotheses.detail.table.columns.subdomain')}
                    </TableCell>
                    <TableCell>{hypothesis.slug ?? '-'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableRoot>
          </Card>

          {/* Domain Settings */}
          <Card className='p-0 overflow-hidden'>
            <div className='flex items-center justify-between px-4 py-4'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.hypotheses.detail.headings.domain-settings')}
              </h2>
            </div>
            <div className='border-t border-gray-200 p-4 dark:border-gray-800'>
              <DomainForm
                hypothesisId={id}
                initialSlug={hypothesis.slug}
                initialCustomDomain={hypothesis.customDomain}
              />
            </div>
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
                activities.map((a) => {
                  const ts = a.timestamp instanceof Date ? a.timestamp.toISOString() : String(a.timestamp)
                  let label = ''
                  if (a.type === 'page_view') label = t('pages.hypotheses.detail.recent-activity.labels.page_view', { source: a.source })
                  else if (a.type === 'signup') label = a.email ? t('pages.hypotheses.detail.recent-activity.labels.signup-with-email', { email: a.email }) : t('pages.hypotheses.detail.recent-activity.labels.signup')
                  else if (a.type === 'verification') label = a.email ? t('pages.hypotheses.detail.recent-activity.labels.verification-with-email', { email: a.email }) : t('pages.hypotheses.detail.recent-activity.labels.verification')
                  return (
                    <li key={`${a.hypothesisId}-${a.source}-${a.type}-${a.email}`} className='py-3'>
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
