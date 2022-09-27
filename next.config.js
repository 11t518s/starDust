/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["picsum.photos", "firebasestorage.googleapis.com"] },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
