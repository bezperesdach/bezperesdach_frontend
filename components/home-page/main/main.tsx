import React from "react";
import Image from "next/image";

import Logo from "public/images/hero.svg";

import styles from "./main.module.css";

export const Main = () => {
  return (
    <section className={styles.main_hero}>
      <Image src={Logo} className={styles.image} alt="Logo"></Image>
      <div className={styles.text}>
        <p>
          “Безпересдач” - проект, ориентированный на оказание онлайн-помощи студентам по написанию разноплановых студенческих работ. Мы
          оказываем помощь по написанию реферативных, курсовых, дипломных, магистерских, докторских работ, а также по написанию
          контрольных, помощи в составлении и решение тестовых задач, подготовке различных методических материалов.
        </p>
        <div className={styles.button}>
          <p className={styles.button_active}>
            <a href=""> Заказать работу</a>
          </p>
          <p className={styles.button_inactive}>
            <a href=""> Стать автором</a>
          </p>
        </div>
      </div>
    </section>
  );
};
