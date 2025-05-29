import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ['image.tmdb.org'],
  }
};

export default nextConfig;
