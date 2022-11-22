import ErrorBoundary from "../components/error-boundary/error-boundary";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <NextNProgress color="#1070EE" height={6} showOnShallow={false} options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
