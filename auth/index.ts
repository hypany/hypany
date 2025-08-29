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

export const auth = betterAuth({
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  appName: '@hypany/auth',
  basePath: '/api/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
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
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      // Parse the URL to get the token and update the callback
      const urlObj = new URL(url)
      const tokenParam = urlObj.searchParams.get('token')

      // Construct the proper verification URL with /dashboard as the callback
      const baseUrl = serviceUrl
      const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${tokenParam || token}&callbackURL=/dashboard`

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
  plugins: [admin(), openAPI(), nextCookies()],
  secret: AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache for 5 minutes
    },
  },
})

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
