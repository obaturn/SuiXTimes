"use client";

import React from "react";
import { ArrowRight, CheckCircle, Zap, Shield, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/footer";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const FeaturesPage = () => {

  const faqs = [
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
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Simple */}
      <BackgroundBeamsWithCollision className="min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Discover the Power of{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Sui X Times
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your comprehensive Sui news aggregation platform, bringing together real-time updates, Twitter feeds, educational resources, and DeFi token insights all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Exploring News
                </Button>
                <Button variant="outline" className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 px-8 py-4 rounded-lg font-medium text-lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Small Images Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how Sui X Times revolutionizes Sui ecosystem news consumption and community engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762463948/use2_xijebb.png",
              "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762462229/20251106_2143_image_wwtwry.png",
              "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762463931/use1_en87ux.png",
              "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762462409/20251106_2153_image_nw7smy.png"
            ].map((image, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={image}
                  alt={`Feature ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Simple */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose Sui X Times?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed with comprehensive Sui blockchain news, real-time social feeds, and gamified learning experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Real-time Twitter Feed",
                description: "Stay updated with the latest Sui-related tweets and discussions from key influencers, projects, and community leaders. Get instant notifications on important announcements and trending topics."
              },
              {
                icon: Shield,
                title: "Sui World News",
                description: "Comprehensive global news coverage of the Sui ecosystem, including partnerships, technological developments, market updates, and breaking news from around the world."
              },
              {
                icon: CheckCircle,
                title: "Article Writing & Publishing",
                description: "Write and publish articles about Sui blockchain with full ownership and community monetization features. Share your insights and earn from reader engagement through smart contracts."
              },
              {
                icon: Zap,
                title: "Event Tracking & Following",
                description: "Follow the latest Sui events, conferences, and community gatherings with real-time updates and notifications. Never miss important meetups, AMAs, and ecosystem developments."
              },
              {
                icon: TrendingUp,
                title: "DeFi Token Watchlist & Rewards",
                description: "Track best performing tokens with our advanced watchlist feature. Earn exclusive NFT rewards for completing reading streaks and staying engaged with Sui ecosystem news."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-muted border border-border rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Simple */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Sui X Times and Sui news aggregation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-accent transition-colors">
                      <h3 className="text-lg font-semibold pr-4 text-left text-foreground">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <div className="w-full h-px bg-border mb-4" />
                      <p className="text-muted-foreground leading-relaxed">
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

      {/* CTA Section - Simple */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Stay Informed?
            </h2>

            <p className="text-lg text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
              Join thousands of users who stay ahead of the Sui ecosystem. Start exploring news, earn rewards, and become a Sui expert today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Start Reading News
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-medium text-lg">
                <Shield className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-white">
              {[
                { icon: CheckCircle, text: "Free to use", desc: "No subscription fees" },
                { icon: CheckCircle, text: "Real-time updates", desc: "Stay ahead of the curve" },
                { icon: CheckCircle, text: "NFT rewards", desc: "Earn for engagement" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <item.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-bold text-lg mb-2">{item.text}</h4>
                  <p className="text-blue-100 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;