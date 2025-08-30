'use client'

import { useEffect, useState } from 'react'
import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from '@/components/atoms/table'
import { TabNavigation, TabNavigationLink } from '@/components/atoms/tab-navigation'
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

export function OrgAdminDialog({ orgId, orgName }: { orgId: string; orgName: string }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'members' | 'invites' | 'admin'>('members')

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

        {tab === 'members' && <MembersSection orgId={orgId} />}
        {tab === 'invites' && <InvitationsSection orgId={orgId} />}
        {tab === 'admin' && <AdminSection orgId={orgId} />}
      </DialogContent>
    </Dialog>
  )
}

function MembersSection({ orgId }: { orgId: string }) {
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<Member[]>([])

  async function load() {
    setLoading(true)
    try {
      const res = await client.organization.listMembers({ query: { organizationId: orgId } })
      const data = (res?.data as any) || []
      setMembers(
        Array.isArray(data)
          ? data.map((m: any) => ({ id: m.id, role: m.role, userId: m.userId, createdAt: m.createdAt }))
          : [],
      )
    } catch {
      setMembers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

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
                    <UpdateRoleButton orgId={orgId} memberId={m.id} currentRole={m.role} onUpdated={load} />
                    <Button
                      variant='secondary'
                      className='py-1.5'
                      onClick={async () => {
                        try {
                          await client.organization.removeMember({
                            memberIdOrEmail: m.id,
                            organizationId: orgId,
                          })
                          toast({
                            title: 'Member removed',
                            description: 'The member has been removed from the organization.',
                            variant: 'success',
                          })
                          load()
                        } catch (e) {
                          toast({
                            title: 'Failed to remove member',
                            description: 'Please try again.',
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
      <InviteMemberForm orgId={orgId} onInvited={() => {}} />
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
  const [role, setRole] = useState<Role>(
    (['owner', 'admin', 'member'] as const).includes(currentRole as any)
      ? (currentRole as Role)
      : 'member',
  )
  const [saving, setSaving] = useState(false)
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
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Role</label>
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
            <SelectTrigger className='py-1.5'>
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
                  await client.organization.updateMemberRole({
                    memberId,
                    organizationId: orgId,
                    role,
                  })
                  toast({
                    title: 'Role updated',
                    description: 'Member role updated successfully.',
                    variant: 'success',
                  })
                  setOpen(false)
                  onUpdated()
                } catch (e) {
                  toast({
                    title: 'Failed to update role',
                    description: 'Please try again.',
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

function InviteMemberForm({ orgId, onInvited }: { orgId: string; onInvited: () => void }) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('member')
  const [inviting, setInviting] = useState(false)
  return (
    <div className='rounded-md border border-gray-200 p-3 dark:border-gray-800'>
      <h3 className='text-sm font-medium text-gray-900 dark:text-gray-50'>Invite member</h3>
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
                title: 'Enter an email address',
                description: 'Email is required to send an invitation.',
              })
              return
            }
            setInviting(true)
            try {
              await client.organization.inviteMember({ email: e, role, organizationId: orgId })
              toast({
                title: 'Invitation sent',
                description: `An invitation was sent to ${e}.`,
                variant: 'success',
              })
              setEmail('')
              onInvited()
            } catch (err) {
              toast({
                title: 'Failed to send invitation',
                description: 'Please verify the email and try again.',
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

function InvitationsSection({ orgId }: { orgId: string }) {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await client.organization.listInvitations({ query: { organizationId: orgId } })
      const data = (res?.data as any) || []
      setInvitations(
        Array.isArray(data)
          ? data.map((i: any) => ({ id: i.id, email: i.email, role: i.role, status: i.status, expiresAt: i.expiresAt }))
          : [],
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

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
                <TableCell>{Array.isArray(inv.role) ? inv.role.join(', ') : inv.role ?? '-'}</TableCell>
                <TableCell>{inv.status ?? 'pending'}</TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-2'>
                    <Button
                      variant='secondary'
                      className='py-1.5'
                      onClick={async () => {
                        try {
                          await client.organization.cancelInvitation({ invitationId: inv.id })
                          toast({
                            title: 'Invitation cancelled',
                            description: 'The invitation has been cancelled.',
                            variant: 'success',
                          })
                          load()
                        } catch (e) {
                          toast({
                            title: 'Failed to cancel invitation',
                            description: 'Please try again.',
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

      <InviteMemberForm orgId={orgId} onInvited={load} />
    </div>
  )
}

function AdminSection({ orgId }: { orgId: string }) {
  const [leaving, setLeaving] = useState(false)
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
              await client.organization.leave({ organizationId: orgId })
              toast({
                title: 'Left organization',
                description: 'You have left the organization.',
                variant: 'success',
              })
              window.location.reload()
            } catch (e) {
              toast({
                title: 'Failed to leave organization',
                description: 'Please try again.',
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
