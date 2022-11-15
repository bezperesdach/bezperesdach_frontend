import React from "react";
import Image from "next/image";
import Link from "next/link";

import Left from "public/images/bonus/left.webp";
import FallbackLeft from "public/images/bonus/fallback-left.png";
import Right from "public/images/bonus/right.webp";
import FallbackRight from "public/images/bonus/fallback-right.png";
import { Button } from "../../button/button";

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
        <Link href="/order">
          <Button backgroundColor="#0b73fe" color="white">
            Заказать работу
          </Button>
        </Link>
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
