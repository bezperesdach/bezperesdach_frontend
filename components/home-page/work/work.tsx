import React from "react";
import { Card } from "./components/card";
import Image from "next/image";
import urls from "../../../urls/urls.json";

import WorkImage from "public/assets/images/work/work.webp";
import FallbackWorkImage from "public/assets/images/work/fallback-work.png";

import styles from "./work.module.css";

export const Work = () => {
  return (
    <section className={`${styles.work} ${styles.colored_background}`}>
      <div className={styles.blocks}>
        <h2>ОПРЕДЕЛИЛИСЬ?</h2>
        <Card
          title="ДЛЯ ЗАКАЗЧИКОВ"
          description={`Теперь вы знаете все про проект “Безпересдач”. Заполните заявку и проверьте как это работает. Это быстро и
					бесплатно`}
          textButton="Заказать работу"
          backgroundColor="#0b73fe"
          color="white"
          href={urls.order}
        />
        <Card
          title="ДЛЯ АВТОРОВ"
          description="Вы решаете задачи - мы выплачиваем деньги. Все прозрачно, быстро и удобно. Мы предлагаем лучшие условия среди конкурентов."
          textButton="Стать автором"
          backgroundColor="#0b73fe"
          color="white"
          href={urls.work}
        />
      </div>
      <div className={styles.image_container}>
        <Image
          src={WorkImage}
          placeholder="blur"
          className={styles.image}
          alt="work"
          onError={(e) => (e.currentTarget.src = FallbackWorkImage.src)}
        />
      </div>
    </section>
  );
};
