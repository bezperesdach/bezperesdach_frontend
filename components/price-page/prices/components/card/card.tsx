import React from "react";
import { LinkButton } from "../../../../link-button/link-button";

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
      <LinkButton href={url} className={styles.url} backgroundColor={buttonBackgroundColor} style={{ width: "100%", margin: 0 }}>
        Заказать работу
      </LinkButton>
    </div>
  );
};
