import "../styles/globals.css";
import { AppProps } from "next/app";
import { CacheProvider, Global } from "@emotion/react";
import * as React from "react";
import { cache } from "@emotion/css";
import { reset } from "../styles/reset";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CacheProvider value={cache}>
        <Global styles={reset} />
        <Component {...pageProps} />
      </CacheProvider>
    </RecoilRoot>
  );
}

export default MyApp;
