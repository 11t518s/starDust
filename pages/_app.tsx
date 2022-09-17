import "../styles/globals.css";
import { AppProps } from "next/app";
import { initializeFirebase } from "../apis/firebaseConfig";
import { CacheProvider, Global } from "@emotion/react";
import * as React from "react";
import { cache } from "@emotion/css";
import { reset } from "../styles/reset";

function MyApp({ Component, pageProps }: AppProps) {
  initializeFirebase();
  return (
    <CacheProvider value={cache}>
      <Global styles={reset} />
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
