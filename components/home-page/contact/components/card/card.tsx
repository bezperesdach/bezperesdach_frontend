import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./card.module.css";

type Props = {
  description: string;
  url: string;
  link: string;
  img: string | StaticImageData;
  fallbackImg: StaticImageData;
  alt: string;
};

export const Card = ({ description, img, fallbackImg, url, link, alt }: Props) => {
  return (
    <div className={styles.card_style}>
      <Image src={img} placeholder="blur" className={styles.image} alt={alt} onError={(e) => (e.currentTarget.src = fallbackImg.src)} />
      <div className={styles.card_text}>
        <a href={url} target="_blank" rel="nofollow noopener noreferrer">
          {description} <span style={{ textDecoration: "underline" }}>{link}</span>
        </a>
      </div>
    </div>
  );
};
