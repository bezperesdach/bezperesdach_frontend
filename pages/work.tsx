import React from "react";
import dynamic from "next/dynamic";

import Layout from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
const DynamicBecomeWorkerForm = dynamic(() =>
  import("../components/forms/become-worker-form/become-worker-form").then((mod) => mod.BecomeWorkerForm)
);

export default function Order() {
  return (
    <Layout>
      <DynamicBecomeWorkerForm />
    </Layout>
  );
}
