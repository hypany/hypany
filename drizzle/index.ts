import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { getEnv } from '@/lib/env'
import * as schema from '@/schema'

const { DATABASE_URL } = getEnv()
// Use Neon serverless Pool + drizzle neon-serverless to support transactions
const pool = new Pool({ connectionString: DATABASE_URL })
export const db = drizzle(pool, { schema })
