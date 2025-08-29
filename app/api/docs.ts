// Shared API documentation metadata and reusable schemas for Swagger
// These exports are used by the Elysia Swagger plugin to enrich OpenAPI docs.
import { t } from 'elysia'

// Top-level info rendered in Swagger UI
export const swaggerInfo = {
  description:
    'HTTP API for Hypany — create, publish, and analyze hypotheses, landing pages, and waitlists.',
  title: 'Hypany API',
  version: '1.0.0',
}

// Logical groupings for operations in Swagger UI
export const swaggerTags = [
  { description: 'API service status', name: 'Health' },
  { description: 'Authentication endpoints', name: 'Auth' },
  {
    description: 'Core hypothesis management and lifecycle',
    name: 'Hypotheses',
  },
  {
    description: 'Landing page configuration and settings',
    name: 'Landing Pages',
  },
  {
    description: 'Block management for landing pages',
    name: 'Landing Page Blocks',
  },
  { description: 'Waitlist configuration and settings', name: 'Waitlists' },
  { description: 'Waitlist entry management', name: 'Waitlist Entries' },
  {
    description: 'Analytics and export for waitlists',
    name: 'Waitlist Analytics',
  },
  { description: 'Public-facing endpoints (no auth required)', name: 'Public' },
  { description: 'File & image uploads', name: 'Uploads' },
]

// Reusable response schemas
export const ErrorResponse = t.Object({
  error: t.String(),
  reason: t.Optional(t.String()),
})

export const SuccessResponse = t.Object({ success: t.Literal(true) })

// Common helpers for path/query params
export const UlidParam = t.String({
  description: 'ULID identifier',
  pattern: '^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$',
})

export const PaginationQuery = t.Object({
  limit: t.Optional(t.Number({ default: 20, maximum: 100, minimum: 1 })),
  offset: t.Optional(t.Number({ default: 0, minimum: 0 })),
})
