import React from "react";
import Image from "next/image";

import styles from "./navbar.module.css";

// type Props = {};

export const Navbar = (/* props: Props */) => {
  return (
    <header className={styles.navbar}>
      <Image src="/logo.svg" height={100} width={320} alt="logo" />
    </header>
  );
};
