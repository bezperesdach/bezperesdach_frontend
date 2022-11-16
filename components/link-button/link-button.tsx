import Link from "next/link";
import React from "react";

import styles from "./link-button.module.css";

type Props = {
  children: string;
  href: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  backgroundColor?: string;
  color?: string;
  outlined?: boolean;
  style?: React.CSSProperties;
};

export const LinkButton = ({ children, backgroundColor, color, outlined, href, style }: Props) => {
  return (
    <Link
      className={styles.button}
      href={href}
      style={{
        ...style,
        backgroundColor: outlined ? "transparent" : backgroundColor ?? "rgb(11, 116, 254)",
        color: color ?? "inherit",
        boxShadow: outlined ? `inset 0px 0px 0px 3px ${backgroundColor}` : "none",
      }}
    >
      <span>{children}</span>
    </Link>
  );
};
