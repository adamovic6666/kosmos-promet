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
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
  },
};

export default nextConfig;
