"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { AuthCard } from "@/components/auth/auth-card"

import Footer from "@/components/footer";

import Navbar from "@/components/homepage/Navbar";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Shield, Globe } from "lucide-react";

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
        {/* Hero Section - Clean and Simple */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900">
          <div className="container mx-auto text-center max-w-4xl px-4 py-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  The Future is{" "}
                  <span className="text-blue-600">
                    Fluid
                  </span>
                  {" "}with{" "}
                  <span className="text-blue-500 font-extrabold">
                    SuiTimes
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Your all-in-one platform for the latest news, analytics, and community insights from the Sui blockchain ecosystem.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg">
                  Explore News
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-medium text-lg"
                  onClick={() => window.location.href = '/community'}
                >
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section - Clean and Simple */}
        <div className="w-full flex-1 flex items-start justify-center px-4 py-16 pb-24 sm:px-6 lg:px-8 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-12 items-start">
              {/* Left Side - Landing Page Content */}
              <div className="space-y-6 sm:space-y-8 text-gray-900 order-2 lg:order-1">
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    Welcome to{" "}
                    <span className="block text-blue-600">
                      SuiTimes
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
                    Your decentralized content platform for creating, sharing, and monetizing articles on the Sui blockchain with full ownership and censorship resistance.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-6 sm:gap-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">Decentralized Content Creation</h3>
                        <p className="text-gray-600 leading-relaxed">Create and publish articles with full ownership using Sui blockchain and Walrus decentralized storage</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">Community Voting & Monetization</h3>
                        <p className="text-gray-600 leading-relaxed">Earn from your content through community upvotes, downvotes, and direct reader support via smart contracts</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">Censorship Resistant Storage</h3>
                        <p className="text-gray-600 leading-relaxed">Your articles are stored on Walrus decentralized storage, ensuring they remain permanently accessible and censorship-resistant</p>
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

        {/* FAQ Section - Simple */}
        <section className="py-16 bg-white" id="faq">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-blue-600 md:text-4xl font-bold mb-4 ">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about Sui Times and decentralized content creation.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
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
                <div key={index} className="mb-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-100 transition-colors">
                        <h3 className="text-lg font-semibold pr-4 text-left text-gray-900">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center group-open:bg-blue-700 transition-colors">
                          <svg className="w-3 h-3 text-white transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <div className="w-full h-px bg-gray-200 mb-4" />
                        <p className="text-gray-600 leading-relaxed">
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

        {/* Ecosystem Preview Section - Simple */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the <span className="text-blue-600">Content Universe</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the thriving ecosystem of creators, platforms, and communities building the future of decentralized publishing on Sui.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium">
                Explore Ecosystem
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <Toaster />
    </>
  )
}