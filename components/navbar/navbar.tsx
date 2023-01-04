import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import urls from "../../utils/urls.json";
import { MenuItem } from "./components/menu-item/menu-item";

const DynamicSidebar = dynamic(() => import("./components/sidebar/sidebar").then((mod) => mod.Sidebar));
const DynamicMenuIcon = dynamic(() => import("./components/menu-icon/menu-icon").then((mod) => mod.MenuIcon));

import logo from "public/assets/logo.svg";
import mini_logo from "public/assets/logo_mini.svg";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${styles.colored_background}`}>
      <Link href={urls.base} prefetch={false} className={styles.desktop_logo}>
        <Image src={logo} className={styles.logo_image} priority={true} alt="logo" />
      </Link>
      <Link href={urls.base} prefetch={false} className={styles.mobile_logo}>
        <Image className={styles.image} src={mini_logo} priority={true} height={64} width={64} alt="logo" />
      </Link>
      <button className={styles.mobile_menu} onClick={() => setOpen(!isOpen)}>
        <DynamicMenuIcon isOpen={isOpen} strokeWidth="4" color="rgb(17 112 238)" transition={{ ease: "easeInOut" }} />
      </button>
      <nav>
        <ul className={styles.desktop_menu}>
          <MenuItem url={urls.base} reverseUrl>
            Главная
          </MenuItem>
          <MenuItem url={urls.about_us}>О нас</MenuItem>
          <MenuItem url={urls.guarantees}>Гарантии</MenuItem>
          <MenuItem url={urls.prices}>Цены и Услуги</MenuItem>
        </ul>
      </nav>
      <DynamicSidebar isOpen={isOpen} closeMenu={closeMenu} />
    </header>
  );
};
