import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbopackPluginRuntimeStrategy: 'forceWorkerThreads',
  },
};

export default nextConfig;

