import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('app.pages.root')
  return <div className='px-6 py-6 text-gray-900 dark:text-gray-50'>{t('title')}</div>
}
