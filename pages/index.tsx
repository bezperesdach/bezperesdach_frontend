import dynamic from "next/dynamic";

const DynamicLayout = dynamic(() =>
  import("../components/layouts/unauthorized-user-layout/unauthorized-user-layout").then((mod) => mod)
);

import { Main } from "../components/home-page/main/main";
const DynamicService = dynamic(() => import("../components/home-page/service/service").then((mod) => mod.Service));
const DynamicGuarantees = dynamic(() => import("../components/home-page/guarantees/guarantees").then((mod) => mod.Guarantees));
const DynamicWork = dynamic(() => import("../components/home-page/work/work").then((mod) => mod.Work));
const DynamicBonus = dynamic(() => import("../components/home-page/bonus/bonus").then((mod) => mod.Bonus));
const DynamicContact = dynamic(() => import("../components/home-page/contact/contact").then((mod) => mod.Contact));

import { ScrollTopButton } from "../components/scroll-to-top-button/scroll-to-top-button";
import { SEO } from "../components/seo/seo";

// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <DynamicLayout>
      <SEO
        title="Безпересдач - онлайн-проект для помощи в учёбе"
        description="Наша команда поможет с написанием курсовых, дипломных, рефератов и многих других работ!"
        url="https://bezperesdach.ru"
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ"
        }
      />

      <Main />
      <DynamicService />
      <DynamicGuarantees />
      <DynamicWork />
      <DynamicBonus />
      <DynamicContact />
      <ScrollTopButton />
    </DynamicLayout>
  );
}
