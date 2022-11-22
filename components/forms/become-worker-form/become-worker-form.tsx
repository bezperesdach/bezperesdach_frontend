import React, { useState } from "react";
import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Button } from "../../button/button";
import Link from "next/link";
import Portal from "../../portal/portal";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { HCAPTCHA_SITE_KEY } from "../../../utils/hcaptcha";
import { getErrorMessage, showAndHideError } from "../../../utils/utils";
import axios from "axios";

import styles from "./become-worker-form.module.css";
import { ym } from "../../../utils/yandex-metrika";

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
  const hcaptchaRef = React.useRef<HCaptcha>(null);

  const [newWorker, setNewWorker] = useState({
    loading: false,
    error: false,
    isModal: false,
    errorText: "",
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: UserSchema,
    onSubmit: () => {
      setNewWorker((prevState) => {
        return { ...prevState, loading: true };
      });

      hcaptchaRef.current?.execute();
    },
  });

  const onCaptchaClose = () => {
    setNewWorker((prevState) => {
      return { ...prevState, loading: false };
    });
    hcaptchaRef.current?.resetCaptcha();
  };

  const onCaptchaVerify = async (captchaCode: string) => {
    if (!captchaCode) {
      showAndHideError(
        () =>
          setNewWorker((prevState) => {
            return { ...prevState, loading: false, error: true, errorText: "Каптча устарела, повторите попытку" };
          }),
        () =>
          setNewWorker((prevState) => {
            return { ...prevState, loading: false, error: false, errorText: "" };
          }),
        5000
      );

      return;
    }

    try {
      const response = await axios({
        method: "post",
        url: "/api/new-worker",
        data: {
          worker: formik.values,
          captcha: captchaCode,
        },
      });

      if (response.statusText === "OK") {
        setNewWorker((prevState) => {
          return { ...prevState, loading: false, isModal: true };
        });
        formik.resetForm();
        formik.setSubmitting(false);
        ym("reachGoal", "orderCreateSuccess");
      } else {
        const error = await response.data;
        throw new Error(error);
      }
    } catch (error) {
      formik.setSubmitting(false);
      ym("reachGoal", "orderCreateError");
      showAndHideError(
        () =>
          setNewWorker((prevState) => {
            return { ...prevState, loading: false, error: true, errorText: getErrorMessage(error) };
          }),
        () =>
          setNewWorker((prevState) => {
            return { ...prevState, loading: false, error: false, errorText: "" };
          }),
        5000
      );
    } finally {
      hcaptchaRef.current?.resetCaptcha();
    }
  };

  return (
    <>
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
              <HCaptcha
                id="test-captcha"
                size="invisible"
                ref={hcaptchaRef}
                sitekey={HCAPTCHA_SITE_KEY}
                onVerify={onCaptchaVerify}
                onClose={onCaptchaClose}
              />
            </div>
          </div>
        </Form>
      </FormikProvider>
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
