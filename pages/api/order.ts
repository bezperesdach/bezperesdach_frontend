import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "../../api/api";
import { Writable } from "stream";
import { verifyRecaptcha } from "../../utils/recaptcha";
import FormData from "form-data";
import formidable from "formidable";

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 30000000,
  maxFieldsSize: 10000000,
  maxFields: 20,
  allowEmptyFiles: false,
  multiples: true,
};

function formidablePromise(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((accept, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return accept({ fields, files });
    });
  });
}

const fileConsumer = <T = unknown>(acc: T[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk);
      next();
    },
  });

  return writable;
};

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "50MB",
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
        const chunks: never[] = [];

        const { fields, files } = await formidablePromise(req, {
          ...formidableConfig,
          // consume this, otherwise formidable tries to save the file to disk
          fileWriteStreamHandler: () => fileConsumer(chunks),
        });

        const parsedData = JSON.parse(fields.data as string);
        parsedData.robotScore = response.score;

        const form = new FormData();

        form.append("data", JSON.stringify(parsedData));

        const file = files["files.media"];

        if (Array.isArray(file)) {
          const fileData = file.map(() => Buffer.concat(chunks));
          fileData.forEach((data, index) => {
            form.append("files.media", data, { filename: file[index].originalFilename || "" });
          });
        } else {
          const fileData = Buffer.concat(chunks);
          form.append("files.media", fileData, { filename: file.originalFilename || "" });
        }

        const orderRes = await createOrder(form, form.getHeaders());

        if (orderRes.ok) {
          return res.status(200).send("OK");
        } else {
          if (orderRes.statusText === "Payload Too Large") {
            return res.status(500).send({ error: true, msg: "Не удалось отправить файлы" });
          }
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
