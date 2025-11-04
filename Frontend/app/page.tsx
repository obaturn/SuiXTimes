"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { AuthCard } from "@/components/auth/auth-card"
import { WavyBackground } from "@/components/ui/wavy-background";
import Footer from "@/components/footer";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Wallet connected!",
        description: "Welcome to Sui ecosystem.",
      })
    }, 1500)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Wallet created!",
        description: "Your Slush wallet has been created successfully.",
      })
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} login`,
      description: `Redirecting to ${provider}...`,
    })
  }

  const handleForgotPassword = () => {
    toast({
      title: "Reset link sent",
      description: "Check your email for password reset instructions.",
    })
  }

  return (
    <>
      {/* Single scrollable container */}
      <div className="relative w-full min-h-screen flex flex-col overflow-y-auto">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-black via-gray-900 to-black py-8 sm:py-12 lg:py-16 px-4 min-h-[50vh] flex items-center">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="bouncing-logo flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Sui Times
                </h1>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Stay Updated with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 mt-1">
                Sui Blockchain
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed">
              Get the latest news, insights, and updates from the Sui ecosystem. From developer announcements to market trends, stay ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Read Latest News
              </button>
              <button className="w-full sm:w-auto border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 text-sm sm:text-base">
                Explore Ecosystem
              </button>
            </div>
          </div>
        </section>

        <WavyBackground
          className="w-full flex-1"
          containerClassName="w-full flex-1"
          colors={["#38bdf8", "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981"]}
          waveWidth={60}
          blur={15}
          speed="slow"
          waveOpacity={0.4}
          backgroundFill="radial-gradient(circle at center, #0f0f23 0%, #000000 100%)"
        >
          <div className="w-full flex-1 flex items-start justify-center px-4 py-8 pb-16 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-12 items-start">
                {/* Left Side - Landing Page Content */}
                <div className="space-y-4 sm:space-y-6 text-white order-2 lg:order-1">
                  <div className="space-y-2 sm:space-y-3">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                      Welcome to the
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400">
                        Sui Ecosystem
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 leading-relaxed max-w-xl">
                      Connect your wallet to access the next generation of decentralized applications built on Sui blockchain.
                    </p>
                  </div>

                  {/* Enhanced Feature Cards with Better Visibility */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 text-white">Sui World News</h3>
                          <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed">Access real-time updates and in-depth articles covering major developments across the Sui network and its partners</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 text-white">Live Metrics & Analytics</h3>
                          <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed">Track real-time TVL, token prices, network statistics, and gas fee analytics for informed decision-making</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 text-white">Community & Social Feed</h3>
                          <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed">Connect with the Sui community through official announcements, developer updates, and trending discussions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Enhanced Call-to-Action */}
                  <div className="pt-6 sm:pt-8">
                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
                      <div className="text-center">
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Ready to Get Started?</h4>
                        <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-4">New to Sui? Create your Slush wallet and join thousands of users in the ecosystem.</p>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 lg:py-4 lg:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base lg:text-lg">
                          Create Wallet Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Auth Card */}
                <div className="order-1 lg:order-2 w-full" id="auth-card">
                  <AuthCard
                    isLoading={isLoading}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    rememberMe={rememberMe}
                    setRememberMe={setRememberMe}
                    onSignIn={handleSignIn}
                    onSignUp={handleSignUp}
                    onSocialLogin={handleSocialLogin}
                    onForgotPassword={handleForgotPassword}
                  />
                </div>
              </div>
            </div>
          </div>
        </WavyBackground>
        <Footer />
      </div>
      <Toaster />
    </>
  )
}