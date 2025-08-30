'use client'

import dynamic from 'next/dynamic'

const ResponsiveContainer = dynamic(
  () => import('recharts').then((m) => m.ResponsiveContainer),
  { ssr: false },
)
const LineChart = dynamic(
  () => import('recharts').then((m) => m.LineChart),
  { ssr: false },
)
const CartesianGrid = dynamic(
  () => import('recharts').then((m) => m.CartesianGrid),
  { ssr: false },
)
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), {
  ssr: false,
})
const YAxis = dynamic(() => import('recharts').then((m) => m.YAxis), {
  ssr: false,
})
const Tooltip = dynamic(
  () => import('recharts').then((m) => m.Tooltip),
  { ssr: false },
)
const Line = dynamic(() => import('recharts').then((m) => m.Line), {
  ssr: false,
})

export function OverviewLine({
  data,
}: {
  data: Array<{ date: string; visitors: number; signups: number }>
}) {
  return (
    <div className='h-56 w-full rounded-md border border-gray-200 p-2 dark:border-gray-800'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray='3 3' stroke='hsl(220 14% 90%)' />
          <XAxis dataKey='date' hide interval='preserveStartEnd' />
          <YAxis width={28} />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='visitors'
            stroke='hsl(164 94% 36%)'
            strokeWidth={2}
            dot={false}
            name='Visitors'
          />
          <Line
            type='monotone'
            dataKey='signups'
            stroke='hsl(219 10% 45%)'
            strokeWidth={2}
            dot={false}
            name='Signups'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
