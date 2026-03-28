/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'back-end-rork.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig
