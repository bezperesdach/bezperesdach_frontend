import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NextRouter } from "next/router";
import React from "react";
import Portal from "../../portal/portal";

import styles from "./sidebar.module.css";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
  router: NextRouter;
};

export const Sidebar = ({ isOpen, closeMenu, router }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <motion.aside
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
          </motion.aside>
        </Portal>
      )}
    </AnimatePresence>
  );
};
