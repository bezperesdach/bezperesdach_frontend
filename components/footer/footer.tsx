import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import styles from "./footer.module.css";
import urls from "../../utils/urls.json";

export const Footer = () => {
  const router = useRouter();
  return (
    <footer className={`${styles.footer} ${styles.colored_background}`}>
      <div className={styles.text}>
        <h2>
          <strong>“Без пересдач”</strong> - онлайн-проект помощи студентам
        </h2>
        <p>
          Используя сервис “Без пересдач”, вы принимаете{" "}
          <Link href={urls.agreement} className={styles.document_link}>
            пользовательское соглашение
          </Link>
          , а также
          <Link href="/assets/documents/processing-policy.pdf" className={styles.document_link}>
            {" "}
            политику обработки персональных данных
          </Link>
        </p>
        <p>
          <strong>© 2022 “Без пересдач”</strong>
        </p>
      </div>
      <div className={styles.links_container}>
        {router.pathname !== urls.base && (
          <div className={styles.links}>
            <Link href={urls.base} className={styles.link}>
              Главная
            </Link>
          </div>
        )}
        <div className={styles.links}>
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
        <div className={styles.links}>
          <Link href={urls.about_us} className={styles.link}>
            О нас
          </Link>
          <Link href={urls.guarantees} className={styles.link}>
            Гарантии
          </Link>
        </div>
      </div>
    </footer>
  );
};
