import dynamic from "next/dynamic";
import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../components/seo/seo";
import { Guarantees } from "../components/about-us-page/guarantees/guarantees";

const DynamicOrderProcess = dynamic(() =>
  import("../components/home-page/order-process/order-process").then((mod) => mod.OrderProcess)
);
const DynamicSecurePayment = dynamic(() =>
  import("../components/home-page/secure-payment/secure-payment").then((mod) => mod.SecurePayment)
);
const DynamicContact = dynamic(() => import("../components/home-page/contact/contact").then((mod) => mod.Contact));
const DynamicBonus = dynamic(() => import("../components/home-page/bonus/bonus").then((mod) => mod.Bonus));

export default function GuaranteesPage() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Гарантии от команды Безпересдач"
        description="Команда “Без пересдач” очень ответственно относится к качеству выполненных работ. Нам важен каждый отзыв о дипломной работе, поэтому мы дорожим репутацией"
        url={"https://bezperesdach.ru/price"}
      />

      <Guarantees />
      <DynamicOrderProcess />
      <DynamicSecurePayment />
      <DynamicBonus />
      <DynamicContact />
    </UnauthorizedUserLayout>
  );
}
