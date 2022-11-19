import Head from "next/head";
import React from "react";
import { LinkButton } from "../components/link-button/link-button";
import urls from "../urls/urls.json";

import styles from "../styles/404.module.css";

export default function NotFound() {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#0b73fe" />
      </Head>

      <div className={styles.main}>
        <div className={styles.main_container}>
          <div className={styles.container}>
            <div className={styles.canvas}>
              <div className={styles.square_canvas}>
                <div className={styles.top}></div>
                <div className={styles.glass}>
                  <div className={styles.lava}>
                    <div className={styles.blob_drop}></div>
                    <div className={styles.blob_drop}></div>
                    <div className={styles.blob_bounce}></div>
                    <div className={styles.blob_rise}></div>
                    <div className={styles.blob_top}></div>
                    <div className={styles.blob_bottom}></div>
                  </div>
                </div>
                <div className={styles.glass_round}></div>
                <div className={styles.base}>
                  <div className={styles.trapezoid}></div>
                  <div className={styles.trapezoid}></div>
                  <div className={styles.base_shadow}></div>
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
