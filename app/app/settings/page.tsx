import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/auth/server'
import { getUserSettings } from '@/functions/settings'
import SettingsForm from './ui'

export default async function SettingsPage() {
  const session = await requireAuth()
  const t = await getTranslations('app.pages.settings')
  const settings = await getUserSettings(session.user.id)

  const formattedSettings = settings
    ? {
        emailNotifications: settings.emailNotifications,
        id: settings.id,
        marketingEmailLanguage: settings.marketingEmailLanguage ?? 'en',
        marketingEmails: settings.marketingEmails,
        onboardingComplete: settings.onboardingComplete,
      }
    : null

  return (
    <main className='px-6 py-8'>
      <div className='mx-auto w-full max-w-2xl space-y-6'>
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
            {t('title')}
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {t('subtitle')}
          </p>
        </div>

        <SettingsForm initial={formattedSettings} />
      </div>
    </main>
  )
}
