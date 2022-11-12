import Head from "next/head";
import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

import Layout from "../components/layout/layout";
import { Main } from "../components/home-page/main/main";
import { Service } from "../components/home-page/service/service";
import { Guarantees } from "../components/home-page/guarantees/guarantees";
import { Work } from "../components/home-page/work/work";
import { Bonus } from "../components/home-page/bonus/bonus";

import { typeOptionsOrder } from "../utils/form/new-order-form";

import styles from "../styles/Home.module.css";

export default function Home({ pt }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
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

      <Main />
      <Service />
      <Guarantees />
      <Work />
      <Bonus />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader("Cache-Control", "public, s-maxage=31536000, stale-while-revalidate=59");

  const { pt } = context.query;

  return {
    props: { pt: pt ?? null },
  };
};
