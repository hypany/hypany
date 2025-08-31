import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSession } from '@/auth/server'
import { listUserOrganizations } from '@/functions/organizations'
import { SidebarProvider } from '@/components/atoms/sidebar'
import { AppHeader } from '@/components/molecules/navigation/app-header'
import { AppSidebar } from '@/components/molecules/navigation/app-sidebar'
import { SaveStatusProvider } from '@/components/atoms/save-status'
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
  breadcrumbs,
}: {
  children: React.ReactNode
  breadcrumbs: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
    redirect('/sign-in')
  }
  // Ensure user has at least one organization
  const orgs = await listUserOrganizations()
  if (!orgs || orgs.length === 0) {
    redirect('/create-organization')
  }
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value !== 'false'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader breadcrumbs={breadcrumbs} />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  )
}
