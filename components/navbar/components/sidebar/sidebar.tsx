import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Portal from "../../../portal/portal";
import { MenuItem } from "../menu-item/menu-item";
import urls from "../../../../utils/urls.json";
import { typeOptionsOrder } from "../../../../utils/form/new-order-form";

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
            <MenuItem url={urls.base} closeMenu={closeMenu} reverseUrl mobile>
              Главная
            </MenuItem>
            <MenuItem url={urls.about_us} closeMenu={closeMenu} mobile>
              О нас
            </MenuItem>
            <MenuItem url={urls.prices} closeMenu={closeMenu} mobile>
              Цены и Услуги
            </MenuItem>
            <MenuItem url={urls.order} allowedUrl={(url) => typeOptionsOrder.get(url) !== undefined} closeMenu={closeMenu} mobile>
              Заказать работу
            </MenuItem>
            <MenuItem url={urls.work} closeMenu={closeMenu} mobile>
              Стать автором
            </MenuItem>
          </motion.aside>
        </Portal>
      )}
    </AnimatePresence>
  );
};
