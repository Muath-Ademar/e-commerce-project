/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['back-end-rork.onrender.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'back-end-rork.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig
