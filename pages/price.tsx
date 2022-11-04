import Head from "next/head";

import { Price } from "../components/price_pages/price";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Безпересдач</title>
        <meta name="description" content="Онлайн-платформа для помощи в обучении" />
        <meta property="og:site_name" content="Безпересдач" />
        <meta property="og:description" content="Онлайн-платформа для помощи в обучении" />
        <meta property="og:image" content="/og_logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Price />
      </main>
    </div>
  );
}
