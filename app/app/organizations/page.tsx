import { getTranslations } from 'next-intl/server'
import AcceptInvitationToast from '@/components/molecules/organization/accept-toast'

export default async function OrganizationsPage() {
  const t = await getTranslations('app.pages.organizations')
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
      </div>
    </section>
  )
}
