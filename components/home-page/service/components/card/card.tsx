import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./card.module.css";

type Props = {
  title: string;
  description: string;
  img: string | StaticImageData;
  fallbackImg: StaticImageData;
  alt: string;
};

export const Card = ({ title, description, img, fallbackImg, alt }: Props) => {
  return (
    <div className={styles.card_style}>
      <Image src={img} placeholder="blur" className={styles.image} alt={alt} onError={(e) => (e.currentTarget.src = fallbackImg.src)} />
      <div className={styles.card_text}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
