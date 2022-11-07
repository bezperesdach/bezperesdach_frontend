/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: process.env.NODE_ENV === "development" ? true : false,
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...defaultConfig, ...nextConfig });
};
