import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="UTF-8" />

        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png?v=3" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest?v=3" />
        <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg?v=3" color="#1170ee" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml?v=3" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: dark)" />

        <meta property="og:image" content="/assets/og_logo.png" />
        <meta property="og:site_name" content="Безпересдач" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
