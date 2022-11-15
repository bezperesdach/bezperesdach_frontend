import React from "react";
import Image from "next/image";
import { ImageWithText } from "../../image-with-text/image-with-text";
import Main from "public/images/advantages/main.webp";
import FallbackMain from "public/images/Advantages/fallback-main.png";
import One from "public/images/Advantages/one.webp";
import FallbackOne from "public/images/Advantages/fallback-one.png";
import Two from "public/images/advantages/two.webp";
import FallbackTwo from "public/images/advantages/fallback-two.png";
import Three from "public/images/advantages/three.webp";
import FallbackThree from "public/images/advantages/fallback-three.png";
import Four from "public/images/advantages/four.webp";
import FallbackFour from "public/images/advantages/fallback-four.png";

import styles from "./advantages.module.css";

export const Advantages = () => {
  return (
    <section className={`${styles.advantages} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>ЗАРАБАТЫВАЙ С БЕЗПЕРЕСДАЧ ОТ 40 ТЫСЯЧ РУБЛЕЙ</h2>
        <ImageWithText description={"Мы выплачиваем 100% от заказа вам на карту"} img={One} fallbackImg={FallbackOne} alt="one" />
        <ImageWithText description={"Работа полностью удаленная"} img={Two} fallbackImg={FallbackTwo} alt="two" />
        <ImageWithText
          description={"Мы постоянно на связи с вами для решения всех вопросов"}
          img={Three}
          fallbackImg={FallbackThree}
          alt="three"
        />
        <ImageWithText
          description={"Задачи выдаются в зависимости от вашей квалификации"}
          img={Four}
          fallbackImg={FallbackFour}
          alt="four"
        />
      </div>
      <div className={styles.image_container}>
        <Image
          src={Main}
          placeholder="blur"
          className={styles.image}
          alt="map"
          onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
      </div>
    </section>
  );
};
