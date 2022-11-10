import ErrorBoundary from "../components/error-boundary/error-boundary";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <NextNProgress height={6} showOnShallow={true} options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
