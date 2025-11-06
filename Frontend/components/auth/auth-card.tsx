"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWallets, useConnectWallet } from "@mysten/dapp-kit"

interface AuthCardProps {
  isLoading: boolean
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  rememberMe: boolean
  setRememberMe: (remember: boolean) => void
  onSignIn: (e: React.FormEvent) => void
  onSignUp: (e: React.FormEvent) => void
  onSocialLogin: (provider: string) => void
  onForgotPassword: () => void
}

export function AuthCard({
  isLoading,
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  onSignIn,
  onSignUp,
  onSocialLogin,
  onForgotPassword,
}: AuthCardProps) {
  const [activeTab, setActiveTab] = useState("connect")
  const [walletAddress, setWalletAddress] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const wallets = useWallets()
  const { mutate: connect } = useConnectWallet()

  const handleRedirect = () => {
    window.open("https://www.youtube.com/@diecastbydollarall", "_blank")
  }

  const handleConnectWallet = async () => {
    try {
      connect({ wallet: wallets[0] })
      // Wait a bit for connection to establish before redirecting
      setTimeout(() => {
        onSignIn(new Event("submit") as any)
      }, 1000)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      // Fallback to opening Slush website
      window.open("https://slush.finance/", "_blank")
    }
  }

  const handleCreateSlushWallet = () => {
    window.open("https://slush.finance/", "_blank")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200" style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(255, 20, 147, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 105, 180, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(255, 0, 255, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 60% 30%, rgba(255, 20, 147, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255, 105, 180, 0.1) 0%, rgba(255, 20, 147, 0.2) 50%, rgba(255, 0, 255, 0.1) 100%)
        `,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 105, 180, 0.3)',
        boxShadow: '0 8px 32px rgba(255, 20, 147, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
          <div className="bouncing-logo">
            <img
              src="/images/design-mode/Sui_Symbol_White.png"
              alt="Sui Logo"
              width="120"
              height="120"
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Header with tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-0 mb-6 sm:mb-8 lg:mb-10">
          <div className="flex bg-white/20 rounded-lg p-1 border border-white/30 w-full sm:w-auto backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("connect")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-2 rounded-md text-xs sm:text-sm lg:text-base font-medium transition-all duration-200 ${
                activeTab === "connect"
                  ? "bg-white text-pink-600 shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/20"
              }`}
            >
              Connect
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-2 rounded-md text-xs sm:text-sm lg:text-base font-medium transition-all duration-200 ${
                activeTab === "create"
                  ? "bg-white text-pink-600 shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/20"
              }`}
            >
              Create
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-6 sm:mb-8 lg:mb-10 transition-all duration-300 break-words text-center">
          {activeTab === "connect" ? "Connect your Sui wallet" : "Create a Slush wallet"}
        </h1>

        <div className="relative overflow-hidden">
          {/* Connect Sui Wallet Tab */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeTab === "connect" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 absolute inset-0"
            }`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleConnectWallet()
              }}
              className="space-y-4 sm:space-y-5 lg:space-y-6"
            >

              {/* Connect wallet button */}
              <Button
                type="submit"
                className="w-full bg-white text-slate-800 hover:bg-white/90 font-medium rounded-lg h-12 sm:h-14 text-sm sm:text-base transition-all duration-200 hover:shadow-md backdrop-blur-sm"
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Connect Sui Wallet"}
              </Button>

              <p className="text-center text-white/80 text-xs sm:text-sm mt-4 sm:mt-6 lg:mt-8">
                Don't have a Sui wallet?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("create")}
                  className="text-pink-300 hover:text-pink-200 underline transition-colors duration-200"
                >
                  Create a Slush wallet
                </button>
              </p>
            </form>
          </div>

          {/* Create Slush Wallet Tab - Simplified to just a link button */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeTab === "create" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute inset-0"
            }`}
          >
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <p className="text-white/80 text-sm sm:text-base text-center leading-relaxed">
                Get started with Slush by clicking the button below. Slush will guide you through creating your wallet.
              </p>

              {/* Direct link button to Slush */}
              <Button
                onClick={handleCreateSlushWallet}
                className="w-full bg-white/90 border border-white/50 hover:bg-white text-slate-800 font-medium rounded-lg h-12 sm:h-14 text-sm sm:text-base transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Slush Wallet
              </Button>

              <p className="text-center text-white/80 text-xs sm:text-sm">
                Already have a wallet?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("connect")}
                  className="text-pink-300 hover:text-pink-200 underline transition-colors duration-200"
                >
                  Connect instead
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
