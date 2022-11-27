import React from "react";

import styles from "./promo-code-status.module.css";

type Props = {
  show: boolean;
  found: boolean;
};

export const PromoCodeStatus = ({ show, found }: Props) => {
  return (
    <>
      {show && <>{found ? <p className={styles.found}>Промокод применен</p> : <p className={styles.missing}>Промокод не найден</p>}</>}
    </>
  );
};
