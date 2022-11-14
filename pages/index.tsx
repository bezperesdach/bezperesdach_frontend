import Head from "next/head";
import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { Main } from "../components/home-page/main/main";
import { Service } from "../components/home-page/service/service";
import { Guarantees } from "../components/home-page/guarantees/guarantees";
import { Work } from "../components/home-page/work/work";
import { Bonus } from "../components/home-page/bonus/bonus";
import { Contact } from "../components/home-page/contact/contact";
import { ScrollTopButton } from "../components/scroll-to-top-button/scroll-to-top-button";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Безпересдач</title>
        <meta property="og:site_name" content="Безпересдач" />
        <meta name="description" content="Онлайн-платформа для помощи в обучении" />
        <meta property="og:description" content="Онлайн-платформа для помощи в обучении" />
        <meta property="og:image" content="/og_logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />
      <Service />
      <Guarantees />
      <Work />
      <Bonus />
      <Contact />
      <ScrollTopButton />
    </Layout>
  );
}
