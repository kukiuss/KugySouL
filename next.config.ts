import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove standalone output for Vercel deployment
  // output: 'standalone',
  
  // Allow dev origins for iframe compatibility
  allowedDevOrigins: [
    'work-1-leflzuxfjwqmzsht.prod-runtime.all-hands.dev',
    'work-2-leflzuxfjwqmzsht.prod-runtime.all-hands.dev'
  ],
  
  // Security headers - Allow iframe for development
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },

  // Image optimization (merged with export config above)

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
