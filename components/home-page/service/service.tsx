import React from "react";
import Image from "next/image";
import { Card } from "./components/card/card";
import Main from "public/assets/images/service/main.webp";
import FallbackMain from "public/assets/images/service/fallback-main.png";
import One from "public/assets/images/service/1.webp";
import FallbackOne from "public/assets/images/service/fallback-1.png";
import Two from "public/assets/images/service/2.webp";
import FallbackTwo from "public/assets/images/service/fallback-2.png";
import Three from "public/assets/images/service/3.webp";
import FallbackThree from "public/assets/images/service/fallback-3.png";

import styles from "./service.module.css";

export const Service = () => {
  return (
    <section className={`${styles.service} ${styles.colored_background}`}>
      <div className={styles.image_container}>
        <Image
          src={Main}
          placeholder="blur"
          className={styles.image}
          alt="our advantages"
          onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
      </div>
      <div className={styles.cards}>
        <h2>
          НАШИ <br></br>ПРЕИМУЩЕСТВА
        </h2>
        <Card
          title="ДОРАБОТКИ - БЕСПЛАТНО"
          description={"Гарантийный срок - до 30 дней. В этот период вы можете обратиться за бесплатными доработками"}
          img={One}
          fallbackImg={FallbackOne}
          alt="free revision"
        />
        <Card
          title="ОНЛАЙН-ПОДДЕРЖКА ДО САМОЙ ЗАЩИТЫ"
          description={"Мы ответим на любой вопрос 24/7 по почте"}
          img={Two}
          fallbackImg={FallbackTwo}
          alt="online help 24/7"
        />
        <Card
          title="ГАРАНТИЯ ВОЗВРАТА ДЕНЕГ"
          description={"В случае, если что-то пойдет не так, мы гарантируем возврат полной уплаченной суммы"}
          img={Three}
          fallbackImg={FallbackThree}
          alt="guarantees"
        />
      </div>
    </section>
  );
};
