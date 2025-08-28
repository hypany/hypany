import { Button } from '@/components/atoms/button'
import Image from 'next/image'
import Link from 'next/link'
import type {
  CallToAction,
  FinalCallToAction as FinalCTAType,
  Media,
} from '../../types'
import { WaitlistDialog } from './waitlist-dialog'

interface FinalCallToActionProps {
  config: FinalCTAType
  hypothesisId?: string
}

function renderMedia(media?: Media) {
  if (!media || media.enabled === false) return null

  if (media.kind === 'image') {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width || 960}
        height={media.height || 640}
        className='w-full h-auto rounded-lg'
        loading='lazy'
        sizes={media.sizes}
      />
    )
  }

  if (media.kind === 'video') {
    return (
      <video
        src={media.src}
        poster={media.poster}
        aria-label={media.alt}
        loop={media.loop}
        autoPlay={media.autoPlay}
        muted={media.muted}
        className='w-full h-auto rounded-lg'
      />
    )
  }

  return null
}

function renderCTA(cta: CallToAction) {
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
        hypothesisId={cta.analyticsId || ''}
        triggerPlaceholder={cta.label || 'Enter your email to join'}
      />
    )
  }

  // Regular buttons
  const variant =
    cta.style === 'primary'
      ? 'default'
      : cta.style === 'secondary'
        ? 'secondary'
        : cta.style === 'link'
          ? 'link'
          : 'default'

  return (
    <Button
      variant={variant}
      size='lg'
      asChild
      data-analytics-id={cta.analyticsId}
    >
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

export function FinalCallToAction({
  config,
  hypothesisId,
}: FinalCallToActionProps) {
  return (
    <section id={config.id} className='py-16 sm:py-24 bg-primary/5'>
      <div
        className='container mx-auto px-4 sm:px-6 lg:px-8'
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className='mx-auto max-w-3xl text-center'>
          {/* Heading */}
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            {config.heading}
          </h2>

          {/* Subhead */}
          {config.subhead && (
            <p className='mt-4 text-lg text-muted-foreground'>
              {config.subhead}
            </p>
          )}

          {/* CTAs */}
          {config.ctas && config.ctas.length > 0 && (
            <div className='mt-8 flex flex-wrap justify-center gap-4'>
              {config.ctas.map((cta) => (
                <div key={`final-cta-${cta.label}-${cta.href}`}>
                  {cta.href === '#waitlist' ? (
                    <WaitlistDialog
                      config={{
                        enabled: true,
                        errorMessage: 'Something went wrong. Please try again.',
                        heading: 'Join Our Waitlist',
                        submitLabel: 'Join Waitlist',
                        successMessage: 'Successfully joined the waitlist!',
                      }}
                      hypothesisId={hypothesisId || ''}
                      triggerPlaceholder={
                        cta.label || 'Enter your email to join'
                      }
                    />
                  ) : (
                    renderCTA(cta)
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Media */}
          {config.media && (
            <div className='mt-12'>{renderMedia(config.media)}</div>
          )}
        </div>
      </div>
    </section>
  )
}
