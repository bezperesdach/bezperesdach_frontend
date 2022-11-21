import React from "react";
import dynamic from "next/dynamic";

import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../components/seo/seo";

// const DynamicBecomeWorkerForm = dynamic(() =>
//   import("../components/forms/become-worker-form/become-worker-form").then((mod) => mod.BecomeWorkerForm)
// );

// import { Advantages } from "../components/work-page/advantages/advantages";
// import { Offer } from "../components/work-page/offer/offer";
// import { Contact } from "../components/home-page/contact/contact";

export default function Work() {
  return (
    <Layout>
      <SEO
        title="О нас - Безпересдач"
        description=""
        url={"https://bezperesdach.ru/about_us"}
        keywords={"безпересдач, безпересдач отзывы, кто такие безпересдач, что такое безпересдач, без пересдач, безпересдач сайт"}
      />
    </Layout>
  );
}
