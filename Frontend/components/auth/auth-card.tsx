"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWallets, useConnectWallet, useCurrentAccount } from "@mysten/dapp-kit"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const WalletIcon = ({ src, alt, name }: { src?: string; alt: string; name: string }) => {
  return (
    <span className="w-6 h-6 bg-white/20 rounded inline-flex items-center justify-center">
      <span className="text-xs font-bold text-white">W</span>
    </span>
  );
};

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
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)
  const wallets = useWallets()
  const { mutateAsync: connect } = useConnectWallet()
  const account = useCurrentAccount()
  const router = useRouter()

  // If already connected, redirect to dashboard
  React.useEffect(() => {
    if (account) {
      router.push('/dashboard')
    }
  }, [account, router])

  const handleRedirect = () => {
    window.open("https://www.youtube.com/@diecastbydollarall", "_blank")
  }

  const handleConnectWallet = async (walletName: string) => {
    const wallet = wallets.find(w => w.name === walletName)
    if (!wallet) {
      toast.error(`Wallet ${walletName} not found`)
      return
    }

    setConnectingWallet(walletName)
    try {
      await connect({ wallet })
      toast.success("Wallet connected successfully!")
      // The useEffect above will handle the redirect
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast.error(`Failed to connect ${walletName}`)
    } finally {
      setConnectingWallet(null)
    }
  }

  const handleCreateSlushWallet = () => {
    window.open("https://my.slush.app/Welcome", "_blank")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-slate-800/40 dark:bg-slate-900/50 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 border border-white/20 dark:border-white/10 backdrop-blur-xl relative overflow-hidden">
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-60 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-lg"></div>
        {/* Content */}
        <div className="relative z-10">
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
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              {/* Available Wallets */}
              <div className="space-y-3">
                {wallets.length > 0 ? (
                  <>
                    <p className="text-white/80 text-sm text-center mb-4">Choose your wallet</p>
                    {wallets.map((wallet) => (
                      <Button
                        key={wallet.name}
                        onClick={() => handleConnectWallet(wallet.name)}
                        className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 font-medium rounded-lg h-12 sm:h-14 text-sm sm:text-base transition-all duration-200 hover:shadow-md backdrop-blur-sm flex items-center justify-center gap-3"
                        disabled={connectingWallet !== null}
                      >
                        <WalletIcon src={wallet.icon} alt={wallet.name} name={wallet.name} />
                        {connectingWallet === wallet.name ? "Connecting..." : `Connect ${wallet.name}`}
                      </Button>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="text-white/80 text-sm text-center mb-4">Choose your wallet</p>
                    <Button
                      onClick={() => window.open("https://suiwallet.com", "_blank")}
                      className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 font-medium rounded-lg h-12 sm:h-14 text-sm sm:text-base transition-all duration-200 hover:shadow-md backdrop-blur-sm"
                    >
                      Install Sui Wallet
                    </Button>
                  </>
                )}
              </div>

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
            </div>
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
    </div>
  )
}
