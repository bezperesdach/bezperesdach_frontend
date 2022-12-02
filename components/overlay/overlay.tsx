import React from "react";

import styles from "./overlay.module.css";

type Props = {
  children: React.ReactNode;
};

export const Overlay = ({ children }: Props) => {
  return <div className={styles.overlay}>{children}</div>;
};
