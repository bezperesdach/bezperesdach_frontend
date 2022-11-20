import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import urls from "../../urls/urls.json";
import { MenuItem } from "./components/menu-item/menu-item";
import { MenuButton } from "./components/menu-button/menu-button";

const DynamicSidebar = dynamic(() => import("./components/sidebar/sidebar").then((mod) => mod.Sidebar));

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
      <Link href={urls.base} className={styles.desktop_logo}>
        <Image src={logo} height={100} width={320} alt="logo" />
      </Link>
      <Link href={urls.base} className={styles.mobile_logo}>
        <Image src={mini_logo} priority={true} height={64} width={64} alt="logo" />
      </Link>
      <div className={styles.mobile_menu} onClick={() => setOpen(!isOpen)}>
        <MenuButton isOpen={isOpen} strokeWidth="4" width={48} color="rgb(17 112 238)" transition={{ ease: "easeInOut" }} />
      </div>
      <ul className={styles.desktop_menu}>
        <MenuItem url={urls.base} reverseUrl>
          Главная
        </MenuItem>
        <MenuItem url={urls.prices}>Цены и Услуги</MenuItem>
      </ul>
      <DynamicSidebar isOpen={isOpen} closeMenu={closeMenu} />
    </header>
  );
};
