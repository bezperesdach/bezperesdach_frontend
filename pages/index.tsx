import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { Guarantees } from "../components/home/guarantees/guarantees";
import { Hero } from "../components/home/hero/hero";
import { Services } from "../components/home/services/services";
import { About } from "../components/home/about/about";
import { Represents } from "../components/home/represents/represents";
import { Preparation } from "../components/home/preparation/preparation";
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
        <Hero projectType={pt} />
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
