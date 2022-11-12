import Link from "next/link";
import React from "react";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={`${styles.footer} ${styles.colored_background}`}>
      <div className={styles.footer_text}>
        <h2>
          <strong>“Безпересдач”</strong> - онлайн-проект помощи студентам
        </h2>
        <p>
          Используя сервис “Безпересдач”, вы принимаете{" "}
          <Link href="/documents/terms-of-use.pdf" className={styles.link}>
            пользовательское соглашение
          </Link>{" "}
          ,{" "}
          <Link href="/documents/processing-policy.pdf" className={styles.link}>
            политику конфиденциальности
          </Link>
          , а также
          <Link href="/documents/processing-policy.pdf" className={styles.link}>
            {" "}
            политику обработки персональных данных
          </Link>
        </p>
        <p>
          <strong>© 2022 “Безпересдач”</strong>
        </p>
      </div>
      <div className={styles.footer_agreements}>
        <Link href="/order" className={styles.link}>
          Заказать работу
        </Link>{" "}
        <Link href="/price" className={styles.link}>
          Цены и услуги
        </Link>{" "}
      </div>
    </footer>
  );
};
