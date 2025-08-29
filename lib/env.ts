import { z } from 'zod'

const EnvSchema = z.object({
  AUTH_SECRET: z.string().min(1),
  CANONICALIZE_TO_WWW: z.string().optional(),
  DATABASE_URL: z.url(),
  EMAIL_FROM: z.email(),

  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
  // Core
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PLUNK_PUBLIC_KEY: z.string().min(1).optional().or(z.literal('').optional()),

  // Email (Plunk)
  PLUNK_SECRET_KEY: z.string().min(1),

  // Multitenancy / domains
  TENANT_ROOT_DOMAIN: z.string().min(1).optional(),
  VERCEL_PROJECT_ID: z.string().min(1).optional(),
  VERCEL_TEAM_ID: z.string().min(1).optional(),

  // Vercel project mgmt (optional at runtime)
  VERCEL_TOKEN: z.string().min(1).optional(),
})

export type AppEnv = z.infer<typeof EnvSchema>

let cached: AppEnv | null = null

export function getEnv(): AppEnv {
  if (cached) return cached
  const parsed = EnvSchema.safeParse(process.env)
  if (!parsed.success) {
    // Surface a concise error; great for early fail in server runtime
    const issues = parsed.error.issues.map(
      (i) => `${i.path.join('.')}: ${i.message}`,
    )
    throw new Error(`Invalid environment variables:\n${issues.join('\n')}`)
  }
  cached = parsed.data
  return cached
}
