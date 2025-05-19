"use client";

import { FrameProvider } from "@/components/farcaster-provider";
import { ReactNode } from "react";
import { WagmiConfig, createConfig } from "wagmi";
import { http } from "viem";
import { monadTestnet } from "viem/chains";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";

interface ClickerLayoutProps {
  children: ReactNode;
}

// Конфігурація Wagmi для доступу до блокчейну
const config = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(),
  },
  connectors: [farcasterFrame()],
});

export default function ClickerLayout({ children }: ClickerLayoutProps) {
  return (
    <WagmiConfig config={config}>
      <FrameProvider>{children}</FrameProvider>
    </WagmiConfig>
  );
} 