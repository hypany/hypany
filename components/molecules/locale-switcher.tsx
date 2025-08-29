'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function LocaleSwitcher() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('nav')
  const [isPending, startTransition] = useTransition()

  function setLocaleCookie(nextLocale: string) {
    // Persist for 1 year, path-wide
    document.cookie = `locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <Select value={locale} onValueChange={setLocaleCookie} disabled={isPending}>
      <SelectTrigger aria-label={t('language-aria')}>
        <SelectValue>
          {locale === 'ko' ? t('lang-ko') : t('lang-en')}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='en'>{t('lang-en')}</SelectItem>
        <SelectItem value='ko'>{t('lang-ko')}</SelectItem>
      </SelectContent>
    </Select>
  )
}
