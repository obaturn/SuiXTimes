"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { AuthCard } from "@/components/auth/auth-card"
import { WavyBackground } from "@/components/ui/wavy-background";
import Footer from "@/components/footer";
import EcosystemTokens from "@/components/homepage/EcosystemTokens";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import Navbar from "@/components/homepage/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

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
      router.push('/dashboard')
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
      router.push('/dashboard')
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
        <Navbar />
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]" />
          <div className="relative z-10 container mx-auto text-center max-w-4xl px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
                The Future is{" "}
                <span className="text-cyan-400">
                  Fluid
                </span>
                {" "}with{" "}
                <span className="text-pink-400 font-extrabold">
                  SuiTimes
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Your all-in-one platform for the latest news, analytics, and community insights from the Sui blockchain ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5"
                >
                  Explore News
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Join Community
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="w-full flex-1 flex items-start justify-center px-4 py-16 pb-24 sm:px-6 lg:px-8">
          <WavyBackground
            colors={["#38bdf8", "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981"]}
            waveWidth={30}
            blur={10}
            speed="slow"
            waveOpacity={0.3}
            className="w-full"
          >
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-12 items-start">
                {/* Left Side - Landing Page Content */}
                <div className="space-y-6 sm:space-y-8 text-white order-2 lg:order-1">
                  <div className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                      Welcome to the{" "}
                      <span className="block text-cyan-400">
                        SuiTimes Ecosystem
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl">
                      Connect your wallet to access the next generation of decentralized applications built on Sui blockchain.
                    </p>
                  </div>

                  {/* Feature Cards */}
                  <div className="grid gap-6 sm:gap-8">
                    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-2xl shadow-white/10 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-white">Sui World News</h3>
                          <p className="text-white/90 leading-relaxed">Access real-time updates and in-depth articles covering major developments across the Sui network and its partners</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-2xl shadow-white/10 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-white">Live Metrics & Analytics</h3>
                          <p className="text-white/90 leading-relaxed">Track real-time TVL, token prices, network statistics, and gas fee analytics for informed decision-making</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-2xl shadow-white/10 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-white">Community & Social Feed</h3>
                          <p className="text-white/90 leading-relaxed">Connect with the Sui community through official announcements, developer updates, and trending discussions</p>
                        </div>
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
          </WavyBackground>
        </div>

        <FeaturesSection />
        <Footer />
      </div>
      <Toaster />
    </>
  )
}