import React from "react";

import styles from "./preparation.module.css";
import Image from "next/image";
import preparationImageOne from "/public/images/preparation/one.svg";
import preparationImageTwo from "/public/images/preparation/two.svg";
import preparationImageThree from "/public/images/preparation/three.svg";
import preparationImageFour from "/public/images/preparation/four.svg";
import preparationImageFive from "/public/images/preparation/five.svg";
import { Card } from "./components/card/card";

export const Preparation = () => {
  return (
    <section className={styles.about}>
      <div className={styles.card}>
        <div className={styles.text}>
          <h2>Подготовим все за вас</h2>
          <p>
            Наши исполнители готовы подготовить дополнительные материалы для решения вашей задачи. Мы готовы предоставить полный пакет
            услуг - достаточно указать необходимые компоненты в “Дополнительном описании”
          </p>

          <div className={styles.elementsAll}>
            <div className={styles.elementsOne}>
              <Card>
                <div className={styles["image-container"]}>
                  <Image className={styles.image} src={preparationImageOne} alt="preparation" />
                  <p>Оформление работы по ГОСТу</p>
                </div>
              </Card>

              <Card>
                <div className={styles["image-container"]}>
                  <Image className={styles.image} src={preparationImageTwo} alt="preparation" />
                  <p>Подготовка презентации к защите</p>
                </div>
              </Card>

              <Card>
                <div className={styles["image-container"]}>
                  <Image className={styles.image} src={preparationImageThree} alt="preparation" />
                  <p>Подготовка речи к защите</p>
                </div>
              </Card>
            </div>

            <div className={styles.elementsTwo}>
              <Card>
                <div className={styles["image-container"]}>
                  <Image className={styles.image} src={preparationImageFour} alt="preparation" />
                  <p>Подбор литературы</p>
                </div>
              </Card>

              <Card>
                <div className={styles["image-container"]}>
                  <Image className={styles.image} src={preparationImageFive} alt="preparation" />
                  <p>Репетиция защиты в Teams</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
