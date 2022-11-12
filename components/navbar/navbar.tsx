import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Turn as Hamburger } from "hamburger-react";

const DynamicSidebar = dynamic(() => import("./components/sidebar").then((mod) => mod.Sidebar));

import logo from "public/logo.svg";
import mini_logo from "public/logo_mini.svg";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const router = useRouter();

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
        <Image src={mini_logo} height={64} width={64} alt="logo" />
      </Link>
      <div className={styles.mobile_menu}>
        <Hamburger toggled={isOpen} toggle={setOpen} size={32} />
      </div>
      <div className={styles.desktop_menu}>
        <Link href="/price" className={styles.link} style={router.pathname == "/price" ? { fontWeight: "bold" } : {}}>
          Цены и Услуги
        </Link>
      </div>
      <DynamicSidebar isOpen={isOpen} router={router} closeMenu={closeMenu} />
    </header>
  );
};
