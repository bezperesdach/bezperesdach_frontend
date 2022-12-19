/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bezperesdach.ru",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/admin"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/agreement", "/assets/documents/processing-policy.pdf"],
      },
    ],
  },
};
