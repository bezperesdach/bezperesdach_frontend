import React from "react";
import Link from "next/link";

import styles from "./card.module.css";

type Props = {
  title: string;
  description: string;
  url: string;
  textButton: string;
};

export const Card = ({ title, description, url, textButton }: Props) => {
  return (
    <div className={styles.card_style}>
      <div className={styles.card_button}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href={url} className={styles.url}>
          {textButton}
        </Link>
      </div>
    </div>
  );
};
