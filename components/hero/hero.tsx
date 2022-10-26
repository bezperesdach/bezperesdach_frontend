import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ProjectTypeSelect } from "./components/project-type-field/project-type-field";

import styles from "./hero.module.css";
import { Button } from "../button/button";

interface IFields {
  projectType: string;
  projectName: string;
  dueDate: string;
  originality: string;
  description: string;
}

const nextWeek = () => {
  const now = new Date();
  const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  return twoWeeks;
};

const initialValue: IFields = {
  projectType: "",
  projectName: "",
  dueDate: nextWeek().toLocaleDateString("en-CA"),
  originality: "70%",
  description: "",
};

const RequestProjectSchema = Yup.object().shape({
  projectType: Yup.string().required("Обязательное поле"),
  projectName: Yup.string().required("Обязательное поле"),
  dueDate: Yup.string().required("Обязательное поле"),
  originality: Yup.string().required("Обязательное поле"),
});

const options = [
  { value: "Вкр", label: "Вкр" },
  { value: "Дипломная работа", label: "Дипломная работа" },
  { value: "Хд", label: "Хд" },
];

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles["hero-title"]}>Онлайн-платформа для помощи в учебе</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={RequestProjectSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className={styles.form} noValidate>
            <div className={styles["form-item"]}>
              <label className={styles.label}>Тип работы</label>
              <Field
                name="projectType"
                options={options}
                component={ProjectTypeSelect}
                borderRadius={15}
                placeholder="Выберите тип"
                isMulti={false}
                disabled={isSubmitting}
              />

              <ErrorMessage className={styles["error-label"]} name="projectType" component="div" />
            </div>

            <div className={styles["form-item"]}>
              <label className={styles.label}>Название работы</label>
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

            <div className={styles["date-orig"]}>
              <div className={styles["form-item"]}>
                <label className={styles.label}>Дата сдачи</label>
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

              <div className={styles["form-item"]}>
                <label className={styles.label}>Оригинальность</label>
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
                  disabled={isSubmitting}
                />
              </div>
              <ErrorMessage className={styles["error-label"]} name="description" component="div" />
            </div>

            <Button type="submit" disabled={isSubmitting} style={{ alignSelf: "center" }}>
              Отправить запрос
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
