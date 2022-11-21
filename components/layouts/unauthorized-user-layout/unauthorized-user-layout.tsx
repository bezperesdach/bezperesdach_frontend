import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Navbar } from "../../navbar/navbar";

const DynamicFooter = dynamic(() => import("../../footer/footer").then((mod) => mod.Footer));

import styles from "./unauthorized-user-layout.module.css";

export const UnauthorizedUserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.main}>
      <Navbar />
      <main>{children}</main>
      <DynamicFooter />
    </div>
  );
};
