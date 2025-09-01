import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  // Helpful for diagnosing prod-only client errors (maps chunk stacks to source)
  productionBrowserSourceMaps: true,
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
