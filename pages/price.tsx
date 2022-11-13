import Head from "next/head";

import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { Prices } from "../components/price-page/prices/prices";

export default function Price() {
  return (
    <Layout>
      <Head>
        <title>Безпересдач</title>
        <meta name="description" content="Цены и услуги" />
        <meta property="og:description" content="Цены и услуги" />
        <meta property="og:site_name" content="Безпересдач" />
        <meta property="og:image" content="/og_logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Prices />
    </Layout>
  );
}
