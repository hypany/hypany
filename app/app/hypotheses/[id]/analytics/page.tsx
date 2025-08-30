import { api } from '@/app/api'
import { BarChart } from '@/components/atoms/bar-chart'
import { ComboChart } from '@/components/atoms/combo-chart'
import Link from 'next/link'

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

  const { data } = await api.v1.analytics.metrics.get({
    query: { hypothesisId: id, range },
  })
  const daily = data?.daily ?? []
  const per = data?.perHypothesis?.[0]

  const barData = daily.map((d) => ({
    date: d.date,
    Signups: d.signups,
    Visitors: d.visitors,
  }))
  const comboData = daily.map((d) => ({
    date: d.date,
    Signups: d.signups,
    Visitors: d.visitors,
  }))

  return (
    <section>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
            Analytics
          </h1>
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {per ? (
              <span>
                {Math.round(per.uniqueVisitors)} visitors •{' '}
                {Math.round(per.signups)} signups •
                {` ${per.uniqueVisitors ? ((per.signups / per.uniqueVisitors) * 100).toFixed(1) : '0.0'}%`}{' '}
                conv
              </span>
            ) : (
              <span>Loading…</span>
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

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div>
          <h2 className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
            Visitors vs Signups
          </h2>
          <ComboChart
            data={comboData}
            index='date'
            enableBiaxial
            barSeries={{ categories: ['Signups'] }}
            lineSeries={{ categories: ['Visitors'], colors: ['lightGray'] }}
            className='mt-4 h-60'
          />
        </div>
        <div>
          <h2 className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
            Daily Visitors
          </h2>
          <BarChart
            data={barData}
            index='date'
            categories={['Visitors']}
            colors={['orange']}
            className='mt-4 h-60'
          />
        </div>
      </div>
    </section>
  )
}
