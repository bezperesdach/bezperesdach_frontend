import ErrorBoundary from "../components/error-boundary/error-boundary";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Navbar } from "../components/navbar/navbar";
import { Footer } from "../components/footer/footer";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ErrorBoundary>
      <NextNProgress height={6} showOnShallow={true} options={{ showSpinner: false }} />
      {router.pathname !== "/_error" && <Navbar />}
      <Component {...pageProps} />
      {router.pathname !== "/_error" && <Footer />}
    </ErrorBoundary>
  );
}
