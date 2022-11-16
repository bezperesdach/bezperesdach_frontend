import React from "react";
import Image from "next/image";

import Left from "public/assets/images/bonus/left.webp";
import FallbackLeft from "public/assets/images/bonus/fallback-left.png";
import Right from "public/assets/images/bonus/right.webp";
import FallbackRight from "public/assets/images/bonus/fallback-right.png";
import { LinkButton } from "../../link-button/link-button";

import styles from "./bonus.module.css";

export const Bonus = () => {
  return (
    <section className={`${styles.bonus} ${styles.colored_background}`}>
      <Image
        src={Left}
        placeholder="blur"
        className={styles.images_left}
        alt="left"
        onError={(e) => (e.currentTarget.src = FallbackLeft.src)}
      />
      <div className={styles.bonus_block}>
        <h2>
          Скидка 10% <br></br> на первый заказ
        </h2>
        <p>
          Пока ты думаешь - <br></br> другие заказывают
        </p>
        <LinkButton backgroundColor="#0b73fe" color="white" href="/order">
          Заказать работу
        </LinkButton>
      </div>
      <Image
        src={Right}
        placeholder="blur"
        className={styles.images_right}
        alt="right"
        onError={(e) => (e.currentTarget.src = FallbackRight.src)}
      />
    </section>
  );
};
