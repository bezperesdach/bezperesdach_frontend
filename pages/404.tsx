import React from "react";
import { LinkButton } from "../components/link-button/link-button";
import urls from "../utils/urls.json";
import { SEO } from "../components/seo/seo";

import styles from "../styles/404.module.css";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Страница не найдена - Безпересдач - онлайн-проект помощи в учёбе"
        description="Наша команда поможет написать дипломную, курсовую и множество других работ, проведет консультацию и подготовит к успешной сдачи!"
        url={`https://bezperesdach.ru/404`}
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ, безпересдач, без пересдач"
        }
      >
        <meta name="theme-color" content="#FFF289" />

        <meta name="theme-color" content="#FFF289" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#FFF289" media="(prefers-color-scheme: dark)" />

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
      </SEO>

      <div className={`${styles.main} no_select`}>
        <div className={styles.main_container}>
          <div className={styles.container}>
            <div className={styles.lamp}>
              <div className={styles.glass}>
                <div className={styles.lava}>
                  <div className={styles.blob}></div>
                  <div className={styles.blob}></div>
                  <div className={styles.blob}></div>
                  <div className={styles.blob_top}></div>
                  <div className={styles.blob_bottom}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.text_container}>
            <h1>404</h1>
            <h2>Страница не найдена...</h2>
            <LinkButton href={urls.base} color="#FFF289" backgroundColor="#662280">
              На главную
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
