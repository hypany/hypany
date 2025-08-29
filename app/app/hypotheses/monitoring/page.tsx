'use client'
import { useEffect, useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { api } from '@/app/api'
import { BarChart } from '@/components/atoms/bar-chart'
import { Button } from '@/components/atoms/button'
import { ComboChart } from '@/components/atoms/combo-chart'
import { ConditionalBarChart } from '@/components/atoms/conditional-bar-chart'
import {
  CustomTooltip,
  CustomTooltip2,
  CustomTooltip3,
  CustomTooltip4,
} from '@/components/atoms/custom-tooltips'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import { formatters } from '@/lib/utils'

export default function Monitoring() {
  const [range, setRange] = useState<'30d' | '90d' | '180d' | '365d'>('365d')
  const [daily, setDaily] = useState<Array<{ date: string; visitors: number; signups: number }>>([])

  useEffect(() => {
    let ignore = false
    async function load() {
      const r = range === '30d' ? '30d' : range === '90d' ? '90d' : '30d'
      try {
        const res = await api.v1.analytics.metrics.$get({ query: { range: r as '7d' | '30d' | '90d' } })
        const d = res.data
        if (!d || !d.daily) return
        if (!ignore) setDaily(d.daily.map((x) => ({ date: x.date, signups: x.signups, visitors: x.visitors })))
      } catch {
        if (!ignore) setDaily([])
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [range])

  const dataChart = useMemo(() => {
    return daily.map((d) => ({
      date: d.date,
      'Current year': d.visitors,
      'Same period last year': d.signups,
    }))
  }, [daily])

  const dataChart2 = useMemo(() => {
    return daily.map((d) => ({
      date: d.date,
      Signups: d.signups,
      Visitors: d.visitors,
    }))
  }, [daily])

  const dataChart3 = useMemo(() => {
    return daily.map((d) => {
      const addressed = Math.min(d.signups, d.visitors)
      const unrealized = Math.max(d.visitors - d.signups, 0)
      return { date: d.date, Addressed: addressed, Unrealized: unrealized }
    })
  }, [daily])

  const dataChart4 = useMemo(() => {
    return daily.map((d) => ({
      date: d.date,
      Density: d.visitors > 0 ? d.signups / d.visitors : 0,
    }))
  }, [daily])

  return (
    <section aria-label='App Monitoring'>
      <div className='flex flex-col items-center justify-between gap-2 p-6 sm:flex-row'>
        <Select defaultValue='365-days' onValueChange={(v) => setRange(v === '30-days' ? '30d' : v === '90-days' ? '90d' : v === '180-days' ? '180d' : '365d')}>
          <SelectTrigger className='py-1.5 sm:w-44'>
            <SelectValue placeholder='Assigned to...' />
          </SelectTrigger>
          <SelectContent align='end'>
            <SelectItem value='30-days'>Last 30 days</SelectItem>
            <SelectItem value='90-days'>Last 90 days</SelectItem>
            <SelectItem value='180-days'>Last 180 days</SelectItem>
            <SelectItem value='365-days'>Last 365 days</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant='secondary'
          className='w-full gap-2 py-1.5 text-base sm:w-fit sm:text-sm'
        >
          <SlidersHorizontal
            className='-ml-0.5 size-4 shrink-0 text-gray-400 dark:text-gray-600'
            aria-hidden='true'
          />
          Report Filters
        </Button>
      </div>
      <dl className='grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800'>
        <div className='flex flex-col justify-between p-0'>
          <div>
            <dt className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
              Inherent risk
            </dt>
            <dd className='mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500'>
              Risk scenarios over time grouped by risk level
            </dd>
          </div>
          <BarChart
            data={dataChart}
            index='date'
            categories={['Current year', 'Same period last year']}
            colors={['orange', 'lightGray']}
            yAxisWidth={45}
            customTooltip={CustomTooltip}
            yAxisLabel='Number of inherent risks'
            barCategoryGap='20%'
            valueFormatter={(value) => formatters.unit(value)}
            className='mt-4 hidden h-60 md:block'
          />
          <BarChart
            data={dataChart}
            index='date'
            categories={['Current year', 'Same period last year']}
            colors={['orange', 'lightGray']}
            showYAxis={false}
            customTooltip={CustomTooltip}
            barCategoryGap='20%'
            className='mt-4 h-60 md:hidden'
          />
        </div>
        <div className='flex flex-col justify-between'>
          <div>
            <dt className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
              Signups vs Visitors
            </dt>
            <dd className='mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500'>
              Daily signups compared to unique visitors in selected range
            </dd>
          </div>
          <ComboChart
            data={dataChart2}
            index='date'
            enableBiaxial={true}
            barSeries={{
              categories: ['Signups'],
              valueFormatter: (value) => formatters.unit(value),
              yAxisLabel: 'Signups / Visitors',
            }}
            lineSeries={{
              categories: ['Visitors'],
              colors: ['lightGray'],
              showYAxis: false,
            }}
            customTooltip={CustomTooltip2}
            className='mt-4 hidden h-60 md:block'
          />
          <ComboChart
            data={dataChart2}
            index='date'
            enableBiaxial={true}
            barSeries={{
              categories: ['Signups'],
              showYAxis: false,
            }}
            lineSeries={{
              categories: ['Visitors'],
              colors: ['lightGray'],
              showYAxis: false,
            }}
            customTooltip={CustomTooltip2}
            className='mt-4 h-60 md:hidden'
          />
        </div>
        <div className='flex flex-col justify-between'>
          <div>
            <dt className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
              ESG impact
            </dt>
            <dd className='mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500'>
              Evaluation of addressed ESG criteria in biddings over time
            </dd>
          </div>
          <BarChart
            data={dataChart3}
            index='date'
            categories={['Addressed', 'Unrealized']}
            colors={['emerald', 'lightEmerald']}
            customTooltip={CustomTooltip3}
            type='percent'
            yAxisWidth={55}
            yAxisLabel='% of criteria addressed'
            barCategoryGap='30%'
            className='mt-4 hidden h-60 md:block'
          />
          <BarChart
            data={dataChart3}
            index='date'
            categories={['Addressed', 'Unrealized']}
            colors={['emerald', 'lightEmerald']}
            customTooltip={CustomTooltip3}
            showYAxis={false}
            type='percent'
            barCategoryGap='30%'
            className='mt-4 h-60 md:hidden'
          />
        </div>
        <div className='flex flex-col justify-between'>
          <div>
            <dt className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
              Bidder density
            </dt>
            <dd className='mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500'>
              Competition level measured by number and size of bidders over time
            </dd>
          </div>
          <ConditionalBarChart
            data={dataChart4}
            index='date'
            categories={['Density']}
            colors={['orange']}
            customTooltip={CustomTooltip4}
            valueFormatter={(value) =>
              formatters.percentage({ decimals: 0, number: value })
            }
            yAxisWidth={55}
            yAxisLabel='Competition density (%)'
            barCategoryGap='30%'
            className='mt-4 hidden h-60 md:block'
          />
          <ConditionalBarChart
            data={dataChart4}
            index='date'
            categories={['Density']}
            colors={['orange']}
            customTooltip={CustomTooltip4}
            valueFormatter={(value) =>
              formatters.percentage({ decimals: 0, number: value })
            }
            showYAxis={false}
            barCategoryGap='30%'
            className='mt-4 h-60 md:hidden'
          />
        </div>
      </dl>
    </section>
  )
}
