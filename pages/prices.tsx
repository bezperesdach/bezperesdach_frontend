import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { Prices } from "../components/price-page/prices/prices";
import { SEO } from "../components/seo/seo";

export default function Price() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Цены и услуги - Безпересдач"
        description="Команда “Без пересдач” изучила рынок и теперь знает какие цены нужны каждому студенту. Спешите - на первый заказ мы дарим 10% скидку"
        url={"https://bezperesdach.ru/price"}
      />

      <Prices />
    </UnauthorizedUserLayout>
  );
}
