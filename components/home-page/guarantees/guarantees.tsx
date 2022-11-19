import React from "react";
import Image from "next/image";
import { ImageWithText } from "../../image-with-text/image-with-text";
import Main from "public/assets/images/guarantees/1.webp";
import FallbackMain from "public/assets/images/guarantees/fallback-1.png";

import Cloud from "public/assets/images/guarantees/2.webp";
import FallbackCloud from "public/assets/images/guarantees/fallback-2.png";

import styles from "./guarantees.module.css";

export const Guarantees = () => {
  return (
    <section className={`${styles.guarantees} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>
          ПРОСТОЙ <br></br>ПРОЦЕСС ЗАКАЗА
        </h2>
        <ImageWithText
          description={"Оставляете заявку на сайте через форму"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />
        <ImageWithText
          description={"Администратор свяжется с вами в течение 15 минут"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />
        <ImageWithText
          description={"После уточнения деталей заказ будет передан автору"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />
        <ImageWithText description={"Вы получите работу в указанные сроки"} img={Cloud} fallbackImg={FallbackCloud} alt="cloud point" />
      </div>

      <div className={styles.image_container}>
        <Image
          src={Main}
          placeholder="blur"
          className={styles.image}
          alt="order process"
          onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
      </div>
    </section>
  );
};
