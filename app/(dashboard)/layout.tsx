import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { SidebarProvider, SidebarTrigger } from '@/components/atoms/sidebar'
import { AppSidebar } from '@/components/molecules/navigation/app-sidebar'
import { Breadcrumbs } from '@/components/molecules/navigation/breadcrumbs'
import '../globals.css'
import { siteConfig } from './site-config'

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
  keywords: ['Dashboard', 'Data Visualization', 'Software'],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className='w-full'>
        <header className='sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950'>
          <SidebarTrigger className='-ml-1' />
          <div className='mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800' />
          <Breadcrumbs />
        </header>
        <main>{children}</main>
      </div>
    </SidebarProvider>
  )
}
