import dynamic from "next/dynamic";

import { Main } from "../components/home-page/main/main";
import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../components/seo/seo";

const AboutUsHomePageDynamic = dynamic(() =>
  import("../components/home-page/about-us-home-page/about-us-home-page").then((mod) => mod.AboutUsHomePage)
);
const DynamicOurAdvantages = dynamic(() =>
  import("../components/home-page/our-advantages/our-advantages").then((mod) => mod.OurAdvantages)
);
const DynamicOrderProcess = dynamic(() =>
  import("../components/home-page/order-process/order-process").then((mod) => mod.OrderProcess)
);
const DynamicWork = dynamic(() => import("../components/home-page/work/work").then((mod) => mod.Work));
const DynamicBonus = dynamic(() => import("../components/home-page/bonus/bonus").then((mod) => mod.Bonus));
const DynamicContact = dynamic(() => import("../components/home-page/contact/contact").then((mod) => mod.Contact));

// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Безпересдач - онлайн-проект для помощи в учёбе"
        description="Команда “Без пересдач” поможет написать дипломную, курсовую и множество других работ, проведет консультацию и подготовит к успешной сдачи!"
        url="https://bezperesdach.ru"
      />

      <Main />
      <AboutUsHomePageDynamic />
      <DynamicOurAdvantages />
      <DynamicOrderProcess />
      <DynamicWork />
      <DynamicBonus />
      <DynamicContact />
    </UnauthorizedUserLayout>
  );
}
