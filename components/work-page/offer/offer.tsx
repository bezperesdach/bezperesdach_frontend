import React from "react";
import Image from "next/image";
import { ImageWithText } from "../../image-with-text/image-with-text";
import Main from "/public/images/offer/main.webp";
import FallbackMain from "/public/images/offer/fallback-main.png";
import One from "/public/images/offer/point.webp";
import FallbackOne from "public/images/offer/fallback-point.png";

import styles from "./offer.module.css";

export const Offer = () => {
  return (
    <section className={`${styles.offer} ${styles.colored_background}`}>
      <div className={styles.image_container}>
        <Image
          src={Main}
          placeholder="blur"
          className={styles.image}
          alt="map"
          onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
      </div>
      <div className={styles.cards}>
        <h2>
          УСЛОВИЯ <br></br> ДЛЯ АВТОРОВ
        </h2>
        <ImageWithText description={"Высшее образование (студенты старших курсов)*"} img={One} fallbackImg={FallbackOne} alt="point" />
        <ImageWithText description={"Наличие компьютера с выходом в интернет"} img={One} fallbackImg={FallbackOne} alt="point" />
        <ImageWithText
          description={"Уверенные знания в выбранной квалификации работ"}
          img={One}
          fallbackImg={FallbackOne}
          alt="point"
        />
        <ImageWithText description={"Портфолио из различных работ"} img={One} fallbackImg={FallbackOne} alt="point" />
      </div>
    </section>
  );
};
