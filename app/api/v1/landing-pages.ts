/**
 * Landing Pages API (v1)
 * - Configure landing page metadata, domain, and template
 * - Manage content blocks (create/update/delete/reorder/replace)
 * - Resolve and verify domain connectivity
 */

import { and, eq, isNull, ne } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import humanId from 'human-id'
import { db } from '@/drizzle'
import { HTTP_STATUS } from '@/lib/constants'
import { normalizeHostname } from '@/lib/domains'
import { jsonError, jsonOk } from '@/lib/http'
import { logger } from '@/lib/logger'
import { normalizeSlug, validateSlug } from '@/lib/slug-validation'
import {
  ensureVercelProjectDomains,
  removeVercelProjectDomains,
} from '@/lib/vercel'
import { hypotheses, landingPageBlocks, landingPages } from '@/schema'
import 'server-only'
import { ulid } from 'ulid'
import { ErrorResponse, SuccessResponse, UlidParam } from '../docs'
import { getLandingPageIdForOrg } from '../utils'
import { authPlugin } from './auth-plugin'
import {
  createVersion,
  getLandingPageDocument,
  publishLandingPage as publishDoc,
  restoreVersion as restoreDocVersion,
  listVersions,
  saveLandingPageDraft,
} from '@/functions/landing-page-docs'

// Block types for landing pages (aligned with templates/types.ts)
const BlockTypes = t.Union([
  t.Literal('meta'),
  t.Literal('theme'),
  t.Literal('hero'),
  t.Literal('partners'),
  t.Literal('features'),
  t.Literal('benefits'),
  t.Literal('faq'),
  t.Literal('finalCta'),
  t.Literal('footer'),
])

// Validation schemas
const LandingPageSchema = {
  block: t.Object({
    content: t.String(), // JSON string
    order: t.String(),
    type: BlockTypes,
  }),

  blockUpdate: t.Object({
    content: t.Optional(t.String()),
    order: t.Optional(t.String()),
  }),
  update: t.Object({
    customCss: t.Optional(t.String()),
    // Allow empty string to indicate removal; handler converts '' -> null
    customDomain: t.Optional(
      t.Union([t.String({ format: 'hostname' }), t.Literal('')]),
    ),
    favicon: t.Optional(t.String({ format: 'uri' })),
    metaDescription: t.Optional(t.String({ maxLength: 160 })),
    metaTitle: t.Optional(t.String({ maxLength: 60 })),
    ogImage: t.Optional(t.String({ format: 'uri' })),
    slug: t.Optional(t.String({ maxLength: 63, minLength: 3 })),
    template: t.Optional(t.String()),
  }),
}

