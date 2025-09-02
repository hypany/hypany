import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { CallToAction } from '@/components/molecules/landing/call-to-action'
import FeatureDivider from '@/components/molecules/landing/feature-divider'
import Features from '@/components/molecules/landing/features'
import { Footer } from '@/components/molecules/landing/footer'
import { Hero } from '@/components/molecules/landing/hero'
import { NavBar } from '@/components/molecules/landing/navbar'
import RandomIdeasSection from '@/components/molecules/landing/random-ideas-section'
import { resolveActiveLandingPageIdBySlug } from '@/functions/public'

export default async function Home() {
  // If we are on a slug subdomain like slug.hypany.app, redirect to published view
  const host = headers().get('host') || ''
  const parts = host.split('.')
  if (parts.length >= 3 && host.endsWith('hypany.app')) {
    const sub = parts[0]
    if (sub && sub !== 'www') {
      const id = await resolveActiveLandingPageIdBySlug(sub)
      if (id) {
        redirect(`/published/${id}`)
      }
    }
  }

  return (
    <>
      <NavBar />
      <main className='relative mx-auto flex flex-col'>
        <div className='pt-56'>
          <Hero />
        </div>
        <div className='mt-52 px-4 xl:px-0'>
          <Features />
        </div>
        <FeatureDivider className='my-16 max-w-6xl' />
        <div className='mt-12 mb-20 px-4 xl:px-0'>
          <RandomIdeasSection />
        </div>
        <div className='mt-10 mb-40 px-4 xl:px-0'>
          <CallToAction />
        </div>
      </main>
      <Footer />
    </>
  )
}
