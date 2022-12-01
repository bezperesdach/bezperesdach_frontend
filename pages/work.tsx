import React from "react";
import dynamic from "next/dynamic";
import { RECAPTCHA_SITE_KEY } from "../utils/recaptcha";

import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
const DynamicBecomeWorkerForm = dynamic(() =>
  import("../components/forms/become-worker-form/become-worker-form").then((mod) => mod.BecomeWorkerForm)
);
const DynamicGoogleReCaptchaProvider = dynamic(() => import("react-google-recaptcha-v3").then((mod) => mod.GoogleReCaptchaProvider));

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
      />

      <Advantages />
      <Offer />
      <DynamicGoogleReCaptchaProvider
        reCaptchaKey={RECAPTCHA_SITE_KEY}
        scriptProps={{
          async: false, // optional, default to false,
          defer: true, // optional, default to false
          appendTo: "body", // optional, default to "head", can be "head" or "body",
          nonce: undefined,
        }}
      >
        <DynamicBecomeWorkerForm />
      </DynamicGoogleReCaptchaProvider>

      <Contact />
    </UnauthorizedUserLayout>
  );
}
