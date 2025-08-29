import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import { cx } from '@/lib/utils'
import type { CallToAction, Hero as HeroType, Media } from '../../types'
import { WaitlistDialog } from './waitlist-dialog'

interface HeroProps {
  config: HeroType
  hypothesisId?: string
}

export function Hero({ config, hypothesisId }: HeroProps) {
  const renderMedia = (media: Media) => {
    if (media.enabled === false) return null

    if (media.kind === 'image') {
      return (
        <figure className='relative'>
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width || 420}
            height={media.height || 860}
            className='w-full h-auto'
            loading='eager'
            priority
            sizes={media.sizes}
          />
        </figure>
      )
    }

    if (media.kind === 'video') {
      return (
        <figure className='relative'>
          <video
            src={media.src}
            poster={media.poster}
            aria-label={media.alt}
            loop={media.loop}
            autoPlay={media.autoPlay}
            muted={media.muted}
            className='w-full h-auto rounded-lg'
          />
        </figure>
      )
    }

    if (media.kind === 'lottie') {
      // For Lottie, we'd need a client component with lottie-react
      // For now, return a placeholder
      return (
        <figure className='relative'>
          <div className='aspect-[9/16] bg-muted rounded-lg flex items-center justify-center'>
            <span className='text-muted-foreground'>Lottie Animation</span>
          </div>
        </figure>
      )
    }

    return null
  }

  const renderCTA = (cta: CallToAction) => {
    if (cta.enabled === false) return null

    // Handle app store buttons
    if (cta.style === 'store-apple') {
      return (
        <Link
          href={cta.href}
          target={cta.newTab ? '_blank' : undefined}
          rel={cta.newTab ? 'noopener noreferrer' : undefined}
          aria-label={cta.ariaLabel || cta.label}
          data-analytics-id={cta.analyticsId}
          className='inline-block'
        >
          <Image
            src='/app-store-badge.svg'
            alt={cta.label}
            width={140}
            height={48}
            className='h-12 w-auto'
          />
        </Link>
      )
    }

    if (cta.style === 'store-google') {
      return (
        <Link
          href={cta.href}
          target={cta.newTab ? '_blank' : undefined}
          rel={cta.newTab ? 'noopener noreferrer' : undefined}
          aria-label={cta.ariaLabel || cta.label}
          data-analytics-id={cta.analyticsId}
          className='inline-block'
        >
          <Image
            src='/google-play-badge.svg'
            alt={cta.label}
            width={156}
            height={48}
            className='h-12 w-auto'
          />
        </Link>
      )
    }

    // Regular buttons
    const variant =
      cta.style === 'primary'
        ? 'primary'
        : cta.style === 'secondary'
          ? 'secondary'
          : cta.style === 'link'
            ? 'ghost'
            : 'secondary'

    if (cta.href === '#waitlist') {
      return (
        <WaitlistDialog
          config={{
            enabled: true,
            errorMessage: 'Something went wrong. Please try again.',
            heading: 'Join Our Waitlist',
            submitLabel: 'Join Waitlist',
            successMessage: 'Successfully joined the waitlist!',
          }}
          hypothesisId={hypothesisId || ''}
          triggerPlaceholder={cta.label || 'Enter your email to join'}
        />
      )
    }

    return (
      <Button variant={variant} asChild data-analytics-id={cta.analyticsId}>
        <Link
          href={cta.href}
          target={cta.newTab ? '_blank' : undefined}
          rel={cta.newTab ? 'noopener noreferrer' : undefined}
          aria-label={cta.ariaLabel || cta.label}
        >
          {cta.label}
        </Link>
      </Button>
    )
  }

  return (
    <section
      id={config.id}
      className='relative overflow-hidden bg-background py-16 sm:py-24'
    >
      <div
        className='container mx-auto px-4 sm:px-6 lg:px-8'
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div
          className={cx(
            config.alignment === 'center' && !config.media
              ? 'max-w-3xl mx-auto'
              : 'grid gap-12 lg:grid-cols-2 lg:gap-8 items-center',
          )}
        >
          {/* Content Column */}
          <div
            className={cx(
              'flex flex-col gap-6',
              config.alignment === 'center' && 'text-center items-center',
              config.alignment === 'center' && config.media && 'lg:col-span-2',
            )}
          >
            {/* Badges */}
            {config.badges && config.badges.length > 0 && (
              <div
                className={cx(
                  'flex flex-wrap gap-2',
                  config.alignment === 'center' && 'justify-center',
                )}
              >
                {config.badges.map(
                  (badge) =>
                    badge.enabled !== false && (
                      <span
                        key={`${badge.text}-${badge.color}-${badge.borderColor}`}
                        className={cx(
                          'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                          badge.color || 'bg-blue-100',
                          badge.borderColor || 'border-blue-200',
                          'text-gray-900',
                        )}
                      >
                        {badge.icon && (
                          <span className='mr-1'>{badge.icon}</span>
                        )}
                        {badge.href ? (
                          <Link href={badge.href}>{badge.text}</Link>
                        ) : (
                          badge.text
                        )}
                      </span>
                    ),
                )}
              </div>
            )}

            {/* Headline */}
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
              {config.headline}
            </h1>

            {/* Subhead */}
            {config.subhead && (
              <p
                className={cx(
                  'text-lg text-muted-foreground sm:text-xl max-w-2xl',
                  config.alignment === 'center' && 'mx-auto',
                )}
              >
                {config.subhead}
              </p>
            )}

            {/* CTAs */}
            {config.ctas && config.ctas.length > 0 && (
              <div
                className={cx(
                  'flex flex-wrap gap-4',
                  config.alignment === 'center' && 'justify-center',
                )}
              >
                {config.ctas.map((cta) => (
                  <div key={`${cta.label}-${cta.href}`}>{renderCTA(cta)}</div>
                ))}
              </div>
            )}

            {hypothesisId &&
              (!config.ctas ||
                !config.ctas.some((c) => c.href === '#waitlist')) && (
                <div
                  className={cx(
                    'mt-2 w-full max-w-sm',
                    config.alignment === 'center' && 'mx-auto',
                  )}
                >
                  <WaitlistDialog
                    config={{
                      enabled: true,
                      errorMessage: 'Something went wrong. Please try again.',
                      heading: 'Join Our Waitlist',
                      submitLabel: 'Join Waitlist',
                      successMessage: 'Successfully joined the waitlist!',
                    }}
                    hypothesisId={hypothesisId}
                    triggerPlaceholder={'Enter your email to join'}
                  />
                </div>
              )}

            {/* Stats */}
            {config.stats && config.stats.length > 0 && (
              <div
                className={cx(
                  'flex flex-wrap gap-8 pt-4',
                  config.alignment === 'center' && 'justify-center',
                )}
              >
                {config.stats.map(
                  (stat) =>
                    stat.enabled !== false && (
                      <div
                        key={`${stat.label}-${stat.value}`}
                        className='flex flex-col'
                      >
                        <span className='text-3xl font-bold'>{stat.value}</span>
                        <span className='text-sm text-muted-foreground'>
                          {stat.label}
                        </span>
                      </div>
                    ),
                )}
              </div>
            )}
          </div>

          {/* Media Column */}
          {config.media && !config.alignment && (
            <div className='relative'>{renderMedia(config.media)}</div>
          )}

          {/* Centered Media */}
          {config.media && config.alignment === 'center' && (
            <div className='relative lg:col-span-2 max-w-3xl mx-auto mt-8'>
              {renderMedia(config.media)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
