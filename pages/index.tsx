import Head from "next/head";
import { Guarantees } from "../components/guarantees/guarantees";
import { Hero } from "../components/hero/hero";
import { Navbar } from "../components/navbar/navbar";
import { Services } from "../components/services/services";
import { About } from "../components/about/about";
import { Represents } from "../components/represents/represents";
import { Preparation } from "../components/preparation/preparation";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Безпересдач</title>
        <meta name="description" content="Безпересдач, помощь в один клик" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <Hero />
        <About />
        <Services />
        <Guarantees />
        <Represents />
        <Preparation />
      </main>
    </div>
  );
}
