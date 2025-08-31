/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Optimize cho Vercel deployment
  experimental: {
  
  },
};

module.exports = nextConfig;
