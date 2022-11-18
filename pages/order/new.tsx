import React from "react";
import dynamic from "next/dynamic";

import Layout from "../../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../../components/seo/seo";

const DynamicNewOrderForm = dynamic(() =>
  import("../../components/forms/new-order-form/new-order-form").then((mod) => mod.NewOrderForm)
);

export default function Order() {
  return (
    <Layout>
      <SEO
        title="Сделать заказ - Безпересдач - онлайн-проект помощи в учёбе"
        description={"У нас вы можете заказать помощь в выполнении дипломной, курсовой, реферата и множества других работ"}
        url="https://bezperesdach.ru/order/new"
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ, безпересдач, без пересдач"
        }
      >
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
      </SEO>

      <DynamicNewOrderForm />
    </Layout>
  );
}
