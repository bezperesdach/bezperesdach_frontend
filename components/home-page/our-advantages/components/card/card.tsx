import { useState } from "react";
import dynamic from "next/dynamic";
import Image, { StaticImageData } from "next/image";
import styles from "./card.module.css";
import { boolean } from "yup";

const DynamicCardVideo = dynamic(() => import("../../../video-component/video-component"));

type Props = {
  title: string;
  children: React.ReactNode;
  img: string | StaticImageData;
  fallbackImg: StaticImageData;
  alt: string;
  videoMov?: string;
  videoWebm?: string;
};

export const Card = ({ title, children, img, fallbackImg, alt, videoMov, videoWebm }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={styles.card_style}>
      <div className={styles.image_container}>
        <Image
          src={img}
          placeholder="blur"
          className={`${styles.image} no_select image_no_pointer_events`}
          alt={alt}
          style={{ visibility: !isVisible ? "visible" : "hidden" }}
          onError={(e) => (e.currentTarget.src = fallbackImg.src)}
        />

        {videoMov && (
          <DynamicCardVideo
            className={styles.animated_image}
            videoMov={videoMov}
            videoWebm={videoWebm}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        )}
      </div>
      <div className={styles.card_text}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};
