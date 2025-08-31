import { Pencil } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/auth/server'
import {
  getActiveOrganization,
  listUserOrganizations,
} from '@/functions/organizations'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from '@/components/atoms/table'
import { Card } from '@/components/atoms/card'
import AcceptInvitationToast from '@/components/molecules/organization/accept-toast'
import { OrgAdminDialog } from '@/components/molecules/organization/org-admin-dialog'
import { OrgSettingsForm } from '@/components/molecules/organization/org-settings-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/atoms/dialog'
import { Badge } from '@/components/atoms/badge'
import SetActiveOrgButton from '@/components/molecules/organization/set-active-org-button'

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
  // active org data available via activeOrgId; per-row settings dialog handles edits

  function initials(name?: string) {
    if (!name) return 'O'
    const parts = name.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const second = parts[1]?.[0] ?? ''
    return (first + second).toUpperCase() || (first || 'O').toUpperCase()
  }

  function hueFromString(s: string) {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
    return h
  }

  return (
    <section aria-label={t('aria')}>
      <AcceptInvitationToast />
      <div className='px-6 py-6'>
        <div className='mt-0 grid grid-cols-1 gap-6'>
          <div className='col-span-1'>
            <Card className='p-0 overflow-hidden'>
              <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
                <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>URL</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell className='text-right'>Actions</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orgs.map((org) => {
                    const isActive = activeOrgId === org.id
                    return (
                      <TableRow key={org.id}>
                        <TableCell className='font-medium'>
                          <span className='inline-flex items-center gap-2'>
                            <span className='relative inline-flex size-6 items-center justify-center overflow-hidden rounded-sm ring-1 ring-gray-200 dark:ring-gray-800'>
                              <span
                                className='size-full text-[10px] leading-none text-white'
                                style={{
                                  backgroundColor: `hsl(${hueFromString(org.name)} 70% 45%)`,
                                  display: 'grid',
                                  placeItems: 'center',
                                }}
                                aria-hidden='true'
                              >
                                {initials(org.name)}
                              </span>
                            </span>
                            <span className='truncate'>{org.name}</span>
                          </span>
                        </TableCell>
                        <TableCell>
                          {org.slug ? (
                            <span className='font-mono text-gray-700 dark:text-gray-300'>
                              /o/{org.slug}
                            </span>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          {isActive ? (
                            <Badge variant='success'>Active</Badge>
                          ) : (
                            <span className='text-gray-400 dark:text-gray-600'>—</span>
                          )}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex items-center justify-end gap-3'>
                            {!isActive && (
                              <SetActiveOrgButton organizationId={org.id} />
                            )}
                            <Dialog>
                              <DialogTrigger asChild>
                                <button type='button' className='group inline-flex items-center gap-1 text-emerald-600 hover:underline dark:text-emerald-500'>
                                  Settings
                                  <Pencil className='size-3.5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-600' />
                                </button>
                              </DialogTrigger>
                              <DialogContent className='sm:max-w-md'>
                                <DialogHeader>
                                  <DialogTitle>Organization settings</DialogTitle>
                                </DialogHeader>
                                <OrgSettingsForm
                                  organizationId={org.id}
                                  defaultName={org.name}
                                  defaultSlug={(org as any).slug ?? ''}
                                />
                              </DialogContent>
                            </Dialog>
                            <OrgAdminDialog
                              orgId={org.id}
                              orgName={org.name}
                              initialMembers={[]}
                              initialInvitations={[]}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                </Table>
              </TableRoot>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
