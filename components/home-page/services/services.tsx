import React from "react";

import Image from "next/image";
import servicesImage from "public/images/services.svg";
import styles from "./services.module.css";

export const Services = () => {
  return (
    <section className={styles.services}>
      <div className={styles.image_container}>
        <Image className={styles.image} src={servicesImage} alt="hero" />
      </div>

      <div className={styles.card}>
        <div className={styles.text}>
          <h2>Как сделать заказ?</h2>
          <p>1. Вы размещаете заказ на сайте</p>
          <p>2. Мы связываемся с вами и уточняем все детали</p>
          <p>3. Мы отправляем вам выполненную часть работы</p>
          <p>4. Вы проверяете работу и вносите предоплату</p>
          <p>5. Мы высылаем вам полностью выполненную работу</p>
        </div>
      </div>
    </section>
  );
};
