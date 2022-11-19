import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../button/button";
import { becomeWorker } from "../../../api/api";
import Link from "next/link";
import Portal from "../../portal/portal";

import styles from "./become-worker-form.module.css";

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
  const [newWorker, setNewWorker] = useState({
    loading: false,
    error: false,
    isModal: false,
    errorText: "",
  });
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={UserSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          becomeWorker(
            values,
            () => {
              setNewWorker((prevState) => {
                return { ...prevState, loading: true };
              });
            },
            () => {
              setNewWorker((prevState) => {
                return { ...prevState, loading: false, isModal: true };
              });
              resetForm();
              setSubmitting(false);
            },
            (err) => {
              setNewWorker((prevState) => {
                return { ...prevState, loading: false, error: true, errorText: `${err}` };
              });
              setSubmitting(false);
            },
            () => {
              setNewWorker((prevState) => {
                return { ...prevState, error: false, errorText: "" };
              });
            }
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form className={`${styles.form} noValidate ${styles.form_background_work}`}>
            <div className={styles.form_work}>
              <div className={styles.form_item}>
                <label className={styles.headline}>Ваше имя *</label>
                <div className={styles.input_container}>
                  <Field className={styles.input} type="text" name="name" placeholder="Как к вам обращаться?" disabled={isSubmitting} />
                </div>
                <ErrorMessage className={styles.error_label} name="name" component="div" />
              </div>

              <div className={styles.form_item}>
                <label className={styles.headline}>Email *</label>
                <div className={styles.input_container}>
                  <Field className={styles.input} type="email" name="email" placeholder="example@example.ru" disabled={isSubmitting} />
                </div>
                <ErrorMessage className={styles.error_label} name="email" component="div" />
              </div>

              <div className={styles.submit_button_container}>
                {newWorker.error && <p className={styles.submit_error}>{newWorker.errorText}</p>}
                <Button
                  type="submit"
                  color="#fff"
                  disabled={isSubmitting}
                  loading={newWorker.loading}
                  style={{ alignSelf: "center" }}
                  error={newWorker.error}
                >
                  Отправить
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {newWorker.isModal && (
        <Portal>
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <h1>Заявка отправлена!</h1>
              <p>Совсем скоро мы напишем вам на почту (не забудьте проверить папку &quot;спам&quot;) чтобы уточнить все детали</p>
              <p>
                Если у вас возникли какие-то вопросы, пишите нам на{" "}
                <Link
                  href="mailto:work@bezperesdach.ru?subject=%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BC%D0%BD%D0%B5"
                  style={{ color: "#3D8EE8" }}
                >
                  work@bezperesdach.ru
                </Link>
              </p>
              <Button
                type="button"
                color="#fff"
                onClick={() =>
                  setNewWorker((prevState) => {
                    return { ...prevState, isModal: false };
                  })
                }
              >
                Закрыть
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
