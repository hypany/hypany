import { getTranslations } from 'next-intl/server'
import { getServerApi } from '@/app/api/server'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import AcceptInvitationToast from '@/components/molecules/organization/accept-toast'
import { OrgAdminDialog } from '@/components/molecules/organization/org-admin-dialog'
import { OrgSettingsForm } from '@/components/molecules/organization/org-settings-form'

export default async function OrganizationsPage() {
  const t = await getTranslations('app.pages.organizations')
  const api = await getServerApi()
  const [{ data: activeRes }, { data: organizations }] = await Promise.all([
    api.v1.organizations.active.get(),
    api.v1.organizations.list.get(),
  ])
  const active = activeRes?.activeOrganization ?? null
  const activeOrgId = activeRes?.activeOrganizationId ?? null
  const orgs = Array.isArray(organizations) ? organizations : []
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
        <div className='mt-6'>
          <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Slug</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell className='text-right'>
                    Actions
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orgs.map((org: any) => (
                  <TableRow key={org.id}>
                    <TableCell className='font-medium'>{org.name}</TableCell>
                    <TableCell>{org.slug ?? '-'}</TableCell>
                    <TableCell>
                      {activeOrgId === org.id ? 'Active' : '-'}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <OrgAdminDialog orgId={org.id} orgName={org.name} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableRoot>
        </div>
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
