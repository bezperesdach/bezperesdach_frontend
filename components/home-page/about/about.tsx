import React from "react";

import styles from "./about.module.css";

export const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.card}>
        <div className={styles.text}>
          <h2>О нас</h2>
          <p>
            <strong>“Безпересдач”</strong> - проект, ориентированный на оказание онлайн-помощи студентам по написанию разноплановых
            студенческих работ.
          </p>
          <p>
            Мы оказываем помощь по написанию реферативных, курсовых, дипломных, магистерских, докторских работ, а также по написанию
            контрольных, помощи в составлении и решение тестовых задач, подготовке различных методических материалов.
          </p>
        </div>
      </div>
    </section>
  );
};
