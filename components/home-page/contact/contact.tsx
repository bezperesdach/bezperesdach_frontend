import React from "react";
import Image from "next/image";
import { Card } from "./components/card/card";
import maps from "/public/images/contact/maps.svg";
import telegram from "/public/images/contact/telegram.svg";
import mail from "/public/images/contact/mail.svg";
import whats from "/public/images/contact/whats.svg";
import instagram from "/public/images/contact/instagram.svg";

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
          <Card description={"@bezperesdach"} img={telegram}></Card>
          <Card description={"help@bezperesdach.ru"} img={mail}></Card>
          <Card description={"+7-901-281-90-47"} img={whats}></Card>
          <Card description={"@bezperesdach"} img={instagram}></Card>
        </div>
      </div>
    </section>
  );
};
