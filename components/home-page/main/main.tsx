import React from "react";
import Image from "next/image";
import Hero from "public/assets/images/hero/hero.webp";
import FallbackHero from "public/assets/images/hero/fallback-hero.png";
import { LinkButton } from "../../link-button/link-button";

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
          onError={(e) => (e.currentTarget.src = FallbackHero.src)}
        />
      </div>

      <div className={styles.text}>
        <p>
          <strong>“Безпересдач”</strong>- проект онлайн-помощи студентам. <br></br>Мы помогаем тем, кто учится в ВУЗах, колледжах и
          техникумах.
        </p>
        <div className={styles.buttons}>
          <LinkButton color="white" href="/order">
            Заказать работу
          </LinkButton>
          <LinkButton outlined={true} href="/work">
            Стать экспертом
          </LinkButton>
        </div>
      </div>
    </section>
  );
};
