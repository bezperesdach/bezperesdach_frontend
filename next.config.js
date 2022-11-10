/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const StylelintPlugin = require("stylelint-webpack-plugin");

const path = require("path");
const loaderUtils = require("loader-utils");

// based on https://github.com/vercel/next.js/blob/0af3b526408bae26d6b3f8cab75c4229998bf7cb/packages/next/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent.ts
const hashOnlyIdent = (context, _, exportName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(`filePath:${path.relative(context.rootContext, context.resourcePath).replace(/\\+/g, "/")}#className:${exportName}`),
      "md4",
      "base64",
      6
    )
    .replace(/^(-?\d|--)/, "_$1");

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: process.env.NODE_ENV === "development" ? true : false,
  webpack: (config, { dev }) => {
    const rules = config.module.rules.find((rule) => typeof rule.oneOf === "object").oneOf.filter((rule) => Array.isArray(rule.use));

    if (!dev)
      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (moduleLoader.loader?.includes("css-loader") && !moduleLoader.loader?.includes("postcss-loader"))
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
        });
      });

    config.plugins.push(new StylelintPlugin());

    return config;
  },
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...defaultConfig, ...nextConfig });
};
