/* eslint-disable @next/next/no-img-element */
import ErrorBoundary from "../components/error-boundary/error-boundary";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
import { GOOGLE_TAG_MANAGER_ID } from "../utils/google-tag-manager";
import { YANDEX_METRIKA_ID } from "../utils/yandex-metrika";

const analyticsEnabled = process.env.NODE_ENV === "production";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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

      <ErrorBoundary>
        <NextNProgress height={6} showOnShallow={false} options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </ErrorBoundary>

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
      </body>
    </>
  );
}
