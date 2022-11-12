import React from "react";
import Image from "next/image";
import Logo from "public/images/hero.svg";
import Link from "next/link";

import { Button } from "../../button/button";

import styles from "./main.module.css";

export const Main = () => {
  return (
    <section className={styles.main_hero}>
      <div className={styles.image_container}>
        <Image src={Logo} className={styles.image} alt="Logo" />
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
          <Link href="">
            <Button backgroundColor="#0b73fe" outlined={true}>
              Стать экспертом
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
