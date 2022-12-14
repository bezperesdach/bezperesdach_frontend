import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Hero from "public/assets/images/hero/hero.webp";
import HeroMov from "public/assets/images/hero/hero.mov";
import HerWebm from "public/assets/images/hero/hero.webm";
import FallbackHero from "public/assets/images/hero/fallback-hero.png";
import { LinkButton } from "../../link-button/link-button";
import urls from "../../../utils/urls.json";
const DynamicHeroAnimation = dynamic(() => import("../video-component/video-component"));

import styles from "./main.module.css";

export const Main = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <section className={styles.main_hero}>
      <div className={styles.image_container}>
        <Image
          src={Hero}
          placeholder="blur"
          className={styles.image}
          alt="hero"
          priority={true}
          sizes="(max-width: 1240px) 100vw,
          55vw"
          style={{ visibility: !isVisible ? "visible" : "hidden" }}
          onError={(e) => (e.currentTarget.src = FallbackHero.src)}
        />

        <DynamicHeroAnimation
          className={styles.animated_image}
          videoMov={HeroMov}
          videoWebm={HerWebm}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </div>

      <div>
        <div className={styles.text}>
          <div className={styles.text_main}>
            <h1>Без пересдач</h1>
            <h2>проект онлайн-помощи студентам </h2>
          </div>

          <div>
            {/* <QuickOrder isSubmitting={isFormSubmitting} setSubmitting={setFormSubmitting} /> */}

            <div className={styles.buttons}>
              {/* <Button form="quick-order" type="submit" color="#fff" disabled={isFormSubmitting} loading={isFormSubmitting}>
              Оставить заявку
            </Button> */}
              <LinkButton color="#fff" href={urls.order}>
                Оставить заявку
              </LinkButton>
              <LinkButton outlined={true} href={urls.work}>
                Стать автором
              </LinkButton>
            </div>
          </div>
          {/* <RecaptchaDisclaimer /> */}
        </div>
      </div>
    </section>
  );
};
