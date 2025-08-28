import { cx } from '@/lib/utils'
import type { LandingConfig } from '../types'
import { Benefits } from './sections/benefits'
import { Features } from './sections/features'
import { FinalCallToAction } from './sections/final-call-to-action'
import { Footer } from './sections/footer'
import { FrequentlyAskedQuestions } from './sections/frequently-asked-questions'
import { Hero } from './sections/hero'
import { PartnersSection } from './sections/partners'

interface Template1Props {
  config: LandingConfig
  className?: string
  hypothesisId?: string
  customCss?: string | null
}

export function Template1({
  config,
  className,
  hypothesisId,
  customCss,
}: Template1Props) {
  // Apply theme tokens as CSS variables
  const themeStyles =
    config.theme?.enabled !== false && config.theme
      ? ({
          '--color-accent': config.theme.colors?.accent || '#111827',
          '--color-bg': config.theme.colors?.bg || '#ffffff',
          '--color-brand': config.theme.colors?.brand || '#3b82f6',
          '--color-fg': config.theme.colors?.fg || '#000000',
          '--color-muted': config.theme.colors?.muted || '#6b7280',
          '--container-max': config.theme.containerMax || '1280px',
          '--font-body':
            config.theme.typography?.body ||
            'system-ui, -apple-system, sans-serif',
          '--font-heading':
            config.theme.typography?.heading ||
            'system-ui, -apple-system, sans-serif',
        } as React.CSSProperties)
      : {}

  const shouldRenderSection = (section: unknown): boolean => {
    if (!section) return false
    if (
      typeof section === 'object' &&
      section !== null &&
      'enabled' in section
    ) {
      if (section.enabled === false) return false
    }
    if (typeof section === 'object' && section !== null && 'items' in section) {
      const items = (section as { items: unknown }).items
      if (Array.isArray(items) && items.length === 0) return false
    }
    return true
  }

  return (
    <div
      className={cx(className, 'min-h-screen')}
      style={themeStyles}
      data-theme={config.theme?.mode || 'light'}
    >
      {customCss ? (
        // Custom CSS for this landing page (user-provided)
        // Note: CSS is injected as-is; ensure only trusted users can edit.
        <style>{customCss}</style>
      ) : null}
      {/* Skip to content link for accessibility */}
      <a
        href='#main'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring'
      >
        Skip to content
      </a>

      {/* Main content */}
      {/* biome-ignore lint/correctness/useUniqueElementIds: Skip navigation link requires static ID */}
      <main id='main'>
        {/* Hero Section */}
        {shouldRenderSection(config.hero) && (
          <Hero config={config.hero} hypothesisId={hypothesisId} />
        )}

        {/* Partners Section */}
        {shouldRenderSection(config.partners) &&
          config.partners &&
          config.partners.logos &&
          config.partners.logos.length > 0 && (
            <PartnersSection config={config.partners} />
          )}

        {/* Features Section */}
        {shouldRenderSection(config.features) && config.features && (
          <Features config={config.features} />
        )}

        {/* Benefits Section */}
        {shouldRenderSection(config.benefits) &&
          config.benefits &&
          config.benefits.items &&
          config.benefits.items.length > 0 && (
            <Benefits config={config.benefits} />
          )}

        {/* FAQ Section */}
        {shouldRenderSection(config.faq) &&
          config.faq &&
          config.faq.items &&
          config.faq.items.length > 0 && (
            <FrequentlyAskedQuestions config={config.faq} />
          )}

        {/* Final CTA Section */}
        {shouldRenderSection(config.finalCta) && config.finalCta && (
          <FinalCallToAction
            config={config.finalCta}
            hypothesisId={hypothesisId}
          />
        )}
      </main>

      {/* Footer */}
      {shouldRenderSection(config.footer) && config.footer && (
        <Footer config={config.footer} />
      )}
    </div>
  )
}
