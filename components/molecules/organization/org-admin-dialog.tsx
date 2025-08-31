'use client'

import { useId, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import {
  TabNavigation,
  TabNavigationLink,
} from '@/components/atoms/tab-navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import { toast } from '@/lib/use-toast'

type Member = {
  id: string
  userId: string
  role: string
  createdAt?: string | Date | null
}

type Invitation = {
  id: string
  email: string
  role?: string | string[] | null
  status?: string | null
  expiresAt?: string | Date | null
}

type OrgAdminDialogProps = {
  orgId: string
  orgName: string
  initialMembers: Member[]
  initialInvitations: Invitation[]
}

export function OrgAdminDialog({
  orgId,
  orgName,
  initialMembers,
  initialInvitations,
}: OrgAdminDialogProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'members' | 'invites' | 'admin'>('members')
  // State for members and invitations, initialized from server data
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [invitations, setInvitations] =
    useState<Invitation[]>(initialInvitations)
  const [membersLoading, setMembersLoading] = useState(false)
  const [invitationsLoading, setInvitationsLoading] = useState(false)

  // Functions to reload data after mutations
  const api = getClientApi()
  async function reloadMembers() {
    setMembersLoading(true)
    try {
      const res = await api.v1.organizations.members.get({
        query: { organizationId: orgId },
      })
      const data = res.data?.members ?? []
      setMembers(
        data.map((m: any) => ({
          createdAt: m.createdAt as unknown as string | Date,
          id: m.id,
          role: m.role,
          userId: m.userId,
        })),
      )
    } catch {
      setMembers([])
    } finally {
      setMembersLoading(false)
    }
  }
  async function reloadInvitations() {
    setInvitationsLoading(true)
    try {
      const res = await api.v1.organizations.invitations.get({
        query: { organizationId: orgId },
      })
      const data = res.data ?? []
      setInvitations(
        data.map((i: any) => ({
          email: i.email,
          expiresAt: i.expiresAt as unknown as string | Date,
          id: i.id,
          role: i.role as unknown as string | string[] | null,
          status: (i as { status?: string }).status ?? 'pending',
        })),
      )
    } finally {
      setInvitationsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' className='py-1.5'>
          Manage
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Manage “{orgName}”</DialogTitle>
        </DialogHeader>
        <div className='px-1'>
          <TabNavigation className='gap-x-4'>
            {(
              [
                { key: 'members', label: 'Members' },
                { key: 'invites', label: 'Invitations' },
                { key: 'admin', label: 'Admin' },
              ] as const
            ).map((x) => (
              <TabNavigationLink
                key={x.key}
                asChild
                active={tab === x.key}
                onClick={() => setTab(x.key)}
              >
                <button type='button'>{x.label}</button>
              </TabNavigationLink>
            ))}
          </TabNavigation>
        </div>

        {tab === 'members' && (
          <MembersSection
            orgId={orgId}
            members={members}
            loading={membersLoading}
            onMembersChanged={reloadMembers}
          />
        )}
        {tab === 'invites' && (
          <InvitationsSection
            orgId={orgId}
            invitations={invitations}
            loading={invitationsLoading}
            onInvitationsChanged={reloadInvitations}
          />
        )}
        {tab === 'admin' && <AdminSection orgId={orgId} />}
      </DialogContent>
    </Dialog>
  )
}

type MembersSectionProps = {
  orgId: string
  members: Member[]
  loading: boolean
  onMembersChanged: () => void
}

function MembersSection({
  orgId,
  members,
  loading,
  onMembersChanged,
}: MembersSectionProps) {
  const api = getClientApi()

  return (
    <div className='space-y-4'>
      <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Member ID</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell className='text-right'>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(loading ? [] : members).map((m) => (
              <TableRow key={m.id}>
                <TableCell className='font-medium'>{m.id}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-2'>
                    <UpdateRoleButton
                      orgId={orgId}
                      memberId={m.id}
                      currentRole={m.role}
                      onUpdated={onMembersChanged}
                    />
                    <Button
                      variant='secondary'
                      className='py-1.5'
                      onClick={async () => {
                        try {
                          await api.v1.organizations.members.remove.post({
                            memberIdOrEmail: m.id,
                            organizationId: orgId,
                          })
                          toast({
                            description:
                              'The member has been removed from the organization.',
                            title: 'Member removed',
                            variant: 'success',
                          })
                          onMembersChanged()
                        } catch (e) {
                          toast({
                            description: 'Please try again.',
                            title:
                              (e as Error).message ?? 'Failed to remove member',
                            variant: 'error',
                          })
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
      <InviteMemberForm orgId={orgId} onInvited={onMembersChanged} />
    </div>
  )
}

type Role = 'owner' | 'admin' | 'member'

function UpdateRoleButton({
  orgId,
  memberId,
  currentRole,
  onUpdated,
}: {
  orgId: string
  memberId: string
  currentRole: string
  onUpdated: () => void
}) {
  const [open, setOpen] = useState(false)
  const allowed: readonly Role[] = ['owner', 'admin', 'member']
  const [role, setRole] = useState<Role>(
    allowed.includes(currentRole as Role) ? (currentRole as Role) : 'member',
  )
  const [saving, setSaving] = useState(false)
  const api = getClientApi()
  const roleId = useId()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' className='py-1.5'>
          Update Role
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>
        <div className='space-y-3'>
          <label
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            htmlFor={roleId}
          >
            Role
          </label>
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
            <SelectTrigger className='py-1.5' id={roleId}>
              <SelectValue placeholder='Select role' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='member'>member</SelectItem>
              <SelectItem value='admin'>admin</SelectItem>
              <SelectItem value='owner'>owner</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex justify-end gap-2'>
            <Button
              onClick={async () => {
                setSaving(true)
                try {
                  await api.v1.organizations.members['update-role'].post({
                    memberId,
                    organizationId: orgId,
                    role,
                  })
                  toast({
                    description: 'Member role updated successfully.',
                    title: 'Role updated',
                    variant: 'success',
                  })
                  setOpen(false)
                  onUpdated()
                } catch (e) {
                  toast({
                    description: 'Please try again.',
                    title: (e as Error).message ?? 'Failed to update role',
                    variant: 'error',
                  })
                } finally {
                  setSaving(false)
                }
              }}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InviteMemberForm({
  orgId,
  onInvited,
}: {
  orgId: string
  onInvited: () => void
}) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('member')
  const [inviting, setInviting] = useState(false)
  const api = getClientApi()
  return (
    <div className='rounded-md border border-gray-200 p-3 dark:border-gray-800'>
      <h3 className='text-sm font-medium text-gray-900 dark:text-gray-50'>
        Invite member
      </h3>
      <div className='mt-2 flex flex-col gap-2 sm:flex-row'>
        <Input
          placeholder='user@example.com'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='py-1.5'
        />
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger className='py-1.5 sm:w-48'>
            <SelectValue placeholder='Select role' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='member'>member</SelectItem>
            <SelectItem value='admin'>admin</SelectItem>
            <SelectItem value='owner'>owner</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={async () => {
            const e = email.trim()
            if (!e) {
              toast({
                description: 'Email is required to send an invitation.',
                title: 'Enter an email address',
              })
              return
            }
            setInviting(true)
            try {
              await api.v1.organizations.invitations.post({
                email: e,
                organizationId: orgId,
                role,
              })
              toast({
                description: `An invitation was sent to ${e}.`,
                title: 'Invitation sent',
                variant: 'success',
              })
              setEmail('')
              onInvited()
            } catch (e) {
              toast({
                description: 'Please verify the email and try again.',
                title: (e as Error).message ?? 'Failed to send invitation',
                variant: 'error',
              })
            } finally {
              setInviting(false)
            }
          }}
          disabled={inviting}
        >
          {inviting ? 'Inviting…' : 'Invite'}
        </Button>
      </div>
    </div>
  )
}

type InvitationsSectionProps = {
  orgId: string
  invitations: Invitation[]
  loading: boolean
  onInvitationsChanged: () => void
}

function InvitationsSection({
  orgId,
  invitations,
  loading,
  onInvitationsChanged,
}: InvitationsSectionProps) {
  const api = getClientApi()

  return (
    <div className='space-y-4'>
      <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell className='text-right'>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(loading ? [] : invitations).map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className='font-medium'>{inv.email}</TableCell>
                <TableCell>
                  {Array.isArray(inv.role)
                    ? inv.role.join(', ')
                    : (inv.role ?? '-')}
                </TableCell>
                <TableCell>{inv.status ?? 'pending'}</TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-2'>
                    <Button
                      variant='secondary'
                      className='py-1.5'
                      onClick={async () => {
                        try {
                          await api.v1.organizations.invitations.cancel.post({
                            invitationId: inv.id,
                          })
                          toast({
                            description: 'The invitation has been cancelled.',
                            title: 'Invitation cancelled',
                            variant: 'success',
                          })
                          onInvitationsChanged()
                        } catch (e) {
                          toast({
                            description: 'Please try again.',
                            title:
                              (e as Error).message ??
                              'Failed to cancel invitation',
                            variant: 'error',
                          })
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>

      <InviteMemberForm orgId={orgId} onInvited={onInvitationsChanged} />
    </div>
  )
}

function AdminSection({ orgId }: { orgId: string }) {
  const [leaving, setLeaving] = useState(false)
  const api = getClientApi()
  return (
    <div className='space-y-3'>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        Administrative actions for this organization.
      </p>
      <div className='flex items-center gap-2'>
        <Button
          variant='secondary'
          onClick={async () => {
            setLeaving(true)
            try {
              await api.v1.organizations.leave.post({ organizationId: orgId })
              toast({
                description: 'You have left the organization.',
                title: 'Left organization',
                variant: 'success',
              })
              window.location.reload()
            } catch (e) {
              toast({
                description: 'Please try again.',
                title: (e as Error).message ?? 'Failed to leave organization',
                variant: 'error',
              })
            } finally {
              setLeaving(false)
            }
          }}
          disabled={leaving}
        >
          {leaving ? 'Leaving…' : 'Leave Organization'}
        </Button>
      </div>
    </div>
  )
}
