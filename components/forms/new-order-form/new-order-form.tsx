import React, { useCallback, useMemo, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Image from "next/image";
import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";

import Hero from "public/assets/images/hero/hero.webp";
import FallbackHero from "public/assets/images/hero/fallback-hero.png";

import { Button } from "../../button/button";
const DynamicReactSelector = dynamic(() => import("../components/react-selector/react-selector").then((mod) => mod.ReactSelector));
import { ym } from "../../../utils/yandex-metrika";
const DynamicModalRequest = dynamic(() =>
  import("../../portal/components/modal-request/modal-request").then((mod) => mod.ModalRequest)
);
import {
  antiPlagiarismOptions,
  contactTypeOptions,
  getInitValue,
  getOrderTypeLabel,
  isAntiplagiatVisible,
  typeOptionsInit,
} from "../../../utils/order-form/form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { showAndHideError } from "../../../utils/utils";
import { RecaptchaDisclaimer } from "../components/recaptcha-disclaimer/recaptcha-disclaimer";
import { useAutosizeTextArea } from "../components/use-auto-text-aria/use-auto-text-aria";
import { initialValues, extendOrderSchema, getContactPlaceholder, getContactLabel } from "../../../utils/order-form/validation";

import styles from "../form.module.css";
import { PromoCodeField } from "./components/promo-code-field/promo-code-field";
const DynamicFilesFields = dynamic(() => import("./components/files-field/files-field").then((mod) => mod.FilesField));

// const additionalFieldsVariants = {
//   closed: { height: "0" },
//   open: { height: "100%" },
// };

export const NewOrderForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const additionalInfoRef = useRef<HTMLButtonElement>(null);

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [attachedFilesSize, setAttachedFilesSize] = useState(0);

  const handleClickOnShowAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };

  const router = useRouter();

  const closeModal = () => {
    formik.resetForm();

    const promo = router.query.promo as string;

    if (router.pathname !== "new") {
      const query = promo
        ? {
            promo,
          }
        : {};

      router.replace(
        {
          pathname: "/order/new",
          query,
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

  const [orderSchema, setOrderSchema] = useState(extendOrderSchema("email"));

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: orderSchema,
    onSubmit: (values) => formSubmit(values),
  });

  const formSubmit = useCallback(
    async (values: IOrder) => {
      if (!executeRecaptcha) {
        formik.setSubmitting(false);
        return;
      }

      if (attachedFilesSize / (1024 * 1024) > 20) {
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

        const data = new FormData();

        if (values.media) {
          for (let i = 0; i < values.media.length; i++) {
            data.append("files.media", values.media[i]);
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const clone = (({ media, ...o }) => o)(values);

        data.append("data", JSON.stringify(clone));

        const result = await fetch("/api/order", { method: "post", body: data, headers: { token } });

        if (result.ok) {
          ym("reachGoal", "orderCreateSuccess");

          setSendOrder((prevState) => {
            return { ...prevState, loading: false, isModal: true };
          });
        } else {
          const data = await result.json();
          ym("reachGoal", "orderCreateError");
          showAndHideError(
            () =>
              setSendOrder((prevState) => {
                return {
                  ...prevState,
                  loading: false,
                  error: true,
                  errorText: data && data.msg ? data.msg : "Произошла ошибка при отправке, попробуйте еще раз",
                };
              }),
            () =>
              setSendOrder((prevState) => {
                return { ...prevState, loading: false, error: false, errorText: "" };
              }),
            5000
          );
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
    [executeRecaptcha, attachedFilesSize]
  );

  useEffect(() => {
    const slug = router.query.slug as string;
    const promo = router.query.promo as string;

    if (slug !== "new") {
      formik.setFieldValue("projectType", getInitValue(slug));
    }

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
    if (formik.submitCount > 0 && !formik.isValid) {
      return "В каком-то из полей ошибка";
    }
    if (attachedFilesSize / (1024 * 1024) > 20) {
      return "Превышен максимальный размер файлов";
    }
    return "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.submitCount, formik.isValid, sendOrder.errorText, attachedFilesSize]);

  const [typeOptions, setTypeOptions] = useState(typeOptionsInit);

  const filterAllOptions = (rawInput: string) => {
    const filteredOptions = typeOptionsInit.filter((option) => option.label.toLowerCase().includes(rawInput.toLowerCase()));

    if (filteredOptions.length === 0) {
      filteredOptions.push({ value: "other", label: "Другое" });
    }

    setTypeOptions(filteredOptions);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, formik.values.description);

  const showAntiPlagiat = useMemo(() => {
    const slug = router.query.slug as string;
    if (isAntiplagiatVisible(slug)) {
      formik.values.originality = "45%";
      formik.values.antiPlagiarism = "free";
      return true;
    } else {
      formik.values.originality = "";
      formik.values.antiPlagiarism = "none";
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug]);

  const [contactLabel, setContactLabel] = useState("Email *");
  const [contactPlaceholder, setContactPlaceholder] = useState("example@example.ru");

  const changeContactType = (item: string) => {
    formik.values.contact = "";
    setContactLabel(getContactLabel(item));
    setContactPlaceholder(getContactPlaceholder(item));
    setOrderSchema(extendOrderSchema(item));
  };

  return (
    <FormikProvider value={formik}>
      <section className={styles.hero}>
        <div className={styles.form_container}>
          <div className={styles.hero}>
            <h1 className={styles.hero_title}>{getOrderTypeLabel(formik.values.projectType)}</h1>

            <Form noValidate>
              <div className={styles.form}>
                <div className={styles.form_item}>
                  <div className={styles.multi_item_row}>
                    <div className={styles.form_item} id={styles.form_item_contact_type}>
                      <label className={styles.label}>Тип связи</label>
                      <Field
                        name="contactType"
                        options={contactTypeOptions}
                        component={DynamicReactSelector}
                        borderRadius={15}
                        placeholder="Тип связи"
                        isMulti={false}
                        isSearchable={false}
                        onItemSelected={changeContactType}
                        disabled={formik.isSubmitting}
                      />
                    </div>

                    <div className={styles.form_item} id={styles.form_item_contact}>
                      <label className={styles.label}>{contactLabel}</label>
                      <div className={styles.input_container}>
                        <Field
                          className={styles.input}
                          type="text"
                          name="contact"
                          placeholder={contactPlaceholder}
                          disabled={formik.isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                  <ErrorMessage className={styles.error_label} name="contact" component="div" />
                </div>

                <div className={styles.form_item} id={styles.form_item_type}>
                  <label className={styles.label}>Тип работы *</label>
                  <Field
                    name="projectType"
                    options={typeOptions}
                    component={DynamicReactSelector}
                    borderRadius={15}
                    placeholder="Начните набирать..."
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

                <div className={styles.multi_item_row}>
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
                </div>

                <Field
                  className={styles.input}
                  router={router}
                  component={PromoCodeField}
                  type="text"
                  name="promoCode"
                  placeholder="Укажите промокод"
                  disabled={formik.isSubmitting}
                />

                <button
                  type="button"
                  className={styles.text_button}
                  onClick={handleClickOnShowAdditionalFields}
                  ref={additionalInfoRef}
                >
                  <p>Дополнительная информация</p>
                  <svg
                    // animate={{
                    //   rotate: showAdditionalFields ? 180 : 0,
                    // }}
                    style={showAdditionalFields ? { transform: "rotate(180deg)" } : {}}
                    height="20"
                    width="20"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                  </svg>
                </button>

                {showAdditionalFields && (
                  <div
                    className={styles.additional_fields}
                    // variants={additionalFieldsVariants}
                    // initial="closed"
                    // animate={showAdditionalFields ? "open" : "closed"}
                    // transition={{ type: "ease-in-out" }}
                  >
                    <div className={styles.form_item} id={styles.form_item_subject}>
                      <label className={styles.label}>Предмет</label>
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

                    {showAntiPlagiat && (
                      <div className={styles.multi_item_row}>
                        <div className={styles.form_item} id={styles.form_item_originality}>
                          <label className={styles.label}>Антиплагиат</label>
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

                        <div className={styles.form_item} id={styles.form_item_anti_plagiarism}>
                          <label className={styles.label}>Проверка</label>
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
                    )}

                    <div className={styles.form_item}>
                      <label className={styles.label}>Дополнительное описание</label>
                      <div className={styles.input_container}>
                        <Field
                          className={styles.input}
                          type="text"
                          component="textarea"
                          rows="4"
                          innerRef={textAreaRef}
                          name="description"
                          placeholder="Укажите детали к работе: необходимый объем, оформление, требования от преподавателя"
                          id={styles.form_item_description_textarea}
                          disabled={formik.isSubmitting}
                        />
                      </div>
                      <ErrorMessage className={styles.error_label} name="description" component="div" />
                    </div>

                    <Field
                      component={DynamicFilesFields}
                      type="file"
                      name="media"
                      accept=".pdf, .docx, .png, .jpg, .jpeg, .txt"
                      placeholder="Прикрепите дополнительные файлы"
                      totalSize={attachedFilesSize}
                      setTotalSize={setAttachedFilesSize}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                )}

                <div className={styles.submit_button_container}>
                  {errorText && <p className={styles.submit_error}>{errorText}</p>}
                  <Button type="submit" color="#fff" disabled={formik.isSubmitting} loading={sendOrder.loading} error={sendOrder.error}>
                    Отправить запрос
                  </Button>
                  <RecaptchaDisclaimer />
                </div>
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
          <DynamicModalRequest shouldShow={sendOrder.isModal} handleClose={closeModal} email="help@bezperesdach.ru" />
        </div>
      </section>
    </FormikProvider>
  );
};
