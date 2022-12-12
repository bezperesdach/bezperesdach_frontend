import { useEffect, useState } from "react";

import styles from "./legal-notification.module.css";

export const LegalNotification = () => {
  const [legalNotificationShownFirstTime, setLegalNotificationShownFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const value = localStorage.getItem("siteConfig");
    if (value) {
      const notification = JSON.parse(value).legalNotification;
      setLegalNotificationShownFirstTime(notification);
    } else {
      localStorage.setItem("siteConfig", JSON.stringify({ legalNotification: true }));
      setLegalNotificationShownFirstTime(true);
    }
  }, []);

  const setLocalStorage = () => {
    localStorage.setItem("siteConfig", JSON.stringify({ legalNotification: false }));
    setLegalNotificationShownFirstTime(false);
  };

  if (!legalNotificationShownFirstTime) return null;

  return (
    <div className={`${styles.legal} ${styles.colored_background}`} onClick={setLocalStorage}>
      <p className={styles.text}>
        Авторы сайта bezperesdach.ru предлагают услуги по подбору, обработке и организации информации по указанной заказчиком теме.
        Результат этой работы не является окончательным научным документом, но может быть использован как источник информации для его
        создания
      </p>
      <a className={styles.close} />
    </div>
  );
};
