import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useScroll } from "framer-motion";

import styles from "./scroll-to-top-button.module.css";

const containerVariants = {
  hover: { opacity: 1 },
  visible: { y: 0, opacity: 0.8 },
  hidden: { y: "200%", opacity: 0.8 },
};

const containerReducedMotionVariants = {
  hover: { opacity: 1 },
  visible: { y: 0, opacity: 0.8 },
  hidden: { opacity: 0 },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.2 },
};

export const ScrollTopButton = () => {
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const currentPosInPercents = Math.trunc(((latest + window.innerHeight) / document.body.offsetHeight) * 100);

      if (latest > 1000 || currentPosInPercents > 90) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.scroll_top_wrap}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={prefersReducedMotion ? containerReducedMotionVariants : containerVariants}
          whileHover="hover"
          whileTap="hover"
          transition={{ type: "ease" }}
        >
          <a role="button" aria-label="Scroll to top" onClick={scrollToTop}>
            <motion.div
              className={styles.svg_wrap}
              initial="rest"
              whileHover="hover"
              whileTap="hover"
              variants={buttonVariants}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg viewBox="0 0 48 48" width="48px" height="48px" xmlns="http://www.w3.org/2000/svg">
                <path id={styles.scroll_top_arrow} d="M14.83 30.83l9.17-9.17 9.17 9.17 2.83-2.83-12-12-12 12z"></path>
              </svg>
            </motion.div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
