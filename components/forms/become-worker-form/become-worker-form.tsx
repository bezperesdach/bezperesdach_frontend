import React, { useState } from "react";
import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Button } from "../../button/button";
import Link from "next/link";
import Portal from "../../portal/portal";
import { ym } from "../../../utils/yandex-metrika";
import Reaptcha from "reaptcha";
import { RECAPTCHA_SITE_KEY } from "../../../utils/recaptcha";
import { getErrorMessage, showAndHideError } from "../../../utils/utils";
import axios from "axios";
import useInterval from "react-useinterval";

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
  const recaptchaRef = React.useRef<Reaptcha>(null);

  const [newWorker, setNewWorker] = useState({
    loading: false,
    error: false,
    isModal: false,
    errorText: "",
  });

  const [processing, setProcessing] = useState(false); // condition for recaptchaRef.current.executeAsync() being called
  const [showed, setShowed] = useState(false); // condition for challenge showed

  //handle reCaptcha cancel
  useInterval(
    () => {
      const iframes = document.querySelectorAll('iframe[src*="recaptcha/api2/bframe"]');
      if (iframes.length === 0) return;
      const recaptchaOverlay = iframes[0].parentNode?.parentNode as HTMLElement;
      if (recaptchaOverlay) {
        if (processing && recaptchaOverlay.style.visibility === "visible") setShowed(true);
        if (processing && recaptchaOverlay.style.visibility === "hidden" && showed) {
          setProcessing(false);
          setShowed(false);

          setNewWorker((prevState) => {
            return { ...prevState, loading: false };
          });
          formik.setSubmitting(false);
        }
      }
    },
    processing ? 100 : null
  );

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: UserSchema,
    onSubmit: () => {
      setNewWorker((prevState) => {
        return { ...prevState, loading: true };
      });

      setProcessing(true);

      try {
        recaptchaRef.current?.execute();
      } catch (err) {
        if (err === "This recaptcha instance did not render yet") {
          setProcessing(false);
          formik.setSubmitting(false);
          showAndHideError(
            () =>
              setNewWorker((prevState) => {
                return { ...prevState, loading: false, error: true, errorText: "Неверная капча" };
              }),
            () =>
              setNewWorker((prevState) => {
                return { ...prevState, loading: false, error: false, errorText: "" };
              }),
            5000
          );
        }
      }
    },
  });

  const closeModal = () => {
    formik.resetForm();
    setNewWorker((prevState) => {
      return { ...prevState, isModal: false };
    });
  };

  const onCaptchaVerify = async (captchaCode: string | null) => {
    if (captchaCode === null) {
      showAndHideError(
        () =>
          setNewWorker((prevState) => {
            return { ...prevState, loading: false, error: true, errorText: "Капча устарела, повторите попытку" };
          }),
        () =>
          setNewWorker((prevState) => {
            return { ...prevState, loading: false, error: false, errorText: "" };
          }),
        5000
      );

      setProcessing(false);
      formik.setSubmitting(false);
      recaptchaRef.current?.reset();

      return;
    }

    setProcessing(false);

    try {
      const data = axios
        .post("/api/new-worker", {
          order: formik.values,
          captcha: captchaCode,
        })
        .then((res) => res.data);

      const response = await data;

      if (response === "OK") {
        setNewWorker((prevState) => {
          return { ...prevState, loading: false, isModal: true };
        });

        ym("reachGoal", "newWorkerSuccess");
      } else {
        const error = await response;
        throw new Error(error);
      }
    } catch (error) {
      ym("reachGoal", "newWorkerError");
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
      formik.setSubmitting(false);
      recaptchaRef.current?.reset();
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
              <Reaptcha
                size="invisible"
                ref={recaptchaRef}
                hl="ru"
                sitekey={RECAPTCHA_SITE_KEY}
                onVerify={onCaptchaVerify}
                badge="inline"
                theme="dark"
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
              <Button type="button" color="#fff" onClick={closeModal}>
                Закрыть
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
