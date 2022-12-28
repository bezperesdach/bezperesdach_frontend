const PUBLIC_TOKEN =
  process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_STRAPI_LOCAL_TOKEN : process.env.NEXT_PUBLIC_STRAPI_PUBLIC_TOKEN;

export const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:1337/api" : process.env.NEXT_PUBLIC_BACKEND_API_URL;

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

const waitFor = (amount: number) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

export const createOrder = async (data: FormData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "post",
    body: data,
    headers: {
      Authorization: `Bearer ${PUBLIC_TOKEN}`,
    },
  });

  return response;
};

export const becomeWorker = async (worker: IWorker, recaptchaToken: string) => {
  const response = await fetch(`${API_URL}/new-workers`, {
    method: "post",
    body: JSON.stringify({ data: { ...worker, recaptchaToken } }),
    headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: `Bearer ${PUBLIC_TOKEN}` },
  });

  return response;
};

export const getPromoCode = async (promoCode: string, recaptchaToken: string) => {
  const response = await fetch(`${API_URL}/promo-codes/${promoCode}?recaptchaToken=${recaptchaToken}`, {
    headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` },
  });

  return response;
};

export const getReviews = async () => {
  const response = await fetch(`${API_URL}/reviews/getRandomReviews`, {
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
