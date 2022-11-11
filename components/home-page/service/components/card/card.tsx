import React from "react";

import styles from "./card.module.css";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const Card = ({ title, children }: Props) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};
