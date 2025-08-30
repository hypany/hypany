'use client'
import { useId, useState } from 'react'
import { api } from '@/app/api'
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
  theme: 'light' | 'dark' | 'system' | (string & {})
  emailNotifications: boolean
  onboardingComplete: boolean
}

export default function SettingsForm({
  initial,
}: {
  initial?: Partial<Settings> | null
}) {
  const [theme, setTheme] = useState<Settings['theme']>(
    (initial?.theme as any) || 'system',
  )
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    Boolean(initial?.emailNotifications ?? true),
  )
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(
    Boolean(initial?.onboardingComplete ?? false),
  )
  const [saving, setSaving] = useState(false)
  const themeId = useId()

  async function save() {
    setSaving(true)
    try {
      const safeTheme = (
        theme === 'light' || theme === 'dark' || theme === 'system'
          ? theme
          : 'system'
      ) as 'light' | 'dark' | 'system'
      await api.v1.settings.me.patch({
        emailNotifications,
        onboardingComplete,
        theme: safeTheme,
      })
      toast({
        title: 'Settings saved',
        description: 'Your preferences have been updated.',
        variant: 'success',
      })
    } catch {
      toast({
        title: 'Failed to save settings',
        description: 'Please try again in a moment.',
        variant: 'error',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:max-w-xl'>
      <div>
        <label
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          htmlFor={themeId}
        >
          Theme
        </label>
        <Select
          value={theme}
          onValueChange={(v) => setTheme(v as Settings['theme'])}
        >
          <SelectTrigger id={themeId} className='py-1.5'>
            <SelectValue placeholder='Select theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='system'>System</SelectItem>
            <SelectItem value='light'>Light</SelectItem>
            <SelectItem value='dark'>Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-900 dark:text-gray-50'>
            Onboarding completed
          </p>
          <p className='text-xs text-gray-600 dark:text-gray-400'>
            Hide onboarding prompts
          </p>
        </div>
        <Switch
          checked={onboardingComplete}
          onCheckedChange={(v) => setOnboardingComplete(Boolean(v))}
        />
      </div>
      <div>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
