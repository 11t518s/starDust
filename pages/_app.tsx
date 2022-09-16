import "../styles/globals.css";
import { AppProps } from "next/app";
import { initializeFirebase } from "../apis/firebaseConfig";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";

function MyApp({ Component, pageProps }: AppProps) {
  initializeFirebase();
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
