module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? [
          "postcss-flexbugs-fixes",
          [
            "postcss-preset-env",
            {
              autoprefixer: {
                flexbox: true,
              },
              stage: 2,
            },
          ],
          [
            "@fullhuman/postcss-purgecss",
            {
              content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
              defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
              safelist: ["grecaptcha-badge"],
            },
          ],
        ]
      : [],
};
