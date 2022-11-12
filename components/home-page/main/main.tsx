import React from "react";
import Image from "next/image";
import Logo from "public/images/hero.svg";
import { Button } from "../../button/button";

import styles from "./main.module.css";

export const Main = () => {
  return (
    <section className={styles.main_hero}>
      <div className={styles.image_container}>
        <Image src={Logo} className={styles.image} alt="Logo" />
      </div>

      <div className={styles.text}>
        <p>“Безпересдач” - проект онлайн-помощи студентам</p>
        <div className={styles.button}>
          <Button backgroundColor="#0b73fe" color="white">
            Заказать работу
          </Button>
          <Button backgroundColor="#0b73fe" outlined={true}>
            Стать экспертом
          </Button>
        </div>
      </div>
    </section>
  );
};
