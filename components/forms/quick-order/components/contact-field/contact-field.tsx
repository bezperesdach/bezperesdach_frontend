import React, { useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "../../quick-order.module.css";

type Props = {
  name: string;
  contactType: string;
  isSubmitting: boolean;
  value: string;
  setFormValue: (name: string, value: string) => void;
};

export const ContactField = ({ name, contactType, isSubmitting, value, setFormValue }: Props) => {
  useEffect(() => {
    setFormValue(name, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactType]);

  const contactPlaceholder = useMemo(() => {
    switch (contactType) {
      case "email":
        return "example@mail.ru";
      case "telegram":
        return "Логин или номер";
      case "vk":
        return "Ссылка на страницу";
      default:
        return "Укажите ваш контакт";
    }
  }, [contactType]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue(name, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {contactType && (
        <motion.div
          initial={{ height: 0, y: "-100%", opacity: 0 }}
          animate={{ height: "100%", y: 0, opacity: 1 }}
          className={`${styles.input_container} ${isSubmitting ? styles.disabled : ""}`}
        >
          <input
            className={styles.input}
            name={name}
            placeholder={contactPlaceholder}
            value={value}
            onChange={onInputChange}
            disabled={isSubmitting}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
