import ErrorBoundary from "../components/error-boundary/error-boundary";
import type { AppProps } from "next/app";
import { Navbar } from "../components/navbar/navbar";
import { Footer } from "../components/footer/footer";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ErrorBoundary>
  );
}
