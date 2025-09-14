/**
 * Public API (v1)
 * - Read-only landing page data
 * - Waitlist signup, email verification, and position lookup
 * - No authentication required
 */

import crypto from 'node:crypto'
import { render } from '@react-email/render'
import { and, eq, gt } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import { db } from '@/drizzle'
import { VerificationEmail } from '@/emails/verification-email'
import { EMAIL_VERIFICATION_TOKEN_TTL_MS, HTTP_STATUS } from '@/lib/constants'
import { sendEmail } from '@/lib/email'
import { jsonError, jsonOk } from '@/lib/http'
import { logger } from '@/lib/logger'
import { normalizeReferrerHost } from '@/lib/referrer'
import { serviceUrl } from '@/lib/url'
import {
  hypotheses,
  landingPageBlocks,
  landingPages,
  pageVisits,
  verifications,
  waitlistEntries,
  waitlists,
} from '@/schema'
import { computeWaitlistPositionByCreatedAt } from '../utils'
import { resolveActiveLandingPageIdBySlug, resolveActiveLandingPageIdByCustomDomain } from '@/functions/public'
import 'server-only'
import { ulid } from 'ulid'

// Public API for landing pages (no auth required)
function parseCookie(cookieHeader?: string | null): Record<string, string> {
  const res: Record<string, string> = {}
  if (!cookieHeader) return res
  cookieHeader.split(';').forEach((p) => {
    const i = p.indexOf('=')
    if (i > -1) {
      const k = p.slice(0, i).trim()
      const v = decodeURIComponent(p.slice(i + 1))
      res[k] = v
    }
  })
  return res
}

