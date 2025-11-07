"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Globe,
  Users,
  TrendingUp,
  BookOpen,
  Video,
  Mic,
  BarChart3,
  MessageSquare,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/footer";

const EcosystemPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Content categories with their data
  const contentCategories = [
    {
      id: "news",
      name: "News Platforms",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      description: "Real-time Sui blockchain news and updates",
      platforms: [
        { name: "Sui Times News", users: "50K+", articles: "10K+", status: "Live" },
        { name: "BlockBeat Sui", users: "25K+", articles: "5K+", status: "Live" },
        { name: "Chain Chronicle", users: "15K+", articles: "3K+", status: "Beta" }
      ]
    },
    {
      id: "articles",
      name: "Article Platforms",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      description: "In-depth analysis and educational content",
      platforms: [
        { name: "Sui Scholar", users: "30K+", articles: "8K+", status: "Live" },
        { name: "DeFi Digest", users: "20K+", articles: "4K+", status: "Live" },
        { name: "Tech Tales", users: "12K+", articles: "2K+", status: "Live" }
      ]
    },
    {
      id: "videos",
      name: "Video Platforms",
      icon: Video,
      color: "from-purple-500 to-pink-500",
      description: "Video content and tutorials",
      platforms: [
        { name: "Sui Studios", users: "40K+", videos: "2K+", status: "Live" },
        { name: "BlockLearn", users: "18K+", videos: "800+", status: "Live" },
        { name: "Crypto Visuals", users: "8K+", videos: "300+", status: "Beta" }
      ]
    },
    {
      id: "podcasts",
      name: "Podcast Networks",
      icon: Mic,
      color: "from-orange-500 to-red-500",
      description: "Audio content and discussions",
      platforms: [
        { name: "Sui Soundwaves", users: "15K+", episodes: "500+", status: "Live" },
        { name: "Chain Chat", users: "10K+", episodes: "300+", status: "Live" },
        { name: "DeFi Dialogues", users: "6K+", episodes: "150+", status: "Live" }
      ]
    },
    {
      id: "analytics",
      name: "Analytics Tools",
      icon: BarChart3,
      color: "from-indigo-500 to-purple-500",
      description: "Data and analytics platforms",
      platforms: [
        { name: "Sui Analytics Pro", users: "35K+", reports: "50K+", status: "Live" },
        { name: "Chain Metrics", users: "22K+", reports: "25K+", status: "Live" },
        { name: "DeFi Dashboard", users: "14K+", reports: "15K+", status: "Beta" }
      ]
    },
    {
      id: "community",
      name: "Community Hubs",
      icon: MessageSquare,
      color: "from-pink-500 to-rose-500",
      description: "Discussion and community platforms",
      platforms: [
        { name: "Sui Community Hub", users: "100K+", posts: "200K+", status: "Live" },
        { name: "DeFi Discussions", users: "45K+", posts: "80K+", status: "Live" },
        { name: "Creator Connect", users: "25K+", posts: "40K+", status: "Live" }
      ]
    }
  ];

  // Featured creators - Content creators on Sui Times platform
  const featuredCreators = [
    {
      name: "Content Creator",
      role: "Writes articles on Sui Times",
      avatar: "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762463948/use2_xijebb.png",
      followers: "TBA",
      articles: "TBA",
      badge: "Author"
    },
    {
      name: "Content Creator",
      role: "Creates content on Sui Times",
      avatar: "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762462229/20251106_2143_image_wwtwry.png",
      followers: "TBA",
      articles: "TBA",
      badge: "Author"
    },
    {
      name: "Content Creator",
      role: "Publishes on Sui Times",
      avatar: "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762463931/use1_en87ux.png",
      followers: "TBA",
      articles: "TBA",
      badge: "Author"
    }
  ];

  // Stats
  const stats = [
    { label: "Active Creators", value: "25,000+", icon: Users },
    { label: "Content Pieces", value: "500,000+", icon: BookOpen },
    { label: "Monthly Readers", value: "2M+", icon: TrendingUp },
    { label: "Platforms", value: "50+", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(56,189,248,0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,20,147,0.2),transparent_70%)]" />

          {/* Content Nodes Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  i % 3 === 0 ? 'bg-cyan-400' :
                  i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            className="text-center text-white max-w-6xl px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <Globe className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Content Universe
              </motion.span>
              {" "}of Sui
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Discover the thriving ecosystem of content creators, platforms, and communities building the future of decentralized publishing.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-5 text-xl font-semibold rounded-2xl shadow-2xl shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-cyan-400/50">
                <Users className="w-6 h-6 mr-2" />
                Join Ecosystem
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white hover:text-black px-10 py-5 text-xl font-semibold rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <BarChart3 className="w-6 h-6 mr-2" />
                View Analytics
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.05),transparent_70%)]" />
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
              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Content Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore diverse content types and platforms within the Sui ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-card/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-cyan-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="space-y-3">
                    {category.platforms.slice(0, 2).map((platform, pIndex) => (
                      <div key={pIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{platform.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {platform.users} users • {Object.values(platform).find((v, i) => i > 1 && typeof v === 'string')} content
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          platform.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {platform.status}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full mt-6 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                  >
                    View All {category.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-32 bg-gradient-to-b from-muted/20 to-background relative">
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
              className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Star className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Featured Creators
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the top content creators shaping the future of decentralized publishing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCreators.map((creator, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-card/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 transform hover:-translate-y-2">
                  <div className="text-center mb-6">
                    <div className="relative inline-block mb-4">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-20 h-20 rounded-full border-4 border-gradient-to-r from-cyan-500 to-purple-500"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{creator.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{creator.role}</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 border border-yellow-400/30`}>
                      {creator.badge}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{creator.followers}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{creator.articles}</div>
                      <div className="text-xs text-muted-foreground">Articles</div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                    Follow Creator
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.2),transparent_70%)]" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Target className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Content Revolution
              </span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Be part of the growing ecosystem of creators, platforms, and communities building the future of decentralized content.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <Zap className="w-6 h-6 mr-3" />
                Start Creating
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/60 text-white hover:bg-white hover:text-black px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Users className="w-6 h-6 mr-3" />
                Explore Ecosystem
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EcosystemPage;