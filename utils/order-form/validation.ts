import { string, date, object } from "yup";

const nextWeek = () => {
  const now = new Date();
  const twoWeeks = new Date(now.getTime() + 13 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  return twoWeeks;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export const initialValues: IOrder = {
  contactType: "email",
  contact: "",
  projectType: "",
  subject: "",
  projectName: "",
  description: "",
  dueDate: "",
  originality: "45%",
  antiPlagiarism: "free",
  expectedPrice: "",
  promoCode: "",
  media: null,
};

export const orderSchema = object().shape({
  projectType: string().required("Обязательное поле"),
  dueDate: date().required("Обязательное поле").min(today, "Дата сдачи не может быть в прошлом"),
  contactType: string().required("Обязательное поле"),
});

export const extendOrderSchema = (contactType: string) => {
  switch (contactType) {
    case "email":
      return orderSchema.shape({
        contact: string().email("Неверный email").required("Обязательное поле"),
      });
    case "telegram":
      return orderSchema.shape({
        contact: string().required("Обязательное поле"),
      });
    case "whatsapp":
      return orderSchema.shape({
        contact: string()
          .min(10, "Неправильно набран номер: слишком короткий")
          .max(14, "Неправильно набран номер: слишком длинный")
          .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/g, "Неправильно набран номер")
          .required("Обязательное поле"),
      });
    case "viber":
      return orderSchema.shape({
        contact: string()
          .min(10, "Неправильно набран номер: слишком короткий")
          .max(14, "Неправильно набран номер: слишком длинный")
          .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/g, "Неправильно набран номер")
          .required("Обязательное поле"),
      });
    case "vk":
      return orderSchema.shape({
        contact: string().url("Неверная ссылка").required("Обязательное поле"),
      });
    default:
      return orderSchema.shape({
        contact: string().email("Неверный email").required("Обязательное поле"),
      });
  }
};

export const getContactPlaceholder = (contactType: string) => {
  switch (contactType) {
    case "email":
      return "example@example.ru";
    case "telegram":
      return "example или +798765432100";
    case "whatsapp":
      return "+798765432100";
    case "viber":
      return "+798765432100";
    case "vk":
      return "https://vk.com/example";
    default:
      return "example@example.ru";
  }
};

export const getContactLabel = (contactType: string) => {
  switch (contactType) {
    case "email":
      return "Email *";
    case "telegram":
      return "Логин или номер телефона *";
    case "whatsapp":
      return "Номер телефона *";
    case "viber":
      return "Номер телефона *";
    case "vk":
      return "Ссылка на профиль *";
    default:
      return "Email *";
  }
};
