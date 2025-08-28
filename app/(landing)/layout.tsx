import type { Metadata } from 'next'
import '../globals.css'

import Footer from '@/components/molecules/landing/footer'
import { NavBar } from '@/components/molecules/landing/navbar'
import { siteConfig } from '../site-config'

export const metadata: Metadata = {
  authors: [
    {
      name: 'yourname',
      url: '',
    },
  ],
  creator: 'yourname',
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['Marketing', 'Database', 'Software'],
  metadataBase: new URL('https://yoururl.com'),
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
    creator: '@yourname',
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
    <html lang='en'>
      <body
        className='min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-orange-100 selection:text-orange-600'
        style={{
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
