import { useState, useEffect } from "react";
import { FieldProps } from "formik";
import { useDebounce } from "usehooks-ts";
import { getPromoCode } from "../../../../../api/api";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { PromoCodeStatus } from "../../../components/promo-code-status/promo-code-status";

import styles from "./promo-code-field.module.css";

interface Props extends FieldProps {
  className?: string;
  placeholder: string;
  disabled: boolean;
}

export const PromoCodeField = ({ field, className, placeholder, disabled }: Props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [foundPromoCode, setFoundPromoCode] = useState({
    show: false,
    found: "",
    changed: false,
  });

  const debouncedPromoCode = useDebounce<string>(field.value, 750);

  useEffect(() => {
    async function fetchPromoCode() {
      if (!executeRecaptcha) {
        return;
      }

      try {
        const token = await executeRecaptcha();

        const result = await getPromoCode(debouncedPromoCode, token);

        if (result.ok) {
          setFoundPromoCode((prev) => {
            return { ...prev, found: debouncedPromoCode, changed: false };
          });
        } else {
          setFoundPromoCode((prev) => {
            return { ...prev, found: "", changed: false };
          });
        }
      } catch (error) {
        setFoundPromoCode((prev) => {
          return { ...prev, found: "", changed: false };
        });
      }
    }

    if (debouncedPromoCode !== "" && foundPromoCode.found === "") {
      fetchPromoCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPromoCode]);

  useEffect(() => {
    if (field.value !== "") {
      setFoundPromoCode((prev) => {
        return { ...prev, show: true, changed: foundPromoCode.found === "" ? true : false };
      });
    } else {
      setFoundPromoCode({ show: false, found: "", changed: false });
    }
  }, [field.value, foundPromoCode.found]);

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
          disabled={disabled ? disabled : foundPromoCode.found !== ""}
          {...field}
        />
      </div>
      <PromoCodeStatus show={foundPromoCode.show} value={field.value} found={foundPromoCode.found} changed={foundPromoCode.changed} />
    </div>
  );
};
