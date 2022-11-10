import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import type { ReactNode } from "react";

import styles from "./layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.main}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
