import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* other config options */
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
