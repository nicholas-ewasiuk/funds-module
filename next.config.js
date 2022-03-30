/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");
const path = require("path");

const lessFilePath = path.resolve(
  "./styles/app.less"
);

const securityHeaders = [
  {
    key: 'Access-Control-Allow-Origin',
    value: '*'
  }
];

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/solanaFunds',
        headers: securityHeaders,
      }
    ]
  }
}

module.exports = withPlugins(
  [
    [withLess, {
      lessLoaderOptions: {
      },
    }],
  ], nextConfig);
