import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./card.module.css";

type Props = {
  title: string;
  children: React.ReactNode;
  img: string | StaticImageData;
  fallbackImg: StaticImageData;
  alt: string;
};

export const Card = ({ title, children, img, fallbackImg, alt }: Props) => {
  return (
    <div className={styles.card_style}>
      <Image
        src={img}
        placeholder="blur"
        className={`${styles.image} no_select image_no_pointer_events`}
        alt={alt}
        onError={(e) => (e.currentTarget.src = fallbackImg.src)}
      />
      <div className={styles.card_text}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};
