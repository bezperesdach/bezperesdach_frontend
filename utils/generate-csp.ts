/* eslint-disable @typescript-eslint/no-explicit-any */
interface Policy {
  [key: string]: string[];
}

export const generateCSP = () => {
  const policy: Policy = {} as Policy;

  // adder function for our policy object
  const add = (directive: string, value: string, options: { devOnly: boolean } = { devOnly: false }) => {
    if (options.devOnly && process.env.NODE_ENV !== "development") return;
    const curr = policy[directive];
    policy[directive] = curr ? [...curr, value] : [value];
  };

  // default-src
  add("default-src", `'self'`);

  // script-src-elem
  add(
    "script-src",
    `'self' https://mc.yandex.ru/metrika/tag.js  https://www.google.com/recaptcha/api.js https://www.googletagmanager.com/gtm.js https://www.gstatic.com/recaptcha/releases/Km9gKuG06He-isPsP6saG8cn/recaptcha__en.js`
  );

  // script-src
  add("script-src", `'unsafe-eval'`);

  // connect-src
  add("connect-src", `'self'`, { devOnly: true });

  add("style-src", `'self' 'unsafe-inline'`);

  add("object-src", `'none'`);

  add("connect-src", `'self'  https://analytics.google.com https://mc.yandex.ru`);

  add("font-src", `'self'`);

  add("frame-src", `'self' https://www.google.com`);

  add("img-src", `'self' data: https://bezperesdach.ru`);

  add("manifest-src", `'self'`);

  add("media-src", `'self'`);

  add("worker-src", `'none'`);

  // return the object in a formatted value (this won't work on IE11 without a polyfill!)
  return Object.entries(policy)
    .map(([key, value]) => `${key} ${value.join(" ")}`)
    .join("; ");
};

export default generateCSP;
