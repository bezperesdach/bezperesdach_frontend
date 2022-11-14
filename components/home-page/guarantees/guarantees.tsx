import React from "react";
import Image from "next/image";
import { Card } from "./components/card/card";
import main from "/public/images/guarantees/1.svg";
import one from "/public/images/guarantees/2.svg";
import two from "/public/images/guarantees/2.svg";
import three from "/public/images/guarantees/2.svg";

import styles from "./guarantees.module.css";

export const Guarantees = () => {
  return (
    <section className={`${styles.guarantees} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>
          ПРОСТОЙ <br></br>ПРОЦЕСС ЗАКАЗА
        </h2>
        <Card description={"Оставляете заявку на сайте через форму"} img={one}></Card>
        <Card description={"Администратор свяжется с вами в течение 15 минут"} img={two}></Card>
        <Card description={"После уточнения деталей заказ будет передан исполнителю"} img={three}></Card>
        <Card description={"Вы получите работу в указанные сроки"} img={three}></Card>
      </div>

      <div className={styles.image_container}>
        <Image className={styles.image} src={main} alt="guarantees" />
      </div>
    </section>
  );
};
