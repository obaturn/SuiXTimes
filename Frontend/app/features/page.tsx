"use client";

import React from "react";
import { ArrowRight, CheckCircle, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/footer";

const FeaturesPage = () => {

  const faqs = [
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
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Simple */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover the Power of{" "}
                <span className="text-blue-600">
                  Sui Times
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience decentralized content creation with full ownership, direct monetization, and censorship-resistant storage on the Sui blockchain.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Creating
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-medium text-lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Small Images Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how Sui Times transforms content creation and distribution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762463948/use2_xijebb.png",
              "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762462229/20251106_2143_image_wwtwry.png",
              "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762463931/use1_en87ux.png",
              "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762462409/20251106_2153_image_nw7smy.png"
            ].map((image, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose Sui Times?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of content creation with blockchain-powered features that give you complete control and ownership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Full Ownership",
                description: "Your content belongs to you forever. No platform can censor or remove your work with our decentralized storage."
              },
              {
                icon: Zap,
                title: "Direct Monetization",
                description: "Earn directly from your readers through smart contracts and community voting on the Sui blockchain."
              },
              {
                icon: Globe,
                title: "Lightning Fast",
                description: "Built on Sui blockchain for instant transactions and seamless user experience with sub-second finality."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Sui Times and decentralized content creation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-100 transition-colors">
                      <h3 className="text-lg font-semibold pr-4 text-left text-gray-900">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

      {/* CTA Section - Simple */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>

            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who have discovered the power of decentralized content. Start your journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Create Your First Article
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-medium text-lg">
                <Shield className="w-5 h-5 mr-2" />
                Explore Community
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-white">
              {[
                { icon: CheckCircle, text: "Free to start", desc: "No upfront costs" },
                { icon: CheckCircle, text: "Full ownership", desc: "Your content, your rules" },
                { icon: CheckCircle, text: "Community support", desc: "24/7 creator community" }
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