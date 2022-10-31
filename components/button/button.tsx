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

export const Button = ({ children, type, onClick, loading, error, disabled, style }: Props) => {
  const buttonLoading = () => {
    if (error) {
      return <span>ОШИБКА</span>;
    }

    if (loading) {
      return <span className={styles["button-loading"]}></span>;
    }

    return <span>{children}</span>;
  };

  const onClickHandler = () => {
    if (error) {
      return undefined;
    }
    if (loading) {
      return undefined;
    }

    return onClick && onClick();
  };

  const buttonError = () => {
    return error ? styles["button-error"] : styles["button-gradient"];
  };

  return (
    <button className={`${styles.button} ${buttonError()}`} type={type} onClick={onClickHandler} disabled={disabled} style={style}>
      {buttonLoading()}
    </button>
  );
};
