import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

import Layout from "../components/layout/layout";
const DynamicNewOrderForm = dynamic(() => import("../components/forms/new-order-form/new-order-form").then((mod) => mod.NewOrderForm));

export default function Order({ pt }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <DynamicNewOrderForm projectType={pt} />
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
