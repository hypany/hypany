import { headers } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/auth'
import AcceptInvitationToast from '@/components/molecules/organization/accept-toast'
import { OrgSettingsForm } from '@/components/molecules/organization/org-settings-form'

export default async function OrganizationsPage() {
  const t = await getTranslations('app.pages.organizations')
  const hdrs = await headers()
  // Get active organization details
  const active = await auth.api.getFullOrganization({ headers: hdrs })
  return (
    <section aria-label={t('aria')}>
      {/* Show toast after redirects for invitation acceptance */}
      <AcceptInvitationToast />
      <div className='px-6 py-6'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          {t('title')}
        </h1>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          {t('subtitle')}
        </p>
        {active && (
          <div className='mt-6 max-w-lg rounded-lg border border-gray-200 p-4 dark:border-gray-800'>
            <h2 className='mb-2 text-sm font-medium text-gray-900 dark:text-gray-50'>
              Organization settings
            </h2>
            <OrgSettingsForm
              organizationId={(active as any).id}
              defaultName={(active as any).name}
              defaultSlug={(active as any).slug}
            />
          </div>
        )}
      </div>
    </section>
  )
}
