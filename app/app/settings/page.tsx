import { api } from '@/app/api/client'
import SettingsForm from './ui'

export default async function SettingsPage() {
  const res = await api.v1.settings.me.get()
  const settings = res.data?.settings
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
      <SettingsForm initial={settings} />
    </section>
  )
}
