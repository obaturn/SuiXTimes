"use client";

import React from "react";
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
  Zap,
  Target,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/footer";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const EcosystemPage = () => {

  // Ecosystem categories with their data
  const ecosystemCategories = [
    {
      id: "defi",
      name: "DeFi Protocols",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      description: "Decentralized finance applications and protocols",
      platforms: [
        { name: "SuiSwap", users: "150K+", tvl: "$500M+", status: "Live" },
        { name: "Cetus Protocol", users: "80K+", tvl: "$200M+", status: "Live" },
        { name: "Sui Lending", users: "45K+", tvl: "$100M+", status: "Beta" }
      ]
    },
    {
      id: "nfts",
      name: "NFT Marketplaces",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      description: "NFT trading platforms and collections",
      platforms: [
        { name: "SuiNS", users: "120K+", volume: "$50M+", status: "Live" },
        { name: "Sui Marketplace", users: "90K+", volume: "$30M+", status: "Live" },
        { name: "BlueMove", users: "60K+", volume: "$15M+", status: "Live" }
      ]
    },
    {
      id: "gaming",
      name: "Gaming dApps",
      icon: Target,
      color: "from-orange-500 to-red-500",
      description: "Blockchain games and gaming platforms",
      platforms: [
        { name: "Sui Heroes", users: "200K+", players: "50K+", status: "Live" },
        { name: "Move and Earn", users: "100K+", players: "25K+", status: "Live" },
        { name: "Sui Quest", users: "75K+", players: "15K+", status: "Beta" }
      ]
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      description: "Core infrastructure and developer tools",
      platforms: [
        { name: "Sui RPC", users: "500K+", requests: "10M/day", status: "Live" },
        { name: "Walrus Storage", users: "300K+", data: "1TB+", status: "Live" },
        { name: "Sui Bridge", users: "250K+", volume: "$100M+", status: "Live" }
      ]
    },
    {
      id: "social",
      name: "Social dApps",
      icon: MessageSquare,
      color: "from-pink-500 to-rose-500",
      description: "Social networks and communication platforms",
      platforms: [
        { name: "Sui Social", users: "180K+", posts: "1M+", status: "Live" },
        { name: "Decentralized Chat", users: "120K+", messages: "500K+", status: "Live" },
        { name: "Sui Connect", users: "85K+", connections: "200K+", status: "Beta" }
      ]
    },
    {
      id: "tools",
      name: "Developer Tools",
      icon: BarChart3,
      color: "from-indigo-500 to-purple-500",
      description: "Development tools and analytics platforms",
      platforms: [
        { name: "Sui Explorer", users: "400K+", txns: "5M/day", status: "Live" },
        { name: "Sui Dev Kit", users: "150K+", projects: "2K+", status: "Live" },
        { name: "Sui Analytics", users: "100K+", reports: "10K+", status: "Live" }
      ]
    }
  ];

  // Featured projects - Top projects in Sui ecosystem
  const featuredProjects = [
    {
      name: "SuiSwap",
      role: "Leading DEX on Sui",
      avatar: "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762463948/use2_xijebb.png",
      users: "150K",
      tvl: "$500M",
      volume: "$2.1B",
      badge: "Top DeFi Protocol"
    },
    {
      name: "Cetus Protocol",
      role: "AMM & Concentrated Liquidity",
      avatar: "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762462229/20251106_2143_image_wwtwry.png",
      users: "80K",
      tvl: "$200M",
      volume: "$1.5B",
      badge: "Innovation Leader"
    },
    {
      name: "SuiNS",
      role: "Decentralized Naming Service",
      avatar: "https://res.cloudinary.com/dcejzfbo8/image/upload/v1762463931/use1_en87ux.png",
      users: "120K",
      tvl: "$50M",
      volume: "$25M",
      badge: "Infrastructure Project"
    }
  ];

  // Stats
  const stats = [
    { label: "Active dApps", value: "1,200+", icon: Globe },
    { label: "Total Value Locked", value: "$2.5B+", icon: TrendingUp },
    { label: "Daily Transactions", value: "5M+", icon: Zap },
    { label: "Unique Users", value: "500K+", icon: Users }
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
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Sui{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Ecosystem
                </span>
                {" "}Hub
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore the thriving Sui ecosystem of platforms, tools, and communities. Discover dApps, DeFi protocols, NFT marketplaces, and innovative projects building on Sui blockchain.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore dApps
                </Button>
                <Button variant="outline" className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 px-8 py-4 rounded-lg font-medium text-lg">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Ecosystem Stats
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Stats Section - Simple */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Categories - Simple */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ecosystem Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover different types of applications and platforms building on Sui blockchain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystemCategories.map((category, index) => (
              <div key={category.id} className="bg-muted border border-border rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="space-y-2">
                      {category.platforms.slice(0, 2).map((platform, pIndex) => (
                        <div key={pIndex} className="flex items-center justify-between p-2 bg-card rounded border">
                          <div>
                            <div className="font-medium text-sm text-foreground">{platform.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {platform.users} users
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            platform.status === 'Live' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {platform.status}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-4 border-blue-300 dark:border-blue-500 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-200 font-medium"
                    >
                      View All {category.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators - Simple */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Top Ecosystem Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover successful projects and protocols building the future of Web3 on Sui blockchain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <img
                      src={project.avatar}
                      alt={project.name}
                      className="w-20 h-20 rounded-full border-4 border-blue-200 dark:border-blue-700"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-foreground">{project.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{project.role}</p>
                  <div className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium border border-yellow-200 dark:border-yellow-700">
                    {project.badge}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{project.users}</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{project.tvl}</div>
                    <div className="text-xs text-muted-foreground">TVL</div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white">
                  View Project
                </Button>
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
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start{" "}
              <span className="text-yellow-300">
                Earning Today
              </span>
            </h2>

            <p className="text-lg text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and entrepreneurs building the future of Web3 on Sui. Launch your dApp, grow your protocol, and scale your project to millions of users.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Build on Sui
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-medium text-lg">
                <Globe className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EcosystemPage;