import { UnauthorizedUserLayout } from "../../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../../components/seo/seo";
import { Garantees } from "./components/garantees/garantees/garantees";
import dynamic from "next/dynamic";
const DynamicContact = dynamic(() => import("../../components/home-page/contact/contact").then((mod) => mod.Contact));

export default function Information() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Гарантии от команды Безпересдач"
        description="Команда безпересдач очень ответственно относится к качеству выполненных работ. Нам важен каждый отзыв о дипломной работе, поэтому мы дорожим репутацией"
        url={"https://bezperesdach.ru/price"}
        keywords={
          "заказать контрольную работу, где заказать курсовую, курсовые работы +на заказ недорого, сколько стоит курсовая работа +на заказ, где заказать контрольную, купить курсовую работу +на заказ недорого, заказать качественную курсовую, заказать курсовую недорого +и быстро, стоимость курсовой работы +на заказ, купить реферат цена, курсовые дипломные работы +на заказ, купить реферат срочно, где купить реферат, сколько стоит курсовая работа цена, реферат купить онлайн, помощь +с контрольными работами онлайн"
        }
      />

      <Garantees />
      <DynamicContact />
    </UnauthorizedUserLayout>
  );
}
