import Head from "next/head";

import { Prices } from "../components/price-page/prices/prices";
import { Bonus } from "../components/price-page/bonus/bonus";

import styles from "../styles/Price.module.css";

export default function Price() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Безпересдач</title>
        <meta name="description" content="Цены и услуги" />
        <meta property="og:description" content="Цены и услуги" />
        <meta property="og:site_name" content="Безпересдач" />
        <meta property="og:image" content="/og_logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Prices />
      </main>
    </div>
  );
}
