import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["backend.autofrogy.com", "placehold.co", "img.youtube.com"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.BASE_URL,
    NEXT_PUBLIC_API_HASH: process.env.API_HASH,
  },
};

export default nextConfig;
