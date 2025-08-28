import 'server-only'
import Plunk from '@plunk/node'
import { getEnv } from '@/lib/env'
import { logger } from '@/lib/logger'

const { PLUNK_SECRET_KEY, EMAIL_FROM } = getEnv()
export const plunk = new Plunk(PLUNK_SECRET_KEY)

export const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) => {
  try {
    await plunk.emails.send({
      body,
      from: EMAIL_FROM,
      subject,
      to,
    })
  } catch (error) {
    logger.error('Failed to send email', { error: String(error) })
    throw error
  }
}
