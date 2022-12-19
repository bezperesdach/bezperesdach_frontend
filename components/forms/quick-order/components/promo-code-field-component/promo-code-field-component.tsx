import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "usehooks-ts";

import { PromoCodeStatus } from "../../../components/promo-code-status/promo-code-status";
import styles from "../../quick-order.module.css";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  value: string;
  name: string;
  className?: string;
  setFormValue: (name: string, value: string) => void;
  placeholder?: string;
  isSubmitting?: boolean;
};

export const PromoCodeFieldComponent = ({ name, value, className, setFormValue, placeholder, isSubmitting }: Props) => {
  const [showPromoCodeField, setShowPromoCodeField] = useState(false);

  const router = useRouter();

  const [foundPromoCode, setFoundPromoCode] = useState({
    show: false,
    found: "",
    changed: false,
  });

  const debouncedPromoCode = useDebounce<string>(value, 750);

  useEffect(() => {
    const promo = router.query.promo as string;

    if (promo) {
      setFormValue(name, promo);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    if (value !== "") {
      if (foundPromoCode.found === value) {
        return;
      }
      const promo = router.query.promo as string;

      setFoundPromoCode((prev) => {
        return { ...prev, show: true };
      });

      if (promo && promo === value) {
        setFoundPromoCode((prev) => {
          return { ...prev, found: value, changed: false };
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
  }, [value]);

  useEffect(() => {
    async function fetchPromoCode() {
      if (!foundPromoCode.show) return;

      try {
        const result = await fetch(`/api/promo-codes?promo=${debouncedPromoCode}`);

        if (result.ok) {
          setFoundPromoCode((prev) => {
            return { ...prev, found: value, changed: false };
          });

          router.replace(
            {
              pathname: "/",
              query: {
                promo: debouncedPromoCode,
              },
            },
            undefined,
            { shallow: true }
          );
        } else {
          setFoundPromoCode((prev) => {
            return { ...prev, found: "", changed: false };
          });
          router.replace(
            {
              pathname: "/",
            },
            undefined,
            { shallow: true }
          );
        }
      } catch (error) {
        setFoundPromoCode((prev) => {
          return { ...prev, found: "", changed: false };
        });
        router.replace(
          {
            pathname: "/",
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

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue(name, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {showPromoCodeField ? (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className={`${styles.input_container} ${isSubmitting ? styles.disabled : ""}`}>
            <input
              name={name}
              className={className}
              placeholder={placeholder}
              autoComplete="off"
              onChange={onInputChange}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              disabled={isSubmitting}
            />
          </div>
          {!isSubmitting && (
            <PromoCodeStatus
              className={styles.promo_code_status}
              value={value}
              show={foundPromoCode.show}
              found={foundPromoCode.found}
              changed={foundPromoCode.changed}
            />
          )}
        </motion.div>
      ) : (
        <motion.button
          initial={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className={styles.text_button}
          type="button"
          onClick={() => setShowPromoCodeField(true)}
        >
          У меня есть промокод
        </motion.button>
      )}
    </AnimatePresence>
  );
};
