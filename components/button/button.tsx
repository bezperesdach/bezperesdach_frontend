import React from "react";

import styles from "./button.module.css";

type Props = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
};

export const Button = ({ children, type, onClick, loading, disabled, style }: Props) => {
  const buttonLoading = () => {
    return loading ? <span className={styles["button-loading"]}></span> : <span>{children}</span>;
  };
  return (
    <button className={`${styles.button} ${styles["button-gradient"]}`} type={type} onClick={onClick} disabled={disabled} style={style}>
      {buttonLoading()}
    </button>
  );
};
