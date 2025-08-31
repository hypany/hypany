import { getTranslations } from 'next-intl/server'

export default async function AnalyticsPage() {
  const t = await getTranslations('app')
  return (
    <section aria-label={t('pages.analytics.aria')}>
      <div className='px-6 py-6'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          {t('pages.analytics.title')}
        </h1>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          {t('pages.analytics.subtitle')}
        </p>
      </div>
    </section>
  )
}
