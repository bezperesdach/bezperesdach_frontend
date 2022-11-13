import { Navbar } from "../../navbar/navbar";
import { Footer } from "../../footer/footer";
import type { ReactNode } from "react";

import styles from "./unauthorized-user-layout.module.css";

export default function UnauthorizedUserLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.main}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
