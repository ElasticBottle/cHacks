import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Provider } from "urql";
import { client } from "../atoms/data";
import { AppPropsWithLayout } from "../interface/next";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const layout = Component.getLayout ?? ((page) => page);

  return (
    <div className="min-h-screen">
      <Head>
        <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet"></link>
        <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
        <title>Gun game but its fitness</title>
        <meta name="description" content="The best social fitness experience" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider value={client}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
          }}
        >
          <SessionProvider session={session}>
            {layout(<Component {...pageProps} />)}
          </SessionProvider>
        </MantineProvider>
      </Provider>
    </div>
  );
}
