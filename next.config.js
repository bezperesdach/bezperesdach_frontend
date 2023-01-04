/* eslint-disable @typescript-eslint/no-var-requires */
const CircularDependencyPlugin = require("circular-dependency-plugin");
const plugins = [];

if (process.env.ANALYZE === "true") {
  // only load dependency if env `ANALYZE` was set
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });

  plugins.push(withBundleAnalyzer);
}

const StylelintPlugin = require("stylelint-webpack-plugin");

const path = require("path");
const loaderUtils = require("loader-utils");

//based on https://github.com/vercel/next.js/blob/0af3b526408bae26d6b3f8cab75c4229998bf7cb/packages/next/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent.ts
const hashOnlyIdent = (context, _, exportName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(`filePath:${path.relative(context.rootContext, context.resourcePath).replace(/\\+/g, `/`)}#className:${exportName}`),
      "md4",
      "base64",
      6
    )
    .replace(/^(-?\d|--)/, "_$1")
    .replaceAll("+", "_")
    .replaceAll("/", "_");

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: process.env.NODE_ENV === "development" ? true : false,
  redirects: async () => [
    {
      source: "/order",
      destination: "/order/new",
      permanent: true,
    },
  ],
  webpack: (config, { isServer, dev }) => {
    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        include: /src/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      })
    );

    config.plugins.push(new StylelintPlugin());

    const rules = config.module.rules.find((rule) => typeof rule.oneOf === "object").oneOf.filter((rule) => Array.isArray(rule.use));

    if (!dev)
      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (moduleLoader.loader?.includes("css-loader") && !moduleLoader.loader?.includes("postcss-loader"))
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
        });
      });

    const prefix = config.assetPrefix ?? config.basePath ?? "";
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: `${prefix}/_next/static/media/`,
            outputPath: `${isServer ? "../" : ""}static/media/`,
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
};

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
