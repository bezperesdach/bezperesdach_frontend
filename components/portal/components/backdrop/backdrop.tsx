import { motion } from "framer-motion";
import React from "react";

import styles from "./backdrop.module.css";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

export const Backdrop = ({ onClick, children }: Props) => {
  return (
    <motion.div onClick={onClick} className={styles.backdrop}>
      {children}
    </motion.div>
  );
};
