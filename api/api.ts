import axios from "axios";

const PUBLIC_TOKEN = process.env.NODE_ENV === "development" ? process.env.STRAPI_LOCAL_TOKEN : process.env.STRAPI_PUBLIC_TOKEN;

export const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:1337/api" : process.env.BACKEND_API_URL;

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

const waitFor = (amount: number) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

export const createOrder = async (order: IOrder) => {
  const data = axios
    .post(`${API_URL}/new-orders`, { data: order }, { headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` } })
    .then((res) => res.data);
  const res = await Promise.allSettled([data, waitFor(300)]);

  const response = res.find(isFulfilled)?.value;
  const rejected = res.find(isRejected)?.reason;

  if (response) {
    return response;
  }

  if (rejected) {
    throw rejected;
  }
};

export const becomeWorker = async (worker: IWorker) => {
  const data = axios
    .post(`${API_URL}/new-workers`, { data: worker }, { headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` } })
    .then((res) => res.data);

  const res = await Promise.allSettled([data, waitFor(300)]);

  const response = res.find(isFulfilled)?.value;
  const rejected = res.find(isRejected)?.reason;

  if (response) {
    return response;
  }

  if (rejected) {
    throw rejected;
  }
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
    const data = axios.post(`${API_URL}/auth/local`, { ...user }).then((res) => res.data);

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
