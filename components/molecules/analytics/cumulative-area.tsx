// 'use client'
'use client'

import { AreaChart } from '@/components/atoms/area-chart'
import { Card } from '@/components/atoms/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs'
import { useMemo, useState } from 'react'

type DailyPoint = { date: string; visitors: number; signups: number }

function formatDateLabel(iso: string): string {
  // Expect iso in YYYY-MM-DD; fall back to Date parsing
  try {
    const d = new Date(iso)
    const month = d.toLocaleString('en-US', { month: 'short' })
    const day = d.getDate().toString().padStart(2, '0')
    return `${month} ${day}`
  } catch {
    return iso
  }
}

const valueFormatter = (n: number) =>
  `${Intl.NumberFormat('en-US').format(Number.isFinite(n) ? n : 0)}`

export function CumulativeAreaChart({ daily }: { daily: DailyPoint[] }) {
  // Pre-compute cumulative series once
  const series = useMemo(() => {
    let vAcc = 0
    let sAcc = 0
    return daily
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => {
        vAcc += d.visitors || 0
        sAcc += d.signups || 0
        return {
          date: formatDateLabel(d.date),
          Signups: sAcc,
          Visitors: vAcc,
        }
      })
  }, [daily])

  const tabs = useMemo(() => {
    const last7 = series.slice(-7)
    const last14 = series.slice(-14)
    const last30 = series.slice(-30)
    return [
      { data: last7.length > 0 ? last7 : series, name: '1w' },
      { data: last14.length > 0 ? last14 : series, name: '2w' },
      { data: last30.length > 0 ? last30 : series, name: '4w' },
      { data: series, name: 'All' },
    ]
  }, [series])

  const totals = series[series.length - 1] || { Signups: 0, Visitors: 0 }
  const [selected, setSelected] = useState<string>(tabs[0]?.name ?? '1w')

  return (
    <Card className='p-0'>
      <div className='p-4 md:p-6'>
        <Tabs value={selected} onValueChange={setSelected}>
          <div className='grid md:flex md:items-start md:justify-between'>
            <ul className='order-2 mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 md:order-1 md:mt-0'>
              <li>
                <div className='flex items-center space-x-2'>
                  <span
                    className='size-3 shrink-0 rounded-sm bg-emerald-500'
                    aria-hidden
                  />
                  <p className='font-semibold text-gray-900 dark:text-gray-50'>
                    {valueFormatter(totals.Visitors)}
                  </p>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Visitors
                </p>
              </li>
              <li>
                <div className='flex items-center space-x-2'>
                  <span
                    className='size-3 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500'
                    aria-hidden
                  />
                  <p className='font-semibold text-gray-900 dark:text-gray-50'>
                    {valueFormatter(totals.Signups)}
                  </p>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Signups
                </p>
              </li>
            </ul>
            <div className='order-1 md:order-2'>
              <TabsList variant='solid' className='w-full md:w-fit'>
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.name}
                    value={tab.name}
                    className='w-full justify-center py-1 md:w-fit md:justify-start'
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.name}>
              <AreaChart
                data={tab.data}
                index='date'
                categories={['Visitors', 'Signups']}
                colors={['emerald', 'blue']}
                showLegend={false}
                yAxisWidth={48}
                valueFormatter={valueFormatter}
                className='mt-8 hidden h-72 sm:block'
              />
              <AreaChart
                data={tab.data}
                index='date'
                categories={['Visitors', 'Signups']}
                colors={['emerald', 'blue']}
                showLegend={false}
                showYAxis={false}
                startEndOnly
                valueFormatter={valueFormatter}
                className='mt-6 h-72 sm:hidden'
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  )
}
