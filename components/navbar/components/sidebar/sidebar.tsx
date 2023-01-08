import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  prefersReducedMotion: boolean | null;
};

const menuVariants = {
  visible: { x: 0 },
  hidden: { x: "100%" },
  exit: { x: "100%", transition: { duration: 0.15 } },
};

const menuReducedMotionVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const AnimatedDiv = ({ delay, children, prefersReducedMotion }: AnimateProps) => {
  if (!prefersReducedMotion) {
    return (
      <motion.div initial={{ x: "300px" }} animate={{ x: 0, transition: { type: "just", delay } }} transition={{ duration: 1 }}>
        {children}
      </motion.div>
    );
  }

  return <>{children}</>;
};

export const Sidebar = ({ isOpen, closeMenu }: Props) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <motion.aside
            initial={"hidden"}
            animate={"visible"}
            exit={"exit"}
            variants={prefersReducedMotion ? menuReducedMotionVariants : menuVariants}
            transition={{ type: "ease-in-out", duration: 0.25 }}
            className={styles.sidebar_overlay}
          >
            <AnimatedDiv delay={0.08} prefersReducedMotion={prefersReducedMotion}>
              <MenuItem url={urls.base} closeMenu={closeMenu} reverseUrl mobile>
                Главная
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.1} prefersReducedMotion={prefersReducedMotion}>
              <MenuItem url={urls.order} allowedUrl={(url) => typeOptionsOrder.get(url) !== undefined} closeMenu={closeMenu} mobile>
                Оставить заявку
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.12} prefersReducedMotion={prefersReducedMotion}>
              <MenuItem url={urls.about_us} closeMenu={closeMenu} mobile>
                О нас
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.14} prefersReducedMotion={prefersReducedMotion}>
              <MenuItem url={urls.prices} closeMenu={closeMenu} mobile>
                Цены и Услуги
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.16} prefersReducedMotion={prefersReducedMotion}>
              <MenuItem url={urls.work} closeMenu={closeMenu} mobile>
                Стать автором
              </MenuItem>
            </AnimatedDiv>

            <AnimatedDiv delay={0.18} prefersReducedMotion={prefersReducedMotion}>
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
