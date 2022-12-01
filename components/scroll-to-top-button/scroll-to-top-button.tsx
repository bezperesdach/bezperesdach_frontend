import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "framer-motion";

import styles from "./scroll-to-top-button.module.css";

export const ScrollTopButton = () => {
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
      if (latest > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  return (
    <div className={styles.scroll_top_container}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: "200%" }}
            animate={{ y: 0 }}
            exit={{ y: "200%" }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 600, damping: 20, duration: 0.8 }}
            className={styles.scroll_top_wrap}
          >
            <a role="button" aria-label="Scroll to top" onClick={scrollToTop}>
              <svg viewBox="0 0 48 48" width="48px" height="48px" xmlns="http://www.w3.org/2000/svg">
                <path id={styles.scroll_top_bg} d="M0 0h48v48h-48z"></path>
                <path id={styles.scroll_top_arrow} d="M14.83 30.83l9.17-9.17 9.17 9.17 2.83-2.83-12-12-12 12z"></path>
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
