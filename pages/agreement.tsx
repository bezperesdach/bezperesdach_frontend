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
      />

      <Agreement />
    </UnauthorizedUserLayout>
  );
}
