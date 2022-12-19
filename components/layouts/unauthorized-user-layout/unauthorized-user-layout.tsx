import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { LegalNotification } from "../../legal-notification/legal-notification";
import { Overlay } from "../../overlay/overlay";
const DynamicNavbar = dynamic(() => import("../../navbar/navbar").then((mod) => mod.Navbar));
const DynamicFooter = dynamic(() => import("../../footer/footer").then((mod) => mod.Footer));
const DynamicScrollTopButton = dynamic(() =>
  import("../../scroll-to-top-button/scroll-to-top-button").then((mod) => mod.ScrollTopButton)
);
const DynamicHelpButton = dynamic(() => import("../../help-button/help-button").then((mod) => mod.HelpButton));

import styles from "./unauthorized-user-layout.module.css";

export const UnauthorizedUserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.main}>
      <DynamicNavbar />
      <LegalNotification />
      <main>{children}</main>
      <DynamicFooter />

      <Overlay>
        <DynamicScrollTopButton />
        <DynamicHelpButton />
      </Overlay>
    </div>
  );
};
