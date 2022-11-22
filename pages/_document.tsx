import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import Image from "next/image";
import { GOOGLE_ANALYTICS_ID } from "../utils/google-analytics";
import { YANDEX_METRIKA_ID } from "../utils/yandex-metrika";

const analyticsEnabled = process.env.NODE_ENV === "production";

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
        {analyticsEnabled && (
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
        )}
        {analyticsEnabled && (
          <Image src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
        )}

        <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />

        <Script
          strategy="lazyOnload"
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GOOGLE_ANALYTICS_ID}', {
  page_path: window.location.pathname,
  });`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
