import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { becomeWorker } from "../../api/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { worker, captcha } = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if ((worker && Object.keys(worker).length === 0 && Object.getPrototypeOf(worker) === Object.prototype) || !captcha) {
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
        await becomeWorker(worker);

        return res.status(200).send("OK");
      }

      return res.status(422).json({
        message: "Неверная Капча",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: "Что-то пошло не так, повторите отправку" });
    }
  }
  return res.status(404).send("Not found");
}
