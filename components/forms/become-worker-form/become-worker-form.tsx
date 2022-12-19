import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Button } from "../../button/button";
import { ym } from "../../../utils/yandex-metrika";
import { RecaptchaDisclaimer } from "../components/recaptcha-disclaimer/recaptcha-disclaimer";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { showAndHideError } from "../../../utils/utils";
const DynamicModalRequest = dynamic(() =>
  import("../../portal/components/modal-request/modal-request").then((mod) => mod.ModalRequest)
);

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
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [newWorker, setNewWorker] = useState({
    loading: false,
    error: false,
    isModal: false,
    errorText: "",
  });

  const closeModal = () => {
    formik.resetForm();
    setNewWorker((prevState) => {
      return { ...prevState, isModal: false };
    });
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: UserSchema,
    onSubmit: (values) => formSubmit(values),
  });

  const formSubmit = useCallback(
    async (values: IValues) => {
      if (!executeRecaptcha) {
        formik.setSubmitting(false);
        return;
      }

      setNewWorker((prevState) => {
        return { ...prevState, loading: true };
      });

      try {
        const token = await executeRecaptcha();
        if (!token) {
          showAndHideError(
            () =>
              setNewWorker((prevState) => {
                return { ...prevState, loading: false, error: true, errorText: "Произошла ошибка при отправке, попробуйте еще раз" };
              }),
            () =>
              setNewWorker((prevState) => {
                return { ...prevState, loading: false, error: false, errorText: "" };
              }),
            5000
          );
          return;
        }

        const result = await fetch("/api/new-worker", {
          method: "post",
          body: JSON.stringify({ worker: values, token }),
        });

        if (result.ok) {
          ym("reachGoal", "newWorkerSuccess");

          setNewWorker((prevState) => {
            return { ...prevState, loading: false, isModal: true };
          });
          return;
        }

        ym("reachGoal", "newWorkerError");

        showAndHideError(
          () =>
            setNewWorker((prevState) => {
              return {
                ...prevState,
                loading: false,
                error: true,
                errorText: "Произошла непредвиденная ошибка",
              };
            }),
          () =>
            setNewWorker((prevState) => {
              return { ...prevState, loading: false, error: false, errorText: "" };
            }),
          5000
        );
      } catch (error) {
        console.log(error);
        ym("reachGoal", "newWorkerError");
        showAndHideError(
          () =>
            setNewWorker((prevState) => {
              return {
                ...prevState,
                loading: false,
                error: true,
                errorText: "Произошла ошибка при отправке, попробуйте еще раз",
              };
            }),
          () =>
            setNewWorker((prevState) => {
              return { ...prevState, loading: false, error: false, errorText: "" };
            }),
          5000
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [executeRecaptcha]
  );

  return (
    <FormikProvider value={formik}>
      <Form className={`${styles.form} noValidate ${styles.form_background_work}`}>
        <div className={styles.form_work}>
          <div className={styles.form_item}>
            <label className={styles.headline}>Ваше имя *</label>
            <div className={styles.input_container}>
              <Field
                className={styles.input}
                type="text"
                name="name"
                placeholder="Как к вам обращаться?"
                disabled={formik.isSubmitting}
              />
            </div>
            <ErrorMessage className={styles.error_label} name="name" component="div" />
          </div>

          <div className={styles.form_item}>
            <label className={styles.headline}>Email *</label>
            <div className={styles.input_container}>
              <Field
                className={styles.input}
                type="email"
                name="email"
                placeholder="example@example.ru"
                disabled={formik.isSubmitting}
              />
            </div>
            <ErrorMessage className={styles.error_label} name="email" component="div" />
          </div>

          <div className={styles.submit_button_container}>
            {newWorker.error && <p className={styles.submit_error}>{newWorker.errorText}</p>}
            <Button
              type="submit"
              color="#fff"
              disabled={formik.isSubmitting}
              loading={newWorker.loading}
              style={{ alignSelf: "center" }}
              error={newWorker.error}
            >
              Отправить
            </Button>
            <RecaptchaDisclaimer color="rgb(255 255 255 / 80%)" />
          </div>
        </div>
      </Form>

      <DynamicModalRequest shouldShow={newWorker.isModal} handleClose={closeModal} email="work@bezperesdach.ru" />
    </FormikProvider>
  );
};
