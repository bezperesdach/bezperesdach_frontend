import React from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "public/images/hero/hero.webp";
import FallbackHero from "public/images/hero/fallback-hero.png";

import { Button } from "../../button/button";

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
          onError={(e) => (e.currentTarget.src = FallbackHero.src)}
        />
      </div>

      <div className={styles.text}>
        <p>
          <strong>“Безпересдач”</strong>- проект онлайн-помощи студентам. <br></br>Мы помогаем тем, кто учится в ВУЗах, колледжах и
          техникумах.
        </p>
        <div className={styles.button}>
          <Link href="/order">
            <Button backgroundColor="#0b73fe" color="white">
              Заказать работу
            </Button>
          </Link>
          <Link href="/work">
            <Button backgroundColor="#0b73fe" outlined={true}>
              Стать экспертом
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
