import React from "react";

import styles from "./card.module.css";

type Props = {
  title: string;
  description: string;
  url: string;
  backgroundColor: string;
  boxShadow: string;
};

export const Card = ({ title, description, url, backgroundColor, boxShadow }: Props) => {
  return (
    <div className={styles.card_style} style={{ backgroundColor, boxShadow }}>
      <h3> {title}</h3>
      <p className={styles.description}>{description}</p>
      <a href="" className={styles.url}>
        {"Перейти"}
      </a>
    </div>
  );
};
