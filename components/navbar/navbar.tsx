import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Turn as Hamburger } from "hamburger-react";

const DynamicSidebar = dynamic(() => import("./components/sidebar/sidebar").then((mod) => mod.Sidebar));

import logo from "public/logo.svg";
import mini_logo from "public/logo_mini.svg";

import styles from "./navbar.module.css";
import { MenuItem } from "./components/menu-item/menu-item";

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${styles.colored_background}`}>
      <Link href="/" className={styles.desktop_logo}>
        <Image src={logo} height={100} width={320} alt="logo" />
      </Link>
      <Link href="/" className={styles.mobile_logo}>
        <Image src={mini_logo} priority={true} height={64} width={64} alt="logo" />
      </Link>
      <div className={styles.mobile_menu}>
        <Hamburger toggled={isOpen} toggle={setOpen} size={32} />
      </div>
      <ul className={styles.desktop_menu}>
        <MenuItem url="/" reverseUrl>
          Главная
        </MenuItem>
        <MenuItem url="/price">Цены и Услуги</MenuItem>
      </ul>
      <DynamicSidebar isOpen={isOpen} closeMenu={closeMenu} />
    </header>
  );
};
