/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Cho phép tất cả các domain dùng https
      },
      {
        protocol: 'http',
        hostname: '**', // Cho phép tất cả các domain dùng http (nếu cần)
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: 'http://stardust.pikamc.vn:25461/api/:path*',
      },
    ]
  },
};

export default nextConfig;