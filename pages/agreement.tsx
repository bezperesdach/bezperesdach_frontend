import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../components/seo/seo";
import { Agreement } from "../components/about-us-page/agreement/agreement";

export default function Information() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title='Пользовательское соглашение сервиса  "Без пересдач"'
        description='Команда "Без пересдач" заботится о конфиденциальности каждого клиента'
        url={"https://bezperesdach.ru/about_us/agreement"}
        keywords={
          "купить курсовую,купить диплом,где заказать курсовую работу,заказать готовую работу,дипломы курсовые на заказ,заказать научную статью,контрольные работы на заказ,заказать перевод с английского на русский,написать статью на заказ, безпересдач, без пересдач"
        }
      />

      <Agreement />
    </UnauthorizedUserLayout>
  );
}
