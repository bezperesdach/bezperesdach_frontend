import React from "react";
import dynamic from "next/dynamic";

import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
const DynamicBecomeWorkerForm = dynamic(() =>
  import("../components/forms/become-worker-form/become-worker-form").then((mod) => mod.BecomeWorkerForm)
);

import { Advantages } from "../components/work-page/advantages/advantages";
import { Offer } from "../components/work-page/offer/offer";
import { Contact } from "../components/home-page/contact/contact";
import { SEO } from "../components/seo/seo";

export default function Work() {
  return (
    <Layout>
      <SEO
        title="Стать автором"
        description="Как зарабатывать не выходя из дома? Стать автором на Безпересдач! Получай стабильный заработок и помогай студентам!"
        url={"https://bezperesdach.ru/work"}
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ, безпересдач, без пересдач"
        }
      />

      <Advantages />
      <Offer />
      <DynamicBecomeWorkerForm />
      <Contact />
    </Layout>
  );
}
