import Link from "next/link";
import React from "react";

import styles from "./link-button.module.css";

type Props = {
  children: string;
  className?: string;
  href: string;
  backgroundColor?: string;
  color?: string;
  outlined?: boolean;
  style?: React.CSSProperties;
};

export const LinkButton = ({ className, children, backgroundColor, color, outlined, href, style }: Props) => {
  return (
    <Link
      className={`${styles.button} ${className} ${styles.no_select}`}
      href={href}
      style={{
        ...style,
        backgroundColor: outlined ? "transparent" : backgroundColor ?? "rgb(17 112 238)",
        color: color ?? "inherit",
        boxShadow: outlined ? `inset 0px 0px 0px 3px ${backgroundColor ?? "rgb(17 112 238)"}` : "none",
      }}
    >
      {children}
    </Link>
  );
};
