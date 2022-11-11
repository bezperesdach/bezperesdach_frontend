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
    <section className={`${styles.guarantees_text} ${styles.colored_background}`}>
      <h2>ПРОЦЕСС ЗАКАЗА</h2>
      <div className={styles.guarantees}>
        <div className={styles.guarantees_elements}>
          <Image className={styles.images} src={main} alt="guarantees" />
        </div>

        <div className={styles.cards}>
          <Card description={"Быстрый поиск исполнителей"} img={one}></Card>
          <Card description={"Строгий отбор клиентов"} img={two}></Card>
          <Card description={"Общение с экспертом осуществялет администратор"} img={three}></Card>
          <Card description={"Цены ниже, чем у посредников"} img={three}></Card>
        </div>
      </div>
    </section>
  );
};
