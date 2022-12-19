import React from "react";
import { Backdrop } from "../backdrop/backdrop";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../../button/button";
import Portal from "../../portal";

import styles from "./modal-request.module.css";

type Props = {
  handleClose: () => void;
  email: string;
  shouldShow: boolean;
};

export const ModalRequest = ({ handleClose, shouldShow, email }: Props) => {
  return (
    <AnimatePresence>
      {shouldShow ? (
        <Portal>
          <Backdrop onClick={handleClose}>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={styles.modal}
              initial={{ y: "200%" }}
              animate={{ y: 0 }}
              exit={{ y: "200%", transition: { duration: 0.2 } }}
              transition={{ type: "ease-in-out", duration: 0.35 }}
            >
              <h1 style={{ paddingBottom: "24px" }}>Заявка отправлена!</h1>
              <p style={{ paddingBottom: "8px" }}>Совсем скоро мы напишем вам на почту чтобы уточнить все детали</p>
              <p style={{ paddingBottom: "24px" }}>(не забудьте проверить папку &quot;спам&quot;)</p>
              <p style={{ paddingBottom: "24px" }}>
                Если у вас возникли какие-то вопросы, пишите нам на{" "}
                <Link
                  href={`mailto:${email}?subject=%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BC%D0%BD%D0%B5`}
                  style={{ color: "#3D8EE8" }}
                >
                  {email}
                </Link>
              </p>
              <Button type="button" color="#fff" onClick={handleClose}>
                Закрыть
              </Button>
            </motion.div>
          </Backdrop>
        </Portal>
      ) : null}
    </AnimatePresence>
  );
};
