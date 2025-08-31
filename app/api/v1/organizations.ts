/**
 * Organizations API (v1)
 * - Thin wrappers around Better Auth's organization plugin via server-side calls
 * - Exposes typed endpoints for client/server usage through Eden Treaty
 */

import { Elysia, t } from 'elysia'
import { auth } from '@/app/api/auth'
import { HTTP_STATUS } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import 'server-only'
import { ErrorResponse } from '../docs'
import { authPlugin } from './auth-plugin'

// Shared schemas
const OrgIdQuery = t.Object({
  organizationId: t.Optional(t.String()),
})

const MemberRole = t.Union([
  t.Literal('owner'),
  t.Literal('admin'),
  t.Literal('member'),
])

const InviteBody = t.Object({
  email: t.String({ format: 'email' }),
  organizationId: t.Optional(t.String()),
  resend: t.Optional(t.Boolean()),
  role: t.Union([MemberRole, t.Array(MemberRole)]),
})

const UpdateRoleBody = t.Object({
  memberId: t.String(),
  organizationId: t.Optional(t.String()),
  role: MemberRole,
})

const RemoveMemberBody = t.Object({
  memberIdOrEmail: t.String(),
  organizationId: t.Optional(t.String()),
})

const CancelInvitationBody = t.Object({
  invitationId: t.String(),
})

const LeaveBody = t.Object({
  organizationId: t.String(),
})

