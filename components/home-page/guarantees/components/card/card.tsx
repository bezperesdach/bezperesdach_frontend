import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./card.module.css";

type Props = {
  description: string;
  img: string | StaticImageData;
  fallbackImg: StaticImageData;
  alt: string;
};

export const Card = ({ description, img, fallbackImg, alt }: Props) => {
  return (
    <div className={styles.card_style}>
      <Image className={styles.image} src={img} alt={alt} onError={(e) => (e.currentTarget.src = fallbackImg.src)} />
      <div className={styles.card_text}>
        <p>{description}</p>
      </div>
    </div>
  );
};
