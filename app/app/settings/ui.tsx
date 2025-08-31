'use client'
import { useId, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import { Switch } from '@/components/atoms/switch'
import { toast } from '@/lib/use-toast'

type Settings = {
  id: string
  emailNotifications: boolean
  marketingEmails: boolean
  marketingEmailLanguage: string
  onboardingComplete: boolean
}

export default function SettingsForm({
  initial,
}: {
  initial?: Partial<Settings> | null
}) {
  const api = getClientApi()
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    Boolean(initial?.emailNotifications ?? true),
  )
  const [marketingEmails, setMarketingEmails] = useState<boolean>(
    Boolean(initial?.marketingEmails ?? false),
  )
  function ensureLang(l?: string) {
    const allowed = ['en', 'ko'] as const
    return allowed.includes((l || 'en') as (typeof allowed)[number])
      ? ((l || 'en') as string)
      : 'en'
  }
  const [marketingEmailLanguage, setMarketingEmailLanguage] = useState<string>(
    ensureLang(initial?.marketingEmailLanguage),
  )
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(
    Boolean(initial?.onboardingComplete ?? false),
  )
  const [saving, setSaving] = useState(false)
  const langId = useId()

  async function save() {
    setSaving(true)
    try {
      await api.v1.settings.me.patch({
        emailNotifications,
        marketingEmails,
        marketingEmailLanguage,
        onboardingComplete,
      })
      toast({
        description: 'Your preferences have been updated.',
        title: 'Settings saved',
        variant: 'success',
      })
    } catch {
      toast({
        description: 'Please try again in a moment.',
        title: 'Failed to save settings',
        variant: 'error',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:max-w-2xl'>
      <div className='rounded-lg border border-gray-200 p-4 shadow-xs dark:border-gray-800'>
        <h2 className='mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50'>
          Notifications
        </h2>
        <p className='mb-3 text-xs text-gray-600 dark:text-gray-400'>
          Control how we notify you about important events.
        </p>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-gray-900 dark:text-gray-50'>
              Email notifications
            </p>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              Get updates about your hypotheses
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={(v) => setEmailNotifications(Boolean(v))}
          />
        </div>
      </div>

      <div className='rounded-lg border border-gray-200 p-4 shadow-xs dark:border-gray-800'>
        <h2 className='mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50'>
          Marketing
        </h2>
        <p className='mb-3 text-xs text-gray-600 dark:text-gray-400'>
          Choose the emails you want to receive.
        </p>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-900 dark:text-gray-50'>
                Product updates and tips
              </p>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Occasional emails with new features and guides
              </p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={(v) => setMarketingEmails(Boolean(v))}
            />
          </div>
          <div>
            <label
              className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'
              htmlFor={langId}
            >
              Preferred language
            </label>
            <Select
              value={marketingEmailLanguage}
              onValueChange={(v) => setMarketingEmailLanguage(v)}
            >
              <SelectTrigger id={langId} className='py-1.5 sm:w-56'>
                <SelectValue placeholder='Select language' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='en'>English</SelectItem>
                <SelectItem value='ko'>한국어 (Korean)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className='rounded-lg border border-gray-200 p-4 shadow-xs dark:border-gray-800'>
        <h2 className='mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50'>
          Onboarding
        </h2>
        <p className='mb-3 text-xs text-gray-600 dark:text-gray-400'>
          Let us know if you’ve finished the getting started guide.
        </p>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-gray-900 dark:text-gray-50'>
              Onboarding completed
            </p>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              Hide onboarding prompts in the app
            </p>
          </div>
          <Switch
            checked={onboardingComplete}
            onCheckedChange={(v) => setOnboardingComplete(Boolean(v))}
          />
        </div>
      </div>

      <div>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
