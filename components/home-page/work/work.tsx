import React from "react";
import { Card } from "./components/card";
import Image from "next/image";

import WorkImage from "public/images/work/work.svg";

import styles from "./work.module.css";

export const Work = () => {
  return (
    <section className={`${styles.work} ${styles.colored_background}`}>
      <div className={styles.blocks}>
        <h2>ОПРЕДЕЛИЛИСЬ?</h2>
        <Card
          title="ДЛЯ ЗАКАЗЧИКОВ"
          description=" Теперь вы знаете все про проект Безпересдач. Выбор за Вами. Заполните заявку и проверьте как это работает. Это быстро и
					бесплатно"
          textButton="Заказать работу"
          backgroundColor="#0b73fe"
          color="white"
          href="/order"
        ></Card>
        <Card
          title="ДЛЯ ИСПОЛНИТЕЛЕЙ"
          description="  Вы решаете задачи - мы выплачиваем деньги. Все прозрачно, быстро и удобно. Мы предлагаем лучшие условия среди конкурентов."
          textButton="Стать автором"
          backgroundColor="#0b73fe"
          color="white"
          href=""
        ></Card>
      </div>
      <Image src={WorkImage} className={styles.image} alt="WorkImage"></Image>
    </section>
  );
};
