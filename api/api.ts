import axios from "axios";
import prodTokens from "../tokens.json";
import localTokens from "../.tokens.json";

const TOKENS = process.env.NODE_ENV === "development" ? localTokens : prodTokens;

export const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:1337/api" : "https://bezperesdach.ru/api";

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

// export const getData = async <T>(url: string, minDelay: number, params?: RequestInit | undefined): Promise<T | IError> => {
// try {
//   const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === "rejected";

//   const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

//   const data = fetch(url, params).then((data) => data.json());
//   const res = await Promise.allSettled([data, new Promise((resolve) => setTimeout(resolve, minDelay))]);

//   const response = res.find(isFulfilled)?.value;

//   const error = res.find(isRejected)?.reason;
//   if (error) {
//     throw error;
//   }

//   return response;
// } catch (err) {
//   if (err instanceof Error) {
//     return { error: true, msg: err.message };
//   }
//   return { error: true, msg: err };
// }

// const fetchMinimalDelay = async (axiosReq: AxiosStatic, minDelay: number) => {
//   await Promise.allSettled([axiosReq, new Promise((resolve) => setTimeout(resolve, minDelay))]);
// };

export const createOrder = async (
  order: IOrder,
  onRequest: () => void,
  onSuccess: () => void,
  onError: (err: unknown) => void,
  onClearError: () => void
) => {
  onRequest();
  try {
    console.log(order);
    console.log(TOKENS);

    const data = axios
      .post(`${API_URL}/orders`, { data: order }, { headers: { Authorization: `Bearer ${TOKENS.uploadToken}` } })
      .then((res) => res.data);
    const res = await Promise.allSettled([data, new Promise((resolve) => setTimeout(resolve, 2000))]);

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
