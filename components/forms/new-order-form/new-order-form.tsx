import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import Hero from "public/assets/images/hero/hero.webp";
import FallbackHero from "public/assets/images/hero/fallback-hero.png";

import { Button } from "../../button/button";
import { ReactSelector } from "../components/react-selector/react-selector";
import { ym } from "../../../utils/yandex-metrika";
import Portal from "../../portal/portal";
import { antiPlagiarismOptions, getInitValue, getOrderTypeLabel, typeOptionsInit } from "../../../utils/form/new-order-form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { HCAPTCHA_SITE_KEY } from "../../../utils/hcaptcha";
import { getErrorMessage, showAndHideError } from "../../../utils/utils";
import axios from "axios";

import styles from "../form.module.css";

const nextWeek = () => {
  const now = new Date();
  const twoWeeks = new Date(now.getTime() + 13 * 24 * 60 * 60 * 1000);
  return twoWeeks;
};

const initialValue: IOrder = {
  projectType: "",
  subject: "",
  projectName: "",
  description: "",
  dueDate: nextWeek().toLocaleDateString("en-CA"),
  originality: "45%",
  antiPlagiarism: "free",
  email: "",
  expectedPrice: "",
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const RequestProjectSchema = Yup.object().shape({
  projectType: Yup.string().required("Обязательное поле"),
  subject: Yup.string().required("Обязательное поле"),
  dueDate: Yup.date().required("Обязательное поле").min(today, "Дата сдачи не может быть в прошлом"),
  originality: Yup.string().required("Обязательное поле"),
  antiPlagiarism: Yup.string().required("Обязательное поле"),
  email: Yup.string().email("Неверный email").required("Обязательное поле"),
});

interface Props {
  projectType?: string;
}

export const NewOrderForm = ({ projectType }: Props) => {
  const hcaptchaRef = React.useRef<HCaptcha>(null);

  const router = useRouter();

  if (projectType) {
    initialValue.projectType = getInitValue(projectType);
  } else {
    initialValue.projectType = "";
  }

  const onCaptchaClose = () => {
    setSendOrder((prevState) => {
      return { ...prevState, loading: false };
    });
    hcaptchaRef.current?.resetCaptcha();
  };

  const onCaptchaVerify = async (captchaCode: string) => {
    if (!captchaCode) {
      showAndHideError(
        () =>
          setSendOrder((prevState) => {
            return { ...prevState, loading: false, error: true, errorText: "Каптча устарела, повторите попытку" };
          }),
        () =>
          setSendOrder((prevState) => {
            return { ...prevState, loading: false, error: false, errorText: "" };
          }),
        5000
      );

      return;
    }

    try {
      const response = await axios({
        method: "post",
        url: "/api/new-order-form-api",
        data: {
          order: formik.values,
          captcha: captchaCode,
        },
      });

      if (response.statusText === "OK") {
        setSendOrder((prevState) => {
          return { ...prevState, loading: false, isModal: true };
        });
        formik.resetForm();
        formik.setSubmitting(false);
        ym("reachGoal", "orderCreateSuccess");
        if (router.pathname !== "new") {
          router.replace(
            {
              pathname: "new",
            },
            undefined,
            { shallow: true }
          );
        }
      } else {
        const error = await response.data;
        throw new Error(error);
      }
    } catch (error) {
      formik.setSubmitting(false);
      ym("reachGoal", "orderCreateError");
      showAndHideError(
        () =>
          setSendOrder((prevState) => {
            return { ...prevState, loading: false, error: true, errorText: getErrorMessage(error) };
          }),
        () =>
          setSendOrder((prevState) => {
            return { ...prevState, loading: false, error: false, errorText: "" };
          }),
        5000
      );
    } finally {
      hcaptchaRef.current?.resetCaptcha();
    }
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: RequestProjectSchema,
    onSubmit: () => {
      setSendOrder((prevState) => {
        return { ...prevState, loading: true };
      });

      hcaptchaRef.current?.execute();
    },
  });

  const [sendOrder, setSendOrder] = useState({
    loading: false,
    isModal: false,
    error: false,
    errorText: "",
  });

  const [typeOptions, setTypeOptions] = useState(typeOptionsInit);

  const filterAllOptions = (rawInput: string) => {
    const filteredOptions = typeOptionsInit.filter((option) => option.label.toLowerCase().includes(rawInput.toLowerCase()));

    if (filteredOptions.length === 0) {
      filteredOptions.push({ value: "Другое", label: "Другое" });
    }

    setTypeOptions(filteredOptions);
  };

  return (
    <FormikProvider value={formik}>
      <section className={styles.hero}>
        <div className={styles.form_container}>
          <div className={styles.hero}>
            <h1 className={styles.hero_title}>{getOrderTypeLabel(formik.values.projectType)}</h1>

            <Form className={styles.form} noValidate>
              <div className={styles.email_type}>
                <div className={styles.form_item} id={styles.form_item_email}>
                  <label className={styles.label}>Email *</label>
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

                <div className={styles.form_item} id={styles.form_item_type}>
                  <label className={styles.label}>Тип работы *</label>
                  <Field
                    name="projectType"
                    options={typeOptions}
                    component={ReactSelector}
                    borderRadius={15}
                    placeholder="Укажите тип"
                    isMulti={false}
                    filterOption={() => true}
                    onInputChange={(e: string) => filterAllOptions(e)}
                    onItemSelected={(item: string) => {
                      router.replace(
                        {
                          pathname: item,
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                    disabled={formik.isSubmitting}
                  />

                  <ErrorMessage className={styles.error_label} name="projectType" component="div" />
                </div>
              </div>

              <div className={styles.form_item}>
                <label className={styles.label}>Предмет *</label>
                <div className={styles.input_container}>
                  <Field
                    className={styles.input}
                    type="text"
                    name="subject"
                    placeholder="Укажите предмет"
                    disabled={formik.isSubmitting}
                  />
                </div>
                <ErrorMessage className={styles.error_label} name="subject" component="div" />
              </div>

              <div className={styles.form_item}>
                <label className={styles.label}>Тема работы</label>
                <div className={styles.input_container}>
                  <Field
                    className={styles.input}
                    type="text"
                    name="projectName"
                    placeholder="Укажите тему работы"
                    disabled={formik.isSubmitting}
                  />
                </div>
                <ErrorMessage className={styles.error_label} name="projectName" component="div" />
              </div>

              <div className={styles.form_item}>
                <label className={styles.label}>Дополнительное описание</label>
                <div className={styles.input_container}>
                  <Field
                    className={styles.input}
                    type="text"
                    component="textarea"
                    rows="7"
                    name="description"
                    placeholder="Укажите детали к работе: необходимый объем, оформление, требования от преподавателя"
                    id={styles.form_item_description_textarea}
                    disabled={formik.isSubmitting}
                  />
                </div>
                <ErrorMessage className={styles.error_label} name="description" component="div" />
              </div>

              <div className={styles.date_orig}>
                <div className={styles.date_orig_container}>
                  <div className={styles.form_item} id={styles.form_item_due_date}>
                    <label className={styles.label}>Дата сдачи *</label>
                    <div className={styles.input_container}>
                      <Field
                        className={styles.input}
                        type="date"
                        name="dueDate"
                        placeholder="Когда нужно сдать работу"
                        disabled={formik.isSubmitting}
                      />
                    </div>
                    <ErrorMessage className={styles.error_label} name="dueDate" component="div" />
                  </div>

                  <div className={styles.form_item} id={styles.form_item_originality}>
                    <label className={styles.label}>Антиплагиат *</label>
                    <div className={styles.input_container}>
                      <Field
                        className={styles.input}
                        type="text"
                        pattern="\d*"
                        name="originality"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value.trim().replace(/[^0-9]/gi, "");
                          if (value === "" || value === "0") {
                            return formik.setFieldValue("originality", "");
                          }
                          if (value.length >= 3) {
                            return;
                          }
                          return formik.setFieldValue("originality", `${value}%`);
                        }}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === "Backspace") {
                            formik.setFieldValue("originality", formik.values.originality.slice(0, -1));
                          }
                        }}
                        placeholder="Оригинальность"
                        disabled={formik.isSubmitting}
                        data-value="originality"
                      />
                    </div>
                    <ErrorMessage className={styles.error_label} name="originality" component="div" />
                  </div>
                </div>

                <div className={styles.form_item} id={styles.form_item_anti_plagiarism}>
                  <label className={styles.label}>Проверка *</label>
                  <Field
                    name="antiPlagiarism"
                    options={antiPlagiarismOptions}
                    component={ReactSelector}
                    borderRadius={15}
                    placeholder="Тип проверки"
                    isMulti={false}
                    isSearchable={false}
                    disabled={formik.isSubmitting}
                  />

                  <ErrorMessage className={styles.error_label} name="antiPlagiarism" component="div" />
                </div>
              </div>

              <div className={styles.form_item} id={styles.form_item_due_date}>
                <label className={styles.label}>Пожелания по цене</label>
                <div className={styles.input_container}>
                  <Field
                    className={styles.input}
                    type="text"
                    pattern="\d*"
                    name="expectedPrice"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.trim().replace(/[^0-9]/gi, "");
                      if (value === "" || value === "0") {
                        return formik.setFieldValue("expectedPrice", "");
                      }
                      return formik.setFieldValue("expectedPrice", `${value}₽`);
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Backspace") {
                        formik.setFieldValue("expectedPrice", formik.values.expectedPrice.slice(0, -1));
                      }
                    }}
                    placeholder="Укажите пожелания по цене"
                    disabled={formik.isSubmitting}
                  />
                </div>
                <ErrorMessage className={styles.error_label} name="expectedPrice" component="div" />
              </div>

              <div className={styles.submit_button_container}>
                {sendOrder.error && <p className={styles.submit_error}>{sendOrder.errorText}</p>}
                <Button
                  type="submit"
                  color="#fff"
                  disabled={formik.isSubmitting}
                  loading={sendOrder.loading}
                  style={{ alignSelf: "center" }}
                  error={sendOrder.error}
                >
                  Отправить запрос
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
            </Form>
          </div>
          <div className={styles.image_container}>
            <Image
              src={Hero}
              placeholder="blur"
              className={styles.image}
              alt="hero"
              onError={(e) => (e.currentTarget.src = FallbackHero.src)}
            />
          </div>
          {sendOrder.isModal && (
            <Portal>
              <div className={styles.modal_overlay}>
                <div className={styles.modal}>
                  <h1>Заявка отправлена!</h1>
                  <p>Совсем скоро мы напишем вам на почту (не забудьте проверить папку &quot;спам&quot;) чтобы уточнить все детали</p>
                  <p>
                    Если у вас возникли какие-то вопросы, пишите нам на{" "}
                    <Link
                      href="mailto:help@bezperesdach.ru?subject=%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BC%D0%BD%D0%B5"
                      style={{ color: "#3D8EE8" }}
                    >
                      help@bezperesdach.ru
                    </Link>
                  </p>
                  <Button
                    type="button"
                    color="#fff"
                    onClick={() =>
                      setSendOrder((prevState) => {
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
        </div>
      </section>
    </FormikProvider>
  );
};