export const landingPagesApi = new Elysia({ prefix: '/v1/landing-pages' })
  .use(authPlugin)
  // PageDocument: get draft/published JSON
  .get(
    '/by-id/:landingPageId/document',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      const { landingPage } = await getLandingPageDocument(
        params.landingPageId,
        orgId,
      )
      if (!landingPage)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')
      return jsonOk(set, HTTP_STATUS.OK, {
        draft: landingPage.builderDraftJson || null,
        published: landingPage.builderPublishedJson || null,
        publishedAt: landingPage.publishedAt || null,
        customCss: landingPage.customCss || null,
      })
    },
    {
      auth: true,
      detail: {
        description: 'Get PageDocument draft/published JSON',
        summary: 'Get PageDocument',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: {
        200: t.Object({
          draft: t.Nullable(t.String()),
          published: t.Nullable(t.String()),
          publishedAt: t.Nullable(t.Date()),
          customCss: t.Nullable(t.String()),
        }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
  // PageDocument: save draft JSON
  .put(
    '/by-id/:landingPageId/document',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Ensure ownership
      const { landingPage } = await getLandingPageDocument(
        params.landingPageId,
        orgId,
      )
      if (!landingPage)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      // Minimal validation of PageDocument
      try {
        const doc = JSON.parse(body.doc)
        if (
          !doc ||
          typeof doc !== 'object' ||
          doc.version !== 1 ||
          !Array.isArray(doc.nodes)
        ) {
          return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'Invalid document')
        }
      } catch {
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'Invalid JSON')
      }

      await saveLandingPageDraft(params.landingPageId, JSON.parse(body.doc))
      return jsonOk(set)
    },
    {
      auth: true,
      body: t.Object({ doc: t.String() }),
      detail: {
        description: 'Save PageDocument draft JSON',
        summary: 'Save PageDocument draft',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: { 200: SuccessResponse, 400: ErrorResponse, 401: ErrorResponse, 404: ErrorResponse },
    },
  )
  // PageDocument: publish draft -> published
  .post(
    '/by-id/:landingPageId/publish',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')
      const { landingPage } = await getLandingPageDocument(
        params.landingPageId,
        orgId,
      )
      if (!landingPage)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')
      await publishDoc(params.landingPageId)
      return jsonOk(set)
    },
    {
      auth: true,
      detail: {
        description: 'Publish current draft to published PageDocument',
        summary: 'Publish PageDocument',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: { 200: SuccessResponse, 401: ErrorResponse, 404: ErrorResponse },
    },
  )
  // PageDocument: list versions
  .get(
    '/by-id/:landingPageId/versions',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')
      const { landingPage } = await getLandingPageDocument(
        params.landingPageId,
        orgId,
      )
      if (!landingPage)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')
      const versions = await listVersions(params.landingPageId)
      return jsonOk(set, HTTP_STATUS.OK, { versions })
    },
    {
      auth: true,
      detail: {
        description: 'List saved versions of PageDocument',
        summary: 'List versions',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: {
        200: t.Object({
          versions: t.Array(
            t.Object({
              id: t.String(),
              version: t.Number(),
              message: t.Nullable(t.String()),
              createdAt: t.Date(),
            }),
          ),
        }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
  // PageDocument: save a new version (snapshot current draft)
  .post(
    '/by-id/:landingPageId/versions',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')
      const { landingPage } = await getLandingPageDocument(
        params.landingPageId,
        orgId,
      )
      if (!landingPage)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')
      const draft = landingPage.builderDraftJson
      if (!draft)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No draft to snapshot')
      const id = await createVersion(
        params.landingPageId,
        draft,
        user.id,
        body.message ?? undefined,
      )
      return jsonOk(set, HTTP_STATUS.CREATED, { id })
    },
    {
      auth: true,
      body: t.Object({ message: t.Optional(t.String()) }),
      detail: {
        description: 'Create a version from current draft',
        summary: 'Create version',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: { 201: t.Object({ id: t.String() }), 400: ErrorResponse, 401: ErrorResponse, 404: ErrorResponse },
    },
  )
  // PageDocument: restore version into draft
  .post(
    '/by-id/:landingPageId/restore',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')
      const { landingPage } = await getLandingPageDocument(
        params.landingPageId,
        orgId,
      )
      if (!landingPage)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')
      await restoreDocVersion(params.landingPageId, body.version)
      return jsonOk(set)
    },
    {
      auth: true,
      body: t.Object({ version: t.Number() }),
      detail: {
        description: 'Restore a saved version into draft',
        summary: 'Restore version',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: { 200: SuccessResponse, 401: ErrorResponse, 404: ErrorResponse },
    },
  )
  // List landing pages for a hypothesis
  .get(
    '/hypothesis/:hypothesisId/list',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Verify hypothesis ownership
      const [hyp] = await db
        .select({ id: hypotheses.id })
        .from(hypotheses)
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.organizationId, orgId),
            isNull(hypotheses.deletedAt),
          ),
        )
        .limit(1)
      if (!hyp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Hypothesis not found')

      const pages = await db
        .select({
          id: landingPages.id,
          name: landingPages.name,
          publishedAt: landingPages.publishedAt,
          template: landingPages.template,
          updatedAt: landingPages.updatedAt,
        })
        .from(landingPages)
        .where(
          and(
            eq(landingPages.hypothesisId, params.hypothesisId),
            isNull(landingPages.deletedAt),
          ),
        )

      return jsonOk(set, HTTP_STATUS.OK, { pages })
    },
    {
      auth: true,
      detail: {
        description: 'List all landing pages for a hypothesis',
        summary: 'List landing pages',
        tags: ['Landing Pages'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: {
        200: t.Object({
          pages: t.Array(
            t.Object({
              id: t.String(),
              name: t.Nullable(t.String()),
              publishedAt: t.Nullable(t.Date()),
              template: t.String(),
              updatedAt: t.Date(),
            }),
          ),
        }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
  // Set active landing page for a hypothesis
  .post(
    '/hypothesis/:hypothesisId/active',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Verify hypothesis ownership
      const [hyp] = await db
        .select({ id: hypotheses.id })
        .from(hypotheses)
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.organizationId, orgId),
            isNull(hypotheses.deletedAt),
          ),
        )
        .limit(1)
      if (!hyp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Hypothesis not found')

      // Verify landing page belongs to this hypothesis
      const [lp] = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .where(
          and(
            eq(landingPages.id, body.landingPageId),
            eq(landingPages.hypothesisId, params.hypothesisId),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)
      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      // Update activeLandingPageId
      await db
        .update(hypotheses)
        .set({
          activeLandingPageId: body.landingPageId as unknown as string,
          updatedAt: new Date(),
        })
        .where(eq(hypotheses.id, params.hypothesisId))

      return jsonOk(set)
    },
    {
      auth: true,
      body: t.Object({ landingPageId: UlidParam }),
      detail: {
        description: 'Set the active landing page for a hypothesis',
        summary: 'Set active landing page',
        tags: ['Landing Pages'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: { 200: SuccessResponse, 401: ErrorResponse, 404: ErrorResponse },
    },
  )
  // Create a new landing page for a hypothesis
  .post(
    '/hypothesis/:hypothesisId/create',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Verify hypothesis ownership
      const [hypothesis] = await db
        .select({ id: hypotheses.id })
        .from(hypotheses)
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.organizationId, orgId),
            isNull(hypotheses.deletedAt),
          ),
        )
        .limit(1)
      if (!hypothesis)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Hypothesis not found')

      const id = ulid()
      await db.insert(landingPages).values({
        createdAt: new Date(),
        hypothesisId: params.hypothesisId,
        id,
        name: humanId({
          separator: '-',
        })
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase(),
        template: 'default',
        updatedAt: new Date(),
      })
      return jsonOk(set, HTTP_STATUS.CREATED, { id })
    },
    {
      auth: true,
      detail: {
        description: 'Create a landing page under the given hypothesis',
        summary: 'Create landing page',
        tags: ['Landing Pages'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: {
        201: t.Object({ id: t.String() }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Update landing page by ID (currently supports name only)
  .patch(
    '/by-id/:landingPageId',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Ensure landing page belongs to org via hypothesis
      const [lp] = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(landingPages.id, params.landingPageId),
            eq(hypotheses.organizationId, orgId),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)
      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      const changes: Record<string, unknown> = {}
      if (typeof body.name !== 'undefined') changes.name = body.name
      if (Object.keys(changes).length === 0) return jsonOk(set)

      await db
        .update(landingPages)
        .set({ ...changes, updatedAt: new Date() })
        .where(eq(landingPages.id, params.landingPageId))
      return jsonOk(set)
    },
    {
      auth: true,
      body: t.Object({ name: t.Optional(t.String({ maxLength: 80 })) }),
      detail: {
        description: 'Update landing page (by ID) - name only',
        summary: 'Update landing page (by ID)',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
  // Update landing page by hypothesis ID
  .patch(
    '/hypothesis/:hypothesisId',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Resolve landing page via org ownership
      const lp = await getLandingPageIdForOrg(orgId, params.hypothesisId)

      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      // If customDomain is being updated, ensure uniqueness and basic format
      if (typeof body.customDomain !== 'undefined') {
        const normalized = body.customDomain
          ? normalizeHostname(body.customDomain)
          : null
        if (normalized) {
          // Very basic hostname validation
          const hostRegex =
            /^(?=.{1,253}$)(?!-)[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/
          if (!hostRegex.test(normalized)) {
            return jsonError(
              set,
              HTTP_STATUS.BAD_REQUEST,
              'Invalid domain format',
            )
          }

          // Ensure no other hypothesis is using this custom domain
          const existing = await db
            .select({ id: hypotheses.id })
            .from(hypotheses)
            .where(
              and(
                eq(hypotheses.customDomain, normalized),
                isNull(hypotheses.deletedAt),
              ),
            )
            .limit(1)

          if (existing.length > 0) {
            return jsonError(
              set,
              HTTP_STATUS.BAD_REQUEST,
              'This domain is already connected to another page',
            )
          }

          body.customDomain = normalized
        } else {
          // Allow clearing custom domain
          body.customDomain = null as unknown as string | undefined
        }
      }

      // Validate slug if present (slug now lives on hypotheses)
      let nextSlug: string | undefined
      if (body.slug) {
        const normalizedSlug = normalizeSlug(body.slug)
        const validation = validateSlug(normalizedSlug)
        if (!validation.valid) {
          return jsonError(
            set,
            HTTP_STATUS.BAD_REQUEST,
            validation.error || 'Invalid slug',
          )
        }
        const existing = await db
          .select({ id: hypotheses.id })
          .from(hypotheses)
          .where(
            and(
              eq(hypotheses.slug, normalizedSlug),
              ne(hypotheses.id, params.hypothesisId),
            ),
          )
          .limit(1)
        if (existing.length > 0) {
          return jsonError(
            set,
            HTTP_STATUS.BAD_REQUEST,
            'This subdomain is already taken',
          )
        }
        nextSlug = normalizedSlug
      }

      const {
        slug: _slug,
        customDomain: _cd,
        ...lpUpdates
      } = body as Record<string, string | null | undefined>
      await db
        .update(landingPages)
        .set({ ...(lpUpdates as object), updatedAt: new Date() })
        .where(eq(landingPages.id, lp.id))

      if (typeof nextSlug !== 'undefined') {
        await db
          .update(hypotheses)
          .set({ slug: nextSlug, updatedAt: new Date() })
          .where(eq(hypotheses.id, params.hypothesisId))
      }

      // Best-effort: update hypothesis customDomain and sync domains
      try {
        if (typeof body.customDomain !== 'undefined') {
          const normalized =
            (body.customDomain as unknown as string | null) || null
          // get previous
          const [prev] = await db
            .select({ customDomain: hypotheses.customDomain })
            .from(hypotheses)
            .where(eq(hypotheses.id, params.hypothesisId))
            .limit(1)

          await db
            .update(hypotheses)
            .set({ customDomain: normalized, updatedAt: new Date() })
            .where(eq(hypotheses.id, params.hypothesisId))

          if (normalized) {
            await ensureVercelProjectDomains(normalized)
          } else {
            // Remove prior domain(s) from project if any
            if (prev?.customDomain) {
              await removeVercelProjectDomains(prev.customDomain)
            }
          }
        }
      } catch (e) {
        logger.error('Vercel domain sync failed', { error: String(e) })
      }

      return jsonOk(set)
    },
    {
      auth: true,
      body: LandingPageSchema.update,
      detail: {
        description: 'Update landing page by hypothesis ID',
        summary: 'Update landing page (by hypothesis)',
        tags: ['Landing Pages'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: {
        200: SuccessResponse,
        400: ErrorResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
  // Check slug availability
  .post(
    '/check-slug',
    async ({ user, session, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const normalizedSlug = normalizeSlug(body.slug)

      // Validate slug format and reserved words
      const validation = validateSlug(normalizedSlug)
      if (!validation.valid) {
        return {
          available: false,
          error: validation.error,
          normalizedSlug,
        }
      }

      // Check if slug is already taken by another hypothesis
      const existing = await db
        .select({ id: hypotheses.id })
        .from(hypotheses)
        .where(
          body.excludeId
            ? and(
                eq(hypotheses.slug, normalizedSlug),
                ne(hypotheses.id, body.excludeId),
              )
            : eq(hypotheses.slug, normalizedSlug),
        )
        .limit(1)

      return jsonOk(set, HTTP_STATUS.OK, {
        available: existing.length === 0,
        error:
          existing.length > 0 ? 'This subdomain is already taken' : undefined,
        normalizedSlug,
      })
    },
    {
      auth: true,
      body: t.Object({
        excludeId: t.Optional(t.String()),
        slug: t.String(),
      }),
      detail: {
        description: 'Check if a subdomain slug is available',
        summary: 'Check slug availability',
        tags: ['Landing Pages'],
      },
      response: {
        200: t.Object({
          available: t.Boolean(),
          error: t.Optional(t.String()),
          normalizedSlug: t.String(),
        }),
        401: ErrorResponse,
      },
    },
  )
  // Get landing page by hypothesis ID
  .get(
    '/hypothesis/:hypothesisId',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Verify hypothesis ownership
      const [hypothesis] = await db
        .select()
        .from(hypotheses)
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.organizationId, orgId),
            isNull(hypotheses.deletedAt),
          ),
        )
        .limit(1)

      if (!hypothesis)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Hypothesis not found')

      // Get landing page (first available)
      const [landingPage] = await db
        .select()
        .from(landingPages)
        .where(
          and(
            eq(landingPages.hypothesisId, params.hypothesisId),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)

      if (!landingPage)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      // Get blocks (limit to response shape)
      const blocks = await db
        .select({
          content: landingPageBlocks.content,
          id: landingPageBlocks.id,
          order: landingPageBlocks.order,
          type: landingPageBlocks.type,
        })
        .from(landingPageBlocks)
        .where(
          and(
            eq(landingPageBlocks.landingPageId, landingPage.id),
            isNull(landingPageBlocks.deletedAt), // Exclude soft-deleted blocks
          ),
        )
        .orderBy(landingPageBlocks.order)

      // Attach hypothesis fields for compatibility where UI expects them on landingPage
      const [hyp] = await db
        .select({
          customDomain: hypotheses.customDomain,
          slug: hypotheses.slug,
        })
        .from(hypotheses)
        .where(eq(hypotheses.id, params.hypothesisId))
        .limit(1)

      return jsonOk(set, HTTP_STATUS.OK, {
        blocks,
        landingPage: {
          customDomain: (hyp?.customDomain as unknown as string) ?? null,
          id: landingPage.id,
          slug: (hyp?.slug as unknown as string) ?? null,
          template: landingPage.template,
        },
      })
    },
    {
      auth: true,
      detail: {
        description:
          'Get landing page configuration and blocks for a hypothesis',
        summary: 'Get landing page by hypothesis',
        tags: ['Landing Pages'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: {
        200: t.Object({
          blocks: t.Array(
            t.Object({
              content: t.String(),
              id: t.String(),
              order: t.String(),
              type: t.String(),
            }),
          ),
          landingPage: t.Object({
            customDomain: t.Nullable(t.String()),
            id: t.String(),
            slug: t.Nullable(t.String()),
            template: t.String(),
          }),
        }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Verify a custom domain points to this app (basic check)
  .get(
    '/hypothesis/:hypothesisId/verify-domain',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Resolve landing page and custom domain
      const [lp] = await db
        .select({ customDomain: hypotheses.customDomain, id: landingPages.id })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.organizationId, orgId),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)

      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      const domain = lp.customDomain?.trim()
      if (!domain)
        return jsonError(
          set,
          HTTP_STATUS.BAD_REQUEST,
          'No custom domain set for this landing page',
        )

      const probePath = '/_hypany_probe'
      const tryFetch = async (protocol: 'https' | 'http') => {
        const url = `${protocol}://${domain}${probePath}`
        try {
          const res = await fetch(url, {
            cache: 'no-store',
            redirect: 'follow',
          })
          const text = await res.text().catch(() => '')
          return {
            ok: res.ok && text.trim().toLowerCase() === 'ok',
            status: res.status,
          }
        } catch (_e) {
          return { ok: false, status: 0 }
        }
      }

      // Prefer HTTPS, then HTTP fallback
      const httpsRes = await tryFetch('https')
      if (httpsRes.ok) return jsonOk(set, HTTP_STATUS.OK, { ok: true })
      const httpRes = await tryFetch('http')
      if (httpRes.ok) return jsonOk(set, HTTP_STATUS.OK, { ok: true })

      return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'Probe failed')
    },
    {
      auth: true,
      detail: {
        description: 'Verify that the custom domain is pointing to this app',
        summary: 'Verify custom domain',
        tags: ['Landing Pages'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: {
        200: t.Object({ ok: t.Boolean() }),
        400: ErrorResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Get landing page by ID (supports multiple landing pages per hypothesis)
  .get(
    '/by-id/:landingPageId',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Resolve landing page and ensure it belongs to the active org via hypothesis
      const [lp] = await db
        .select({
          customDomain: hypotheses.customDomain,
          id: landingPages.id,
          slug: hypotheses.slug,
          template: landingPages.template,
        })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(landingPages.id, params.landingPageId),
            eq(hypotheses.organizationId, orgId),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)

      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      const blocks = await db
        .select()
        .from(landingPageBlocks)
        .where(
          and(
            eq(landingPageBlocks.landingPageId, params.landingPageId),
            isNull(landingPageBlocks.deletedAt),
          ),
        )
        .orderBy(landingPageBlocks.order)

      return jsonOk(set, HTTP_STATUS.OK, { blocks, landingPage: lp })
    },
    {
      auth: true,
      detail: {
        description: 'Get landing page (and blocks) by landing page ID',
        summary: 'Get landing page by ID',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: {
        200: t.Object({
          blocks: t.Array(
            t.Object({
              content: t.String(),
              id: t.String(),
              order: t.String(),
              type: t.String(),
            }),
          ),
          landingPage: t.Object({
            customDomain: t.Nullable(t.String()),
            id: t.String(),
            slug: t.Nullable(t.String()),
            template: t.String(),
          }),
        }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Add block by hypothesis ID
  .post(
    '/hypothesis/:hypothesisId/blocks',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const orgId = session.activeOrganizationId
      if (!orgId) {
        set.status = HTTP_STATUS.BAD_REQUEST
        return { error: 'No active organization' }
      }
      const lp = await getLandingPageIdForOrg(orgId, params.hypothesisId)
      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      const blockId = ulid()
      await db.insert(landingPageBlocks).values({
        content: body.content,
        createdAt: new Date(),
        id: blockId,
        landingPageId: lp.id,
        order: body.order,
        type: body.type,
        updatedAt: new Date(),
      })

      return jsonOk(set, HTTP_STATUS.CREATED, {
        id: blockId,
        order: body.order,
        type: body.type,
      })
    },
    {
      auth: true,
      body: LandingPageSchema.block,
      detail: {
        description: 'Create a block by hypothesis ID',
        summary: 'Add block (by hypothesis)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: {
        201: t.Object({ id: t.String(), order: t.String(), type: t.String() }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Add block by landing page ID
  .post(
    '/by-id/:landingPageId/blocks',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      const orgId = session.activeOrganizationId
      if (!orgId)
        return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'No active organization')

      // Ensure landing page belongs to active org
      const [lp] = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(landingPages.id, params.landingPageId),
            eq(hypotheses.organizationId, orgId),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)
      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      const blockId = ulid()
      await db.insert(landingPageBlocks).values({
        content: body.content,
        createdAt: new Date(),
        id: blockId,
        landingPageId: params.landingPageId,
        order: body.order,
        type: body.type,
        updatedAt: new Date(),
      })

      return jsonOk(set, HTTP_STATUS.CREATED, {
        id: blockId,
        order: body.order,
        type: body.type,
      })
    },
    {
      auth: true,
      body: LandingPageSchema.block,
      detail: {
        description: 'Create a block by landing page ID',
        summary: 'Add block (by landing page)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: {
        201: t.Object({ id: t.String(), order: t.String(), type: t.String() }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Duplicate a landing page (and its blocks)
  .post(
    '/by-id/:landingPageId/duplicate',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Load the source landing page and ensure ownership
      const [src] = await db
        .select({
          hypothesisId: landingPages.hypothesisId,
          id: landingPages.id,
          template: landingPages.template,
        })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(landingPages.id, params.landingPageId),
            eq(hypotheses.userId, user.id),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)
      if (!src)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      const newId = ulid()
      const now = new Date()
      await db.insert(landingPages).values({
        createdAt: now,
        hypothesisId: src.hypothesisId,
        id: newId,
        // Generate a three-word identifier and convert to hyphenated lowercase
        name: humanId()
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase(),
        template: src.template,
        updatedAt: now,
      })

      // Copy blocks
      const blocks = await db
        .select({
          content: landingPageBlocks.content,
          order: landingPageBlocks.order,
          type: landingPageBlocks.type,
        })
        .from(landingPageBlocks)
        .where(
          and(
            eq(landingPageBlocks.landingPageId, params.landingPageId),
            isNull(landingPageBlocks.deletedAt),
          ),
        )
      if (blocks.length > 0) {
        await db.insert(landingPageBlocks).values(
          blocks.map((b) => ({
            content: b.content,
            createdAt: now,
            id: ulid(),
            landingPageId: newId,
            order: b.order,
            type: b.type,
            updatedAt: now,
          })),
        )
      }

      return jsonOk(set, HTTP_STATUS.CREATED, { id: newId })
    },
    {
      auth: true,
      detail: {
        description: 'Duplicate a landing page with its blocks',
        summary: 'Duplicate landing page',
        tags: ['Landing Pages'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: {
        201: t.Object({ id: t.String() }),
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Update block by hypothesis ID
  .patch(
    '/hypothesis/:hypothesisId/blocks/:blockId',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Verify block belongs to user's hypothesis landing page
      const [block] = await db
        .select({ id: landingPageBlocks.id })
        .from(landingPageBlocks)
        .innerJoin(
          landingPages,
          eq(landingPageBlocks.landingPageId, landingPages.id),
        )
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(landingPageBlocks.id, params.blockId),
            eq(hypotheses.userId, user.id),
            isNull(landingPageBlocks.deletedAt),
          ),
        )
        .limit(1)
      if (!block)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Block not found')

      await db
        .update(landingPageBlocks)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(landingPageBlocks.id, params.blockId))

      return jsonOk(set)
    },
    {
      auth: true,
      body: LandingPageSchema.blockUpdate,
      detail: {
        description: 'Update a block by hypothesis ID',
        summary: 'Update block (by hypothesis)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ blockId: t.String(), hypothesisId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Update block by landing page ID
  .patch(
    '/by-id/:landingPageId/blocks/:blockId',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      // Verify block belongs to this landing page and org
      const [block] = await db
        .select({ id: landingPageBlocks.id })
        .from(landingPageBlocks)
        .innerJoin(
          landingPages,
          eq(landingPageBlocks.landingPageId, landingPages.id),
        )
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(landingPages.id, params.landingPageId),
            eq(landingPageBlocks.id, params.blockId),
            eq(hypotheses.userId, user.id),
            isNull(landingPageBlocks.deletedAt),
          ),
        )
        .limit(1)
      if (!block)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Block not found')

      await db
        .update(landingPageBlocks)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(landingPageBlocks.id, params.blockId))

      return jsonOk(set)
    },
    {
      auth: true,
      body: LandingPageSchema.blockUpdate,
      detail: {
        description: 'Update a block by landing page ID',
        summary: 'Update block (by landing page)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ blockId: t.String(), landingPageId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Delete block by hypothesis ID
  .delete(
    '/hypothesis/:hypothesisId/blocks/:blockId',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const [block] = await db
        .select({ id: landingPageBlocks.id })
        .from(landingPageBlocks)
        .innerJoin(
          landingPages,
          eq(landingPageBlocks.landingPageId, landingPages.id),
        )
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(landingPageBlocks.id, params.blockId),
            eq(hypotheses.userId, user.id),
            isNull(landingPageBlocks.deletedAt),
          ),
        )
        .limit(1)
      if (!block) {
        set.status = HTTP_STATUS.NOT_FOUND
        return { error: 'Block not found' }
      }

      await db
        .update(landingPageBlocks)
        .set({ deletedAt: new Date() })
        .where(eq(landingPageBlocks.id, params.blockId))

      return { success: true }
    },
    {
      auth: true,
      detail: {
        description: 'Remove a block by hypothesis ID',
        summary: 'Delete block (by hypothesis)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ blockId: t.String(), hypothesisId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Delete block by landing page ID
  .delete(
    '/by-id/:landingPageId/blocks/:blockId',
    async ({ user, session, params, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const [block] = await db
        .select({ id: landingPageBlocks.id })
        .from(landingPageBlocks)
        .innerJoin(
          landingPages,
          eq(landingPageBlocks.landingPageId, landingPages.id),
        )
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(landingPages.id, params.landingPageId),
            eq(landingPageBlocks.id, params.blockId),
            eq(hypotheses.userId, user.id),
            isNull(landingPageBlocks.deletedAt),
          ),
        )
        .limit(1)
      if (!block)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Block not found')

      await db
        .update(landingPageBlocks)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(eq(landingPageBlocks.id, params.blockId))

      return jsonOk(set)
    },
    {
      auth: true,
      detail: {
        description: 'Delete a block by landing page ID',
        summary: 'Delete block (by landing page)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ blockId: t.String(), landingPageId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Replace all blocks by hypothesis ID
  .put(
    '/hypothesis/:hypothesisId/blocks',
    async ({ user, session, params, body, set }) => {
      if (!user || !session) {
        set.status = 401
        return { error: 'Unauthorized' }
      }
      const orgId = session.activeOrganizationId
      if (!orgId) {
        set.status = HTTP_STATUS.BAD_REQUEST
        return { error: 'No active organization' }
      }

      const lp = await getLandingPageIdForOrg(orgId, params.hypothesisId)
      if (!lp) {
        set.status = HTTP_STATUS.NOT_FOUND
        return { error: 'Landing page not found' }
      }

      await db
        .update(landingPageBlocks)
        .set({ deletedAt: new Date() })
        .where(eq(landingPageBlocks.landingPageId, lp.id))

      const now = new Date()
      const inserts = body.blocks.map((block) => ({
        content: block.content,
        createdAt: now,
        id: block.id || ulid(),
        landingPageId: lp.id,
        order: block.order,
        type: block.type,
        updatedAt: now,
      }))
      if (inserts.length > 0) {
        await db.insert(landingPageBlocks).values(inserts)
      }
      return { success: true }
    },
    {
      auth: true,
      body: t.Object({
        blocks: t.Array(
          t.Object({
            content: t.String(),
            id: t.Optional(t.String()),
            order: t.String(),
            type: t.String(),
          }),
        ),
      }),
      detail: {
        description: 'Replace blocks by hypothesis ID',
        summary: 'Replace blocks (by hypothesis)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Replace all blocks by landing page ID
  .put(
    '/by-id/:landingPageId/blocks',
    async ({ user, session, params, body, set }) => {
      if (!user || !session) {
        set.status = 401
        return { error: 'Unauthorized' }
      }
      const orgId = session.activeOrganizationId
      if (!orgId) {
        set.status = HTTP_STATUS.BAD_REQUEST
        return { error: 'No active organization' }
      }

      const [lp] = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(landingPages.id, params.landingPageId),
            eq(hypotheses.organizationId, orgId),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)
      if (!lp) {
        set.status = HTTP_STATUS.NOT_FOUND
        return { error: 'Landing page not found' }
      }

      await db
        .update(landingPageBlocks)
        .set({ deletedAt: new Date() })
        .where(eq(landingPageBlocks.landingPageId, params.landingPageId))

      const now = new Date()
      const inserts = body.blocks.map((block) => ({
        content: block.content,
        createdAt: now,
        id: block.id || ulid(),
        landingPageId: params.landingPageId,
        order: block.order,
        type: block.type,
        updatedAt: now,
      }))
      if (inserts.length > 0) await db.insert(landingPageBlocks).values(inserts)
      return { success: true }
    },
    {
      auth: true,
      body: t.Object({
        blocks: t.Array(
          t.Object({
            content: t.String(),
            id: t.Optional(t.String()),
            order: t.String(),
            type: t.String(),
          }),
        ),
      }),
      detail: {
        description: 'Replace blocks by landing page ID',
        summary: 'Replace blocks (by landing page)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Reorder blocks by landing page ID
  .post(
    '/by-id/:landingPageId/blocks/reorder',
    async ({ user, session, params, body, set }) => {
      if (!user || !session) {
        set.status = 401
        return { error: 'Unauthorized' }
      }

      const [lp] = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(landingPages.id, params.landingPageId),
            eq(hypotheses.userId, user.id),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)
      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      const updates = body.blocks.map((block) =>
        db
          .update(landingPageBlocks)
          .set({ order: block.order, updatedAt: new Date() })
          .where(eq(landingPageBlocks.id, block.id)),
      )
      await Promise.all(updates)
      return jsonOk(set)
    },
    {
      auth: true,
      body: t.Object({
        blocks: t.Array(t.Object({ id: t.String(), order: t.String() })),
      }),
      detail: {
        description: 'Reorder blocks by landing page ID',
        summary: 'Reorder blocks (by landing page)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ landingPageId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )

  // Reorder blocks by hypothesis ID
  .post(
    '/hypothesis/:hypothesisId/blocks/reorder',
    async ({ user, session, params, body, set }) => {
      if (!user || !session) {
        set.status = 401
        return { error: 'Unauthorized' }
      }

      const [lp] = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.userId, user.id),
            isNull(landingPages.deletedAt),
          ),
        )
        .limit(1)
      if (!lp)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')

      const updates = body.blocks.map((block) =>
        db
          .update(landingPageBlocks)
          .set({ order: block.order, updatedAt: new Date() })
          .where(eq(landingPageBlocks.id, block.id)),
      )
      await Promise.all(updates)
      return jsonOk(set)
    },
    {
      auth: true,
      body: t.Object({
        blocks: t.Array(t.Object({ id: t.String(), order: t.String() })),
      }),
      detail: {
        description: 'Reorder blocks by hypothesis ID',
        summary: 'Reorder blocks (by hypothesis)',
        tags: ['Landing Page Blocks'],
      },
      params: t.Object({ hypothesisId: UlidParam }),
      response: {
        200: SuccessResponse,
        401: ErrorResponse,
        404: ErrorResponse,
      },
    },
  )
