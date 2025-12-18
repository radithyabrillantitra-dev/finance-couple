import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Wajib buat Netlify Static
  trailingSlash: true,   // Wajib biar halaman anak ketemu
  images: {
    unoptimized: true,   // Wajib biar gambar gak error
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;