import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/**
 * Create the next-intl plugin
 */
const withNextIntl = createNextIntlPlugin()

/**
 * Base Next.js config
 * Keep this minimal — Next 15 already handles TS/ESM resolution
 */
const nextConfig = {
  reactStrictMode: true,

  // Optional but recommended for Payload
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' as const,
    },
  },

  // Optional: helps when using pnpm + monorepos
  transpilePackages: [],
}

/**
 * Compose plugins:
 * next-intl → Payload
 */
export default withPayload(withNextIntl(nextConfig), {
  devBundleServerPackages: false,
})
