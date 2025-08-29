import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { getLocale, getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  authors: [
    {
      name: 'Sunghyun Cho',
      url: 'https://cho.sh',
    },
  ],
  creator: 'Sunghyun Cho',
  description: 'Nobody wants your startup. But they might like your 97th idea.',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['Marketing', 'Database', 'Software'],
  metadataBase: new URL('https://www.hypany.com'),
  openGraph: {
    description:
      'Nobody wants your startup. But they might like your 97th idea.',
    locale: 'en_US',
    siteName: 'Hypany',
    title: 'Hypany',
    type: 'website',
    url: 'https://www.hypany.com',
  },
  title: 'Hypany',
  twitter: {
    card: 'summary_large_image',
    creator: '@anaclumos',
    description:
      'Nobody wants your startup. But they might like your 97th idea.',
    title: 'Hypany',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className='overflow-x-hidden scroll-auto bg-gray-50 dark:bg-gray-925 selection:bg-emerald-100 selection:text-emerald-600'>
        <Providers
          i18nMessages={messages}
          i18nLocale={locale}
          i18nTimeZone='UTC'
        >
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
        <Toaster richColors position='top-right' />
      </body>
    </html>
  )
}
