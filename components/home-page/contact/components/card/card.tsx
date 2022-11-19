import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

type Props = {
  description: string;
  url: string;
  img: string | StaticImageData;
  fallbackImg: StaticImageData;
  alt: string;
};

export const Card = ({ description, img, fallbackImg, url, alt }: Props) => {
  return (
    <div className={styles.card_style}>
      <Image src={img} placeholder="blur" className={styles.image} alt={alt} onError={(e) => (e.currentTarget.src = fallbackImg.src)} />
      <div className={styles.card_text}>
        <Link href={url}>{description}</Link>
      </div>
    </div>
  );
};
