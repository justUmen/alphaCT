/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        // port: '',
        // pathname: '/your-specific-path-if-needed/**',
      },
    ],
  },
};

export default nextConfig;
