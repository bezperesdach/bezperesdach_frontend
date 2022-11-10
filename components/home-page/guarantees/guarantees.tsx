import React from "react";
import { Card } from "./components/card/card";

import styles from "./guarantees.module.css";

export const Guarantees = () => {
  return (
    <section className={styles.guarantees}>
      <Card title="Доработки - бесплатно">
        <p>
          Гарантийный срок — <span className={styles.bold_blue}>до 30 дней</span>. В этот период вы можете обратиться за бесплатными
          доработками
        </p>
      </Card>
      <Card title="Онлайн-поддержка до самой защиты">
        <p>
          Мы ответим на любой вопрос <span className={styles.bold_blue}>24/7</span> по почте
        </p>
      </Card>
    </section>
  );
};
