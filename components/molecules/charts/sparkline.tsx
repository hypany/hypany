'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const ResponsiveContainer = dynamic(
  () => import('recharts').then((m) => m.ResponsiveContainer),
  { ssr: false },
)
const LineChart = dynamic(
  () => import('recharts').then((m) => m.LineChart),
  { ssr: false },
)
const Line = dynamic(() => import('recharts').then((m) => m.Line), {
  ssr: false,
})

export function Sparkline({ data }: { data: number[] }) {
  // Normalize to percentages for visual consistency
  const max = Math.max(1, ...data)
  const series = data.map((v, i) => ({ i, v: max > 0 ? (v / max) * 100 : 0 }))
  return (
    <div className='h-8 w-24'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={series} margin={{ left: 0, right: 0, top: 4, bottom: 4 }}>
          <Line
            type='monotone'
            dataKey='v'
            stroke='currentColor'
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
