import dynamic from "next/dynamic";
// import Image from "next/image";
// import Hero from "public/assets/images/hero/hero.webp";
// import FallbackHero from "public/assets/images/hero/fallback-hero.png";
import { LinkButton } from "../../link-button/link-button";
// import { Button } from "../../button/button";
// import { QuickOrder } from "../../forms/quick-order/quick-order";
import urls from "../../../utils/urls.json";
// import { RecaptchaDisclaimer } from "../../forms/components/recaptcha-disclaimer/recaptcha-disclaimer";
const DynamicHeroAnimation = dynamic(() => import("./hero-animated/hero-animated"));

import styles from "./main.module.css";

export const Main = () => {
  return (
    <section className={styles.main_hero}>
      <div className={styles.image_container}>
        {/* <Image
          src={Hero}
          placeholder="blur"
          className={styles.image}
          alt="hero"
          priority={true}
          sizes="(max-width: 1240px) 100vw,
          55vw"
          onError={(e) => (e.currentTarget.src = FallbackHero.src)}
        /> */}
        <DynamicHeroAnimation className={styles.image} />
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
