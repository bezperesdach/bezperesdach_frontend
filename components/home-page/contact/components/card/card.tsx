import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

type Props = {
  description: string;
  img: string;
  url: string;
};

export const Card = ({ description, img, url }: Props) => {
  return (
    <div className={styles.card_style}>
      <Image className={styles.image} src={img} alt="service" />
      <div className={styles.card_text}>
        <p>
          <Link href={url}>{description}</Link>
        </p>
      </div>
    </div>
  );
};
