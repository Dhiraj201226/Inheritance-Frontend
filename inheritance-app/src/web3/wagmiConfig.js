import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, arbitrum, optimism } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "OpenAudit",
  projectId: "34acd186e08fdb773eef0ad9861c2ae5", // REQUIRED
  chains: [mainnet, polygon, arbitrum, optimism],
  ssr: false,
});
