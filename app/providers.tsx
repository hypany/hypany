'use client'

import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'

export function Providers({
  children,
  i18nMessages,
  i18nLocale,
}: {
  children: ReactNode
  i18nMessages: Record<string, string>
  i18nLocale: string
}) {
  return (
    <NextIntlClientProvider messages={i18nMessages} locale={i18nLocale}>
      {children}
    </NextIntlClientProvider>
  )
}
