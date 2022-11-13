import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../button/button";
import { becomeWorker } from "../../../api/api";

import styles from "../form.module.css";

interface IValues {
  name: string;
  email: string;
}

const initialValue: IValues = {
  name: "",
  email: "",
};

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  email: Yup.string().email("Неверный email").required("Обязательное поле"),
});

export const BecomeWorkerForm = () => {
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
        becomeWorker(
          values,
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
            <label className={styles.label}>Ваше имя *</label>
            <div className={styles.input_container}>
              <Field className={styles.input} type="text" name="name" placeholder="Как к вам обращаться?" disabled={isSubmitting} />
            </div>
            <ErrorMessage className={styles.error_label} name="name" component="div" />
          </div>

          <div className={styles.form_item}>
            <label className={styles.label}>email *</label>
            <div className={styles.input_container}>
              <Field className={styles.input} type="email" name="email" placeholder="example@email.ru" disabled={isSubmitting} />
            </div>
            <ErrorMessage className={styles.error_label} name="email" component="div" />
          </div>

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
              Отправить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
