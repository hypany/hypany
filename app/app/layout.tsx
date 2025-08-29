import { auth } from '@/auth'
import { getSession } from '@/auth/server'
import { SidebarProvider, SidebarTrigger } from '@/components/atoms/sidebar'
import { AppSidebar } from '@/components/molecules/navigation/app-sidebar'
import { Breadcrumbs } from '@/components/molecules/navigation/breadcrumbs'
import type { Metadata } from 'next'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import '../globals.css'

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
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
    redirect('/sign-in')
  }
  // Ensure user has at least one organization
  const hdrs = await headers()
  const orgs = await auth.api.listOrganizations({ headers: hdrs })
  if (!orgs || (Array.isArray(orgs) && orgs.length === 0)) {
    redirect('/create-organization')
  }
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value !== 'false'

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
