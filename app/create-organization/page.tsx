import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/auth/server'
import { CreateOrganizationForm } from '@/components/molecules/organization/create-organization-form'
import { listUserOrganizations } from '@/functions/organizations'

export const metadata: Metadata = {
  description: 'Create your first organization to get started.',
  title: 'Create Organization - Hypany',
}

export default async function CreateOrganizationPage() {
  // If the user already has an organization, bounce back to app
  const session = await getSession()
  if (!session) {
    redirect('/sign-in?next=/create-organization')
  }

  try {
    const orgs = await listUserOrganizations()
    if (Array.isArray(orgs) && orgs.length > 0) {
      redirect('/app')
    }
  } catch {
    redirect('/sign-in?next=/create-organization')
  }

  return (
    <main className='flex min-h-svh flex-col items-center justify-center p-6'>
      <div className='w-full max-w-sm space-y-6'>
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
            Create your organization
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            You’ll use this workspace to manage your hypotheses and landing pages.
          </p>
        </div>
        <CreateOrganizationForm />
      </div>
    </main>
  )
}
