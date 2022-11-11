import React from "react";
import Image from "next/image";
import styles from "./card.module.css";

type Props = {
  title: string;
  description: string;
  img: string;
};

export const Card = ({ title, description, img }: Props) => {
  return (
    <div className={styles.card_style}>
      <Image className={styles.image} src={img} alt="service" />
      <div className={styles.card_text}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
