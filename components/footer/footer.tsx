import React from "react";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer_text"]}>
        <p>
          <strong>“Безпересдач”</strong> - проект онлайн-помощи студентам. Мы не занимаемся написанием дипломных работ и не продаем
          дипломные работы, однако мы предоставляем помощь по написанию данных работ. После предоставления услуги авторские права работы
          переходят к заказчику.
        </p>
        <p>
          <strong>© 2022 “Безпересдач”</strong>
        </p>
      </div>
      <div className={styles["footer_agreements"]}>
        <p>
          Используя наш сервис вы соглашаетесь с{" "}
          <a href="/documents/terms-of-use.pdf" className={styles.link}>
            пользовательским соглашением
          </a>{" "}
          и{" "}
          <a href="/documents/processing-policy.pdf" className={styles.link}>
            политикой конфиденциальности
          </a>
        </p>
      </div>
    </footer>
  );
};
