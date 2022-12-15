import { NextApiRequest, NextApiResponse } from "next";
import { getPromoCode } from "../../api/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;
  const promoCode = query.promo as string;

  if (method === "GET") {
    try {
      const result = await getPromoCode(promoCode);

      if (result.ok) {
        const promoCodeId = await result.json().then((res) => res.data.attributes.promoCodeId);
        if (promoCode === promoCodeId) {
          return res.status(200).send("OK");
        }
      }
      return res.status(422).json({ message: "Промокод не найден" });
    } catch (error) {
      return res.status(422).json({ message: "Промокод не найден" });
    }
  }
  return res.status(404).send("Not found");
}
