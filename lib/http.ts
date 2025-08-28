import type { StatusMap } from 'elysia'
import { HTTP_STATUS } from './constants'

type SetLike = {
  // Elysia's set.status is optional and can be number or string literal
  status?: StatusMap[keyof StatusMap] | number | string
  headers: Record<string, string | number>
}

export function jsonError(
  set: SetLike,
  status: number,
  error: string,
  reason?: string,
) {
  set.status = status
  return reason ? { error, reason } : { error }
}

export function jsonOk<T extends object>(
  set: SetLike,
  status: number = HTTP_STATUS.OK,
  body?: T,
) {
  set.status = status
  return (body ?? { success: true }) as T | { success: true }
}
