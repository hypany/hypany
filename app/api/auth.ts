import { render } from '@react-email/render'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, openAPI, organization } from 'better-auth/plugins'
import { and, desc, eq, isNotNull } from 'drizzle-orm'
import { db } from '@/drizzle'
import OrganizationInvitationEmail from '@/emails/organization-invitation-email'
import ResetPasswordEmail from '@/emails/reset-password-email'
import VerificationEmail from '@/emails/verification-email'
import { sendEmail } from '@/lib/email'
import { getEnv } from '@/lib/env'
import { serviceUrl } from '@/lib/url'
import * as schema from '@/schema'

const { AUTH_SECRET } = getEnv()

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Uncomment to always force account picker and issue refresh tokens
      // accessType: 'offline',
      // prompt: 'select_account consent',
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
  // Ensure a user's session always has an active organization.
  // We set it to the last active organization seen in prior sessions,
  // falling back to the most recently created membership.
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          try {
            // If already set (e.g., via API), keep it.
            if (session.activeOrganizationId) return

            // Try last used active org from recent sessions for this user
            const [last] = await db
              .select({ activeOrg: schema.sessions.activeOrganizationId })
              .from(schema.sessions)
              .where(
                and(
                  eq(schema.sessions.userId, session.userId),
                  isNotNull(schema.sessions.activeOrganizationId),
                ),
              )
              .orderBy(desc(schema.sessions.updatedAt))
              .limit(1)

            if (last?.activeOrg) {
              return { data: { activeOrganizationId: last.activeOrg } }
            }

            // Fallback: user's most recent organization membership
            const [m] = await db
              .select({ orgId: schema.members.organizationId })
              .from(schema.members)
              .where(eq(schema.members.userId, session.userId))
              .orderBy(desc(schema.members.createdAt))
              .limit(1)

            if (m?.orgId) {
              return { data: { activeOrganizationId: m.orgId } }
            }
          } catch (_) {
            // Non-fatal; fall through with default behavior
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
