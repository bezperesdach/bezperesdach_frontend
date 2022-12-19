import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { contactTypeOptions } from "../../../utils/order-form/form";
import { useAutosizeTextArea } from "../components/use-auto-text-aria/use-auto-text-aria";
import { ReactSelectQuickOrder } from "./components/react-select-quick-order/react-select-quick-order";

const DynamicContactField = dynamic(() => import("./components/contact-field/contact-field").then((mod) => mod.ContactField));
const DynamicPromoCodeField = dynamic(() =>
  import("./components/promo-code-field-component/promo-code-field-component").then((mod) => mod.PromoCodeFieldComponent)
);

import styles from "./quick-order.module.css";

interface Props {
  isSubmitting: boolean;
  setSubmitting: (state: boolean) => void;
}

export const QuickOrder = ({ isSubmitting, setSubmitting }: Props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formValues, setFormValues] = useState({
    projectName: "",
    contactType: "",
    contact: "",
    promoCode: "",
  });

  const setFormValue = useCallback((name: string, value: string) => {
    setFormValues((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }, []);

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValue(name, value);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, formValues.projectName);

  const formSubmit = useCallback(
    async (e: React.FormEvent) => {
      setSubmitting(true);
      e.preventDefault();
      if (!executeRecaptcha) {
        setSubmitting(false);
        return;
      }

      // setSendOrder((prevState) => {
      //   return { ...prevState, loading: true };
      // });

      try {
        const token = await executeRecaptcha();
        if (!token) {
          // showAndHideError(
          //   () =>
          //     setSendOrder((prevState) => {
          //       return { ...prevState, loading: false, error: true, errorText: "Произошла ошибка при отправке, попробуйте еще раз" };
          //     }),
          //   () =>
          //     setSendOrder((prevState) => {
          //       return { ...prevState, loading: false, error: false, errorText: "" };
          //     }),
          //   5000
          // );
          return;
        }

        // if (result.data) {
        //   ym("reachGoal", "orderCreateSuccess");

        //   setSendOrder((prevState) => {
        //     return { ...prevState, loading: false, isModal: true };
        //   });
        // }
      } catch (error) {
        // console.log(error);
        // ym("reachGoal", "orderCreateError");
        // showAndHideError(
        //   () =>
        //     setSendOrder((prevState) => {
        //       return {
        //         ...prevState,
        //         loading: false,
        //         error: true,
        //         errorText: "Произошла ошибка при отправке, попробуйте еще раз",
        //       };
        //     }),
        //   () =>
        //     setSendOrder((prevState) => {
        //       return { ...prevState, loading: false, error: false, errorText: "" };
        //     }),
        //   5000
        // );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [executeRecaptcha]
  );

  return (
    <form className={`${styles.form} ${isSubmitting ? styles.loading : ""}`} id="quick-order" onSubmit={formSubmit}>
      <div className={`${styles.input_container} ${isSubmitting ? styles.disabled : ""}`}>
        <textarea
          className={styles.text_area}
          name="projectName"
          ref={textAreaRef}
          placeholder="Укажите тему работы"
          value={formValues.projectName}
          onChange={onTextAreaChange}
          disabled={isSubmitting}
          rows={1}
          style={{ resize: "none" }}
        />
      </div>
      <ReactSelectQuickOrder
        name="contactType"
        value={formValues.contactType}
        options={contactTypeOptions}
        setValue={setFormValue}
        borderRadius={15}
        placeholder="Как с вами связаться?"
        isSearchable={false}
        disabled={isSubmitting}
      />
      <DynamicContactField
        name="contact"
        value={formValues.contact}
        setFormValue={setFormValue}
        contactType={formValues.contactType}
        isSubmitting={isSubmitting}
      />
      <DynamicPromoCodeField
        name="promoCode"
        className={styles.input}
        value={formValues.promoCode}
        setFormValue={setFormValue}
        placeholder="Укажите промокод"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};
