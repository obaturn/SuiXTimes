"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { AuthCard } from "@/components/auth/auth-card"
import { WavyBackground } from "@/components/ui/wavy-background";
import Footer from "@/components/footer";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import Navbar from "@/components/homepage/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useColorTheme, getWaveColors } from "@/components/color-theme-provider";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { theme } = useColorTheme()
  const isLightMode = theme === "light"

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
        <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${
          isLightMode ? "bg-gray-50 text-gray-900" : "bg-black text-white"
        }`}>
          <div className={`absolute inset-0 bg-gradient-to-b ${
            isLightMode
              ? "from-gray-50 via-white to-gray-50 opacity-95"
              : "from-black via-gray-900 to-black opacity-80"
          }`} />
          <div className="absolute inset-0 z-0">
            <WavyBackground
              colors={getWaveColors(theme)}
              waveWidth={30}
              blur={10}
              speed="slow"
              waveOpacity={isLightMode ? 0.15 : 0.3}
            />
          </div>
          <div className="relative z-10 container mx-auto text-center max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight ${
                isLightMode ? "text-gray-500" : "text-gray-100"
              }`}>
                Sui News. Zero Clutter.
              </h1>
              <div className="overflow-hidden mb-8 max-w-7xl mx-auto">
                <motion.div
                  className="flex whitespace-nowrap"
                  animate={{ x: [0, -100] }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 15,
                      ease: "linear",
                    },
                  }}
                >
                  <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed inline-block pr-32 ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}>
                    One bookmark. Every crucial update. Whether you're building on Move or just following the ecosystem, get the signal without the noise, curated daily.
                  </h2>
                  <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed inline-block pr-32 ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}>
                    One bookmark. Every crucial update. Whether you're building on Move or just following the ecosystem, get the signal without the noise, curated daily.
                  </h2>
                </motion.div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </motion.div>
          </div>
        </section>

        <FeaturesSection />

        <Footer />
      </div>
      <Toaster />
    </>
  )
}