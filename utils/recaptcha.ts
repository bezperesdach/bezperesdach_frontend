import axios from "axios";

export const RECAPTCHA_SITE_KEY =
  process.env.NODE_ENV === "development"
    ? (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_DEV as string)
    : (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string);

export const RECAPTCHA_SECRET_KEY =
  process.env.NODE_ENV === "development"
    ? (process.env.RECAPTCHA_SECRET_KEY_DEV as string)
    : (process.env.RECAPTCHA_SECRET_KEY as string);

export const verifyRecaptcha = async (token: string) => {
  const secretKey = RECAPTCHA_SECRET_KEY;

  const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + token;

  return await axios.post(verificationUrl);
};
