import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import logo from "public/logo.svg";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const router = useRouter();
  return (
    <header className={styles.navbar}>
      <Link href="/">
        <Image src={logo} height={100} width={320} alt="logo" />
      </Link>
      <div className={styles.menu}>
        <Link href="/price" className={styles.link} style={router.pathname == "/price" ? { fontWeight: "bold" } : {}}>
          Цены и Услуги
        </Link>
      </div>
    </header>
  );
};
