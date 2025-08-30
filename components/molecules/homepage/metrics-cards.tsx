type Category = 'red' | 'orange' | 'emerald' | 'gray'
export type Metric = {
  label: string
  value: number // 0..1 scale for indicator
  percentage: string // e.g. "59.8%" or "+12.4%"
  fraction: string // e.g. "450/752" or "129/1K"
}

const getCategory = (value: number): Category => {
  if (value < 0.3) return 'red'
  if (value < 0.7) return 'orange'
  return 'emerald'
}

const categoryConfig = {
  emerald: {
    activeClass: 'bg-emerald-500 dark:bg-emerald-500',
    bars: 3,
  },
  gray: {
    activeClass: 'bg-gray-300 dark:bg-gray-800',
    bars: 0,
  },
  orange: {
    activeClass: 'bg-emerald-500 dark:bg-emerald-500',
    bars: 2,
  },
  red: {
    activeClass: 'bg-red-500 dark:bg-red-500',
    bars: 1,
  },
} as const

function Indicator({ number }: { number: number }) {
  const category = getCategory(number)
  const config = categoryConfig[category]
  const inactiveClass = 'bg-gray-300 dark:bg-gray-800'

  return (
    <div className='flex gap-0.5'>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`h-3.5 w-1 rounded-xs ${
            index < config.bars ? config.activeClass : inactiveClass
          }`}
        />
      ))}
    </div>
  )
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div>
      <dt className='text-sm text-gray-500 dark:text-gray-500'>
        {metric.label}
      </dt>
      <dd className='mt-1.5 flex items-center gap-2'>
        <Indicator number={metric.value} />
        <p className='text-lg font-semibold text-gray-900 dark:text-gray-50'>
          {metric.percentage}
          {metric.fraction ? (
            <span className='font-medium text-gray-400 dark:text-gray-600'>
              {metric.percentage ? ' - ' : ''}
              {metric.fraction}
            </span>
          ) : null}
        </p>
      </dd>
    </div>
  )
}

export function MetricsCards({
  metrics,
  compact,
}: {
  metrics: Metric[]
  compact?: boolean
}) {
  return (
    <div className='w-full p-6'>
      <dl
        className={`${compact ? 'mt-0' : 'mt-6'} flex flex-wrap items-center gap-x-12 gap-y-8`}
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </dl>
    </div>
  )
}
