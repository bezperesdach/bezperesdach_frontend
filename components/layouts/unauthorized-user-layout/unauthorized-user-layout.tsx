import dynamic from "next/dynamic";
import type { ReactNode } from "react";
const DynamicNavbar = dynamic(() => import("../../navbar/navbar").then((mod) => mod.Navbar));
const DynamicFooter = dynamic(() => import("../../footer/footer").then((mod) => mod.Footer));

import styles from "./unauthorized-user-layout.module.css";

export const UnauthorizedUserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.main}>
      <DynamicNavbar />
      <main>{children}</main>
      <DynamicFooter />
    </div>
  );
};
