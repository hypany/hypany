'use client'

import Image from 'next/image'
import React, { useCallback, useEffect, useId, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Badge } from '@/components/atoms/badge'
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
  user?: { id: string; name: string; email: string; image?: string | null }
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
  const reloadMembers = useCallback(async () => {
    setMembersLoading(true)
    try {
      const res = await fetch(
        `/api/v1/organizations/members?organizationId=${encodeURIComponent(orgId)}`,
        { method: 'GET' },
      )
      const json = (await res.json()) as {
        members: Array<{
          createdAt: string | Date
          id: string
          organizationId: string
          role: string
          user: {
            id: string
            name: string
            email: string
            image?: string | null
          }
          userId: string
        }>
        total: number
      }
      const data = json.members ?? []
      setMembers(
        data.map((m) => ({
          createdAt: m.createdAt as unknown as string | Date,
          id: m.id,
          role: m.role,
          user: {
            email: m.user?.email as string,
            id: m.user?.id as string,
            image: (m.user?.image as string | null) ?? null,
            name: m.user?.name as string,
          },
          userId: m.userId,
        })),
      )
    } catch {
      setMembers([])
    } finally {
      setMembersLoading(false)
    }
  }, [orgId])
  const reloadInvitations = useCallback(async () => {
    setInvitationsLoading(true)
    try {
      const res = await fetch(
        `/api/v1/organizations/invitations?organizationId=${encodeURIComponent(orgId)}`,
        { method: 'GET' },
      )
      const data = (await res.json()) as Array<{
        email: string
        expiresAt?: string | Date | null
        id: string
        role?: string | string[] | null
        status?: string | null
      }>
      setInvitations(
        data.map((i) => ({
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
  }, [orgId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Manage</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Manage “{orgName}”</DialogTitle>
        </DialogHeader>
        {/* Load data on open */}
        <LoadOnOpen
          open={open}
          tab={tab}
          onLoadMembers={reloadMembers}
          onLoadInvitations={reloadInvitations}
        />
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
              <TableHeaderCell>Member</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell className='text-right'>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(loading ? [] : members).map((m) => (
              <TableRow key={m.id}>
                <TableCell className='font-medium'>
                  <div className='flex items-center gap-3'>
                    <div className='relative inline-flex size-7 items-center justify-center overflow-hidden rounded-sm ring-1 ring-gray-200 dark:ring-gray-800'>
                      {m.user?.image ? (
                        <Image
                          src={m.user.image}
                          alt={m.user.name}
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <span className='grid h-full w-full place-items-center bg-gray-200 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                          {m.user?.name?.[0]?.toUpperCase() ?? 'U'}
                        </span>
                      )}
                    </div>
                    <div className='min-w-0'>
                      <div className='truncate text-sm text-gray-900 dark:text-gray-50'>
                        {m.user?.name || m.userId}
                      </div>
                      <div className='truncate text-xs text-gray-500 dark:text-gray-500'>
                        {m.user?.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant='neutral'>{m.role}</Badge>
                </TableCell>
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
                            description:
                              e instanceof Error
                                ? e.message
                                : 'Failed to remove member',
                            title: 'Error',
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

function LoadOnOpen({
  open,
  tab,
  onLoadMembers,
  onLoadInvitations,
}: {
  open: boolean
  tab: 'members' | 'invites' | 'admin'
  onLoadMembers: () => void
  onLoadInvitations: () => void
}) {
  const fetchedRef = React.useRef({ invites: false, members: false })
  useEffect(() => {
    if (!open) {
      fetchedRef.current = { invites: false, members: false }
      return
    }
    if (tab === 'members' && !fetchedRef.current.members) {
      fetchedRef.current.members = true
      onLoadMembers()
    }
    if (tab === 'invites' && !fetchedRef.current.invites) {
      fetchedRef.current.invites = true
      onLoadInvitations()
    }
  }, [open, tab, onLoadMembers, onLoadInvitations])
  return null
}

type Role = 'admin' | 'member' | 'guest'

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
  const allowed: readonly Role[] = ['admin', 'member', 'guest']
  const [role, setRole] = useState<Role>(
    allowed.includes(currentRole as Role) ? (currentRole as Role) : 'member',
  )
  const [saving, setSaving] = useState(false)
  const api = getClientApi()
  const roleId = useId()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Update Role</Button>
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
            <SelectTrigger id={roleId}>
              <SelectValue placeholder='Select role' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='member'>member</SelectItem>
              <SelectItem value='admin'>admin</SelectItem>
              <SelectItem value='guest'>guest</SelectItem>
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
                    description:
                      e instanceof Error ? e.message : 'Failed to update role',
                    title: 'Error',
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
        />
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger className='py-1.5 sm:w-48'>
            <SelectValue placeholder='Select role' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='member'>member</SelectItem>
            <SelectItem value='admin'>admin</SelectItem>
            <SelectItem value='guest'>guest</SelectItem>
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
                description:
                  e instanceof Error ? e.message : 'Failed to send invitation',
                title:
                  e instanceof Error ? e.message : 'Failed to send invitation',
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
                  {Array.isArray(inv.role) ? (
                    <span className='flex flex-wrap gap-1'>
                      {inv.role.map((r) => (
                        <Badge key={r} variant='neutral'>
                          {r}
                        </Badge>
                      ))}
                    </span>
                  ) : inv.role ? (
                    <Badge variant='neutral'>{inv.role}</Badge>
                  ) : (
                    <span className='text-gray-400 dark:text-gray-600'>—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant='neutral'>{inv.status ?? 'pending'}</Badge>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-2'>
                    <Button
                      variant='secondary'
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
                              e instanceof Error
                                ? e.message
                                : 'Failed to cancel invitation',
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
                description:
                  e instanceof Error
                    ? e.message
                    : 'Failed to leave organization',
                title: 'Error',
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