export const publicApi = new Elysia({ prefix: '/v1/public' })
  // Resolve active published landing page ID by slug (no auth)
  .get(
    '/resolve/:slug',
    async ({ params, set }) => {
      const id = await resolveActiveLandingPageIdBySlug(params.slug)
      if (!id) return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Not found')
      return jsonOk(set, HTTP_STATUS.OK, { id })
    },
    {
      detail: {
        description: 'Resolve active published landing page ID by slug',
        summary: 'Resolve published landing page by slug',
        tags: ['Public'],
      },
      params: t.Object({ slug: t.String() }),
    },
  )
  // Resolve active published landing page ID by custom domain (no auth)
  .get(
    '/resolve-domain',
    async ({ query, set }) => {
      const host = (query?.host as string | undefined) || ''
      if (!host) return jsonError(set, HTTP_STATUS.BAD_REQUEST, 'Missing host')
      const id = await resolveActiveLandingPageIdByCustomDomain(host)
      if (!id) return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Not found')
      return jsonOk(set, HTTP_STATUS.OK, { id })
    },
    {
      detail: {
        description: 'Resolve active published landing page ID by custom domain',
        summary: 'Resolve published landing page by custom domain',
        tags: ['Public'],
      },
      query: t.Object({ host: t.String() }),
    },
  )
  // Get public landing page data by hypothesis slug
  .get(
    '/by-slug/:slug',
    async ({ params, set, request }) => {
      // Resolve hypothesis by slug and published status
      const [hypothesis] = await db
        .select({
          customDomain: hypotheses.customDomain,
          description: hypotheses.description,
          id: hypotheses.id,
          name: hypotheses.name,
          status: hypotheses.status,
        })
        .from(hypotheses)
        .where(eq(hypotheses.slug, params.slug))
        .limit(1)

      if (!hypothesis || hypothesis.status !== 'published') {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Page not found')
      }

      // Pick one landing page for this hypothesis
      const [landingPage] = await db
        .select()
        .from(landingPages)
        .where(eq(landingPages.hypothesisId, hypothesis.id))
        .limit(1)
      if (!landingPage)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Page not found')

      // Get blocks
      const blocks = await db
        .select({
          content: landingPageBlocks.content,
          id: landingPageBlocks.id,
          order: landingPageBlocks.order,
          type: landingPageBlocks.type,
        })
        .from(landingPageBlocks)
        .where(eq(landingPageBlocks.landingPageId, landingPage.id))
        .orderBy(landingPageBlocks.order)

      // Attempt to log page visit (ignore errors)
      try {
        const cookieHeader = request.headers.get('cookie')
        const cookies = parseCookie(cookieHeader || undefined)
        const visitorId = cookies.hp_vid || null
        const referrerRaw = request.headers.get('referer') || null
        const userAgent = request.headers.get('user-agent') || null
        const referrer = normalizeReferrerHost(referrerRaw)

        await db.insert(pageVisits).values({
          createdAt: new Date(),
          hypothesisId: hypothesis.id,
          landingPageId: landingPage.id,
          path: `/${params.slug}`,
          referrer,
          userAgent,
          visitorId,
        })
      } catch (e) {
        logger.error('Failed to log public page visit', { error: String(e) })
      }

      return jsonOk(set, HTTP_STATUS.OK, {
        blocks,
        hypothesis: {
          description: hypothesis.description,
          id: hypothesis.id,
          name: hypothesis.name,
        },
        landingPage: {
          customCss: landingPage.customCss,
          favicon: landingPage.favicon,
          metaDescription: landingPage.metaDescription,
          metaTitle: landingPage.metaTitle,
          ogImage: landingPage.ogImage,
          template: landingPage.template,
        },
      })
    },
    {
      detail: {
        description: 'Get public landing page data by slug (no auth required)',
        summary: 'Get public landing by slug',
        tags: ['Public'],
      },
      params: t.Object({ slug: t.String() }),
    },
  )
  // Get public landing page data by ID
  .get(
    '/:id',
    async ({ params, set }) => {
      // Find hypothesis by ID
      const [hypothesis] = await db
        .select({
          description: hypotheses.description,
          id: hypotheses.id,
          name: hypotheses.name,
          status: hypotheses.status,
        })
        .from(hypotheses)
        .where(eq(hypotheses.id, params.id))
        .limit(1)

      if (!hypothesis || hypothesis.status !== 'published') {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Page not found')
      }

      // Get landing page
      const [landingPage] = await db
        .select()
        .from(landingPages)
        .where(eq(landingPages.hypothesisId, hypothesis.id))
        .limit(1)

      if (!landingPage) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Page not found')
      }

      // Get blocks
      const blocks = await db
        .select({
          content: landingPageBlocks.content,
          id: landingPageBlocks.id,
          order: landingPageBlocks.order,
          type: landingPageBlocks.type,
        })
        .from(landingPageBlocks)
        .where(eq(landingPageBlocks.landingPageId, landingPage.id))
        .orderBy(landingPageBlocks.order)

      // Get waitlist info (for display purposes)
      const [waitlist] = await db
        .select({
          id: waitlists.id,
        })
        .from(waitlists)
        .where(eq(waitlists.hypothesisId, hypothesis.id))
        .limit(1)

      return jsonOk(set, HTTP_STATUS.OK, {
        blocks,
        hypothesis: {
          description: hypothesis.description,
          name: hypothesis.name,
        },
        landingPage: {
          customCss: landingPage.customCss,
          favicon: landingPage.favicon,
          metaDescription: landingPage.metaDescription,
          metaTitle: landingPage.metaTitle,
          ogImage: landingPage.ogImage,
          template: landingPage.template,
        },
        waitlist: {
          id: waitlist?.id,
        },
      })
    },
    {
      detail: {
        description: 'Get public landing page data by ID (no auth required)',
        summary: 'Get public landing page',
        tags: ['Public'],
      },
      params: t.Object({
        id: t.String({ pattern: '^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$' }), // ULID pattern
      }),
    },
  )

  // Submit waitlist signup
  .post(
    '/:id/signup',
    async ({ params, body, set, request }) => {
      // Find hypothesis and waitlist
      const [hypothesis] = await db
        .select({
          id: hypotheses.id,
          status: hypotheses.status,
          userId: hypotheses.userId,
        })
        .from(hypotheses)
        .where(eq(hypotheses.id, params.id))
        .limit(1)

      if (!hypothesis || hypothesis.status !== 'published') {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Page not found')
      }

      const [waitlist] = await db
        .select()
        .from(waitlists)
        .where(eq(waitlists.hypothesisId, hypothesis.id))
        .limit(1)

      if (!waitlist) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Waitlist not found')
      }

      // Get landing page ID
      const [landingPage] = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .where(eq(landingPages.hypothesisId, hypothesis.id))
        .limit(1)

      if (!landingPage) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Landing page not found')
      }

      // No plan-based waitlist limits; unlimited signups

      // Check for existing signup
      const [existing] = await db
        .select()
        .from(waitlistEntries)
        .where(
          and(
            eq(waitlistEntries.waitlistId, waitlist.id),
            eq(waitlistEntries.email, body.email.toLowerCase()),
          ),
        )
        .limit(1)

      if (existing) {
        return jsonError(set, 409, 'Email already registered')
      }

      // Generate unique entry ID
      const entryId = ulid()

      // Derive visitor ID from cookie and default source from UTM or referrer
      const cookieHeader = request.headers.get('cookie')
      const cookies = parseCookie(cookieHeader || undefined)
      const visitorId = cookies.hp_vid || null

      const referrerHeader = request.headers.get('referer')
      const normalizedReferrer = normalizeReferrerHost(referrerHeader)
      const resolvedSource =
        body.utmSource || body.source || normalizedReferrer || 'direct'

      // Create entry
      await db.insert(waitlistEntries).values({
        email: body.email.toLowerCase(),
        emailVerified: false,
        id: entryId,
        landingPageId: landingPage.id,
        metadata: body.metadata ? JSON.stringify(body.metadata) : null,
        name: body.name || null,
        source: resolvedSource,
        utmCampaign: body.utmCampaign || null,
        utmContent: body.utmContent || null,
        utmMedium: body.utmMedium || null,
        utmSource: body.utmSource || null,
        utmTerm: body.utmTerm || null,
        visitorId,
        waitlistId: waitlist.id,
      })

      // Generate verification token and send email
      try {
        const token = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_TTL_MS)

        await db.insert(verifications).values({
          createdAt: new Date(),
          expiresAt,
          id: ulid(),
          identifier: `wl:${entryId}`,
          updatedAt: new Date(),
          value: token,
        })

        const verificationUrl = `${serviceUrl}/api/v1/public/${params.id}/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(
          body.email.toLowerCase(),
        )}`

        const html = await render(
          VerificationEmail({ userEmail: body.email, verificationUrl }),
        )

        await sendEmail({
          body: html,
          subject: 'Verify your email address',
          to: body.email,
        })
      } catch (error) {
        logger.error('Failed to send verification email', {
          error: String(error),
        })
        // Do not fail the request just because email failed
      }

      // Calculate actual position by createdAt order within the waitlist
      let position = 1
      try {
        const [created] = await db
          .select({ createdAt: waitlistEntries.createdAt })
          .from(waitlistEntries)
          .where(eq(waitlistEntries.id, entryId))
          .limit(1)
        if (created?.createdAt) {
          position = await computeWaitlistPositionByCreatedAt(
            waitlist.id,
            created.createdAt,
          )
        }
      } catch (e) {
        logger.error('Failed to compute waitlist position', {
          error: String(e),
        })
      }

      return jsonOk(set, HTTP_STATUS.CREATED, {
        message: 'Successfully joined the waitlist!',
        position,
        success: true,
      })
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
        metadata: t.Optional(t.Record(t.String(), t.Any())),
        name: t.Optional(t.String()),
        source: t.Optional(t.String()),
        utmCampaign: t.Optional(t.String()),
        utmContent: t.Optional(t.String()),
        utmMedium: t.Optional(t.String()),
        utmSource: t.Optional(t.String()),
        utmTerm: t.Optional(t.String()),
      }),
      detail: {
        description: 'Submit a waitlist signup for a public hypothesis',
        summary: 'Join waitlist',
        tags: ['Public'],
      },
      params: t.Object({
        id: t.String({ pattern: '^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$' }), // ULID pattern
      }),
    },
  )

  // Verify email
  .get(
    '/:id/verify',
    async ({ params, query, set }) => {
      const { token, email } = query

      if (!token || !email) {
        return jsonError(
          set,
          HTTP_STATUS.BAD_REQUEST,
          'Invalid verification link',
        )
      }

      // Find hypothesis
      const [hypothesis] = await db
        .select({
          id: hypotheses.id,
        })
        .from(hypotheses)
        .where(eq(hypotheses.id, params.id))
        .limit(1)

      if (!hypothesis) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Page not found')
      }

      // Find waitlist
      const [waitlist] = await db
        .select()
        .from(waitlists)
        .where(eq(waitlists.hypothesisId, hypothesis.id))
        .limit(1)

      if (!waitlist) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Waitlist not found')
      }

      // Find and verify entry
      const [entry] = await db
        .select()
        .from(waitlistEntries)
        .where(
          and(
            eq(waitlistEntries.waitlistId, waitlist.id),
            eq(waitlistEntries.email, email.toLowerCase()),
          ),
        )
        .limit(1)

      if (!entry) {
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Signup not found')
      }

      // Verify token exists and is not expired
      const [tokenRecord] = await db
        .select()
        .from(verifications)
        .where(
          and(
            eq(verifications.identifier, `wl:${entry.id}`),
            eq(verifications.value, token),
            gt(verifications.expiresAt, new Date()),
          ),
        )
        .limit(1)

      if (!tokenRecord) {
        return jsonError(
          set,
          HTTP_STATUS.BAD_REQUEST,
          'Invalid or expired token',
        )
      }

      await db
        .update(waitlistEntries)
        .set({
          emailVerified: true,
          updatedAt: new Date(),
        })
        .where(eq(waitlistEntries.id, entry.id))

      // Invalidate token (best-effort)
      try {
        await db
          .delete(verifications)
          .where(eq(verifications.id, tokenRecord.id))
      } catch (e) {
        logger.warn('Failed to delete verification token', { error: String(e) })
      }

      // Send welcome email (best-effort)
      try {
        const { WelcomeEmail } = await import('@/emails/welcome-email')
        const html = await render(
          WelcomeEmail({ userEmail: email.toLowerCase() }),
        )
        await sendEmail({
          body: html,
          subject: 'Welcome to Hypany',
          to: email.toLowerCase(),
        })
      } catch (e) {
        logger.error('Failed to send welcome email', { error: String(e) })
      }

      return jsonOk(set, HTTP_STATUS.OK, {
        message: 'Email verified successfully!',
        success: true,
      })
    },
    {
      detail: {
        description: 'Verify email address for waitlist signup',
        summary: 'Verify email',
        tags: ['Public'],
      },
      params: t.Object({
        id: t.String({ pattern: '^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$' }), // ULID pattern
      }),
      query: t.Object({
        email: t.String({ format: 'email' }),
        token: t.String(),
      }),
    },
  )

  // Get waitlist position
  .get(
    '/:id/position/:email',
    async ({ params, set }) => {
      // Find hypothesis
      const [hypothesis] = await db
        .select({
          id: hypotheses.id,
        })
        .from(hypotheses)
        .where(eq(hypotheses.id, params.id))
        .limit(1)

      if (!hypothesis)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Page not found')

      // Find waitlist
      const [waitlist] = await db
        .select()
        .from(waitlists)
        .where(eq(waitlists.hypothesisId, hypothesis.id))
        .limit(1)

      if (!waitlist)
        return jsonError(set, HTTP_STATUS.NOT_FOUND, 'Waitlist not found')

      // Find entry
      const [entry] = await db
        .select({
          createdAt: waitlistEntries.createdAt,
          emailVerified: waitlistEntries.emailVerified,
          id: waitlistEntries.id,
        })
        .from(waitlistEntries)
        .where(
          and(
            eq(waitlistEntries.waitlistId, waitlist.id),
            eq(waitlistEntries.email, params.email.toLowerCase()),
          ),
        )
        .limit(1)

      if (!entry)
        return jsonError(
          set,
          HTTP_STATUS.NOT_FOUND,
          'Email not found in waitlist',
        )

      // Calculate actual position by createdAt order within the waitlist
      let position = 1
      try {
        position = await computeWaitlistPositionByCreatedAt(
          waitlist.id,
          entry.createdAt,
        )
      } catch (e) {
        logger.error('Failed to compute waitlist position', {
          error: String(e),
        })
      }

      return jsonOk(set, HTTP_STATUS.OK, {
        position,
        verified: entry.emailVerified,
      })
    },
    {
      detail: {
        description: 'Get position and status for an email in the waitlist',
        summary: 'Check waitlist position',
        tags: ['Public'],
      },
      params: t.Object({
        email: t.String({ format: 'email' }),
        id: t.String({ pattern: '^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$' }), // ULID pattern
      }),
    },
  )
