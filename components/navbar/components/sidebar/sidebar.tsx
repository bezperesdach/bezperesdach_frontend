import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Portal from "../../../portal/portal";
import { MenuItem } from "../menu-item/menu-item";
import urls from "../../../../utils/urls.json";
import { typeOptionsOrder } from "../../../../utils/order-form/form";

import styles from "./sidebar.module.css";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

type AnimateProps = {
  delay: number;
  children: React.ReactNode;
};

const AnimatedDiv = ({ delay, children }: AnimateProps) => {
  return (
    <motion.div
      initial={{ x: "300px" }}
      animate={{ x: 0, transition: { type: "just", delay: delay } }}
      transition={{ type: "linear", duration: 1 }}
    >
      {children}
    </motion.div>
  );
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
            <AnimatedDiv delay={0.08}>
              <MenuItem url={urls.base} closeMenu={closeMenu} reverseUrl mobile>
                Главная
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.1}>
              <MenuItem url={urls.order} allowedUrl={(url) => typeOptionsOrder.get(url) !== undefined} closeMenu={closeMenu} mobile>
                Оставить заявку
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.12}>
              <MenuItem url={urls.about_us} closeMenu={closeMenu} mobile>
                О нас
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.14}>
              <MenuItem url={urls.prices} closeMenu={closeMenu} mobile>
                Цены и Услуги
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.16}>
              <MenuItem url={urls.work} closeMenu={closeMenu} mobile>
                Стать автором
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.18}>
              <MenuItem url={urls.guarantees} closeMenu={closeMenu} mobile>
                Гарантии
              </MenuItem>
            </AnimatedDiv>
          </motion.aside>
        </Portal>
      )}
    </AnimatePresence>
  );
};
