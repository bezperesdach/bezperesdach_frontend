import React from "react";
import Image from "next/image";
import { Card } from "./components/card/card";
import main from "/public/images/advantages/main.svg";
import one from "/public/images/advantages/one.svg";
import two from "/public/images/advantages/two.svg";
import three from "/public/images/advantages/three.svg";
import four from "/public/images/advantages/four.svg";

import styles from "./advantages.module.css";

export const Advantages = () => {
  return (
    <section className={`${styles.advantages} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>ЗАРАБАТЫВАЙ С БЕЗПЕРЕСДАЧ ОТ 40 ТЫСЯЧ РУБЛЕЙ</h2>
        <Card description={"Мы выплачиваем 100% от заказа вам на карту"} img={one}></Card>
        <Card description={"Работа полностью удаленная"} img={two}></Card>
        <Card description={"Мы постоянно на связи с вами для решения всех вопросов"} img={three}></Card>
        <Card description={"Задачи выдаются в зависимости от вашей квалификации"} img={four}></Card>
      </div>
      <div className={styles.image_container}>
        <Image className={styles.image} src={main} alt="advantages" />
      </div>
    </section>
  );
};
