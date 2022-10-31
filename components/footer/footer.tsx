import React from "react";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer_text"]}>
        <p>
          <strong>“Безпересдач”</strong> - проект онлайн-помощи студентам. Мы не занимаемся написанием дипломных работ и не продаем
          дипломные работы, однако мы предоставляем помощь по написанию данных работ. После предоставления услуги авторские права работы
          переходят к заказчику безпересдач, <br></br>
          <strong>2022 Все права защищены</strong>
        </p>
      </div>
      <div className={styles["footer_button"]}>
        <a href="">Пользовательское соглашение</a> <br></br>
        <a href="">Политика конфиденциальности</a>
      </div>
    </footer>
  );
};
