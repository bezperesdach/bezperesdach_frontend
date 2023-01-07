import React from "react";
import Image from "next/image";

import aboutUsImage from "../../../public/assets/images/about_us_home/about_us_home.webp";
import aboutUsFallback from "../../../public/assets/images/about_us_home/about_us_home_fallback.png";

import styles from "./about-us-home-page.module.css";

export const AboutUsHomePage = () => {
  return (
    <section className={`${styles.about_us} ${styles.colored_background}`}>
      <div className={styles.description}>
        <h2>О НАС</h2>
        <h3 style={{ paddingBottom: "32px" }}>
          <span style={{ fontWeight: "600" }}>&quot;Без пересдач&quot;</span> - это сервис, который оказывает помощь студентам в учебе
          онлайн.
        </h3>
        <h3 style={{ paddingBottom: "32px" }}>
          На сайте вы можете получить консультации и обратиться к экспертам для решения различных задач и проблем в учебе.
        </h3>
        <h3 style={{ paddingBottom: "32px" }}>
          Авторы &quot;Без пересдач&quot; консультируют студентов по дипломным проектам, магистерским и докторским работам, помогают с
          поиском методических материалов.
        </h3>
        <h3>&quot;Без пересдач&quot; работает только с экспертами, прошедшими строгий отбор, и гарантирует качество каждой услуги.</h3>
      </div>
      <div className={styles.image_container}>
        <Image
          src={aboutUsImage}
          placeholder="blur"
          className={`${styles.image} no_select image_no_pointer_events`}
          alt="our advantages"
          sizes="(max-width: 1240px) 100vw,
          55vw"
          onError={(e) => (e.currentTarget.src = aboutUsFallback.src)}
        />
      </div>
    </section>
  );
};
