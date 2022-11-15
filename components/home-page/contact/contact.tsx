import React from "react";
import Image from "next/image";
import { Card } from "./components/card/card";
import Map from "public/images/contact/map.webp";
import FallbackMap from "public/images/contact/fallback-map.png";
import Telegram from "public/images/contact/telegram.webp";
import FallbackTelegram from "public/images/contact/fallback-telegram.png";
import Mail from "public/images/contact/mail.webp";
import FallbackMail from "public/images/contact/fallback-mail.png";
// import whats from "/public/images/contact/whats.svg";
// import instagram from "/public/images/contact/instagram.svg";
import Vk from "public/images/contact/vk.webp";
import FallbackVk from "public/images/contact/fallback-vk.png";

import styles from "./contact.module.css";

export const Contact = () => {
  return (
    <section className={`${styles.contact_text} ${styles.colored_background}`}>
      <h2>
        ПРИ ВОЗНИКНОВЕНИИ ВОПРОСОВ - <br></br> МЫ ГОТОВЫ ПОМОЧЬ ВАМ В ЛЮБОЕ ВРЕМЯ
      </h2>
      <div className={styles.contact}>
        <div className={styles.image_container}>
          <Image
            src={Map}
            placeholder="blur"
            className={styles.image}
            alt="map"
            onError={(e) => (e.currentTarget.src = FallbackMap.src)}
          />
        </div>

        <div className={styles.cards}>
          <Card
            url="https://t.me/bezperesdach_official"
            description={"@bezperesdach_official"}
            img={Telegram}
            fallbackImg={FallbackTelegram}
            alt="telegram"
          />
          <Card
            url="mailto:help@bezperesdach.ru?subject=%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BC%D0%BD%D0%B5"
            description={"help@bezperesdach.ru"}
            img={Mail}
            fallbackImg={FallbackMail}
            alt="email"
          />
          <Card
            url="https://vk.com/bezperesdach_official"
            description={"@bezperesdach_official"}
            img={Vk}
            fallbackImg={FallbackVk}
            alt="vk"
          />
        </div>
      </div>
    </section>
  );
};
