import React from "react";
import Image from "next/image";
import Link from "next/link";

import left from "/public/images/bonus/left.svg";
import right from "/public/images/bonus/right.svg";
import { Button } from "../../button/button";

import styles from "./bonus.module.css";

export const Bonus = () => {
  return (
    <section className={`${styles.bonus} ${styles.colored_background}`}>
      <Image className={styles.images_left} src={left} alt="left" />
      <div className={styles.bonus_block}>
        <h2>
          Скидка 10% <br></br> на первый заказ
        </h2>
        <p>Пока ты думаешь - другие заказывают</p>
        <Link href="/order">
          <Button backgroundColor="#0b73fe" color="white">
            Заказать работу
          </Button>
        </Link>
      </div>
      <Image className={styles.images_right} src={right} alt="right" />
    </section>
  );
};
