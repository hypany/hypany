import { db } from '@/drizzle'
import { eq } from 'drizzle-orm'
import OrganizationInvitationEmail from '@/emails/organization-invitation-email'
import ResetPasswordEmail from '@/emails/reset-password-email'
import VerificationEmail from '@/emails/verification-email'
import { sendEmail } from '@/lib/email'
import { getEnv } from '@/lib/env'
import { serviceUrl } from '@/lib/url'
import * as schema from '@/schema'
import { render } from '@react-email/render'
import { betterAuth } from 'better-auth'
import type { Session as BASession, User as BAUser } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, openAPI, organization } from 'better-auth/plugins'

const { AUTH_SECRET } = getEnv()

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['email'],
    },
  },
  appName: 'Hypany',
  basePath: '/api/auth',
  baseURL: serviceUrl,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 128,
    minPasswordLength: 8,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const emailHtml = await render(
        ResetPasswordEmail({
          resetUrl: url,
          userEmail: user.email,
        }),
      )

      await sendEmail({
        body: emailHtml,
        subject: 'Reset your password',
        to: user.email,
      })
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    enabled: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      const urlObj = new URL(url)
      const tokenParam = urlObj.searchParams.get('token')

      const baseUrl = serviceUrl
      const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${tokenParam || token}&callbackURL=/app`

      const emailHtml = await render(
        VerificationEmail({
          userEmail: user.email,
          verificationUrl,
        }),
      )

      await sendEmail({
        body: emailHtml,
        subject: 'Verify your email address',
        to: user.email,
      })
    },
  },
  plugins: [
    admin({
      impersonationSessionDuration: 60 * 60 * 24, // 1 day
    }),
    organization({
      allowUserToCreateOrganization: true,
      requireEmailVerificationOnInvitation: false,
      sendInvitationEmail: async ({ id, email, organization, inviter }) => {
        const organizationName = organization.name
        const invitationLink = `${serviceUrl}/organization/accept-invitation?id=${id}&email=${encodeURIComponent(
          email,
        )}`
        const emailHtml = await render(
          OrganizationInvitationEmail({
            invitationLink,
            inviterName: inviter.user.name,
            organizationName,
            recipientEmail: email,
          }),
        )

        await sendEmail({
          body: emailHtml,
          subject: `Invitation to join ${organizationName}`,
          to: email,
        })
      },
    }),
    openAPI(),
    nextCookies(),
  ],
  // Ensure a default active organization is set right after session creation
  databaseHooks: {
    session: {
      create: {
        after: async (session, ctx) => {
          try {
            // If already set, nothing to do
            type ExtendedSession = BASession & { activeOrganizationId?: string | null }
            if ((session as unknown as ExtendedSession).activeOrganizationId) return

            // Find the first organization this user is a member of
            const memberships = await db
              .select({ organizationId: schema.members.organizationId })
              .from(schema.members)
              .where(eq(schema.members.userId, session.userId))
              .limit(1)

            const orgId = memberships?.[0]?.organizationId
            if (!orgId) return

            // Persist onto the session row
            await db
              .update(schema.sessions)
              .set({ activeOrganizationId: orgId })
              .where(eq(schema.sessions.id, session.id))

            // Update the in-flight session so cookie cache (if enabled) has the value
            const users = await db
              .select()
              .from(schema.users)
              .where(eq(schema.users.id, session.userId))
              .limit(1)

            const user = users?.[0]
            if (user && ctx?.context?.setNewSession) {
              const updatedSession = {
                ...(session as unknown as ExtendedSession),
                activeOrganizationId: orgId,
              } satisfies ExtendedSession
              ctx.context.setNewSession({
                session: updatedSession as unknown as BASession & Record<string, unknown>,
                user: user as unknown as BAUser & Record<string, unknown>,
              })
            }
          } catch {
            // Non-fatal; leave session as-is
          }
        },
      },
    },
  },
  rateLimit: {
    enabled: true,
    max: 10, // 10 requests per minute
    window: 60, // 1 minute
  },
  secret: AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache for 5 minutes
    },
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  telemetry: { enabled: false },
})

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
