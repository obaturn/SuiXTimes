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
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 lg:p-10 shadow-2xl">
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
          <div className="flex bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("connect")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-2 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === "connect"
                  ? "bg-white/20 backdrop-blur-sm text-white border border-white/20 shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Connect
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-2 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === "create"
                  ? "bg-white/20 backdrop-blur-sm text-white border border-white/20 shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Create
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-6 sm:mb-8 lg:mb-10 transition-all duration-300 break-words text-center">
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

              {/* Google login button */}
              <Button
                type="button"
                onClick={() => onSocialLogin("Google")}
                className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-12 sm:h-14 text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              {/* OR separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="bg-black/40 px-2 text-white/60">OR</span>
                </div>
              </div>

              {/* Connect wallet button */}
              <Button
                type="submit"
                className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-12 sm:h-14 text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Connect Sui Wallet"}
              </Button>

              <p className="text-center text-white/40 text-xs sm:text-sm mt-4 sm:mt-6 lg:mt-8">
                Don't have a Sui wallet?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("create")}
                  className="text-white/70 hover:text-white underline transition-colors duration-200"
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
              <p className="text-white/60 text-sm sm:text-base text-center leading-relaxed">
                Get started with Slush by clicking the button below. Slush will guide you through creating your wallet.
              </p>

              {/* Direct link button to Slush */}
              <Button
                onClick={handleCreateSlushWallet}
                className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-12 sm:h-14 text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Slush Wallet
              </Button>

              <p className="text-center text-white/40 text-xs sm:text-sm">
                Already have a wallet?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("connect")}
                  className="text-white/70 hover:text-white underline transition-colors duration-200"
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
