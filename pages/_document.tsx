import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
import Script from "next/script";
import { YANDEX_METRIKA_ID } from "../utils/yandex-metrika";

const yandexMetrikaEnabled = process.env.NODE_ENV === "production";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.pn?v=2" />
        <link rel="icon" type="image/png" href="assets/favicon/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png?v=2" />
        <link rel="manifest" href="assets/favicon/site.webmanifest" />
        <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#0b73fe" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#0b73fe" />

        <meta property="og:image" content="assets/og_logo.png" />
        <meta property="og:site_name" content="Безпересдач" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {yandexMetrikaEnabled && (
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
        {yandexMetrikaEnabled && (
          <noscript>
            <div>
              <Image src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
            </div>
          </noscript>
        )}
      </body>
    </Html>
  );
}
