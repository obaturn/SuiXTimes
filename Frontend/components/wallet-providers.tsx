"use client"

import type React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit"
import { getFullnodeUrl } from "@mysten/sui/client"
import RegisterEnokiWallets from "./RegisterEnokiWallets"

const queryClient = new QueryClient()

const networks = {
  devnet: { url: getFullnodeUrl("devnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
}

export function WalletProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider
          autoConnect={true}
          enableUnsafeBurner={false}
        >
          <RegisterEnokiWallets />
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}