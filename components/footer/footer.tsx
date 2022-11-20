import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import styles from "./footer.module.css";
import urls from "../../urls/urls.json";

export const Footer = () => {
  const router = useRouter();
  return (
    <footer className={`${styles.footer} ${styles.colored_background}`}>
      <div className={styles.footer_text}>
        <h2>
          <strong>“Безпересдач”</strong> - онлайн-проект помощи студентам
        </h2>
        <p>
          Используя сервис “Безпересдач”, вы принимаете{" "}
          <Link href="/assets/documents/terms-of-use.pdf" className={styles.link} id={styles.document_link}>
            пользовательское соглашение
          </Link>
          , а также
          <Link href="/assets/documents/processing-policy.pdf" className={styles.link} id={styles.document_link}>
            {" "}
            политику обработки персональных данных
          </Link>
        </p>
        <p>
          <strong>© 2022 “Безпересдач”</strong>
        </p>
      </div>
      <div className={styles.footer_agreements}>
        {router.pathname !== urls.base && (
          <Link href={urls.base} className={styles.link}>
            Главная
          </Link>
        )}
        <Link href={urls.order} className={styles.link}>
          Заказать работу
        </Link>
        <Link href={urls.prices} className={styles.link}>
          Цены и услуги
        </Link>
        <Link href={urls.work} className={styles.link}>
          Стать автором
        </Link>
      </div>
    </footer>
  );
};
