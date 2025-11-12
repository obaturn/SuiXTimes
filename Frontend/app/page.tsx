"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { AuthCard } from "@/components/auth/auth-card"
import { useColorTheme } from "@/components/color-theme-provider"

import Footer from "@/components/footer";

import Navbar from "@/components/homepage/Navbar";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Shield, Globe, TrendingUp } from "lucide-react";
import { motion } from "framer-motion"

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
        {/* Hero Section - Clean and Simple */}
        <BackgroundBeamsWithCollision className="min-h-screen">
          <div className="container mx-auto text-center max-w-4xl px-4 py-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-black dark:text-white">
                  The Future is{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Fluid
                  </span>
                  {" "}with{" "}
                  <span className="text-blue-500 dark:text-blue-300 font-extrabold">
                    Sui X Times
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Your ultimate destination for Sui blockchain news, featuring real-time updates, Twitter feeds, world news, and DeFi insights.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-cyan-600/25 transform hover:-translate-y-0.5"
                  onClick={() => window.location.href = '/features'}
                >
                  Explore Features
                </Button>
              </div>
            </div>
          </div>
        </BackgroundBeamsWithCollision>

        {/* Content Section - Clean and Simple */}
        <div className="w-full flex-1 flex items-start justify-center px-4 py-16 pb-24 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-12 items-start">
              {/* Left Side - Landing Page Content */}
              <div className="space-y-6 sm:space-y-8 text-gray-900 dark:text-white order-2 lg:order-1">
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    Welcome to{" "}
                    <span className="block text-blue-600 dark:text-blue-400">
                      Sui X Times
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                    Your comprehensive Sui news aggregation platform, bringing together real-time updates, Twitter feeds, educational resources, and DeFi token insights.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-6 sm:gap-8">
                  <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Real-time Twitter Feed</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Stay updated with the latest Sui-related tweets and discussions from key influencers and projects</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Sui World News</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Comprehensive global news coverage of the Sui ecosystem, including partnerships, developments, and market updates</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Article Writing & Publishing</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Write and publish articles about Sui blockchain with full ownership and community monetization features</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Event Tracking & Following</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Follow the latest Sui events, conferences, and community gatherings with real-time updates and notifications</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">DeFi Token Watchlist & Rewards</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Track best performing tokens with our watchlist feature and earn NFT rewards for completing reading streaks</p>
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
        </div>

        {/* Ecosystem Preview Section - Simple */}
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the <span className="text-blue-600 dark:text-blue-400">Sui News Ecosystem</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover the comprehensive network of news sources, educational resources, and community insights powering the Sui blockchain.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: "📰",
                  title: "News Aggregators",
                  description: "Real-time Sui blockchain news and updates"
                },
                {
                  icon: "📚",
                  title: "Developer Resources",
                  description: "Educational content and learning materials for devs"
                },
                {
                  icon: "📊",
                  title: "DeFi Analytics",
                  description: "Token performance tracking and market insights"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium">
                Explore Ecosystem
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section - Simple */}
        <section className="py-16 bg-white dark:bg-slate-900" id="faq">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-blue-600 dark:text-blue-400 md:text-4xl font-bold mb-4 ">
                Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to know about Sui X Times and Sui news aggregation.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "What is Sui X Times?",
                  answer: "Sui X Times is a comprehensive Sui news aggregation platform that brings together real-time updates, Twitter feeds, world news, educational resources, and DeFi token insights all in one place."
                },
                {
                  question: "How do you aggregate news?",
                  answer: "We collect and curate news from various Sui-related sources, including official announcements, Twitter feeds from key influencers, blockchain explorers, and community discussions to provide comprehensive coverage."
                },
                {
                  question: "Is Sui X Times free to use?",
                  answer: "Yes! Sui X Times is completely free for news consumption and community features. Users can access all news feeds, Twitter integrations, and basic analytics without any cost."
                },
                {
                  question: "How do I earn NFT rewards?",
                  answer: "Complete reading streaks by consistently engaging with Sui news content. Reach certain milestone levels to unlock exclusive NFT rewards that showcase your dedication to the Sui ecosystem."
                },
                {
                  question: "What makes Sui X Times different?",
                  answer: "Unlike other news platforms, Sui X Times provides comprehensive Sui-specific news aggregation, real-time Twitter integration, developer learning resources, and DeFi token tracking with gamified rewards."
                }
              ].map((faq, index) => (
                <div key={index} className="mb-4">
                  <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                        <h3 className="text-lg font-semibold pr-4 text-left text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center group-open:bg-blue-700 dark:group-open:bg-blue-600 transition-colors">
                          <svg className="w-3 h-3 text-white transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <div className="w-full h-px bg-gray-200 dark:bg-slate-600 mb-4" />
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <Toaster />
      </div>
    </>
  )
}