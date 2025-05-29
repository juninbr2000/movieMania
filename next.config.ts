import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  }
};

module.exports = {
  images: {
    domains: ['image.tmdb.org'],
  }
}

export default nextConfig;
