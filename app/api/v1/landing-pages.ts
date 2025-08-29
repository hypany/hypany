/**
 * Landing Pages API (v1)
 * - Configure landing page metadata, domain, and template
 * - Manage content blocks (create/update/delete/reorder/replace)
 * - Resolve and verify domain connectivity
 */

import { and, eq, isNull, ne } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/drizzle'
import { getLandingPageIdForOrg } from '@/lib/api-utils'
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
import { authPlugin } from './auth-plugin'

// Block types for landing pages
const BlockTypes = t.Union([
  t.Literal('hero'),
  t.Literal('features'),
  t.Literal('cta'),
  t.Literal('faq'),
  t.Literal('pricing'),
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

          // Ensure no other landing page is using this custom domain
          const existing = await db
            .select({ id: landingPages.id })
            .from(landingPages)
            .where(
              and(
                eq(landingPages.customDomain, normalized),
                isNull(landingPages.deletedAt),
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

      // Validate slug if present
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
          .select({ id: landingPages.id })
          .from(landingPages)
          .where(
            and(
              eq(landingPages.slug, normalizedSlug),
              ne(landingPages.id, lp.id),
              isNull(landingPages.deletedAt),
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
        body.slug = normalizedSlug
      }

      await db
        .update(landingPages)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(landingPages.id, lp.id))

      // Best-effort: sync domain(s) with Vercel project (add or remove)
      try {
        if (typeof body.customDomain !== 'undefined') {
          const normalized =
            (body.customDomain as unknown as string | null) || null
          if (normalized) {
            await ensureVercelProjectDomains(normalized)
          } else {
            // Remove prior domain(s) from project if any
            if (lp.customDomain) {
              await removeVercelProjectDomains(lp.customDomain)
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

      // Check if slug is already taken by another landing page
      const existing = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .where(
          body.excludeId
            ? and(
                eq(landingPages.slug, normalizedSlug),
                ne(landingPages.id, body.excludeId),
                isNull(landingPages.deletedAt),
              )
            : and(
                eq(landingPages.slug, normalizedSlug),
                isNull(landingPages.deletedAt),
              ),
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

      // Get landing page
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

      // Get blocks
      const blocks = await db
        .select()
        .from(landingPageBlocks)
        .where(
          and(
            eq(landingPageBlocks.landingPageId, landingPage.id),
            isNull(landingPageBlocks.deletedAt), // Exclude soft-deleted blocks
          ),
        )
        .orderBy(landingPageBlocks.order)

      return jsonOk(set, HTTP_STATUS.OK, {
        blocks,
        landingPage,
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

      // Resolve landing page and custom domain
      const [lp] = await db
        .select({
          customDomain: landingPages.customDomain,
          id: landingPages.id,
        })
        .from(landingPages)
        .innerJoin(hypotheses, eq(landingPages.hypothesisId, hypotheses.id))
        .where(
          and(
            eq(hypotheses.id, params.hypothesisId),
            eq(hypotheses.organizationId, session.activeOrganizationId),
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
        } catch (e) {
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

  // Add block by hypothesis ID
  .post(
    '/hypothesis/:hypothesisId/blocks',
    async ({ user, session, params, body, set }) => {
      if (!user || !session)
        return jsonError(set, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')

      const lp = await getLandingPageIdForUser(user.id, params.hypothesisId)
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
