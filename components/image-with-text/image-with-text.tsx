import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./image-with-text.module.css";

type Props = {
  description: string;
  img: string | StaticImageData;
  fallbackImg: StaticImageData;
  alt: string;
};

export const ImageWithText = ({ description, img, fallbackImg, alt }: Props) => {
  return (
    <div className={styles.container}>
      <Image
        src={img}
        placeholder="blur"
        className={`${styles.image} no_select image_no_pointer_events`}
        alt={alt}
        onError={(e) => (e.currentTarget.src = fallbackImg.src)}
      />
      <div className={styles.text}>
        <p>{description}</p>
      </div>
    </div>
  );
};
