import { string, date, object } from "yup";

const nextWeek = () => {
  const now = new Date();
  const twoWeeks = new Date(now.getTime() + 13 * 24 * 60 * 60 * 1000);
  return twoWeeks;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export const initialValues: IOrder = {
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

export const orderSchema = object().shape({
  projectType: string().required("Обязательное поле"),
  dueDate: date().required("Обязательное поле").min(today, "Дата сдачи не может быть в прошлом"),
  email: string().email("Неверный email").required("Обязательное поле"),
});
