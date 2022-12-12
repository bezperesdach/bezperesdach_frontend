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
        <ImageWithText description={"Вы оставляете заявку на сайте"} img={Cloud} fallbackImg={FallbackCloud} alt="cloud point" />
        <ImageWithText
          description={"В течении 15 минут вы получаете от нас ответ"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />
        <ImageWithText
          description={"После уточнения деталей заказ будет передан нашему автору"}
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
          className={`${styles.image} no_select image_no_pointer_events`}
          alt="order process"
          onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
      </div>
    </section>
  );
};
