import React from "react";
import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../components/seo/seo";

export default function AboutUs() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="О нас - Безпересдач"
        description=""
        url={"https://bezperesdach.ru/about_us"}
        keywords={"безпересдач, безпересдач отзывы, кто такие безпересдач, что такое безпересдач, без пересдач, безпересдач сайт"}
      />
    </UnauthorizedUserLayout>
  );
}
