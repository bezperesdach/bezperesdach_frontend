export const HCAPTCHA_SITE_KEY =
  process.env.NODE_ENV === "development"
    ? "10000000-ffff-ffff-ffff-000000000001"
    : (process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string);

export const HCAPTCHA_SECRET_KEY =
  process.env.NODE_ENV === "development" ? "0x0000000000000000000000000000000000000000" : (process.env.HCAPTCHA_SECRET_KEY as string);
