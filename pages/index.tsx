import Head from "next/head";
import { Guarantees } from "../components/home/guarantees/guarantees";
import { Hero } from "../components/home/hero/hero";
import { Navbar } from "../components/navbar/navbar";
import { Services } from "../components/home/services/services";
import { About } from "../components/home/about/about";
import { Represents } from "../components/home/represents/represents";
import { Preparation } from "../components/home/preparation/preparation";
import { Footer } from "../components/footer/footer";

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

      <Footer />
    </div>
  );
}
