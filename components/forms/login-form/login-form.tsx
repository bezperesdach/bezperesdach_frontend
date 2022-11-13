import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../button/button";
import { authenticateUser } from "../../../api/api";

import styles from "../form.module.css";

interface IValues {
  login: string;
  password: string;
  rememberMe: boolean;
}

const initialValue: IValues = {
  login: "",
  password: "",
  rememberMe: false,
};

const UserSchema = Yup.object().shape({
  login: Yup.string().required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

export const LoginForm = () => {
  const [authentication, setAuthentication] = useState({
    loading: false,
    error: false,
    errorText: "",
  });
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={UserSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        authenticateUser(
          { identifier: values.login, password: values.password },
          () => {
            setAuthentication((prevState) => {
              return { ...prevState, loading: true };
            });
          },
          () => {
            setAuthentication((prevState) => {
              return { ...prevState, loading: false };
            });
            resetForm();
            setSubmitting(false);
          },
          (err) => {
            setAuthentication((prevState) => {
              return { ...prevState, loading: false, error: true, errorText: `${err}` };
            });
            setSubmitting(false);
          },
          () => {
            setAuthentication((prevState) => {
              return { ...prevState, error: false, errorText: "" };
            });
          }
        );
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.form_item}>
            <label className={styles.label}>Логин</label>
            <div className={styles.input_container}>
              <Field className={styles.input} type="text" name="login" placeholder="Логин" disabled={isSubmitting} />
            </div>
            <ErrorMessage className={styles.error_label} name="login" component="div" />
          </div>

          <div className={styles.form_item}>
            <label className={styles.label}>Пароль</label>
            <div className={styles.input_container}>
              <Field className={styles.input} type="password" name="password" placeholder="Пароль" disabled={isSubmitting} />
            </div>
            <ErrorMessage className={styles.error_label} name="password" component="div" />
          </div>

          <label className={styles.label_checkbox}>
            <Field type="checkbox" name="rememberMe" />
            Запомнить меня
          </label>

          <div className={styles.submit_button_container}>
            {authentication.error && <p className={styles.submit_error}>{authentication.errorText}</p>}
            <Button
              type="submit"
              color="#fff"
              disabled={isSubmitting}
              loading={authentication.loading}
              style={{ alignSelf: "center" }}
              error={authentication.error}
            >
              Войти
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
