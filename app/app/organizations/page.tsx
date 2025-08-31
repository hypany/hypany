import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/auth/server'
import { listUserOrganizations, getActiveOrganization } from '@/functions/organizations'
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
  await requireAuth()
  const [activeRes, organizations] = await Promise.all([
    getActiveOrganization(),
    listUserOrganizations(),
  ])
  type Organizations = Awaited<ReturnType<typeof listUserOrganizations>>
  type Organization = Organizations extends Array<infer T> ? T : never
  const orgs: Organization[] = Array.isArray(organizations) ? (organizations as Organization[]) : []
  const activeOrgId = activeRes?.activeOrganizationId ?? null
  const active = orgs.find(org => org.id === activeOrgId) ?? null
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
                {orgs.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className='font-medium'>{org.name}</TableCell>
                    <TableCell>{org.slug ?? '-'}</TableCell>
                    <TableCell>
                      {activeOrgId === org.id ? 'Active' : '-'}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <OrgAdminDialog
                          orgId={org.id}
                          orgName={org.name}
                          initialMembers={[]}
                          initialInvitations={[]}
                        />
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
              organizationId={active.id}
              defaultName={active.name}
              defaultSlug={active.slug ?? ''}
            />
          </div>
        )}
      </div>
    </section>
  )
}
