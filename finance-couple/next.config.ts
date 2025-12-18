import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Ini kuncinya: Export jadi HTML statis
  output: "export",
  
  // 2. Biar gambar gak error pas export
  images: {
    unoptimized: true,
  },

  // (Settingan lama kamu)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;