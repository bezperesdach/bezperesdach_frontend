import axios from "axios";

export const showAndHideError = (callback: () => void, delayedCallback: () => void, delay: number) => {
  callback();
  setTimeout(() => delayedCallback(), delay);
};

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message;
  }

  if (error instanceof Error) return error.message;

  return String(error);
};
