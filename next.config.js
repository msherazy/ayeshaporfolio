/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Không dùng 'output: export' vì cần Firebase và API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Optimize cho Vercel deployment
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
};

module.exports = nextConfig;
