import React from "react";
import dynamic from "next/dynamic";

import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
const DynamicBecomeWorkerForm = dynamic(() =>
  import("../components/forms/become-worker-form/become-worker-form").then((mod) => mod.BecomeWorkerForm)
);

import { Advantages } from "../components/work-page/advantages/advantages";
import { Offer } from "../components/work-page/offer/offer";
import { Contact } from "../components/home-page/contact/contact";
import { SEO } from "../components/seo/seo";

export default function Work() {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Стать автором - Безпересдач"
        description="Как зарабатывать не выходя из дома? Стань автором на Безпересдач! Получай стабильный заработок удаленно, помогай студентам и делай мир лучше!"
        url={"https://bezperesdach.ru/work"}
        keywords={
          "подработка преподавателем,подработка учителем онлайн,онлайн подработка в интернете,подработка для студентов удаленно,дополнительный заработок онлайн,подработка в интернете на дому в свободное,подработка в интернете удаленно"
        }
      />

      <Advantages />
      <Offer />
      <DynamicBecomeWorkerForm />
      <Contact />
    </UnauthorizedUserLayout>
  );
}
