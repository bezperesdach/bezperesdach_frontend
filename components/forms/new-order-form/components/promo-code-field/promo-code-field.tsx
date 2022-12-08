import { useState, useEffect } from "react";
import { NextRouter } from "next/router";
import { FieldProps } from "formik";
import axios from "axios";
import { useDebounce } from "usehooks-ts";

import { PromoCodeStatus } from "../../components/promo-code-status/promo-code-status";

import styles from "./promo-code-field.module.css";

interface Props extends FieldProps {
  className?: string;
  placeholder: string;
  disabled: boolean;
  router: NextRouter;
}

export const PromoCodeField = ({ router, field, className, placeholder, disabled }: Props) => {
  const [foundPromoCode, setFoundPromoCode] = useState({
    show: false,
    found: false,
    changed: false,
  });

  const debouncedPromoCode = useDebounce<string>(field.value, 750);

  useEffect(() => {
    if (field.value !== "") {
      const promo = router.query.promo as string;

      if (promo && promo === field.value) {
        setFoundPromoCode((prev) => {
          return { ...prev, show: true, found: true, changed: false };
        });
        return;
      }

      setFoundPromoCode((prev) => {
        return { ...prev, changed: true };
      });
    } else {
      setFoundPromoCode((prev) => {
        return { ...prev, show: false };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  useEffect(() => {
    async function fetchPromoCode() {
      const slug = router.query.slug as string;

      try {
        const result = await axios(`/api/promo-codes?promo=${debouncedPromoCode}`);

        if (result.data === "OK") {
          setFoundPromoCode((prev) => {
            return { ...prev, found: true, changed: false };
          });

          router.replace(
            {
              pathname: "/order/[slug]",
              query: {
                slug,
                promo: debouncedPromoCode,
              },
            },
            undefined,
            { shallow: true }
          );
        } else {
          setFoundPromoCode((prev) => {
            return { ...prev, found: false, changed: false };
          });
          router.replace(
            {
              pathname: "/order/[slug]",
              query: {
                slug,
              },
            },
            undefined,
            { shallow: true }
          );
        }
      } catch (error) {
        setFoundPromoCode((prev) => {
          return { ...prev, found: false, changed: false };
        });
        router.replace(
          {
            pathname: "/order/[slug]",
            query: {
              slug,
            },
          },
          undefined,
          { shallow: true }
        );
      }
    }

    if (debouncedPromoCode !== "") {
      fetchPromoCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPromoCode]);

  return (
    <div className={styles.form_item}>
      <label className={styles.label}>Промокод</label>
      <div className={styles.input_container}>
        <input
          className={className}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={disabled}
          {...field}
        />
      </div>
      <PromoCodeStatus show={foundPromoCode.show} found={foundPromoCode.found} changed={foundPromoCode.changed} />
    </div>
  );
};
