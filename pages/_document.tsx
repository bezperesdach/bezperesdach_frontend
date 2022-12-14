/* eslint-disable @next/next/no-img-element */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
// import generateCSP from "../utils/generate-csp";
import { GOOGLE_TAG_MANAGER_ID } from "../utils/google-tag-manager";
import { YANDEX_METRIKA_ID } from "../utils/yandex-metrika";

const VK_ADS_ID = process.env.NEXT_PUBLIC_VK_ADS_ID;

const analyticsEnabled = process.env.NODE_ENV === "production";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        {/* <meta httpEquiv="Content-Security-Policy" content={generateCSP()} /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="https://bezperesdach.ru/assets/favicon/apple-touch-icon.png?v=4" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://bezperesdach.ru/assets/favicon/favicon-32x32.png?v=4" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://bezperesdach.ru/assets/favicon/favicon-16x16.png?v=4" />
        <link rel="manifest" href="https://bezperesdach.ru/assets/favicon/site.webmanifest?v=4" />
        <link rel="mask-icon" href="https://bezperesdach.ru/assets/favicon/safari-pinned-tab.svg?v=4" color="#1170ee" />
        <link rel="shortcut icon" href="/favicon.ico?v=4" />
        <meta name="apple-mobile-web-app-title" content="Безпересдач" />
        <meta name="application-name" content="Безпересдач" />
        <meta name="msapplication-TileColor" content="#2d89ef" />

        <meta name="msapplication-config" content="https://bezperesdach.ru/assets/favicon/browserconfig.xml?v=4" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: dark)" />

        <meta property="og:image" content="https://bezperesdach.ru/assets/og_logo.png" />

        <meta name="twitter:image" content="https://bezperesdach.ru/assets/og_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="bezperesdach.ru" />

        <meta property="og:site_name" content="Безпересдач" />
      </Head>

      <body>
        <Main />
        <NextScript />

        {analyticsEnabled && (
          <Script
            id="google-tag-manager"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');`,
            }}
          />
        )}

        {analyticsEnabled && (
          <noscript>
            <img src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
            <img src={`https://vk.com/rtrg?p=${VK_ADS_ID}`} style={{ position: "fixed", left: "-999px" }} alt="" />
          </noscript>
        )}
      </body>
    </Html>
  );
}
