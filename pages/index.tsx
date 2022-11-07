import Head from "next/head";
import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

const DynamicHero = dynamic(() => import("../components/home-page/hero/hero").then((mod) => mod.Hero));
import { About } from "../components/home-page/about/about";
import { Services } from "../components/home-page/services/services";
import { Guarantees } from "../components/home-page/guarantees/guarantees";
import { Represents } from "../components/home-page/represents/represents";
import { Preparation } from "../components/home-page/preparation/preparation";

// const DynamicAbout = dynamic(() => import("../components/home-page/about/about").then((mod) => mod.About));
// const DynamicServices = dynamic(() => import("../components/home-page/services/services").then((mod) => mod.Services));
// const DynamicGuarantees = dynamic(() => import("../components/home-page/guarantees/guarantees").then((mod) => mod.Guarantees));
// const DynamicRepresents = dynamic(() => import("../components/home-page/represents/represents").then((mod) => mod.Represents));
// const DynamicPreparations = dynamic(() => import("../components/home-page/preparation/preparation").then((mod) => mod.Preparation));

import { typeOptionsOrder } from "../utils/form/values";

import styles from "../styles/Home.module.css";

export default function Home({ pt }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Безпересдач</title>
        <meta property="og:site_name" content="Безпересдач" />
        {pt ? (
          <>
            <meta name="description" content={typeOptionsOrder.get(pt)} />
            <meta property="og:description" content={typeOptionsOrder.get(pt)} />
          </>
        ) : (
          <>
            <meta name="description" content="Онлайн-платформа для помощи в обучении" />
            <meta property="og:description" content="Онлайн-платформа для помощи в обучении" />
          </>
        )}
        <meta property="og:image" content="/og_logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicHero projectType={pt} />
        <About />
        <Services />
        <Guarantees />
        <Represents />
        <Preparation />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pt } = context.query;

  return {
    props: { pt: pt ?? null },
  };
};
