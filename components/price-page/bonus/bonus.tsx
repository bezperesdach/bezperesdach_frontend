import React from "react";
import Image from "next/image";
import bonus from "public/assets/images/bonus.svg";

import styles from "./bonus.module.css";

export const Bonus = () => {
  return (
    <div className={styles.bonus}>
      <div className={styles.bonus_text}>
        <Image src={bonus} height={100} width={320} alt="logo" />
        <h2>Получи скидку 5% на первый заказ</h2>
        <p>А за каждого приглашенного друга мы приготовили тебе подарок</p>
        <a href="" className={styles.url}>
          {"Забрать бонус"}
        </a>
      </div>
    </div>
  );
};
