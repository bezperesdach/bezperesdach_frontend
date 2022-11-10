import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import heroImage from "public/images/hero.svg";

import { Button } from "../../button/button";
import { ReactSelector } from "../components/react-selector/react-selector";
import { createOrder } from "../../../api/api";
import { ym } from "../../../utils/yandex-metrika";
import Portal from "../../portal/portal";
import { antiPlagiarismOptions, getInitValue, typeOptionsInit } from "../../../utils/form/new-order-form";

import styles from "./new-order-form.module.css";

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
  const router = useRouter();

  if (projectType) {
    initialValue.projectType = getInitValue(projectType);
  }

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
    <section className={styles.hero}>
      <div className={styles.form_container}>
        <div className={styles.hero}>
          <h1 className={styles.hero_title}>Онлайн-платформа для помощи в учебе</h1>
          <Formik
            initialValues={initialValue}
            validationSchema={RequestProjectSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              createOrder(
                values,
                () => {
                  setSendOrder((prevState) => {
                    return { ...prevState, loading: true };
                  });
                },
                () => {
                  setSendOrder((prevState) => {
                    return { ...prevState, loading: false, isModal: true };
                  });
                  resetForm();
                  setSubmitting(false);
                  ym("reachGoal", "orderCreateSuccess");
                  if (projectType) {
                    router.push("/");
                  }
                },
                (err) => {
                  setSendOrder((prevState) => {
                    return { ...prevState, loading: false, error: true, errorText: `${err}` };
                  });
                  setSubmitting(false);
                  ym("reachGoal", "orderCreateError");
                },
                () => {
                  setSendOrder((prevState) => {
                    return { ...prevState, loading: false, error: false, errorText: "" };
                  });
                }
              );
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className={styles.form} noValidate>
                <div className={styles.email_type}>
                  <div className={styles.form_item} id={styles.form_item_email}>
                    <label className={styles.label}>Email *</label>
                    <div className={styles["input-container"]}>
                      <Field
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        disabled={isSubmitting}
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
                      placeholder="Выберите тип"
                      isMulti={false}
                      filterOption={() => true}
                      onInputChange={(e: string) => filterAllOptions(e)}
                      disabled={isSubmitting}
                    />

                    <ErrorMessage className={styles.error_label} name="projectType" component="div" />
                  </div>
                </div>

                <div className={styles["form-item"]}>
                  <label className={styles.label}>Предмет *</label>
                  <div className={styles["input-container"]}>
                    <Field className={styles.input} type="text" name="subject" placeholder="Предмет" disabled={isSubmitting} />
                  </div>
                  <ErrorMessage className={styles.error_label} name="subject" component="div" />
                </div>

                <div className={styles["form-item"]}>
                  <label className={styles.label}>Тема работы</label>
                  <div className={styles["input-container"]}>
                    <Field
                      className={styles.input}
                      type="text"
                      name="projectName"
                      placeholder="Как должна называться ваша работа"
                      disabled={isSubmitting}
                    />
                  </div>
                  <ErrorMessage className={styles.error_label} name="projectName" component="div" />
                </div>

                <div className={styles["form-item"]}>
                  <label className={styles.label}>Дополнительное описание</label>
                  <div className={styles["input-container"]}>
                    <Field
                      className={styles.input}
                      type="text"
                      component="textarea"
                      rows="7"
                      name="description"
                      placeholder="В данном поле можно указать нужный объем работы, нужно ли оформление по ГОСТу, нужно ли оформление по требованиям ВУЗа или какие-либо другие важные замечания по работе"
                      id={styles["form-item-description-textarea"]}
                      disabled={isSubmitting}
                    />
                  </div>
                  <ErrorMessage className={styles.error_label} name="description" component="div" />
                </div>

                <div className={styles["date-orig"]}>
                  <div className={styles["date-orig-container"]}>
                    <div className={styles["form-item"]} id={styles["form-item-due-date"]}>
                      <label className={styles.label}>Дата сдачи *</label>
                      <div className={styles["input-container"]}>
                        <Field
                          className={styles.input}
                          type="date"
                          name="dueDate"
                          placeholder="Когда нужно сдать работу"
                          disabled={isSubmitting}
                        />
                      </div>
                      <ErrorMessage className={styles.error_label} name="dueDate" component="div" />
                    </div>

                    <div className={styles["form-item"]} id={styles["form-item-originality"]}>
                      <label className={styles.label}>Антиплагиат *</label>
                      <div className={styles["input-container"]}>
                        <Field
                          className={styles.input}
                          type="text"
                          pattern="\d*"
                          name="originality"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value.trim().replace(/[^0-9]/gi, "");
                            if (value === "" || value === "0") {
                              return setFieldValue("originality", "");
                            }
                            if (value.length >= 3) {
                              return;
                            }
                            return setFieldValue("originality", `${value}%`);
                          }}
                          onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === "Backspace") {
                              setFieldValue("originality", values.originality.slice(0, -1));
                            }
                          }}
                          placeholder="Оригинальность"
                          disabled={isSubmitting}
                          data-value="originality"
                        />
                      </div>
                      <ErrorMessage className={styles.error_label} name="originality" component="div" />
                    </div>
                  </div>

                  <div className={styles["form-item"]} id={styles["form-item-anti-plagiarism"]}>
                    <label className={styles.label}>Проверка *</label>
                    <Field
                      name="antiPlagiarism"
                      options={antiPlagiarismOptions}
                      component={ReactSelector}
                      borderRadius={15}
                      placeholder="Тип проверки"
                      isMulti={false}
                      isSearchable={false}
                      disabled={isSubmitting}
                    />

                    <ErrorMessage className={styles.error_label} name="antiPlagiarism" component="div" />
                  </div>
                </div>

                <div className={styles["form-item"]} id={styles["form-item-due-date"]}>
                  <label className={styles.label}>Пожелания по цене</label>
                  <div className={styles["input-container"]}>
                    <Field
                      className={styles.input}
                      type="text"
                      name="expectedPrice"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value.trim().replace(/[^0-9]/gi, "");
                        if (value === "" || value === "0") {
                          return setFieldValue("expectedPrice", "");
                        }
                        return setFieldValue("expectedPrice", `${value}₽`);
                      }}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Backspace") {
                          setFieldValue("expectedPrice", values.expectedPrice.slice(0, -1));
                        }
                      }}
                      placeholder="Укажите цифрами желаемую цену"
                      disabled={isSubmitting}
                    />
                  </div>
                  <ErrorMessage className={styles.error_label} name="expectedPrice" component="div" />
                </div>

                <div className={styles["submit-button-container"]}>
                  {sendOrder.error && <p className={styles["submit-error"]}>{sendOrder.errorText}</p>}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    loading={sendOrder.loading}
                    style={{ alignSelf: "center" }}
                    error={sendOrder.error}
                  >
                    Отправить запрос
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className={styles["image-container"]}>
          <Image className={styles.image} src={heroImage} alt="hero" />
        </div>
        {sendOrder.isModal && (
          <Portal>
            <div className={styles["modal-overlay"]}>
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
  );
};
