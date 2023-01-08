import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import useDeviceDetect from "../../hooks/use-device-detect/use-device-detect";
import { ym } from "../../utils/yandex-metrika";

import ChatIcon from "../../public/assets/icons/chat-icon.svg";
import TgIcon from "../../public/assets/images/contact/telegram.svg";
import VkIcon from "../../public/assets/images/contact/vk.svg";
import EmailIcon from "../../public/assets/images/contact/mail.svg";
import CloseIcon from "../../public/assets/icons/close-icon.svg";

import styles from "./help-button.module.css";

const openButtonVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { delay: 0.25 } },
};

const openButtonReduceMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.25 } },
};

const openMenuVariants = {
  hidden: { x: "-50%", height: 0, width: 0 },
  visible: { x: "-50%", height: 230, width: "56px", transition: { delay: 0.1 } },
};

const openMenuReducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const menuOptionVariants = {
  visible: { y: 0 },
  hidden: { y: "230px" },
  tap: { scale: 1.2, transition: { type: "spring", stiffness: 400, damping: 10 } },
};

const menuOptionReduceMotionVarinats = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  tap: { scale: 1.2, transition: { type: "linear" } },
};

export const HelpButton = () => {
  const prefersReducedMotion = useReducedMotion();

  const { isMobile } = useDeviceDetect();
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  const openHelpMenu = () => {
    setShowHelpMenu(true);
    ym("reachGoal", "helpClick");
  };

  return (
    <div className={styles.container}>
      <motion.button
        className={styles.chat_button}
        variants={prefersReducedMotion ? openButtonReduceMotionVariants : openButtonVariants}
        animate={showHelpMenu ? "hidden" : "visible"}
        onClick={openHelpMenu}
      >
        <Image className="no_select" src={ChatIcon} priority={true} width={36} height={36} alt="open menu" />
      </motion.button>
      <AnimatePresence initial={false}>
        {showHelpMenu && (
          <motion.div
            layout
            className={styles.menu_container}
            variants={prefersReducedMotion ? openMenuReducedMotionVariants : openMenuVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            transition={{
              type: "ease-in-out",
              duration: 0.3,
              // when: "beforeChildren", //use this instead of delay
              staggerChildren: 0.04,
            }}
            style={{}}
          >
            <motion.a
              className={styles.chat_button}
              variants={prefersReducedMotion ? menuOptionReduceMotionVarinats : menuOptionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="tap"
              whileTap="tap"
              transition={{ type: "ease-in-out" }}
              href="mailto:help@bezperesdach.ru"
              target="_blank"
              rel="nofollow noopener noreferrer"
              onClick={() => setShowHelpMenu(false)}
            >
              <Image className="image_no_pointer_events" src={EmailIcon} priority={true} width={40} height={40} alt="email" />
            </motion.a>
            <motion.a
              className={styles.chat_button}
              variants={prefersReducedMotion ? menuOptionReduceMotionVarinats : menuOptionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="tap"
              whileTap="tap"
              transition={{ type: "ease-in-out" }}
              href={isMobile ? "vk://vk.com/bezperesdach_official" : "https://vk.com/bezperesdach_official"}
              target="_blank"
              rel="nofollow noopener noreferrer"
              onClick={() => setShowHelpMenu(false)}
            >
              <Image src={VkIcon} priority={true} width={40} height={40} alt="vk group" />
            </motion.a>
            <motion.a
              className={styles.chat_button}
              variants={prefersReducedMotion ? menuOptionReduceMotionVarinats : menuOptionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="tap"
              whileTap="tap"
              transition={{ type: "ease-in-out" }}
              href={isMobile ? "tg://resolve?domain=bezperesdach_bot" : "https://bezperesdach_bot.t.me"}
              target="_blank"
              rel="nofollow noopener noreferrer"
              onClick={() => setShowHelpMenu(false)}
            >
              <Image src={TgIcon} priority={true} width={40} height={40} alt="telegram bot" />
            </motion.a>
            <motion.button
              className={styles.chat_button}
              variants={prefersReducedMotion ? menuOptionReduceMotionVarinats : menuOptionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="tap"
              whileTap="tap"
              transition={{ type: "ease-in-out" }}
              onClick={() => setShowHelpMenu(false)}
            >
              <Image src={CloseIcon} priority={true} width={40} height={40} alt="close menu" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <motion.div
          className={styles.container}
          style={{ overflow: "hidden" }}
          variants={menuContainerVariants}
          animate={showHelpMenu ? "open" : "closed"}
          transition={{ type: "ease-in-out", duration: 0.4, staggerChildren: 1 }}
        >
          <motion.button
            className={styles.chat_button_container}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.2 }}
            onClick={openHelpMenu}
          >
            <Image src={ChatIcon} priority={true} width={36} height={36} alt="chat menu" />
          </motion.button>
          <motion.div
            variants={menuButtonsWrapperVariants}
            animate={showHelpMenu ? "open" : "closed"}
            transition={{ type: "ease-in-out", duration: 0.45 }}
          >
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
              <Image className="image_no_pointer_events" src={EmailIcon} priority={true} width={36} height={36} alt="chat menu" />
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
        </motion.div> */}
    </div>
  );
};
