import React from "react";
import styles from "./card.module.css";
import { LinkButton } from "../../../link-button/link-button";

type Props = {
  title: string;
  description: string;
  textButton: string;
  backgroundColor?: string;
  color?: string;
  href: string;
};

export const Card = ({ title, description, textButton, href, backgroundColor, color }: Props) => {
  return (
    <div className={styles.card_style}>
      <div className={styles.card_button}>
        <h3>{title}</h3>
        <p>{description}</p>
        <LinkButton className={styles.link} backgroundColor={backgroundColor} color={color} href={href}>
          {textButton}
        </LinkButton>
      </div>
    </div>
  );
};
