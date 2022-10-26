import React from "react";

import styles from "./button.module.css";

type Props = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
};

export const Button: React.FC<Props> = ({ children, type, onClick, disabled, style }) => {
  return (
    <button className={styles.button + " " + styles["button-gradient"]} type={type} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
};
