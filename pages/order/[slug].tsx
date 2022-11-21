import React from "react";
import dynamic from "next/dynamic";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { RECAPTCHA_SITE_KEY } from "../../utils/recaptcha";

import { UnauthorizedUserLayout } from "../../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { descriptionValueLabel, getOrderDescription } from "../../utils/form/new-order-form";
import { SEO } from "../../components/seo/seo";
import { NewOrderForm } from "../../components/forms/new-order-form/new-order-form";
const DynamicGoogleReCaptchaProvider = dynamic(() => import("react-google-recaptcha-v3").then((mod) => mod.GoogleReCaptchaProvider));

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export default function Order({ slug }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Сделать заказ - Безпересдач - онлайн-проект помощи в учёбе"
        description={getOrderDescription(slug)}
        url={`https://bezperesdach.ru/order/${slug}`}
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ, безпересдач, без пересдач"
        }
      >
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
      </SEO>

      <DynamicGoogleReCaptchaProvider
        reCaptchaKey={RECAPTCHA_SITE_KEY}
        scriptProps={{
          async: false, // optional, default to false,
          defer: true, // optional, default to false
          appendTo: "body", // optional, default to "head", can be "head" or "body",
          nonce: undefined,
        }}
      >
        <NewOrderForm />
      </DynamicGoogleReCaptchaProvider>
    </UnauthorizedUserLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = Array.from(descriptionValueLabel).map(([slug]) => {
    return { params: { slug } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  return {
    props: { slug },
  };
};
