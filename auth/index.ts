import { render } from '@react-email/render'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, openAPI } from 'better-auth/plugins'
import { db } from '@/drizzle'
import ResetPasswordEmail from '@/emails/reset-password-email'
import VerificationEmail from '@/emails/verification-email'
import { sendEmail } from '@/lib/email'
import { getEnv } from '@/lib/env'
import { serviceUrl } from '@/lib/url'
import * as schema from '@/schema'
import 'server-only'

const { AUTH_SECRET } = getEnv()
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || serviceUrl

export const auth = betterAuth({
  appName: 'Hypany',
  baseURL: BETTER_AUTH_URL,
  basePath: '/api/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  }),
  secret: AUTH_SECRET,
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['email'],
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
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
    enabled: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
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
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache for 5 minutes
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 10, // 10 requests per minute
  },
  plugins: [
    admin({
      impersonationSessionDuration: 60 * 60 * 24, // 1 day
    }),
    openAPI(),
    nextCookies(),
  ],
})

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
