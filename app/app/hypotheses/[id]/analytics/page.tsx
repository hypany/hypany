import { requireAuth } from '@/auth/server'
import { BarChart } from '@/components/atoms/bar-chart'
import { Card } from '@/components/atoms/card'
import { CumulativeAreaChart } from './cumulative-area'
import { getAnalyticsMetrics } from '@/functions/analytics'
import { getActiveOrganization } from '@/functions/organizations'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Range = '7d' | '30d' | '90d'

export default async function AnalyticsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const { id } = await params
  const sp = (await searchParams) ?? {}
  const range = (sp.range as Range) || '30d'

  await requireAuth()
  const activeOrgRes = await getActiveOrganization()
  if (!activeOrgRes?.activeOrganizationId) notFound()

  const metrics = await getAnalyticsMetrics(activeOrgRes.activeOrganizationId, {
    hypothesisId: id,
    range,
  })
  const daily = metrics.daily
  const per = metrics.perHypothesis[0]
  const t = await getTranslations('app')

  const barData = daily.map((d) => ({
    date: d.date,
    Signups: d.signups,
    Visitors: d.visitors,
  }))

  return (
    <section>
      <Card className='p-0 overflow-hidden mb-4'>
        <div className='px-4 py-4 flex items-center justify-between'>
        <div>
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {per && (
              <span>
                {t('pages.analytics.metrics.summary', {
                  visitors: Math.round(per.uniqueVisitors),
                  signups: Math.round(per.signups),
                  conv: per.uniqueVisitors
                    ? ((per.signups / per.uniqueVisitors) * 100).toFixed(1)
                    : '0.0',
                })}
              </span>
            )}
          </p>
        </div>
        <div className='flex gap-2 text-sm'>
          {(['7d', '30d', '90d'] as Range[]).map((r) => (
            <Link
              key={r}
              href={`?range=${r}`}
              className={
                'rounded-md border px-2 py-1 ' +
                (r === range
                  ? 'border-gray-900 text-gray-900 dark:border-gray-50 dark:text-gray-50'
                  : 'border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400')
              }
            >
              {r}
            </Link>
          ))}
        </div>
        </div>
      </Card>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <CumulativeAreaChart daily={daily} />
        <Card className='p-0 overflow-hidden'>
          <div className='px-4 py-4'>
            <h2 className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
              {t('pages.analytics.cards.daily-visitors')}
            </h2>
          </div>
          <div className='border-t border-gray-200 p-4 dark:border-gray-800'>
            <BarChart
              data={barData}
              index='date'
              categories={['Visitors']}
              colors={['orange']}
              className='h-60'
            />
          </div>
        </Card>
      </div>
    </section>
  )
}
