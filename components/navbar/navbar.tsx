import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import urls from "../../utils/urls.json";
import { MenuItem } from "./components/menu-item/menu-item";
import { MenuButton } from "./components/menu-button/menu-button";

const DynamicSidebar = dynamic(() => import("./components/sidebar/sidebar").then((mod) => mod.Sidebar));

import logo from "public/assets/logo.svg";
import mini_logo from "public/assets/logo_mini.svg";

import styles from "./navbar.module.css";
import Script from "next/script";
import { YANDEX_METRIKA_ID } from "../../utils/yandex-metrika";
import { GOOGLE_ANALYTICS_ID } from "../../utils/google-analytics";

const analyticsEnabled = process.env.NODE_ENV === "production";

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${styles.colored_background}`}>
      <Link href={urls.base} className={styles.desktop_logo}>
        <Image src={logo} height={100} width={320} alt="logo" />
      </Link>
      <Link href={urls.base} className={styles.mobile_logo}>
        <Image src={mini_logo} priority={true} height={64} width={64} alt="logo" />
      </Link>
      <div className={styles.mobile_menu} onClick={() => setOpen(!isOpen)}>
        <MenuButton isOpen={isOpen} strokeWidth="4" color="rgb(17 112 238)" transition={{ ease: "easeInOut" }} />
      </div>
      <ul className={styles.desktop_menu}>
        <MenuItem url={urls.base} reverseUrl>
          Главная
        </MenuItem>
        <MenuItem url={urls.prices}>Цены и Услуги</MenuItem>
      </ul>
      <DynamicSidebar isOpen={isOpen} closeMenu={closeMenu} />
      <div className={styles.analytics}>
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
        {analyticsEnabled && (
          <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
        )}

        {analyticsEnabled && (
          <Script
            strategy="lazyOnload"
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', ${GOOGLE_ANALYTICS_ID}, {
  page_path: window.location.pathname,
  });`,
            }}
          />
        )}
      </div>
    </header>
  );
};
