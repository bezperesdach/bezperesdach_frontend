import FormData from "form-data";

const PUBLIC_TOKEN = process.env.NODE_ENV === "development" ? process.env.STRAPI_LOCAL_TOKEN : process.env.STRAPI_PUBLIC_TOKEN;

export const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:1337/api" : process.env.BACKEND_API_URL;

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

const waitFor = (amount: number) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrder = async (form: any, header: FormData.Headers) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "post",
    body: form,
    headers: {
      ...header,
      Authorization: `Bearer ${PUBLIC_TOKEN}`,
    },
  });

  return response;
};

export const becomeWorker = async (worker: IWorker) => {
  const response = await fetch(`${API_URL}/new-workers`, {
    method: "post",
    body: JSON.stringify({ data: worker }),
    headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: `Bearer ${PUBLIC_TOKEN}` },
  });

  return response;
};

export const getPromoCode = async (promoCode: string) => {
  const response = await fetch(`${API_URL}/promo-codes/${promoCode}`, {
    headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` },
  });

  return response;
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
