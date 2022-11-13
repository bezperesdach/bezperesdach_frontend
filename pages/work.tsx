import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
const DynamicBecomeWorkerForm = dynamic(() =>
  import("../components/forms/become-worker-form/become-worker-form").then((mod) => mod.BecomeWorkerForm)
);

import { Advantages } from "../components/work-page/advantages/advantages";
import { Offer } from "../components/work-page/offer/offer";
import { Contact } from "../components/home-page/contact/contact";

export default function Order() {
  return (
    <Layout>
      <Head>
        <title>Безпересдач</title>
        <meta name="description" content="Cтать автором" />
        <meta property="og:description" content="Вакансии Безпересдач" />
        <meta property="og:site_name" content="Безпересдач" />
        <meta property="og:image" content="/og_logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Advantages />
      <DynamicBecomeWorkerForm />
      <Offer />
      <Contact />
    </Layout>
  );
}
