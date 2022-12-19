import React, { useMemo } from "react";

import styles from "./promo-code-status.module.css";

type Props = {
  className?: string;
  show: boolean;
  value: string;
  found: string;
  changed: boolean;
};

export const PromoCodeStatus = ({ className, show, value, found, changed }: Props) => {
  const content = useMemo(() => {
    if (show) {
      if (value !== found) {
        if (changed) {
          return <p className={styles.searching}>Ищем промокод</p>;
        }
      }

      if (found) {
        return <p className={styles.found}>Промокод применен</p>;
      } else {
        return <p className={styles.missing}>Промокод не найден</p>;
      }
    }
  }, [show, found, changed, value]);

  return <div className={className}>{content}</div>;
};
