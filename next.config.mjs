/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/GFW_',
  assetPrefix: '/GFW_/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
