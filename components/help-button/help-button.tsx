import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import useDeviceDetect from "../../hooks/use-device-detect/use-device-detect";

import ChatIcon from "../../public/assets/icons/chat-icon.svg";
import TgIcon from "../../public/assets/images/contact/telegram.svg";
import VkIcon from "../../public/assets/images/contact/vk.svg";
import EmailIcon from "../../public/assets/images/contact/mail.svg";
import CloseIcon from "../../public/assets/icons/close-icon.svg";

import styles from "./help-button.module.css";

const menuContainerVariants = {
  closed: { height: 56, scale: 1, y: 0 },
  open: { height: 230, scale: 1.2, y: "-5%" },
};

const menuButtonsWrapperVariants = {
  closed: { y: "0px", height: 56 },
  open: { y: "-60px", height: 225 },
};

export const HelpButton = () => {
  const { isMobile } = useDeviceDetect();
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className={styles.container}
        variants={menuContainerVariants}
        animate={showHelpMenu ? "open" : "closed"}
        transition={{ type: "ease-in-out", duration: 0.4, staggerChildren: 1 }}
      >
        <motion.div
          variants={menuButtonsWrapperVariants}
          animate={showHelpMenu ? "open" : "closed"}
          transition={{ type: "ease-in-out", duration: 0.45 }}
        >
          <motion.button
            className={styles.chat_button_container}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.2 }}
            onClick={() => setShowHelpMenu(true)}
          >
            <Image src={ChatIcon} priority={true} width={36} height={36} alt="chat menu" />
          </motion.button>
          <motion.a
            className={styles.chat_button_container}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            href="mailto:help@bezperesdach.ru"
            target="_blank"
            rel="nofollow noopener noreferrer"
            onClick={() => setShowHelpMenu(false)}
          >
            <Image src={EmailIcon} priority={true} width={36} height={36} alt="chat menu" />
          </motion.a>
          <motion.a
            className={styles.chat_button_container}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            href={isMobile ? "vk://vk.com/bezperesdach_official" : "https://vk.com/bezperesdach_official"}
            target="_blank"
            rel="nofollow noopener noreferrer"
            onClick={() => setShowHelpMenu(false)}
          >
            <Image src={VkIcon} priority={true} width={36} height={36} alt="chat menu" />
          </motion.a>
          <motion.a
            className={styles.chat_button_container}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            href={isMobile ? "tg://resolve?domain=bezperesdach_bot" : "https://bezperesdach_bot.t.me"}
            target="_blank"
            rel="nofollow noopener noreferrer"
            onClick={() => setShowHelpMenu(false)}
          >
            <Image src={TgIcon} priority={true} width={36} height={36} alt="chat menu" />
          </motion.a>
          <motion.button
            className={styles.chat_button_container}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setShowHelpMenu(false)}
          >
            <Image src={CloseIcon} priority={true} width={36} height={36} alt="chat menu" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
