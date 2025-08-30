import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { ulid } from 'ulid'

// BETTER AUTH SCHEMA START. DO NOT TOUCH.
export const users = pgTable('users', {
  banExpires: timestamp('ban_expires'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  id: text('id').primaryKey(),
  image: text('image'),
  name: text('name').notNull(),
  role: text('role'),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const sessions = pgTable('sessions', {
  activeOrganizationId: text('active_organization_id'),
  createdAt: timestamp('created_at').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  id: text('id').primaryKey(),
  impersonatedBy: text('impersonated_by'),
  ipAddress: text('ip_address'),
  token: text('token').notNull().unique(),
  updatedAt: timestamp('updated_at').notNull(),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const accounts = pgTable('accounts', {
  accessToken: text('access_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  accountId: text('account_id').notNull(),
  createdAt: timestamp('created_at').notNull(),
  id: text('id').primaryKey(),
  idToken: text('id_token'),
  password: text('password'),
  providerId: text('provider_id').notNull(),
  refreshToken: text('refresh_token'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  updatedAt: timestamp('updated_at').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const verifications = pgTable('verifications', {
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  expiresAt: timestamp('expires_at').notNull(),
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  value: text('value').notNull(),
})

export const organizations = pgTable('organizations', {
  createdAt: timestamp('created_at').notNull(),
  id: text('id').primaryKey(),
  logo: text('logo'),
  metadata: text('metadata'),
  name: text('name').notNull(),
  slug: text('slug').unique(),
})

export const members = pgTable('members', {
  createdAt: timestamp('created_at').notNull(),
  id: text('id').primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  role: text('role').default('member').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const invitations = pgTable('invitations', {
  email: text('email').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  id: text('id').primaryKey(),
  inviterId: text('inviter_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  role: text('role'),
  status: text('status').default('pending').notNull(),
})
// BETTER AUTH SCHEMA END.

// APPLICATION SCHEMA START

// Hypotheses for idea validation
export const hypotheses = pgTable(
  'hypotheses',
  {
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    customDomain: text('custom_domain'),
    deletedAt: timestamp('deleted_at'), // Soft delete field
    description: text('description'),
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    name: text('name').notNull(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    slug: text('slug').unique(),
    status: text('status').notNull().default('draft'), // draft, published, archived
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    orgIdIdx: index('hypotheses_org_id_idx').on(table.organizationId),
    userIdIdx: index('hypotheses_user_id_idx').on(table.userId),
  }),
)

// Landing pages associated with hypotheses
export const landingPages = pgTable(
  'landing_pages',
  {
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    customCss: text('custom_css'),
    deletedAt: timestamp('deleted_at'), // Soft delete field
    favicon: text('favicon'),
    hypothesisId: text('hypothesis_id')
      .notNull()
      .references(() => hypotheses.id, { onDelete: 'cascade' }),
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    metaDescription: text('meta_description'),
    metaTitle: text('meta_title'),
    name: text('name'),
    ogImage: text('og_image'),
    publishedAt: timestamp('published_at'),
    template: text('template').notNull().default('default'),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    hypothesisIdIdx: index('landing_pages_hypothesis_id_idx').on(
      table.hypothesisId,
    ),
  }),
)

// Blocks/sections for landing pages
export const landingPageBlocks = pgTable(
  'landing_page_blocks',
  {
    content: text('content').notNull(), // JSON string containing block data
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: timestamp('deleted_at'), // Soft delete field
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    landingPageId: text('landing_page_id')
      .notNull()
      .references(() => landingPages.id, { onDelete: 'cascade' }),
    order: text('order').notNull(), // For sorting blocks
    type: text('type').notNull(), // hero, features, testimonials, cta, etc.
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    landingPageIdIdx: index('landing_page_blocks_landing_page_id_idx').on(
      table.landingPageId,
    ),
  }),
)

// Waitlists associated with hypotheses
export const waitlists = pgTable(
  'waitlists',
  {
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: timestamp('deleted_at'), // Soft delete field
    hypothesisId: text('hypothesis_id')
      .notNull()
      .references(() => hypotheses.id, { onDelete: 'cascade' })
      .unique(),
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    name: text('name').notNull(),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    hypothesisIdIdx: index('waitlists_hypothesis_id_idx').on(
      table.hypothesisId,
    ),
  }),
)

// Individual waitlist entries/signups
export const waitlistEntries = pgTable(
  'waitlist_entries',
  {
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: timestamp('deleted_at'), // Soft delete field
    email: text('email').notNull(),
    emailRevealed: boolean('email_revealed').default(false).notNull(), // Track if email has been revealed/paid for
    emailVerified: boolean('email_verified').default(false),
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    metadata: text('metadata'), // JSON string for additional data
    name: text('name'),
    revealedAt: timestamp('revealed_at'), // When the email was revealed
    source: text('source'), // organic, social, ad
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
    utmCampaign: text('utm_campaign'),
    utmContent: text('utm_content'),
    utmMedium: text('utm_medium'),
    utmSource: text('utm_source'),
    utmTerm: text('utm_term'),
    visitorId: text('visitor_id'),
    waitlistId: text('waitlist_id')
      .notNull()
      .references(() => waitlists.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    visitorIdx: index('waitlist_entries_visitor_idx').on(table.visitorId),
    waitlistIdCreatedIdx: index(
      'waitlist_entries_waitlist_id_created_at_idx',
    ).on(table.waitlistId, table.createdAt),
    waitlistIdIdx: index('waitlist_entries_waitlist_id_idx').on(
      table.waitlistId,
    ),
  }),
)

// Page visit analytics for landing pages
export const pageVisits = pgTable(
  'page_visits',
  {
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    hypothesisId: text('hypothesis_id')
      .notNull()
      .references(() => hypotheses.id, { onDelete: 'cascade' }),
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    landingPageId: text('landing_page_id')
      .notNull()
      .references(() => landingPages.id, { onDelete: 'cascade' }),
    path: text('path'),
    referrer: text('referrer'),
    userAgent: text('user_agent'),
    visitorId: text('visitor_id'),
  },
  (table) => ({
    createdAtIdx: index('page_visits_created_at_idx').on(table.createdAt),
    hypothesisIdx: index('page_visits_hypothesis_idx').on(table.hypothesisId),
    landingPageIdx: index('page_visits_landing_page_idx').on(
      table.landingPageId,
    ),
    visitorIdx: index('page_visits_visitor_idx').on(table.visitorId),
  }),
)

// User-specific settings and preferences
export const userSettings = pgTable(
  'user_settings',
  {
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    emailNotifications: boolean('email_notifications').default(true).notNull(),
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    onboardingComplete: boolean('onboarding_complete').default(false).notNull(),
    theme: text('theme').default('system'), // light | dark | system
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    userIdIdx: index('user_settings_user_id_idx').on(table.userId),
    userIdUniqueIdx: uniqueIndex('user_settings_user_id_unique_idx').on(
      table.userId,
    ),
  }),
)

// Uploaded assets (eg. images) for users
export const assets = pgTable(
  'assets',
  {
    contentType: text('content_type'),
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: timestamp('deleted_at'),
    filename: text('filename'),
    // Optional association to a specific hypothesis for filtering in editor/gallery
    hypothesisId: text('hypothesis_id').references(() => hypotheses.id, {
      onDelete: 'cascade',
    }),
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    key: text('key').notNull(),
    size: text('size'),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
    url: text('url').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    hypothesisIdIdx: index('assets_hypothesis_id_idx').on(table.hypothesisId),
    keyIdx: uniqueIndex('assets_key_unique').on(table.key),
    userIdIdx: index('assets_user_id_idx').on(table.userId),
  }),
)

// Inferred types (select/insert) exported alongside table definitions
// Auth-related
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert
export type Verification = typeof verifications.$inferSelect
export type NewVerification = typeof verifications.$inferInsert

// Application domain
export type Hypothesis = typeof hypotheses.$inferSelect
export type NewHypothesis = typeof hypotheses.$inferInsert
export type LandingPage = typeof landingPages.$inferSelect
export type NewLandingPage = typeof landingPages.$inferInsert
export type LandingPageBlock = typeof landingPageBlocks.$inferSelect
export type NewLandingPageBlock = typeof landingPageBlocks.$inferInsert
export type Waitlist = typeof waitlists.$inferSelect
export type NewWaitlist = typeof waitlists.$inferInsert
export type WaitlistEntry = typeof waitlistEntries.$inferSelect
export type NewWaitlistEntry = typeof waitlistEntries.$inferInsert
export type PageVisit = typeof pageVisits.$inferSelect
export type NewPageVisit = typeof pageVisits.$inferInsert
export type UserSettings = typeof userSettings.$inferSelect
export type NewUserSettings = typeof userSettings.$inferInsert
export type Asset = typeof assets.$inferSelect
export type NewAsset = typeof assets.$inferInsert
