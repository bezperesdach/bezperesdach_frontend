import React from "react";
import Image from "next/image";
import { Card } from "./components/card/card";
import maps from "/public/images/contact/maps.svg";
import telegram from "/public/images/contact/telegram.svg";
import mail from "/public/images/contact/mail.svg";
import whats from "/public/images/contact/whats.svg";
import instagram from "/public/images/contact/instagram.svg";
import vk from "/public/images/contact/vk.svg";

import styles from "./contact.module.css";

export const Contact = () => {
  return (
    <section className={`${styles.contact_text} ${styles.colored_background}`}>
      <h2>
        ПРИ ВОЗНИКНОВЕНИИ ВОПРОСОВ - <br></br> МЫ ГОТОВЫ ПОМОЧЬ ВАМ В ЛЮБОЕ ВРЕМЯ
      </h2>
      <div className={styles.contact}>
        <Image className={styles.images} src={maps} alt="contact" />

        <div className={styles.cards}>
          <Card url="https://t.me/bezperesdach_official" description={"@bezperesdach_official"} img={telegram}></Card>
          <Card
            url="mailto:help@bezperesdach.ru?subject=%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BC%D0%BD%D0%B5"
            description={"help@bezperesdach.ru"}
            img={mail}
          ></Card>
          {/* <Card url="https://t.me/bezperesdach_official" description={"+7-901-281-90-47"} img={whats}></Card> */}
          <Card url="https://vk.com/bezperesdach_help" description={"@bezperesdach_help"} img={vk}></Card>
        </div>
      </div>
    </section>
  );
};
