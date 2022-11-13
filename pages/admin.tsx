import React from "react";
import dynamic from "next/dynamic";
import Style from "styled-jsx/style";

const DynamicLoginForm = dynamic(() => import("../components/forms/login-form/login-form").then((mod) => mod.LoginForm));

import styles from "../styles/Admin.module.css";

const FullHeightPage = () => {
  return (
    <Style global jsx>{`
	html,
	body,
	body > div:first-child,
	div#__next,
	div#__next > div {
		height: 100%;
	}
`}</Style>
  );
};

export default function Admin() {
  return (
    <main className={styles.admin}>
      <div className={styles.login_form_container}>
        <DynamicLoginForm />
      </div>

      <FullHeightPage />
    </main>
  );
}
