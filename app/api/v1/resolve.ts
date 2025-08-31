import { Elysia, t } from 'elysia'
import 'server-only'
import { resolveEntityNameById } from '@/functions/resolve'
import { HTTP_STATUS, ULID_PATTERN } from '@/lib/constants'
import { jsonError, jsonOk } from '@/lib/http'
import { ErrorResponse } from '../docs'
import { authPlugin } from './auth-plugin'

const ResolvedResponse = t.Union([
  t.Object({
    id: t.String(),
    name: t.String(),
    type: t.Literal('hypothesis'),
  }),
  t.Object({
    hypothesisId: t.String(),
    id: t.String(),
    name: t.Nullable(t.String()),
    type: t.Literal('landing_page'),
  }),
  t.Object({
    hypothesisId: t.String(),
    id: t.String(),
    name: t.String(),
    type: t.Literal('waitlist'),
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
      if (!resolved) return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Not found')
      return jsonOk(set, HTTP_STATUS.OK, resolved)
    },
    {
      auth: true,
      detail: {
        description:
          'Resolve an entity name by ULID scoped to active organization',
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
