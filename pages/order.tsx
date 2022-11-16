import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { getOrderDescription } from "../utils/form/new-order-form";
import { SEO } from "../components/seo/seo";

const DynamicNewOrderForm = dynamic(() => import("../components/forms/new-order-form/new-order-form").then((mod) => mod.NewOrderForm));

export default function Order({ pt }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <SEO
        title="Сделать заказ - Безпересдач - онлайн-проект помощи в учёбе"
        description={
          pt
            ? getOrderDescription(pt)
            : "У нас вы можете заказать помощь в выполнении дипломной, курсовой, реферата и множества других работ"
        }
        url={pt ? `https://bezperesdach.ru/order?pt=${pt}` : "https://bezperesdach.ru/order"}
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ, безпересдач, без пересдач"
        }
      >
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
      </SEO>

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
