import React from "react";

import styles from "./button.module.css";

type Props = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  backgroundColor?: string;
  color?: string;
  outlined?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
};

export const Button = ({ children, type, backgroundColor, color, outlined, onClick, loading, error, disabled, style }: Props) => {
  const buttonLoading = () => {
    if (error) {
      return <span>ОШИБКА</span>;
    }

    if (loading) {
      return <span className={styles.button_loading}></span>;
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
    return error ? styles.button_error : "";
  };

  return (
    <button
      className={`${styles.button} ${buttonError()}`}
      type={type}
      onClick={onClickHandler}
      disabled={disabled}
      style={{
        ...style,
        backgroundColor: outlined ? "transparent" : backgroundColor,
        color,
        boxShadow: outlined ? `inset 0px 0px 0px 3px ${backgroundColor}` : "none",
      }}
    >
      {buttonLoading()}
    </button>
  );
};
