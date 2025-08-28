import 'server-only'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { getEnv } from '@/lib/env'
import * as schema from '@/schema'

const { DATABASE_URL } = getEnv()
const sql = neon(DATABASE_URL)
export const db = drizzle({ client: sql, schema })
