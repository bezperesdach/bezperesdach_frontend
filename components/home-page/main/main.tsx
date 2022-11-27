import React from "react";
import Image from "next/image";
import Hero from "public/assets/images/hero/hero.webp";
import FallbackHero from "public/assets/images/hero/fallback-hero.png";
import { LinkButton } from "../../link-button/link-button";
import urls from "../../../utils/urls.json";

import styles from "./main.module.css";

export const Main = () => {
  return (
    <section className={styles.main_hero}>
      <div className={styles.image_container}>
        <Image
          src={Hero}
          placeholder="blur"
          className={styles.image}
          alt="hero"
          priority={true}
          sizes="(max-width: 1240px) 100vw,
          55vw"
          onError={(e) => (e.currentTarget.src = FallbackHero.src)}
        />
      </div>

      <div className={styles.text}>
        <div className={styles.text_main}>
          <h1>&ldquo;Без пересдач&rdquo;</h1>
          <h2>проект онлайн-помощи студентам. </h2>
          <h3>На сайте возможно обратиться напрямую к эксперту, чтобы заказать помощь в выполнении студенческих работ.</h3>
        </div>

        <div className={styles.buttons}>
          <LinkButton color="white" href={urls.order}>
            Заказать работу
          </LinkButton>
          <LinkButton outlined={true} href={urls.work}>
            Стать автором
          </LinkButton>
        </div>
      </div>
    </section>
  );
};
