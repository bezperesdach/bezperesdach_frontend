import React from "react";
import Image from "next/image";
import { ImageWithText } from "../../image-with-text/image-with-text";
import Main from "public/assets/images/order-process/1.webp";
import FallbackMain from "public/assets/images/order-process/fallback-1.png";

import Cloud from "public/assets/images/order-process/2.webp";
import FallbackCloud from "public/assets/images/order-process/fallback-2.png";

import styles from "./order-process.module.css";

export const OrderProcess = () => {
  return (
    <section className={`${styles.order_process} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>
          ПРОСТОЙ <br></br>ПРОЦЕСС ЗАКАЗА
        </h2>
        <ImageWithText description={"Оставьте заявку на сайте"} img={Cloud} fallbackImg={FallbackCloud} alt="cloud point" />
        <ImageWithText
          description={"Наш менеджер свяжется с вами в течение 15 минут"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />
        <ImageWithText
          description={"После уточнения деталей заказа, мы передадим его нашему автору"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />

        <ImageWithText
          description={"В указанные сроки мы проконсультируем Вас по необходимым вопросам"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />
      </div>

      <div className={styles.image_container}>
        <Image
          src={Main}
          placeholder="blur"
          className={`${styles.image} no_select image_no_pointer_events`}
          alt="order process"
          onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
      </div>
    </section>
  );
};
