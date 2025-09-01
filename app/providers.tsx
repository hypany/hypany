'use client'

import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

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
  const [queryClient] = useState(() => new QueryClient())
  return (
    <NextIntlClientProvider
      messages={i18nMessages}
      locale={i18nLocale}
      timeZone={i18nTimeZone}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          defaultTheme='system'
          disableTransitionOnChange
          attribute='class'
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  )
}
