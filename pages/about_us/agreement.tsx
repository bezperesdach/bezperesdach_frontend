import { UnauthorizedUserLayout } from "../../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../../components/seo/seo";
import { Agreement } from "../../components/about-us-page/agreement/agreement";

export default function Information() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Цены и услуги - Безпересдач"
        description="Команда безпересдач изучила рынок и теперь знает какие цены нужны каждому студенту. Спешите - на первый заказ мы дарим 10% скидку"
        url={"https://bezperesdach.ru/price"}
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ, безпересдач, без пересдач"
        }
      />

      <Agreement />
    </UnauthorizedUserLayout>
  );
}
