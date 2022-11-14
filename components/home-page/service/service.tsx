import React from "react";
import Image from "next/image";
import { Card } from "./components/card/card";
import main from "/public/images/service/main.svg";
import one from "/public/images/service/1.svg";
import two from "/public/images/service/2.svg";
import three from "/public/images/service/3.svg";

import styles from "./service.module.css";

export const Service = () => {
  return (
    <section className={`${styles.service} ${styles.colored_background}`}>
      <div className={styles.image_container}>
        <Image className={styles.image} src={main} alt="service" />
      </div>
      <div className={styles.cards}>
        <h2>
          НАШИ <br></br>ПРЕИМУЩЕСТВА
        </h2>
        <Card
          title="ДОРАБОТКИ - БЕСПЛАТНО"
          description={"Гарантийный срок - до 30 дней. В этот период вы можете обратиться за бесплатными доработками"}
          img={one}
        ></Card>
        <Card title="ОНЛАЙН-ПОДДЕРЖКА ДО САМОЙ ЗАЩИТЫ" description={"Мы ответим на любой вопрос 24/7 по почте"} img={two}></Card>
        <Card
          title="ГАРАНТИЯ ВОЗВРАТА ДЕНЕГ"
          description={"В случае, если что-то пойдет не так, мы гарантируем возврат полной уплаченной суммы"}
          img={three}
        ></Card>
      </div>
    </section>
  );
};
