import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@karigai/ui'],
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
