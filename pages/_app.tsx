import type { AppProps } from "next/app";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { coreChain, sepoliaChain } from "@/lib/chains";
import { Header } from "@/components/header";
import { Notifications } from "@/components/notifications";

const config = getDefaultConfig({
  appName: "bridge-test-task",
  projectId: "a8a73f67286c90126f93745f283b8dc2",
  chains: [coreChain, sepoliaChain],
  ssr: true,
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Header />
            <Component {...pageProps} />
            <Notifications />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
