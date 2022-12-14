import React from "react";
import { Card } from "./components/card";
import Image from "next/image";
import urls from "../../../utils/urls.json";

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
          description={`Вы уже изучили все о проекте "Без пересдач". Теперь вы можете заполнить заявку и проверить, как это работает. 
          Оценка работы - бесплатно!
					`}
          textButton="Оставить заявку"
          color="#fff"
          href={urls.order}
        />
        <Card
          title="ДЛЯ АВТОРОВ"
          description="Вы решаете задачи - мы выплачиваем деньги. Мы гарантируем прозрачность, скорость и удобство процесса. Готовы предложить лучшие условия среди конкурентов."
          textButton="Стать автором"
          color="#fff"
          href={urls.work}
        />
      </div>
      <div className={styles.image_container}>
        <Image
          src={WorkImage}
          placeholder="blur"
          className={`${styles.image} no_select image_no_pointer_events`}
          alt="work"
          sizes="(max-width: 1240px) 100vw,
          55vw"
          onError={(e) => (e.currentTarget.src = FallbackWorkImage.src)}
        />
      </div>
    </section>
  );
};
