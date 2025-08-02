import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Accepts all external domains — restrict this to specific domains for better security
      },
    ],
  },
};

export default nextConfig;
