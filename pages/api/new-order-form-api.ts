import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "../../api/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { order, captcha } = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if ((order && Object.keys(order).length === 0 && Object.getPrototypeOf(order) === Object.prototype) || !captcha) {
      return res.status(422).json({
        message: "Форма не заполнена",
      });
    }

    try {
      const data = axios
        .post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
        })
        .then((res) => res.data);

      const captchaValidation = await data;

      if (captchaValidation.success) {
        await createOrder(order);

        return res.status(200).send("OK");
      }

      return res.status(422).json({
        message: "Неверная Капча",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: `Что-то пошло не так, повторите отправку: ${error}` });
    }
  }
  return res.status(404).send("Not found");
}
