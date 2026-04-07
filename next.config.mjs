/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["pdf-to-img", "pdfjs-dist"],
  },
};

export default nextConfig;
