import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider , darkTheme} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@rainbow-me/rainbowkit/styles.css";

import { wagmiConfig } from "./web3/wagmiConfig";
import AppRoutes from "./routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AppRoutes />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
