import React from "react";
import Image from "next/image";

import logo from "public/logo.svg";

import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <Image src={logo} height={100} priority={true} width={320} alt="logo" />
    </header>
  );
};
