import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { Prices } from "../components/price-page/prices/prices";
import { SEO } from "../components/seo/seo";

export default function Price() {
  return (
    <Layout>
      <SEO
        title="Цены и услуги - Безпересдач"
        description="Команда безпересдач изучила рынок и теперь знает какие цены нужны каждому студенту. Спешите - на первый заказ мы дарим 10% скидку"
        url={"https://bezperesdach.ru/price"}
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ, безпересдач, без пересдач"
        }
      />

      <Prices />
    </Layout>
  );
}
