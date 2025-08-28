import 'server-only'
import { getEnv } from '@/lib/env'

type VercelResponse<T = unknown> = {
  ok: boolean
  status: number
  data?: T
  error?: { code?: string; message?: string } | unknown
}

const VERCEL_API_BASE = 'https://api.vercel.com'

function getVercelConfig() {
  const {
    VERCEL_TOKEN: token,
    VERCEL_PROJECT_ID: projectId,
    VERCEL_TEAM_ID: teamId,
  } = getEnv()
  if (!token || !projectId) {
    throw new Error(
      'Missing VERCEL_TOKEN or VERCEL_PROJECT_ID environment variables',
    )
  }
  return { projectId, teamId, token }
}

async function vercelFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<VercelResponse<T>> {
  try {
    const res = await fetch(`${VERCEL_API_BASE}${path}`, init)
    const ct = res.headers.get('content-type') || ''
    const isJson = ct.includes('application/json')
    const payload = isJson ? await res.json().catch(() => undefined) : undefined
    return { data: payload as T, ok: res.ok, status: res.status }
  } catch (error) {
    return { error, ok: false, status: 0 }
  }
}

export async function addDomainToVercel(
  domain: string,
): Promise<VercelResponse> {
  const { projectId, teamId, token } = getVercelConfig()
  const url = new URL(
    `/v10/projects/${encodeURIComponent(projectId)}/domains`,
    VERCEL_API_BASE,
  )
  if (teamId) url.searchParams.set('teamId', teamId)
  return vercelFetch(url.pathname + (url.search || ''), {
    body: JSON.stringify({ name: domain }),
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    method: 'POST',
  })
}

export async function removeDomainFromVercel(
  domain: string,
): Promise<VercelResponse> {
  const { projectId, teamId, token } = getVercelConfig()
  const url = new URL(
    `/v10/projects/${encodeURIComponent(projectId)}/domains/${encodeURIComponent(domain)}`,
    VERCEL_API_BASE,
  )
  if (teamId) url.searchParams.set('teamId', teamId)
  return vercelFetch(url.pathname + (url.search || ''), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  })
}

export async function ensureVercelProjectDomains(domain: string) {
  // Always ensure both apex and www map to the project; canonicalization will redirect appropriately
  const apex = domain.replace(/^www\./, '')
  const withWWW = `www.${apex}`

  const results = [] as Array<{ name: string; status: number; ok: boolean }>

  const one = await addDomainToVercel(apex)
  results.push({
    name: apex,
    ok: one.ok || one.status === 409,
    status: one.status,
  })

  const two = await addDomainToVercel(withWWW)
  results.push({
    name: withWWW,
    ok: two.ok || two.status === 409,
    status: two.status,
  })

  return results
}

export async function removeVercelProjectDomains(domain: string) {
  const apex = domain.replace(/^www\./, '')
  const withWWW = `www.${apex}`
  const results = [] as Array<{ name: string; status: number; ok: boolean }>

  const one = await removeDomainFromVercel(apex)
  results.push({
    name: apex,
    ok: one.ok || one.status === 404,
    status: one.status,
  })

  const two = await removeDomainFromVercel(withWWW)
  results.push({
    name: withWWW,
    ok: two.ok || two.status === 404,
    status: two.status,
  })

  return results
}
