import React from "react";
import { Card } from "./components/card";
// import Image from "next/image";

// import WorkImage from "public/images/work/work.svg";

import styles from "./work.module.css";

export const Work = () => {
  return (
    <section className={`${styles.work} ${styles.colored_background}`}>
      <div className={styles.blocks}>
        <Card
          title="ДЛЯ ЗАКАЗЧИКОВ"
          description=" Теперь вы знаете все про проект Безпересдач. Выбор за Вами. Заполните заявку и проверьте как это работает. Это быстро и
					бесплатно"
          url=""
          textButton="Заказать работу"
        ></Card>
        <Card
          title="ДЛЯ ИСПОЛНИТЕЛЕЙ"
          description="  Вы решаете задачи - мы выплачиваем деньги. Все прозрачно, быстро и удобно. Мы предлагаем лучшие условия среди конкурентов."
          url=""
          textButton="Стать исполнителем"
        ></Card>
      </div>
    </section>
  );
};
