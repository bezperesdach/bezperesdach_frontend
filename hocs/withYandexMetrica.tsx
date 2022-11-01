import React, { ReactNode, useCallback, useEffect } from "react";
import Router from "next/router";
import ym, { YMInitializer } from "react-yandex-metrika";

export type WithYandexMetrikaProps = {
  children: ReactNode;
};

const enabled = process.env.NODE_ENV === "production" && process.env.YANDEX_METRIKA_ID;

export const WithYandexMetrika = (props: WithYandexMetrikaProps) => {
  const { children } = props;

  const hit = useCallback((url: string) => {
    if (enabled) {
      ym("hit", url);
    } else {
      console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url);
    }
  }, []);

  useEffect(() => {
    hit(window.location.pathname + window.location.search);
    Router.events.on("routeChangeComplete", (url: string) => hit(url));
  }, []);

  return (
    <>
      {enabled && (
        <YMInitializer
          accounts={[Number(process.env.YANDEX_METRIKA_ID)]}
          options={{ clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true, defer: true }}
          version="2"
        />
      )}
      {children}
    </>
  );
};
