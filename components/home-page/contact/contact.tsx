import React from "react";
import Image from "next/image";
import useDeviceDetect from "../../../hooks/use-device-detect/use-device-detect";
import { Card } from "./components/card/card";
import Map from "public/assets/images/contact/map.webp";
import FallbackMap from "public/assets/images/contact/fallback-map.png";
import Telegram from "public/assets/images/contact/telegram.webp";
import FallbackTelegram from "public/assets/images/contact/fallback-telegram.png";
import Mail from "public/assets/images/contact/mail.webp";
import FallbackMail from "public/assets/images/contact/fallback-mail.png";
// import whats from "public/assets/images/contact/whats.svg";
// import instagram from "public/assets/images/contact/instagram.svg";
import Vk from "public/assets/images/contact/vk.webp";
import FallbackVk from "public/assets/images/contact/fallback-vk.png";

import styles from "./contact.module.css";

export const Contact = () => {
  const { isMobile } = useDeviceDetect();

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
            className={`${styles.image} no_select image_no_pointer_events`}
            alt="map"
            sizes="(max-width: 1240px) 100vw,
            55vw"
            onError={(e) => (e.currentTarget.src = FallbackMap.src)}
          />
        </div>

        <div className={styles.cards}>
          <Card
            url={isMobile ? "tg://resolve?domain=bezperesdach_bot" : "https://bezperesdach_bot.t.me"}
            description="Телеграм бот "
            link="@bezperesdach_bot"
            img={Telegram}
            fallbackImg={FallbackTelegram}
            alt="telegram"
          />
          <Card
            url={isMobile ? "tg://resolve?domain=bezperesdach_official" : "https://bezperesdach_official.t.me"}
            description="Телеграм канал "
            link="@bezperesdach_official"
            img={Telegram}
            fallbackImg={FallbackTelegram}
            alt="telegram"
          />
          <Card
            url="mailto:help@bezperesdach.ru?subject=%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BC%D0%BD%D0%B5"
            description="Почта "
            link="help@bezperesdach.ru"
            img={Mail}
            fallbackImg={FallbackMail}
            alt="email"
          />
          <Card
            url={isMobile ? "vk://vk.com/bezperesdach_official" : "https://vk.com/bezperesdach_official"}
            description="Группа Вконтакте "
            link="@bezperesdach_official"
            img={Vk}
            fallbackImg={FallbackVk}
            alt="vk"
          />
        </div>
      </div>
    </section>
  );
};
