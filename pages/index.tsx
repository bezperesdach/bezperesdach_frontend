import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicLayout = dynamic(() =>
  import("../components/layouts/unauthorized-user-layout/unauthorized-user-layout").then((mod) => mod)
);
import { Main } from "../components/home-page/main/main";
const DynamicService = dynamic(() => import("../components/home-page/service/service").then((mod) => mod.Service));
const DynamicGuarantees = dynamic(() => import("../components/home-page/guarantees/guarantees").then((mod) => mod.Guarantees));
const DynamicWork = dynamic(() => import("../components/home-page/work/work").then((mod) => mod.Work));
const DynamicBonus = dynamic(() => import("../components/home-page/bonus/bonus").then((mod) => mod.Bonus));
const DynamicContact = dynamic(() => import("../components/home-page/contact/contact").then((mod) => mod.Contact));

import { ScrollTopButton } from "../components/scroll-to-top-button/scroll-to-top-button";

// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <DynamicLayout>
      <Head>
        <title>Безпересдач</title>
        <meta property="og:site_name" content="Безпересдач" />
        <meta name="description" content="Онлайн-платформа для помощи в обучении" />
        <meta property="og:description" content="Онлайн-платформа для помощи в обучении" />
        <meta property="og:image" content="/og_logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />
      <DynamicService />
      <DynamicGuarantees />
      <DynamicWork />
      <DynamicBonus />
      <DynamicContact />
      <ScrollTopButton />
    </DynamicLayout>
  );
}
