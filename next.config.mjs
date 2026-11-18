import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services.html',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/shop.html',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/product.html',
        destination: '/product',
        permanent: true,
      },
      {
        source: '/services/:slug.html',
        destination: '/services/:slug',
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
