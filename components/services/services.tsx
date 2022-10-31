import React from "react";

import Image from "next/image";
import servicesImage from "public/images/services.svg";
import styles from "./services.module.css";

export const Services = () => {
  return (
    <section className={styles.services}>
      <div className={styles["image-container"]}>
        <Image className={styles.image} src={servicesImage} priority={true} alt="hero" />
      </div>

      <div className={styles.card}>
        <div className={styles.text}>
          <h2>Как сделать заказ?</h2>
          <p>1. Вы размещаете заказ на сайте</p>
          <p>2. Мы связываемся с вами</p>
          <p>3. Вы совершаете оплату</p>
          <p>4. Исполнитель высылает работу на проверку</p>
        </div>
      </div>
    </section>
  );
};
