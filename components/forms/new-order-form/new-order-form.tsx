import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "usehooks-ts";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

import Image from "next/image";
import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import Hero from "public/assets/images/hero/hero.webp";
import FallbackHero from "public/assets/images/hero/fallback-hero.png";

import { Button } from "../../button/button";
const DynamicReactSelector = dynamic(() => import("../components/react-selector/react-selector").then((mod) => mod.ReactSelector));
import { ym } from "../../../utils/yandex-metrika";
const DynamicModalRequest = dynamic(() =>
  import("../../portal/components/modal-request/modal-request").then((mod) => mod.ModalRequest)
);
import { antiPlagiarismOptions, getInitValue, getOrderTypeLabel, typeOptionsInit } from "../../../utils/form/new-order-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { showAndHideError } from "../../../utils/utils";
import axios from "axios";
import { RecaptchaDisclaimer } from "../components/recaptcha-disclaimer/recaptcha-disclaimer";
import { PromoCodeStatus } from "./components/promo-code-status/promo-code-status";

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
  promoCode: "",
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

export const NewOrderForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const router = useRouter();

  const closeModal = () => {
    formik.resetForm();
    const promo = router.query.promo as string;

    if (router.pathname !== "new") {
      router.replace(
        {
          pathname: "/order/new",
          query: {
            promo,
          },
        },
        undefined,
        { shallow: true }
      );
    }

    formik.setFieldValue("promoCode", promo ?? "");

    setSendOrder((prevState) => {
      return { ...prevState, isModal: false };
    });
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: RequestProjectSchema,
    onSubmit: (values) => formSubmit(values),
  });

  const [foundPromoCode, setFoundPromoCode] = useState({
    show: false,
    found: false,
  });

  const debouncedPromoCode = useDebounce<string>(formik.values.promoCode, 950);

  useEffect(() => {
    async function fetchPromoCode() {
      const slug = router.query.slug as string;

      try {
        const result = await axios(`/api/promo-codes?promo=${debouncedPromoCode}`);

        if (result.data === "OK") {
          setFoundPromoCode({ show: true, found: true });
          router.replace(
            {
              pathname: "/order/[slug]",
              query: {
                slug,
                promo: debouncedPromoCode,
              },
            },
            undefined,
            { shallow: true }
          );
        } else {
          setFoundPromoCode({ show: true, found: false });
          router.replace(
            {
              pathname: "/order/[slug]",
              query: {
                slug,
              },
            },
            undefined,
            { shallow: true }
          );
        }
      } catch (error) {
        setFoundPromoCode({ show: true, found: false });
        router.replace(
          {
            pathname: "/order/[slug]",
            query: {
              slug,
            },
          },
          undefined,
          { shallow: true }
        );
      }
    }

    if (debouncedPromoCode !== "") {
      fetchPromoCode();
    } else {
      setFoundPromoCode({ show: false, found: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPromoCode]);

  const formSubmit = useCallback(
    async (values: IOrder) => {
      if (!executeRecaptcha) {
        formik.setSubmitting(false);
        return;
      }

      setSendOrder((prevState) => {
        return { ...prevState, loading: true };
      });

      try {
        const token = await executeRecaptcha();
        if (!token) {
          showAndHideError(
            () =>
              setSendOrder((prevState) => {
                return { ...prevState, loading: false, error: true, errorText: "Произошла ошибка при отправке, попробуйте еще раз" };
              }),
            () =>
              setSendOrder((prevState) => {
                return { ...prevState, loading: false, error: false, errorText: "" };
              }),
            5000
          );
          return;
        }

        const result = await axios.post("/api/new-order", {
          order: values,
          token: token,
        });

        if (result.data) {
          ym("reachGoal", "orderCreateSuccess");

          setSendOrder((prevState) => {
            return { ...prevState, loading: false, isModal: true };
          });
        }
      } catch (error) {
        console.log(error);
        ym("reachGoal", "orderCreateError");
        showAndHideError(
          () =>
            setSendOrder((prevState) => {
              return {
                ...prevState,
                loading: false,
                error: true,
                errorText: "Произошла ошибка при отправке, попробуйте еще раз",
              };
            }),
          () =>
            setSendOrder((prevState) => {
              return { ...prevState, loading: false, error: false, errorText: "" };
            }),
          5000
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [executeRecaptcha]
  );

  useEffect(() => {
    const slug = router.query.slug as string;
    const promo = router.query.promo as string;

    formik.setFieldValue("projectType", slug !== "new" ? getInitValue(slug) : "");
    if (promo) {
      formik.setFieldValue("promoCode", promo);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const [sendOrder, setSendOrder] = useState({
    loading: false,
    isModal: false,
    error: false,
    errorText: "",
  });

  const errorText = useMemo(() => {
    if (sendOrder.errorText) {
      return sendOrder.errorText;
    }
    if (!formik.isValid) {
      return "В каком-то из полей ошибка";
    }
    return "";
  }, [formik.isValid, sendOrder.errorText]);

  const [typeOptions, setTypeOptions] = useState(typeOptionsInit);

  const filterAllOptions = (rawInput: string) => {
    const filteredOptions = typeOptionsInit.filter((option) => option.label.toLowerCase().includes(rawInput.toLowerCase()));

    if (filteredOptions.length === 0) {
      filteredOptions.push({ value: "other", label: "Другое" });
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
                    component={DynamicReactSelector}
                    borderRadius={15}
                    placeholder="Укажите тип"
                    isMulti={false}
                    filterOption={() => true}
                    onInputChange={(e: string) => filterAllOptions(e)}
                    onItemSelected={(item: string) => {
                      const promo = router.query.promo as string;
                      router.replace(
                        {
                          pathname: "/order/[slug]",
                          query: promo
                            ? {
                                slug: item,
                                promo,
                              }
                            : { slug: item },
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
                    component={DynamicReactSelector}
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

              <div className={styles.form_item}>
                <label className={styles.label}>Промокод</label>
                <div className={styles.input_container}>
                  <Field
                    className={styles.input}
                    type="text"
                    name="promoCode"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Укажите промокод"
                    disabled={formik.isSubmitting}
                  />
                </div>
                <PromoCodeStatus show={foundPromoCode.show} found={foundPromoCode.found} />
              </div>

              <div className={styles.submit_button_container}>
                {errorText && <p className={styles.submit_error}>{errorText}</p>}
                <Button type="submit" color="#fff" disabled={formik.isSubmitting} loading={sendOrder.loading} error={sendOrder.error}>
                  Отправить запрос
                </Button>
                <RecaptchaDisclaimer />
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
          <AnimatePresence>
            {sendOrder.isModal && (
              <DynamicModalRequest
                handleClose={() =>
                  setSendOrder((prevState) => {
                    return { ...prevState, isModal: false };
                  })
                }
                email="help@bezperesdach.ru"
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </FormikProvider>
  );
};
