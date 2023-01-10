import { NextApiRequest, NextApiResponse } from "next";
import { getReviews } from "../../api/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "GET") {
    try {
      let randomReviews: RandomReviews | null = null;

      const randomReviewsResponse = await getReviews();

      if (!randomReviewsResponse.errors) {
        randomReviews = randomReviewsResponse.data;
        return res.status(200).send({ errors: false, message: "", data: randomReviews });
      }

      return res.status(422).send({ errors: true, message: randomReviewsResponse.message, data: null });
    } catch (error) {
      return res.status(422).send({ errors: true, message: error, data: null });
    }
  }

  return res.status(404).send("Not found");
}
