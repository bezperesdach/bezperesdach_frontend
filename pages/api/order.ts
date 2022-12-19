import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "../../api/api";
import { verifyRecaptcha } from "../../utils/recaptcha";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "30MB",
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;

  if (method === "POST") {
    try {
      if (!headers.token) {
        return res.status(422).json({
          message: "Форма не заполнена",
        });
      }

      const response = await verifyRecaptcha(headers.token as string);

      if (response.success) {
        const orderRes = await createOrder(req, response.score);

        if (orderRes.ok) {
          return res.status(200).send("OK");
        } else {
          return res.status(500).send({ error: true, msg: "Не удалось отправить на сервер" });
        }
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
