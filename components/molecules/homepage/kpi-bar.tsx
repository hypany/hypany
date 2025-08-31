import type { Metric } from './metrics-cards'

export function KpiBar({
  metrics,
  ariaLabel,
}: {
  metrics: Metric[]
  ariaLabel?: string
}) {
  return (
    <div className='w-full'>
      <dl
        aria-label={ariaLabel}
        className='flex flex-wrap items-baseline gap-x-8 gap-y-3'
      >
        {metrics.map((m, idx) => (
          <div key={`${m.label}-${idx}`} className='flex items-baseline gap-2'>
            <dt className='text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500'>
              {m.label}
            </dt>
            <dd className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
              {m.percentage}
              {m.fraction ? (
                <span className='ml-1.5 font-normal text-gray-400 dark:text-gray-600'>
                  {m.fraction}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
