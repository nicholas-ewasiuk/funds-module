/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");
const path = require("path");

const lessFilePath = path.resolve(
  "./styles/app.less"
);

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

module.exports = withPlugins(
  [
    [withLess, {
      lessLoaderOptions: {
      },
    }],
  ], nextConfig);
