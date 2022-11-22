/* eslint-disable @next/next/no-img-element */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { GOOGLE_TAG_MANAGER_ID } from "../utils/google-tag-manager";
import { YANDEX_METRIKA_ID } from "../utils/yandex-metrika";

const analyticsEnabled = process.env.NODE_ENV === "production";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        {analyticsEnabled && (
          <>
            <Script
              id="yandex-metrica"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  ym(${YANDEX_METRIKA_ID}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
  });`,
              }}
            />
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
          </>
        )}

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
        {analyticsEnabled && (
          <>
            <noscript>
              <img src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />

              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
