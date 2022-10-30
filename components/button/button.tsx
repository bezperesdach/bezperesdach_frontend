import React from "react";

import styles from "./button.module.css";

type Props = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
};

export const Button: React.FC<Props> = ({ children, type, onClick, loading, error, disabled, style }) => {
  const buttonLoading = () => {
    if (error) {
      return <span>ОШИБКА</span>;
    } else if (loading) {
      return <span className={styles["button-loading"]}></span>;
    } else {
      return <span>{children}</span>;
    }
  };

  const buttonError = () => {
    return error ? styles["button-error"] : styles["button-gradient"];
  };

  return (
    <button
      className={`${styles.button} ${buttonError()}`}
      type={type}
      onClick={() => !error && onClick}
      disabled={disabled}
      style={style}
    >
      {buttonLoading()}
    </button>
  );
};
