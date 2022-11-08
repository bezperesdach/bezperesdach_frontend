import Link from "next/link";
import React from "react";

import styles from "./card.module.css";

type Props = {
  title: string;
  description: string;
  url: string;
  backgroundColor: string;
  buttonBackgroundColor: string;
  boxShadow: string;
  colorText: string;
};

export const Card = ({ title, description, url, backgroundColor, boxShadow, buttonBackgroundColor, colorText }: Props) => {
  return (
    <div className={styles.card_style} style={{ backgroundColor, boxShadow, color: colorText }}>
      <h3> {title}</h3>
      <p className={styles.description}>{description}</p>
      <Link href={url} className={styles.url} style={{ backgroundColor: buttonBackgroundColor }}>
        {"Заказать работу"}
      </Link>
    </div>
  );
};
