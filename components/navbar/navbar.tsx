import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "public/logo.svg";

import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <Link href="/">
        <Image src={logo} height={100} width={320} alt="logo" />
      </Link>
    </header>
  );
};
