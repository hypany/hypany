import type { Metadata } from 'next'
import '../globals.css'

import Footer from '@/components/molecules/landing/footer'
import { NavBar } from '@/components/molecules/landing/navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { siteConfig } from '../site-config'

export const metadata: Metadata = {
  authors: [
    {
      name: 'Sunghyun Cho',
      url: 'https://cho.sh',
    },
  ],
  creator: 'Sunghyun Cho',
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['Marketing', 'Database', 'Software'],
  metadataBase: new URL('https://www.hypany.com'),
  openGraph: {
    description: siteConfig.description,
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: 'website',
    url: siteConfig.url,
  },
  title: siteConfig.name,
  twitter: {
    card: 'summary_large_image',
    creator: '@anaclumos',
    description: siteConfig.description,
    title: siteConfig.name,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className='min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-orange-100 selection:text-orange-600'>
          <NavBar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
