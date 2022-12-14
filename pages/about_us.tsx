import dynamic from "next/dynamic";

import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../components/seo/seo";
import { AboutSite } from "../components/about-us-page/about-site/about-site";

const DynamicAboutUsHomePage = dynamic(() =>
  import("../components/home-page/about-us-home-page/about-us-home-page").then((mod) => mod.AboutUsHomePage)
);
const DynamicContact = dynamic(() => import("../components/home-page/contact/contact").then((mod) => mod.Contact));
const DynamicBonus = dynamic(() => import("../components/home-page/bonus/bonus").then((mod) => mod.Bonus));

export default function Information() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title='Подробнее о сервисе  "Без пересдач"'
        description="Не знаете сколько стоит курсовая работа? Обратитесь в “Без пересдач”. Наша команда работает с лучшими исполнителями по низким ценам"
        url={"https://bezperesdach.ru/about_us"}
      />

      <AboutSite />

      <DynamicAboutUsHomePage />
      <DynamicBonus />
      <DynamicContact />
    </UnauthorizedUserLayout>
  );
}
