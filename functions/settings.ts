import 'server-only'
import { eq } from 'drizzle-orm'
import { ulid } from 'ulid'
import { db } from '@/drizzle'
import { userSettings } from '@/schema'

/**
 * Get user settings, creating defaults if they don't exist
 */
export async function getUserSettings(userId: string) {
  const [settings] = await db
    .select()
    .from(userSettings)
    .where(eq(userSettings.userId, userId))
    .limit(1)

  if (settings) {
    return settings
  }

  // Create default settings
  const newSettings = {
    createdAt: new Date(),
    emailNotifications: true,
    id: ulid(),
    marketingEmailLanguage: 'en',
    marketingEmails: false,
    onboardingComplete: false,
    updatedAt: new Date(),
    userId,
  }

  await db.insert(userSettings).values(newSettings)
  return newSettings
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  updates: {
    emailNotifications?: boolean
    marketingEmails?: boolean
    marketingEmailLanguage?: string
    onboardingComplete?: boolean
  },
) {
  // Ensure settings exist
  await getUserSettings(userId)

  const updateData: any = { updatedAt: new Date() }
  if (updates.emailNotifications !== undefined)
    updateData.emailNotifications = updates.emailNotifications
  if (updates.marketingEmails !== undefined)
    updateData.marketingEmails = updates.marketingEmails
  if (updates.marketingEmailLanguage !== undefined)
    updateData.marketingEmailLanguage = updates.marketingEmailLanguage
  if (updates.onboardingComplete !== undefined)
    updateData.onboardingComplete = updates.onboardingComplete

  await db
    .update(userSettings)
    .set(updateData)
    .where(eq(userSettings.userId, userId))

  return { success: true }
}
