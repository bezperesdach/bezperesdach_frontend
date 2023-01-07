import React from "react";
import Image from "next/image";
import useDeviceDetect from "../../../hooks/use-device-detect/use-device-detect";
import { Card } from "./components/card/card";
import Main from "public/assets/images/our-advantages/main.webp";
import FallbackMain from "public/assets/images/our-advantages/fallback-main.png";
import One from "public/assets/images/our-advantages/1.webp";
import OneVideoMov from "public/assets/images/our-advantages/1.mov";
import OneVideoWebm from "public/assets/images/our-advantages/1.webm";
import FallbackOne from "public/assets/images/our-advantages/fallback-1.png";
import Two from "public/assets/images/our-advantages/2.webp";
import TwoVideoMov from "public/assets/images/our-advantages/2.mov";
import TwoVideoWebm from "public/assets/images/our-advantages/2.webm";
import FallbackTwo from "public/assets/images/our-advantages/fallback-2.png";
import Three from "public/assets/images/our-advantages/3.webp";
import ThreeVideoMov from "public/assets/images/our-advantages/3.mov";
import ThreeVideoWebm from "../../../public/assets/images/our-advantages/3.webm";

import FallbackThree from "public/assets/images/our-advantages/fallback-3.png";

import styles from "./our-advantages.module.css";

export const OurAdvantages = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <section className={`${styles.our_advantages} ${styles.colored_background}`}>
      <div className={styles.cards}>
        <h2>НАШИ ПРЕИМУЩЕСТВА</h2>
        <Card
          title="ДОРАБОТКИ - БЕСПЛАТНО"
          img={One}
          fallbackImg={FallbackOne}
          alt="free revision"
          videoMov={OneVideoMov}
          videoWebm={OneVideoWebm}
        >
          <p>Гарантийный срок - до 30 дней. В этот период вы можете обратиться за бесплатными доработками</p>
        </Card>
        <Card
          title="ОНЛАЙН-ПОДДЕРЖКА ДО САМОЙ ЗАЩИТЫ"
          img={Two}
          fallbackImg={FallbackTwo}
          alt="online help 24/7"
          videoMov={TwoVideoMov}
          videoWebm={TwoVideoWebm}
        >
          <p>
            Мы ответим на любой вопрос 24/7 по{" "}
            <a className={styles.link} href="mailto:help@bezperesdach.ru" target="_blank" rel="nofollow noopener noreferrer">
              Почте
            </a>
            ,{" "}
            <a
              className={styles.link}
              href={isMobile ? "tg://resolve?domain=bezperesdach_bot" : "https://bezperesdach_bot.t.me"}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              в боте Телеграм
            </a>{" "}
            или в{" "}
            <a
              className={styles.link}
              href={isMobile ? "vk://vk.com/bezperesdach_official" : "https://vk.com/bezperesdach_official"}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              группе Вконтакте
            </a>
          </p>
        </Card>
        <Card
          title="ГАРАНТИЯ ВОЗВРАТА ДЕНЕГ"
          img={Three}
          fallbackImg={FallbackThree}
          alt="guarantees"
          videoMov={ThreeVideoMov}
          videoWebm={ThreeVideoWebm}
        >
          <p>В случае, если Вам не понравится результат, ваши деньги будут возвращены полностью.</p>
        </Card>
      </div>
      <div className={styles.image_container}>
        <Image
          src={Main}
          placeholder="blur"
          className={`${styles.image} no_select image_no_pointer_events`}
          alt="our advantages"
          sizes="(max-width: 1240px) 100vw,
          55vw"
          onError={(e) => (e.currentTarget.src = FallbackMain.src)}
        />
      </div>
    </section>
  );
};
