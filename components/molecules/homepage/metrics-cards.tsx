type Category = 'red' | 'orange' | 'emerald' | 'gray'
type Metric = {
  label: string
  value: number
  percentage: string
  fraction: string
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
    activeClass: 'bg-orange-500 dark:bg-orange-500',
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

const metrics: Metric[] = [
  {
    fraction: '450/752',
    label: 'Lead-to-Quote Ratio',
    percentage: '59.8%',
    value: 0.61,
  },
  {
    fraction: '129/1K',
    label: 'Project Load',
    percentage: '12.9%',
    value: 0.24,
  },
  {
    fraction: '280/329',
    label: 'Win Probability',
    percentage: '85.1%',
    value: 0.8,
  },
]

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div>
      <dt className='text-sm text-gray-500 dark:text-gray-500'>
        {metric.label}
      </dt>
      <dd className='mt-1.5 flex items-center gap-2'>
        <Indicator number={metric.value} />
        <p className='text-lg font-semibold text-gray-900 dark:text-gray-50'>
          {metric.percentage}{' '}
          <span className='font-medium text-gray-400 dark:text-gray-600'>
            - {metric.fraction}
          </span>
        </p>
      </dd>
    </div>
  )
}

export function MetricsCards() {
  return (
    <>
      <h1 className='text-lg font-semibold text-gray-900 dark:text-gray-50'>
        Overview
      </h1>
      <dl className='mt-6 flex flex-wrap items-center gap-x-12 gap-y-8'>
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </dl>
    </>
  )
}
