'use client'

import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export function Providers({
  children,
  i18nMessages,
  i18nLocale,
  i18nTimeZone = 'UTC',
}: {
  children: ReactNode
  i18nMessages: Record<string, string>
  i18nLocale: string
  i18nTimeZone?: string
}) {
  return (
    <NextIntlClientProvider
      messages={i18nMessages}
      locale={i18nLocale}
      timeZone={i18nTimeZone}
    >
      <ThemeProvider
        defaultTheme='system'
        disableTransitionOnChange
        attribute='class'
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
