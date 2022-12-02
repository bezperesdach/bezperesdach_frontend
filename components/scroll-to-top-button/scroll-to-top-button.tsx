import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "framer-motion";

import styles from "./scroll-to-top-button.module.css";

const containerVariants = {
  hover: { opacity: 1 },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.2 },
};

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
      if (latest > 1000) {
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
          initial={{ y: "200%", opacity: 0.8 }}
          animate={{ y: 0, opacity: 0.8 }}
          exit={{ y: "200%", opacity: 0.8 }}
          variants={containerVariants}
          whileHover="hover"
          transition={{ type: "ease" }}
        >
          <a role="button" aria-label="Scroll to top" onClick={scrollToTop}>
            <motion.div
              className={styles.svg_wrap}
              initial="rest"
              whileHover="hover"
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
