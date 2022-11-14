import React from "react";
import Image from "next/image";
import { Card } from "./components/card/card";
import main from "/public/images/offer/main.svg";
import one from "/public/images/offer/point.svg";
import two from "/public/images/offer/two.svg";
import three from "/public/images/offer/three.svg";
import four from "/public/images/offer/four.svg";

import styles from "./offer.module.css";

export const Offer = () => {
  return (
    <section className={`${styles.offer} ${styles.colored_background}`}>
      <div className={styles.image_container}>
        <Image className={styles.image} src={main} alt="advantages" />
      </div>
      <div className={styles.cards}>
        <h2>
          УСЛОВИЯ <br></br> ДЛЯ АВТОРОВ
        </h2>
        <Card description={"Высшее образование (студенты старших курсов)*"} img={one}></Card>
        <Card description={"Наличие компьютера с выходом в интернет"} img={one}></Card>
        <Card description={"Уверенные знания в выбранной квалификации работ"} img={one}></Card>
        <Card description={"Портфолио из различных работ"} img={one}></Card>
      </div>
    </section>
  );
};
