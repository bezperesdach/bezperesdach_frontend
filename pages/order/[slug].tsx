import React from "react";
import dynamic from "next/dynamic";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { RECAPTCHA_SITE_KEY } from "../../utils/recaptcha";

import { UnauthorizedUserLayout } from "../../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { descriptionValueLabel, getOrderDescription, getProjectType } from "../../utils/order-form/form";
import { SEO } from "../../components/seo/seo";
import { NewOrderForm } from "../../components/forms/new-order-form/new-order-form";

const DynamicGoogleReCaptchaProvider = dynamic(() => import("react-google-recaptcha-v3").then((mod) => mod.GoogleReCaptchaProvider));

const AboutUsHomePageDynamic = dynamic(() =>
  import("../../components/home-page/about-us-home-page/about-us-home-page").then((mod) => mod.AboutUsHomePage)
);
const DynamicOurAdvantages = dynamic(() =>
  import("../../components/home-page/our-advantages/our-advantages").then((mod) => mod.OurAdvantages)
);
const DynamicOrderProcess = dynamic(() =>
  import("../../components/home-page/order-process/order-process").then((mod) => mod.OrderProcess)
);
const DynamicSecurePayment = dynamic(() =>
  import("../../components/home-page/secure-payment/secure-payment").then((mod) => mod.SecurePayment)
);
const DynamicContact = dynamic(() => import("../../components/home-page/contact/contact").then((mod) => mod.Contact));

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  slug: string;
}

export default function Order({ slug }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title={`${
          slug
            ? `${getProjectType(slug)} - Безпересдач - онлайн-проект помощи в учёбе`
            : "Оставить заявку - Безпересдач - онлайн-проект помощи в учёбе"
        }`}
        description={getOrderDescription(slug)}
        url={`https://bezperesdach.ru/order/${slug}`}
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

      <AboutUsHomePageDynamic />
      <DynamicOurAdvantages />
      <DynamicOrderProcess />
      <DynamicSecurePayment />
      <DynamicContact />
    </UnauthorizedUserLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = Array.from(descriptionValueLabel).map(([slug]) => {
    return { params: { slug } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { slug } = context.params as IParams;

  return {
    props: { slug },
  };
};
