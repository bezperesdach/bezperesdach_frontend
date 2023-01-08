import React from "react";
import Image from "next/image";
import { ImageWithText } from "../../image-with-text/image-with-text";
import Main from "public/assets/images/work-advantages/main.webp";
import FallbackMain from "public/assets/images/work-advantages/fallback-main.png";
import One from "public/assets/images/work-advantages/one.webp";
import FallbackOne from "public/assets/images/work-advantages/fallback-one.png";
import Two from "public/assets/images/work-advantages/two.webp";
import FallbackTwo from "public/assets/images/work-advantages/fallback-two.png";
import Three from "public/assets/images/work-advantages/three.webp";
import FallbackThree from "public/assets/images/work-advantages/fallback-three.png";
import Four from "public/assets/images/work-advantages/four.webp";
import FallbackFour from "public/assets/images/work-advantages/fallback-four.png";

import styles from "./work-advantages.module.css";

export const WorkAdvantages = () => {
  return (
    <section className={`${styles.work_advantages} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>ЗАРАБАТЫВАЙ С БЕЗ ПЕРЕСДАЧ ОТ 40 ТЫСЯЧ РУБЛЕЙ</h2>
        <ImageWithText description={"Выплаты каждый месяц удобным вам способом"} img={One} fallbackImg={FallbackOne} alt="one" />
        <ImageWithText description={"Возможность работать из любой точки мира"} img={Two} fallbackImg={FallbackTwo} alt="two" />
        <ImageWithText
          description={"Мы всегда готовы помочь вам в решении любых проблем"}
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
          className={`${styles.image} no_select image_no_pointer_events`}
          alt="map"
          sizes="(max-width: 1240px) 100vw,
          55vw"
          onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
      </div>
    </section>
  );
};
