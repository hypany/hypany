import { requireAuth } from '@/auth/server'
import { getUserSettings } from '@/functions/settings'
import SettingsForm from './ui'

export default async function SettingsPage() {
  const session = await requireAuth()
  const settings = await getUserSettings(session.user.id)
  
  // Convert settings to the expected format
  const formattedSettings = settings ? {
    id: settings.id,
    emailNotifications: settings.emailNotifications,
    marketingEmails: settings.marketingEmails,
    marketingEmailLanguage: settings.marketingEmailLanguage,
    onboardingComplete: settings.onboardingComplete,
  } : null
  
  return (
    <section>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          Settings
        </h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Update your preferences
        </p>
      </div>
      <SettingsForm initial={formattedSettings} />
    </section>
  )
}
