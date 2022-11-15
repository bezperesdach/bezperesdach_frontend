import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import Head from "next/head";
import { getOrderDescription } from "../utils/form/new-order-form";

import { NewOrderForm } from "../components/forms/new-order-form/new-order-form";

export default function Order({ pt }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Head>
        <title>Заказать работу</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:site_name" content="Безпересдач" />
        {pt ? (
          <>
            <meta name="description" content={getOrderDescription(pt)} />
            <meta property="og:description" content={getOrderDescription(pt)} />
          </>
        ) : (
          <>
            <meta name="description" content="Сделать заказ работы" />
            <meta property="og:description" content="Сделать заказ работы" />
          </>
        )}
        <meta property="og:image" content="/og_logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewOrderForm projectType={pt} />
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
