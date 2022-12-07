import React from "react";

import styles from "./promo-code-status.module.css";

type Props = {
  show: boolean;
  found: boolean;
  changed: boolean;
};

export const PromoCodeStatus = ({ show, found, changed }: Props) => {
  if (changed) {
    return <p className={styles.searching}>Ищем промокод</p>;
  }

  if (show) {
    if (found) {
      return <p className={styles.found}>Промокод применен</p>;
    } else {
      return <p className={styles.missing}>Промокод не найден</p>;
    }
  }

  return null;
};
