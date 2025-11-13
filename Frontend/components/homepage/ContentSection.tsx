import React from 'react';
import { AuthCard } from "@/components/auth/auth-card";
import { CheckCircle, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface ContentSectionProps {
  isLoading: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  onSignIn: (e: React.FormEvent) => void;
  onSignUp: (e: React.FormEvent) => void;
  onSocialLogin: (provider: string) => void;
  onForgotPassword: () => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
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
}) => {
  const features = [
    {
      icon: Zap,
      title: "Decentralized Content Creation",
      description: "Create and publish articles with full ownership using Sui blockchain and Walrus decentralized storage"
    },
    {
      icon: CheckCircle,
      title: "Community Voting & Monetization",
      description: "Earn from your content through community upvotes, downvotes, and direct reader support via smart contracts"
    },
    {
      icon: Shield,
      title: "Censorship Resistant Storage",
      description: "Your articles are stored on Walrus decentralized storage, ensuring they remain permanently accessible and censorship-resistant"
    }
  ];

  return (
    <div className="w-full flex-1 flex items-start justify-center px-4 py-16 pb-24 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-12 items-start">
          {/* Left Side - Landing Page Content */}
          <motion.div
            className="space-y-6 sm:space-y-8 text-gray-900 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
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
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Auth Card */}
          <motion.div
            className="order-1 lg:order-2 w-full"
            id="auth-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AuthCard
              isLoading={isLoading}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              onSignIn={onSignIn}
              onSignUp={onSignUp}
              onSocialLogin={onSocialLogin}
              onForgotPassword={onForgotPassword}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;