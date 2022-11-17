import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NextRouter } from "next/router";
import React from "react";
import Portal from "../../../portal/portal";
import { MenuItem } from "../menu-item/menu-item";

import styles from "./sidebar.module.css";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

export const Sidebar = ({ isOpen, closeMenu }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.15 } }}
            transition={{ type: "ease-in-out", duration: 0.25 }}
            className={styles.sidebar_overlay}
          >
            <MenuItem url="/" closeMenu={closeMenu} reverseUrl mobile>
              Главная
            </MenuItem>
            <MenuItem url="/price" closeMenu={closeMenu} mobile>
              Цены и Услуги
            </MenuItem>
            <MenuItem url="/order" closeMenu={closeMenu} mobile>
              Заказать работу
            </MenuItem>
            <MenuItem url="/work" closeMenu={closeMenu} mobile>
              Стать автором
            </MenuItem>
          </motion.aside>
        </Portal>
      )}
    </AnimatePresence>
  );
};
