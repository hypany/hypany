import { Elysia, t } from 'elysia'
import 'server-only'
import { HTTP_STATUS, ULID_PATTERN } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { authPlugin } from './auth-plugin'
import { resolveEntityNameById } from '@/functions/resolve'
import { ErrorResponse } from '../docs'

const ResolvedResponse = t.Union([
  t.Object({
    type: t.Literal('hypothesis'),
    id: t.String(),
    name: t.String(),
  }),
  t.Object({
    type: t.Literal('landing_page'),
    id: t.String(),
    name: t.Nullable(t.String()),
    hypothesisId: t.String(),
  }),
  t.Object({
    type: t.Literal('waitlist'),
    id: t.String(),
    name: t.String(),
    hypothesisId: t.String(),
  }),
])

export const resolveApi = new Elysia({ prefix: '/v1/resolve' })
  .use(authPlugin)
  .get(
    '/:id',
    async ({ params, session, set }) => {
      if (!session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      const resolved = await resolveEntityNameById(params.id, orgId)
      if (!resolved)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Not found')
      return jsonOk(set, HTTP_STATUS.OK, resolved)
    },
    {
      auth: true,
      detail: {
        description: 'Resolve an entity name by ULID scoped to active organization',
        summary: 'Resolve entity name',
        tags: ['Resolve'],
      },
      params: t.Object({ id: t.String({ pattern: ULID_PATTERN }) }),
      response: {
        200: ResolvedResponse,
        400: ErrorResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
