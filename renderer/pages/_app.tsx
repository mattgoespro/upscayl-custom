import { Provider } from "jotai";
import { AppProps } from "next/app";
import Head from "next/head";
import "react-tooltip/dist/react-tooltip.css";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Upscayl</title>
      </Head>
      <Provider>
        <Component {...pageProps} data-theme="upscayl" />
      </Provider>
    </>
  );
};

export default MyApp;
