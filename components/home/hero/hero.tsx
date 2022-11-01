import React, { useState } from "react";
import ym from "react-yandex-metrika";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import heroImage from "public/images/hero.svg";

import { Button } from "../../button/button";
import { ProjectTypeSelect } from "./components/project-type-field/project-type-field";
import { createOrder } from "../../../api/api";

import styles from "./hero.module.css";
import Portal from "../../portal/portal";

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
  antiPlagiarism: "Бесплатная",
  email: "",
  expectedPrice: "",
};

const RequestProjectSchema = Yup.object().shape({
  projectType: Yup.string().required("Обязательное поле"),
  subject: Yup.string().required("Обязательное поле"),
  projectName: Yup.string().required("Обязательное поле"),
  dueDate: Yup.string().required("Обязательное поле"),
  originality: Yup.string().required("Обязательное поле"),
  antiPlagiarism: Yup.string().required("Обязательное поле"),
  email: Yup.string().email("Неверный email").required("Обязательное поле"),
});

const typeOptionsInit = [
  { value: "Дипломная работа", label: "Дипломная работа" },
  { value: "Бизнес-план", label: "Бизнес-план" },
  { value: "Доклад", label: "Доклад" },
  { value: "Докторская диссертация", label: "Докторская диссертация" },
  { value: "Кандидатская диссертация", label: "Кандидатская диссертация" },
  { value: "Кейсы", label: "Кейсы" },
  { value: "Консультация", label: "Консультация" },
  { value: "Контрольная работа", label: "Контрольная работа" },
  { value: "Курсовая работа", label: "Курсовая работа" },
  { value: "Лабораторная работа", label: "Лабораторная работа" },
  { value: "Магистерская работа", label: "Магистерская работа" },
  { value: "Методические инструкции", label: "Магистерская инструкции" },
  { value: "Монография", label: "Монография" },
  { value: "НИР", label: "НИР" },
  { value: "Онлайн помощь", label: "Онлайн помощь" },
  { value: "Ответы на билеты", label: "Ответы на билеты" },
  { value: "Отчет по практике", label: "Отчет по практике" },
  { value: "Перевод с иностранного языка", label: "Перевод с иностранного языка" },
  { value: "Повышение оригинальности", label: "Повышение оригинальности" },
  { value: "Подбор литературы", label: "Подбор литературы" },
  { value: "Подготовка к экзамену", label: "Подготовка к экзамену" },
  { value: "Поиск информации", label: "Поиск информации" },
  { value: "Презентация", label: "Презентация" },
  { value: "Программирование", label: "Программирование" },
  { value: "Реферат", label: "Реферат" },
  { value: "Рецензия", label: "Рецензия" },
  { value: "Сочинение", label: "Сочинение" },
  { value: "Статья", label: "Статья" },
  { value: "Тесты", label: "Тесты" },
  { value: "Чертеж", label: "Чертеж" },
  { value: "Эссе", label: "Эссе" },
  { value: "Другое", label: "Другое" },
];

const antiPlagiarismOptions = [
  { value: "Бесплатная", label: "Бесплатная" },
  { value: "Платная", label: "Платная" },
];

// TODO maybe use multiple different method of contacting user
// const contactOptions = [
//   { value: "Telegram", label: "Telegram" },
//   { value: "Whatsapp", label: "Whatsapp" },
//   { value: "Vk", label: "Vk" },
//   { value: "Email", label: "Email" },
//   { value: "Facebook", label: "Facebook" },
// ];

export const Hero = () => {
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
      <div className={styles["form-container"]}>
        <div className={styles.hero}>
          <h1 className={styles["hero-title"]}>Онлайн-платформа для помощи в учебе</h1>
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
                <div className={styles["email-type"]}>
                  <div className={styles["form-item"]} id={styles["form-item-email"]}>
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

                    <ErrorMessage className={styles["error-label"]} name="email" component="div" />
                  </div>

                  <div className={styles["form-item"]} id={styles["form-item-type"]}>
                    <label className={styles.label}>Тип работы *</label>
                    <Field
                      name="projectType"
                      options={typeOptions}
                      component={ProjectTypeSelect}
                      borderRadius={15}
                      placeholder="Выберите тип"
                      isMulti={false}
                      filterOption={() => true}
                      onInputChange={(e: string) => filterAllOptions(e)}
                      disabled={isSubmitting}
                    />

                    <ErrorMessage className={styles["error-label"]} name="projectType" component="div" />
                  </div>
                </div>

                <div className={styles["form-item"]}>
                  <label className={styles.label}>Предмет *</label>
                  <div className={styles["input-container"]}>
                    <Field className={styles.input} type="text" name="subject" placeholder="Предмет" disabled={isSubmitting} />
                  </div>
                  <ErrorMessage className={styles["error-label"]} name="subject" component="div" />
                </div>

                <div className={styles["form-item"]}>
                  <label className={styles.label}>Тема работы *</label>
                  <div className={styles["input-container"]}>
                    <Field
                      className={styles.input}
                      type="text"
                      name="projectName"
                      placeholder="Как должна называться ваша работа"
                      disabled={isSubmitting}
                    />
                  </div>
                  <ErrorMessage className={styles["error-label"]} name="projectName" component="div" />
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
                      placeholder="Небольшое описание работы"
                      id={styles["form-item-description-textarea"]}
                      disabled={isSubmitting}
                    />
                  </div>
                  <ErrorMessage className={styles["error-label"]} name="description" component="div" />
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
                      <ErrorMessage className={styles["error-label"]} name="dueDate" component="div" />
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
                      <ErrorMessage className={styles["error-label"]} name="originality" component="div" />
                    </div>
                  </div>

                  <div className={styles["form-item"]} id={styles["form-item-anti-plagiarism"]}>
                    <label className={styles.label}>Проверка *</label>
                    <Field
                      name="antiPlagiarism"
                      options={antiPlagiarismOptions}
                      component={ProjectTypeSelect}
                      borderRadius={15}
                      placeholder="Тип проверки"
                      isMulti={false}
                      isSearchable={false}
                      disabled={isSubmitting}
                    />

                    <ErrorMessage className={styles["error-label"]} name="antiPlagiarism" component="div" />
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
                      placeholder="Пожелания по цене"
                      disabled={isSubmitting}
                    />
                  </div>
                  <ErrorMessage className={styles["error-label"]} name="expectedPrice" component="div" />
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
          <Image className={styles.image} src={heroImage} priority={true} alt="hero" />
        </div>
        {sendOrder.isModal && (
          <Portal>
            <div className={styles["modal-overlay"]}>
              <div className={styles.modal}>
                <h1>Заявка успешно оставлена!</h1>
                <p>Мы скоро свяжемся с вами!</p>
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