import { NextApiRequest } from "next";

const PUBLIC_TOKEN = process.env.NODE_ENV === "development" ? process.env.STRAPI_LOCAL_TOKEN : process.env.STRAPI_PUBLIC_TOKEN;

export const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:1337/api" : process.env.BACKEND_API_URL;

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

const waitFor = (amount: number) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

export const createOrder = async (req: NextApiRequest, robotScore: number) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "post",
    body: req as unknown as BodyInit,
    headers: {
      "Content-Type": req.headers["content-type"] || "",
      "Content-Length": req.headers["content-length"] || "",
      robotScore: robotScore.toString(),
      Authorization: `Bearer ${PUBLIC_TOKEN}`,
    },
  });

  return response;
};

export const becomeWorker = async (worker: IWorker) => {
  const response = await fetch(`${API_URL}/new-workers`, {
    method: "post",
    // body: { data: worker } as unknown as BodyInit,
    headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` },
  });

  console.log(response);

  return response;
};

export const getPromoCode = async (promoCode: string) => {
  const response = await fetch(`${API_URL}/promo-codes/${promoCode}`, { headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` } });

  return await response.json();
};

export const authenticateUser = async (
  user: IUser,
  onRequest: () => void,
  onSuccess: () => void,
  onError: (err: unknown) => void,
  onClearError: () => void
) => {
  onRequest();

  try {
    const data = fetch(`${API_URL}/auth/local`, { method: "post", body: JSON.stringify({ ...user }) }).then((res) => res.json());

    const res = await Promise.allSettled([data, waitFor(300)]);

    const response = res.find(isFulfilled)?.value;
    const rejected = res.find(isRejected)?.reason;

    if (response) {
      return onSuccess();
    }

    if (rejected) {
      throw rejected;
    }
  } catch (err) {
    onError(err);
    setTimeout(() => onClearError(), 5000);
  }
};

interface IWorker {
  name: string;
  email: string;
}
