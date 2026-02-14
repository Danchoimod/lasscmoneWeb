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
};

export default nextConfig;