export const organizationsApi = new Elysia({ prefix: '/v1/organizations' })
  .use(authPlugin)
  // Active organization (full details) and activeOrganizationId
  .get(
    '/active',
    async ({ set, request }) => {
      const session = await auth.api.getSession({ headers: request.headers })
      const activeOrganizationId =
        session?.session?.activeOrganizationId ?? null
      const organization = activeOrganizationId
        ? await auth.api.getFullOrganization({ headers: request.headers })
        : null
      return jsonOk(set, HTTP_STATUS.OK, {
        activeOrganization: organization ?? null,
        activeOrganizationId,
      })
    },
    {
      auth: true,
      detail: {
        description: 'Get active organization details and id',
        summary: 'Active organization',
        tags: ['Auth'],
      },
      response: {
        200: t.Object({
          activeOrganization: t.Nullable(t.Record(t.String(), t.Any())),
          activeOrganizationId: t.Nullable(t.String()),
        }),
        401: ErrorResponse,
      },
    },
  )
  // Create organization
  .post(
    '/create',
    async ({ set, request, body }) => {
      const org = await auth.api.createOrganization({
        body,
        headers: request.headers,
      })
      if (!org) {
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Failed to create organization',
        )
      }
      return jsonOk(set, HTTP_STATUS.OK, org)
    },
    {
      auth: true,
      body: t.Object({
        keepCurrentActiveOrganization: t.Optional(t.Boolean()),
        logo: t.Optional(t.String()),
        metadata: t.Optional(t.Record(t.String(), t.Any())),
        name: t.String(),
        slug: t.String(),
      }),
      detail: {
        description: 'Create a new organization',
        summary: 'Create organization',
        tags: ['Auth'],
      },
      response: { 200: t.Record(t.String(), t.Any()), 401: ErrorResponse },
    },
  )
  // Set active organization
  .post(
    '/set-active',
    async ({ set, request, body }) => {
      const res = await auth.api.setActiveOrganization({
        body,
        headers: request.headers,
      })
      if (!res) {
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Failed to set active organization',
        )
      }
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      body: t.Object({
        organizationId: t.Optional(t.Union([t.String(), t.Null()])),
        organizationSlug: t.Optional(t.String()),
      }),
      detail: {
        description: 'Set the active organization for the session',
        summary: 'Set active organization',
        tags: ['Auth'],
      },
      response: {
        200: t.Nullable(t.Record(t.String(), t.Any())),
        401: ErrorResponse,
      },
    },
  )
  // List organizations for current user
  .get(
    '/list',
    async ({ set, request }) => {
      const organizations = await auth.api.listOrganizations({
        headers: request.headers,
      })
      return jsonOk(set, HTTP_STATUS.OK, organizations)
    },
    {
      auth: true,
      detail: {
        description: 'List organizations for the authenticated user',
        summary: 'List organizations',
        tags: ['Auth'],
      },
      response: {
        200: t.Array(t.Record(t.String(), t.Any())),
        401: ErrorResponse,
      },
    },
  )
  // List members
  .get(
    '/members',
    async ({ set, request, query, session }) => {
      const orgId = query.organizationId || session?.activeOrganizationId
      if (!orgId)
        return jsonError(
          set,
          HTTP_STATUS.BAD_REQUEST,
          'No organization specified',
        )

      const res = await auth.api.listMembers({
        headers: request.headers,
        query: { organizationId: orgId },
      })

      // Normalize to plain JSON (Dates -> ISO strings) handled by JSON.stringify
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      detail: {
        description: 'List members for an organization',
        summary: 'List members',
        tags: ['Auth'],
      },
      query: OrgIdQuery,
      response: {
        200: t.Object({
          members: t.Array(
            t.Object({
              createdAt: t.Any(),
              id: t.String(),
              organizationId: t.String(),
              role: t.String(),
              user: t.Object({
                email: t.String(),
                id: t.String(),
                image: t.Optional(t.Nullable(t.String())),
                name: t.String(),
              }),
              userId: t.String(),
            }),
          ),
          total: t.Number(),
        }),
        400: ErrorResponse,
        401: ErrorResponse,
      },
    },
  )
  // Update member role
  .post(
    '/members/update-role',
    async ({ set, request, body }) => {
      const res = await auth.api.updateMemberRole({
        body: body as any,
        headers: request.headers,
      })
      if (!res) {
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Failed to update member role',
        )
      }
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      body: UpdateRoleBody,
      detail: {
        description: "Update a member's role in an organization",
        summary: 'Update role',
        tags: ['Auth'],
      },
      response: {
        200: t.Record(t.String(), t.Any()),
        401: ErrorResponse,
      },
    },
  )
  // Remove member
  .post(
    '/members/remove',
    async ({ set, request, body }) => {
      const res = await auth.api.removeMember({
        body,
        headers: request.headers,
      })
      if (!res) {
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Failed to remove member',
        )
      }
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      body: RemoveMemberBody,
      detail: {
        description: 'Remove a member from an organization',
        summary: 'Remove member',
        tags: ['Auth'],
      },
      response: {
        200: t.Record(t.String(), t.Any()),
        401: ErrorResponse,
      },
    },
  )
  // List invitations
  .get(
    '/invitations',
    async ({ set, request, query, session }) => {
      const orgId = query.organizationId || session?.activeOrganizationId
      if (!orgId)
        return jsonError(
          set,
          HTTP_STATUS.BAD_REQUEST,
          'No organization specified',
        )

      const res = await auth.api.listInvitations({
        headers: request.headers,
        query: { organizationId: orgId },
      })
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      detail: {
        description: 'List pending invitations for an organization',
        summary: 'List invitations',
        tags: ['Auth'],
      },
      query: OrgIdQuery,
      response: {
        200: t.Array(t.Record(t.String(), t.Any())),
        400: ErrorResponse,
        401: ErrorResponse,
      },
    },
  )
  // Create invitation
  .post(
    '/invitations',
    async ({ set, request, body }) => {
      const res = await auth.api.createInvitation({
        body: body as any,
        headers: request.headers,
      })
      if (!res) {
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Failed to create invitation',
        )
      }
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      body: InviteBody,
      detail: {
        description: 'Invite a user to join an organization',
        summary: 'Invite member',
        tags: ['Auth'],
      },
      response: {
        200: t.Record(t.String(), t.Any()),
        401: ErrorResponse,
      },
    },
  )
  // Cancel invitation
  .post(
    '/invitations/cancel',
    async ({ set, request, body }) => {
      const res = await auth.api.cancelInvitation({
        body,
        headers: request.headers,
      })
      if (!res) {
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Failed to cancel invitation',
        )
      }
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      body: CancelInvitationBody,
      detail: {
        description: 'Cancel a pending invitation',
        summary: 'Cancel invitation',
        tags: ['Auth'],
      },
      response: {
        200: t.Record(t.String(), t.Any()),
        401: ErrorResponse,
      },
    },
  )
  // Accept invitation
  .post(
    '/invitations/accept',
    async ({ set, request, body }) => {
      const res = await auth.api.acceptInvitation({
        body,
        headers: request.headers,
      })
      if (!res) {
        return jsonError(
          set,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          'Failed to accept invitation',
        )
      }
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      body: t.Object({ invitationId: t.String() }),
      detail: {
        description: 'Accept an invitation to join an organization',
        summary: 'Accept invitation',
        tags: ['Auth'],
      },
      response: { 200: t.Record(t.String(), t.Any()), 401: ErrorResponse },
    },
  )
  // Leave organization
  .post(
    '/leave',
    async ({ set, request, body }) => {
      const res = await auth.api.leaveOrganization({
        body,
        headers: request.headers,
      })
      return jsonOk(set, HTTP_STATUS.OK, res)
    },
    {
      auth: true,
      body: LeaveBody,
      detail: {
        description: 'Leave the specified organization',
        summary: 'Leave organization',
        tags: ['Auth'],
      },
      response: {
        200: t.Record(t.String(), t.Any()),
        401: ErrorResponse,
      },
    },
  )

export type OrganizationsApi = typeof organizationsApi
