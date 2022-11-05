import React from "react";

import styles from "./card.module.css";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const Card = ({ title, children }: Props) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
