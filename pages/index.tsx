import dynamic from "next/dynamic";

import { Main } from "../components/home-page/main/main";
import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../components/seo/seo";

const DynamicService = dynamic(() => import("../components/home-page/service/service").then((mod) => mod.Service));
const DynamicGuarantees = dynamic(() => import("../components/home-page/guarantees/guarantees").then((mod) => mod.Guarantees));
const DynamicWork = dynamic(() => import("../components/home-page/work/work").then((mod) => mod.Work));
const DynamicBonus = dynamic(() => import("../components/home-page/bonus/bonus").then((mod) => mod.Bonus));
const DynamicContact = dynamic(() => import("../components/home-page/contact/contact").then((mod) => mod.Contact));
const DynamicScrollTopButton = dynamic(() =>
  import("../components/scroll-to-top-button/scroll-to-top-button").then((mod) => mod.ScrollTopButton)
);

// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Безпересдач - онлайн-проект для помощи в учёбе"
        description="Наша команда поможет написать дипломную, курсовую и множество других работ, проведет консультацию и подготовит к успешной сдачи!"
        url="https://bezperesdach.ru"
      />

      <Main />
      <DynamicService />
      <DynamicGuarantees />
      <DynamicWork />
      <DynamicBonus />
      <DynamicContact />
      <DynamicScrollTopButton />
    </UnauthorizedUserLayout>
  );
}
