import React from "react";
import Image from "next/image";
import { ImageWithText } from "../../image-with-text/image-with-text";
import Main from "public/assets/images/save-money/1.webp";
import FallbackMain from "public/assets/images/save-money/fallback-1.png";

import Cloud from "public/assets/images/save-money/2.webp";
import FallbackCloud from "public/assets/images/save-money/fallback-2.png";

import styles from "./save-money.module.css";

export const SaveMoney = () => {
  return (
    <section className={`${styles.save_money} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>
          БЕЗОПАСНЫЙ <br></br>ПЛАТЕЖ
        </h2>
        <ImageWithText
          description={"Не перечисляем деньги автору до конца сделки"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />
        <ImageWithText
          description={"Работаем с платежной системой YoMoney"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />
        <ImageWithText
          description={"Выдаем чек независимо от суммы заказа"}
          img={Cloud}
          fallbackImg={FallbackCloud}
          alt="cloud point"
        />

        <ImageWithText
          description={"Авторские права переходят к вам согласно ТК РФ"}
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
