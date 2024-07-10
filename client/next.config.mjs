/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  trailingSlash: true,
  exportPathMap: async function(
    defaultPathMap,
    {},
  ) {
    return {
      '/': { page: '/' },
    };
  },
};

export default nextConfig;
