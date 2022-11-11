import React from "react";
import Image from "next/image";

import Logo from "public/images/hero.svg";

import styles from "./main.module.css";
import { Button } from "../../button/button";

export const Main = () => {
  return (
    <section className={`${styles.main_hero} ${styles.colored_background}`}>
      <Image src={Logo} className={styles.image} alt="Logo"></Image>
      <div className={styles.text}>
        <p>
          “Безпересдач” - проект, ориентированный на оказание онлайн-помощи студентам по написанию разноплановых студенческих работ. Мы
          оказываем помощь по написанию реферативных, курсовых, дипломных, магистерских, докторских работ, а также по написанию
          контрольных, помощи в составлении и решение тестовых задач, подготовке различных методических материалов.
        </p>
        <div className={styles.button}>
          <Button backgroundColor="#0b73fe">Заказать работу</Button>
          <Button backgroundColor="#0b73fe" outlined={true}>
            Стать экспертом
          </Button>
        </div>
      </div>
    </section>
  );
};
