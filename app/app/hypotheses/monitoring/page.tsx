'use client'
import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { api } from '@/app/api'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('app.hypotheses.monitoring')
  const [range, setRange] = useState<'30d' | '90d' | '180d' | '365d'>('365d')
  const [daily, setDaily] = useState<
    Array<{ date: string; visitors: number; signups: number }>
  >([])

  useEffect(() => {
    let ignore = false
    async function load() {
      const r = range === '30d' ? '30d' : range === '90d' ? '90d' : '30d'
      try {
        const res = await api.v1.analytics.metrics.get({
          query: { range: r as '7d' | '30d' | '90d' },
        })
        const d = res.data
        if (!d || !d.daily) return
        if (!ignore)
          setDaily(
            d.daily.map((x) => ({
              date: x.date,
              signups: x.signups,
              visitors: x.visitors,
            })),
          )
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
    const cur = t('series.currentYear')
    const prev = t('series.lastYear')
    return daily.map((d) => ({ [cur]: d.visitors, date: d.date, [prev]: d.signups }))
  }, [daily, t])

  const dataChart2 = useMemo(() => {
    const s = t('series.signups')
    const v = t('series.visitors')
    return daily.map((d) => ({ date: d.date, [s]: d.signups, [v]: d.visitors }))
  }, [daily, t])

  const dataChart3 = useMemo(() => {
    const a = t('series.addressed')
    const u = t('series.unrealized')
    return daily.map((d) => {
      const addressed = Math.min(d.signups, d.visitors)
      const unrealized = Math.max(d.visitors - d.signups, 0)
      return { [a]: addressed, date: d.date, [u]: unrealized }
    })
  }, [daily, t])

  const dataChart4 = useMemo(() => {
    const dKey = t('series.density')
    return daily.map((d) => ({ [dKey]: d.visitors > 0 ? d.signups / d.visitors : 0, date: d.date }))
  }, [daily, t])

  return (
    <section aria-label={t('aria')}>
      <div className='flex flex-col items-center justify-between gap-2 p-6 sm:flex-row'>
        <Select
          defaultValue='365-days'
          onValueChange={(v) =>
            setRange(
              v === '30-days'
                ? '30d'
                : v === '90-days'
                  ? '90d'
                  : v === '180-days'
                    ? '180d'
                    : '365d',
            )
          }
        >
          <SelectTrigger className='py-1.5 sm:w-44'>
            <SelectValue placeholder={t('rangePlaceholder')} />
          </SelectTrigger>
          <SelectContent align='end'>
            <SelectItem value='30-days'>{t('ranges.30')}</SelectItem>
            <SelectItem value='90-days'>{t('ranges.90')}</SelectItem>
            <SelectItem value='180-days'>{t('ranges.180')}</SelectItem>
            <SelectItem value='365-days'>{t('ranges.365')}</SelectItem>
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
          {t('filters')}
        </Button>
      </div>
      <dl className='grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800'>
        <div className='flex flex-col justify-between p-0'>
          <div>
            <dt className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
              {t('cards.inherentRisk.title')}
            </dt>
            <dd className='mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500'>
              {t('cards.inherentRisk.desc')}
            </dd>
          </div>
          <BarChart
            data={dataChart}
            index='date'
            categories={[t('series.currentYear'), t('series.lastYear')]}
            colors={['orange', 'lightGray']}
            yAxisWidth={45}
            customTooltip={CustomTooltip}
            yAxisLabel={t('yAxis.inherentRisk')}
            barCategoryGap='20%'
            valueFormatter={(value) => formatters.unit(value)}
            className='mt-4 hidden h-60 md:block'
          />
          <BarChart
            data={dataChart}
            index='date'
            categories={[t('series.currentYear'), t('series.lastYear')]}
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
              {t('cards.signupsVsVisitors.title')}
            </dt>
            <dd className='mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500'>
              {t('cards.signupsVsVisitors.desc')}
            </dd>
          </div>
          <ComboChart
            data={dataChart2}
            index='date'
            enableBiaxial={true}
            barSeries={{
              categories: [t('series.signups')],
              valueFormatter: (value) => formatters.unit(value),
              yAxisLabel: t('yAxis.signupsVisitors'),
            }}
            lineSeries={{
              categories: [t('series.visitors')],
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
              categories: [t('series.signups')],
              showYAxis: false,
            }}
            lineSeries={{
              categories: [t('series.visitors')],
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
              {t('cards.esgImpact.title')}
            </dt>
            <dd className='mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500'>
              {t('cards.esgImpact.desc')}
            </dd>
          </div>
          <BarChart
            data={dataChart3}
            index='date'
            categories={[t('series.addressed'), t('series.unrealized')]}
            colors={['emerald', 'lightEmerald']}
            customTooltip={CustomTooltip3}
            type='percent'
            yAxisWidth={55}
            yAxisLabel={t('yAxis.esgImpact')}
            barCategoryGap='30%'
            className='mt-4 hidden h-60 md:block'
          />
          <BarChart
            data={dataChart3}
            index='date'
            categories={[t('series.addressed'), t('series.unrealized')]}
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
              {t('cards.bidderDensity.title')}
            </dt>
            <dd className='mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500'>
              {t('cards.bidderDensity.desc')}
            </dd>
          </div>
          <ConditionalBarChart
            data={dataChart4}
            index='date'
            categories={[t('series.density')]}
            colors={['orange']}
            customTooltip={CustomTooltip4}
            valueFormatter={(value) =>
              formatters.percentage({ decimals: 0, number: value })
            }
            yAxisWidth={55}
            yAxisLabel={t('yAxis.bidderDensity')}
            barCategoryGap='30%'
            className='mt-4 hidden h-60 md:block'
          />
          <ConditionalBarChart
            data={dataChart4}
            index='date'
            categories={[t('series.density')]}
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
