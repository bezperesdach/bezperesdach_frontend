import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Turn as Hamburger } from "hamburger-react";
import Portal from "../portal/portal";
import { motion, AnimatePresence } from "framer-motion";

import logo from "public/logo.svg";
import mini_logo from "public/mini_logo.png";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles["desktop-logo"]}>
        <Image src={logo} height={100} width={320} alt="logo" />
      </Link>
      <Link href="/" className={styles["mobile-logo"]}>
        <Image src={mini_logo} height={64} width={64} alt="logo" />
      </Link>
      <div className={styles["mobile-menu"]}>
        <Hamburger toggled={isOpen} toggle={setOpen} size={36} />
      </div>
      <div className={styles["desktop-menu"]}>
        <Link href="/price" className={styles.link} style={router.pathname == "/price" ? { fontWeight: "bold" } : {}}>
          Цены и Услуги
        </Link>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Portal>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { duration: 0.15 } }}
              transition={{ type: "ease-in-out", duration: 0.25 }}
              className={styles["sidebar-overlay"]}
            >
              <Link href="/" className={styles.link} onClick={closeMenu} style={router.pathname == "/" ? { fontWeight: "bold" } : {}}>
                Главная
              </Link>
              <Link
                href="/price"
                className={styles.link}
                onClick={closeMenu}
                style={router.pathname == "/price" ? { fontWeight: "bold" } : {}}
              >
                Цены и Услуги
              </Link>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </header>
  );
};
