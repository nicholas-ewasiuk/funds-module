/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");
const path = require("path");

const lessFilePath = path.resolve(
  "./styles/app.less"
);

const securityHeaders = [
  {
    key: 'x-custom-header',
    value: 'my custom header value',
  },
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
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
        ],
      },
    ]
  },
}

module.exports = withPlugins(
  [
    [withLess, {
      lessLoaderOptions: {
      },
    }],
  ], nextConfig);
