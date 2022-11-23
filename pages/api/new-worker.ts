import { NextApiRequest, NextApiResponse } from "next";
import { becomeWorker } from "../../api/api";
import { verifyRecaptcha } from "../../utils/recaptcha";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  const { worker, token } = body;

  if (method === "POST") {
    if ((worker && Object.keys(worker).length === 0 && Object.getPrototypeOf(worker) === Object.prototype) || !token) {
      return res.status(422).json({
        message: "Форма не заполнена",
      });
    }

    try {
      const response = await verifyRecaptcha(token);

      if (response.data.success) {
        await becomeWorker({ ...worker, robotScore: response.data.score });

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
