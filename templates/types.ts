export type Media = {
  enabled?: boolean
} & (
  | {
      kind: 'image'
      src: string
      alt: string
      width?: number
      height?: number
      srcSet?: string
      sizes?: string
    }
  | {
      kind: 'video'
      src: string
      poster?: string
      alt: string
      loop?: boolean
      autoPlay?: boolean
      muted?: boolean
    }
  | { kind: 'lottie'; src: string; alt: string }
)

export type CallToAction = {
  enabled?: boolean
  label: string
  href: string
  style?: 'primary' | 'secondary' | 'link' | 'store-apple' | 'store-google'
  icon?: string
  analyticsId?: string
  newTab?: boolean
  ariaLabel?: string
}

export type Badge = {
  enabled?: boolean
  text: string
  tone?: 'neutral' | 'success' | 'warning' | 'brand'
  color?: string // Tailwind color class
  borderColor?: string // Tailwind border color class
  href?: string
  icon?: string
}

export type Stat = {
  enabled?: boolean
  value: string
  label: string
  icon?: string
}

export type Theme = {
  enabled?: boolean
  mode?: 'light' | 'dark' | 'system'
  colors?: Partial<{
    bg: string
    fg: string
    muted: string
    brand: string
    accent: string
  }>
  typography?: Partial<{
    body: string
    heading: string
  }>
  containerMax?: string
}

export type Meta = {
  enabled?: boolean
  title: string
  description?: string
  ogImage?: string
  favicon?: string
  locale?: string
}

export type Hero = {
  enabled?: boolean
  id?: string
  badges?: Badge[]
  headline: string
  subhead?: string
  ctas?: CallToAction[]
  stats?: Stat[]
  media?: Media
  alignment?: 'left' | 'center'
}

export type Partners = {
  enabled?: boolean
  id?: string
  caption?: string
  logos: { name: string; logoSrc: string; href?: string; alt?: string }[]
}

export type FeatureCard = {
  title: string
  summary?: string
  bullets?: string[]
  media?: Media
  orientation?: 'left' | 'right' | 'top'
}

export type Features = {
  enabled?: boolean
  id?: string
  heading?: string
  primary: FeatureCard
  secondary: FeatureCard[]
}

export type Benefit = {
  icon?: string
  title: string
  description?: string
}

export type Benefits = {
  enabled?: boolean
  id?: string
  heading?: string
  items: Benefit[]
}

export type Testimonial = {
  rating?: number
  quote: string
  author: {
    name: string
    role?: string
    country?: string
    avatarSrc?: string
  }
}

// export type Testimonials removed from builder

export type FrequentlyAskedQuestionItem = {
  question: string
  answer: string
  expanded?: boolean
}

export type FrequentlyAskedQuestions = {
  enabled?: boolean
  id?: string
  heading?: string
  items: FrequentlyAskedQuestionItem[]
}

export type FinalCallToAction = {
  enabled?: boolean
  id?: string
  heading: string
  subhead?: string
  ctas?: CallToAction[]
  media?: Media
}

export type WaitlistForm = {
  enabled?: boolean
  heading?: string
  subhead?: string
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
}

export type Footer = {
  enabled?: boolean
  columns?: {
    heading?: string
    links: { label: string; href: string; external?: boolean }[]
  }[]
  social?: {
    platform: 'x' | 'facebook' | 'linkedin' | 'instagram' | 'youtube' | 'tiktok'
    href: string
    ariaLabel?: string
  }[]
  legal?: {
    copyright?: string
    links?: { label: string; href: string }[]
  }
}

export type LandingConfig = {
  meta: Meta
  theme?: Theme
  hero: Hero
  partners?: Partners
  features?: Features
  benefits?: Benefits
  waitlistForm?: WaitlistForm
  faq?: FrequentlyAskedQuestions
  finalCta?: FinalCallToAction
  footer?: Footer
}
