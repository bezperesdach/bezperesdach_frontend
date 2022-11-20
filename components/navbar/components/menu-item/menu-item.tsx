import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { typeOptionsOrder } from "../../../../utils/form/new-order-form";

import styles from "./menu-item.module.css";

type Props = {
  url: string;
  allowedUrl?: (url: string) => boolean;
  reverseUrl?: boolean;
  closeMenu?: () => void;
  children: string;
  mobile?: boolean;
};

export const MenuItem = ({ url, allowedUrl, reverseUrl = false, mobile = false, closeMenu, children }: Props) => {
  const router = useRouter();

  let relativeURL = "";

  const slug = router.query.slug;

  if (slug) {
    relativeURL = router.pathname.replace("[slug]", slug as string);
  } else {
    relativeURL = router.pathname;
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (mobile && closeMenu) {
      closeMenu();
      if (relativeURL === url) {
        e.preventDefault();
      }
    }
  };

  const currentUrl = allowedUrl && slug ? allowedUrl(slug as string) : relativeURL === url;

  return (
    <>
      {reverseUrl ? (
        <>
          {relativeURL != url && (
            <li className={styles.list}>
              <Link href={url}>{children}</Link>
            </li>
          )}
        </>
      ) : (
        <li className={`${styles.list} ${!mobile && currentUrl && styles.inactive} ${mobile && currentUrl && styles.mobile}`}>
          <Link onClick={handleClick} href={url}>
            {children}
          </Link>
          {!mobile && currentUrl && <div className={styles.line} />}
        </li>
      )}
    </>
  );
};
