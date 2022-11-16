import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { Prices } from "../components/price-page/prices/prices";
import { SEO } from "../components/seo/seo";

export default function Price() {
  return (
    <Layout>
      <SEO
        title="Цены и услуги"
        description="Команда безпересдач изучила рынок и теперь знает какие цены нужны каждому студенту. Спешите - на первый заказ мы дарим 10% скидку"
        url={"https://bezperesdach.ru/price"}
        keywords={"Курсовая, Дипломная, Докторская, "}
      />

      <Prices />
    </Layout>
  );
}
