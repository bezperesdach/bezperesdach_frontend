export const YANDEX_METRIKA_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);

const isDevelopment = process.env.NODE_ENV === "development";

export const ym = (goal: string, goalName: string) => {
  if (isDevelopment) {
    console.log(`%c[YandexMetrika](HIT)`, `color: orange`, goal, goalName);
  } else {
    window.ym(YANDEX_METRIKA_ID, goal, goalName);
  }
};
