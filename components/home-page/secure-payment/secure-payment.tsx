import React from "react";
import Image from "next/image";
import { ImageWithText } from "../../image-with-text/image-with-text";
import Main from "public/assets/images/secure-payment/1.webp";
import FallbackMain from "public/assets/images/secure-payment/fallback-1.png";

import Payment from "public/assets/images/secure-payment/2.webp";
import FallbackPayment from "public/assets/images/secure-payment/fallback-2.png";

import styles from "./secure-payment.module.css";

export const SecurePayment = () => {
  return (
    <section className={`${styles.save_money} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>
          БЕЗОПАСНЫЙ <br></br>ПЛАТЕЖ
        </h2>
        <ImageWithText
          description={"Не перечисляем деньги автору до конца сделки"}
          img={Payment}
          fallbackImg={FallbackPayment}
          alt="cloud point"
        />
        <ImageWithText
          description={"Работаем с платежной системой YoMoney"}
          img={Payment}
          fallbackImg={FallbackPayment}
          alt="cloud point"
        />
        <ImageWithText
          description={"Выдаем чек независимо от суммы заказа"}
          img={Payment}
          fallbackImg={FallbackPayment}
          alt="cloud point"
        />

        <ImageWithText
          description={"Авторские права на все предоставленные материалы в ходе консультации переходят к вам согласно ТК РФ"}
          img={Payment}
          fallbackImg={FallbackPayment}
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
