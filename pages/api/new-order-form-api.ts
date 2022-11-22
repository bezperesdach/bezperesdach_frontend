import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "../../api/api";

const captchaSuccess = process.env.NODE_ENV === "development" ? false : true;
const hostname =
  process.env.NODE_ENV === "development"
    ? "dummy-key-pass"
    : process.env.CONTEXT === "preview"
    ? process.env.DEPLOY_PRIME_URL
    : "bezperesdach.ru";

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
        .post(
          "https://hcaptcha.com/siteverify",
          {
            response: captcha,
            secret: process.env.HCAPTCHA_SECRET_KEY,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
          }
        )
        .then((res) => res.data);

      const captchaValidation = await data;

      if (captchaValidation.success === captchaSuccess && captchaValidation.hostname === hostname) {
        await createOrder(order);

        return res.status(200).send("OK");
      }

      return res.status(422).json({
        message: "Неверная каптча",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: "Что-то пошло не так, повторите отправку" });
    }
  }
  return res.status(404).send("Not found");
}
