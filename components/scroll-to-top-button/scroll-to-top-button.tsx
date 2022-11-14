import React from "react";

type Props = {
  showAfter: number;
};

import styles from "./scroll-to-top-button.module.css";

export const ScrollTopButton = () => {
  return (
    <div className={styles.scrolltop_container}>
      <div className={styles.scrolltop_wrap}>
        <a href="#" role="button" aria-label="Scroll to top">
          <svg viewBox="0 0 48 48" width="48" height="48px" xmlns="http://www.w3.org/2000/svg">
            <path id={styles.scrolltop_bg} d="M0 0h48v48h-48z"></path>
            <path id={styles.scrolltop_arrow} d="M14.83 30.83l9.17-9.17 9.17 9.17 2.83-2.83-12-12-12 12z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};
