import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import useAuth from "../components/Auth";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  useAuth();

  return (
    <>
      <Head>
        <title>Student Management System</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          primaryColor: "grape",
          focusRing: "never",
          defaultGradient: { from: "violet", to: "grape" },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
