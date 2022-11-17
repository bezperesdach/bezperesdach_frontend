import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import styles from "./menu-item.module.css";

type Props = {
  url: string;
  reverseUrl?: boolean;
  closeMenu?: () => void;
  children: string;
  mobile?: boolean;
};

export const MenuItem = ({ url, reverseUrl = false, mobile = false, closeMenu, children }: Props) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (mobile && closeMenu) {
      closeMenu();
      if (router.pathname === url) {
        e.preventDefault();
      }
    }
  };

  return (
    <>
      {reverseUrl ? (
        <>
          {router.pathname != url && (
            <li className={styles.list}>
              <Link href={url}>{children}</Link>
            </li>
          )}
        </>
      ) : (
        <li
          className={`${styles.list} ${!mobile && router.pathname === url && styles.inactive} ${
            mobile && router.pathname === url && styles.mobile
          }`}
        >
          <Link onClick={handleClick} href={url}>
            {children}
          </Link>
          {!mobile && router.pathname === url && <div className={styles.line} />}
        </li>
      )}
    </>
  );
};
