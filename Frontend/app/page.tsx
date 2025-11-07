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
import { ArrowRight } from "lucide-react";

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
    // Wallet connection is now handled by the AuthCard component
    // This function is kept for compatibility but wallet connection happens in AuthCard
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
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,20,147,0.2),transparent_80%)]" />
          <div className="relative z-10 container mx-auto text-center max-w-4xl px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The Future is{" "}
                <motion.span
                  className="text-cyan-400 inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Fluid
                </motion.span>
                {" "}with{" "}
                <motion.span
                  className="text-pink-400 font-extrabold inline-block relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{
                      scale: [1, 1.1, 1],
                      textShadow: [
                        "0 0 0px rgba(255, 20, 147, 0)",
                        "0 0 20px rgba(255, 20, 147, 0.5)",
                        "0 0 0px rgba(255, 20, 147, 0)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    SuiTimes
                  </motion.span>
                </motion.span>
              </motion.h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Your all-in-one platform for the latest news, analytics, and community insights from the Sui blockchain ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5"
                  onClick={() => window.location.href = '/news'}
                >
                  Explore News
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                  onClick={() => window.location.href = '/community'}
                >
                  Join Community
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="w-full flex-1 flex items-start justify-center px-4 py-16 pb-24 sm:px-6 lg:px-8 relative">
          {/* Clean Background matching Features page style */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />

          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-12 items-start">
              {/* Left Side - Landing Page Content */}
              <div className="space-y-6 sm:space-y-8 text-foreground order-2 lg:order-1 relative z-20">
                  <div className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                      Welcome to{" "}
                      <span className="block text-pink-400">
                        Sui Times
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                      Your decentralized content platform for creating, sharing, and monetizing articles on the Sui blockchain with full ownership and censorship resistance.
                    </p>
                  </div>

                  {/* Feature Cards */}
                  <div className="grid gap-6 sm:gap-8">
                    <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-white/10 hover:bg-card/90 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-foreground">Decentralized Content Creation</h3>
                          <p className="text-muted-foreground leading-relaxed">Create and publish articles with full ownership using Sui blockchain and Walrus decentralized storage</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-white/10 hover:bg-card/90 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-foreground">Community Voting & Monetization</h3>
                          <p className="text-muted-foreground leading-relaxed">Earn from your content through community upvotes, downvotes, and direct reader support via smart contracts</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-white/10 hover:bg-card/90 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-foreground">Censorship Resistant Storage</h3>
                          <p className="text-muted-foreground leading-relaxed">Your articles are stored on Walrus decentralized storage, ensuring they remain permanently accessible and censorship-resistant</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Auth Card */}
                <div className="order-1 lg:order-2 w-full relative z-20" id="auth-card">
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

        {/* FAQ Section */}
        <section className="py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,20,147,0.05),transparent_70%)]" />

          <div className="container mx-auto px-4 relative">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about Sui Times and decentralized content creation.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  question: "What is Sui Times?",
                  answer: "Sui Times is a decentralized content platform built on the Sui blockchain, allowing users to create, share, and monetize articles through smart contracts and decentralized storage."
                },
                {
                  question: "How does content storage work?",
                  answer: "We use Walrus decentralized storage to ensure your content remains censorship-resistant and permanently available. Content is stored off-chain while metadata and ownership are managed on-chain."
                },
                {
                  question: "Is Sui Times free to use?",
                  answer: "Yes! Sui Times is completely free for content creation and reading. Users only pay minimal gas fees for blockchain interactions, and storage costs are covered by the platform initially."
                },
                {
                  question: "How do I earn from my content?",
                  answer: "Content creators can earn through community voting, premium subscriptions, and direct support from readers. Our smart contracts ensure fair revenue distribution."
                },
                {
                  question: "What makes Sui Times different?",
                  answer: "Unlike traditional platforms, Sui Times gives you full ownership of your content, censorship resistance, and direct monetization through blockchain technology."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-8 hover:bg-white/5 transition-colors">
                        <h3 className="text-xl font-semibold pr-4 text-left text-foreground group-hover:text-cyan-400 transition-colors">
                          {faq.question}
                        </h3>
                        <motion.div
                          className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
                          animate={{ rotate: 0 }}
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </summary>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-6" />
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </details>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Preview Section */}
        <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,20,147,0.1),transparent_50%)]" />

          <div className="container mx-auto px-4 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Join the <span className="text-cyan-400">Content Universe</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the thriving ecosystem of creators, platforms, and communities building the future of decentralized publishing on Sui.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: "📰",
                  title: "News Platforms",
                  description: "Real-time Sui blockchain news and updates"
                },
                {
                  icon: "📝",
                  title: "Article Hubs",
                  description: "In-depth analysis and educational content"
                },
                {
                  icon: "🎥",
                  title: "Video Studios",
                  description: "Tutorials and visual content creation"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card/80 backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg"
                onClick={() => window.location.href = '/ecosystem'}
              >
                Explore Ecosystem
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
        <Toaster />
      </div>
    </>
  )
}