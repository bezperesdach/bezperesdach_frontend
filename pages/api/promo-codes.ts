import { NextApiRequest, NextApiResponse } from "next";
import { getPromoCode } from "../../api/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;
  const promoCode = query.promo as string;

  if (method === "GET") {
    try {
      const result = await getPromoCode(promoCode);

      if (result.data.attributes.promoCodeId === promoCode) {
        return res.status(200).send("OK");
      }
    } catch (error) {
      return res.status(422).json({ message: "Промокод не найден" });
    }
  }
  return res.status(404).send("Not found");
}
