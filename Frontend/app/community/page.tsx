"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Heart,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Award,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Share,
  Bookmark,
  Search,
  Filter,
  Plus,
  Crown,
  Flame,
  Clock,
  Eye,
  RefreshCw
} from "lucide-react";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [communityStats, setCommunityStats] = useState({
    activeMembers: 15247,
    dailyDiscussions: 523,
    totalPosts: 25689,
    onlineNow: 2387
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const { toast } = useToast();

  // Community stats with dynamic data
  const communityStatsData = [
    { label: "Active Members", value: communityStats.activeMembers.toLocaleString(), icon: Users, color: "text-cyan-400" },
    { label: "Daily Discussions", value: communityStats.dailyDiscussions.toString(), icon: MessageSquare, color: "text-purple-400" },
    { label: "Total Posts", value: communityStats.totalPosts.toLocaleString(), icon: TrendingUp, color: "text-pink-400" },
    { label: "Online Now", value: communityStats.onlineNow.toLocaleString(), icon: Zap, color: "text-blue-400" }
  ];

  // Fetch community stats from API
  const fetchCommunityStats = async () => {
    try {
      setIsLoadingStats(true);
      const response = await fetch('/api/community/stats');

      if (!response.ok) {
        throw new Error('Failed to fetch community stats');
      }

      const data = await response.json();

      if (data.success) {
        setCommunityStats(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch stats');
      }
    } catch (error) {
      console.error('Error fetching community stats:', error);
      toast({
        title: "Error",
        description: "Failed to load community statistics. Using cached data.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Fetch stats on component mount and periodically
  useEffect(() => {
    fetchCommunityStats();

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchCommunityStats, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Forum categories
  const forumCategories = [
    {
      id: "general",
      name: "General Discussion",
      description: "General conversations about Sui ecosystem",
      icon: MessageSquare,
      color: "from-cyan-500 to-blue-600",
      posts: "2.1K",
      topics: 145,
      subcategories: [
        { name: "Decentralized Content", posts: "850" },
        { name: "Blockchain Technology", posts: "620" },
        { name: "Sui Ecosystem", posts: "630" }
      ]
    },
    {
      id: "creator",
      name: "Creator Hub",
      description: "For content creators and monetization",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      posts: "1.8K",
      topics: 98,
      subcategories: [
        { name: "Monetization Strategies", posts: "420" },
        { name: "Content Creation Tips", posts: "380" },
        { name: "Collaboration Opportunities", posts: "320" }
      ]
    },
    {
      id: "technical",
      name: "Technical Support",
      description: "Get help with technical issues",
      icon: Target,
      color: "from-blue-500 to-cyan-600",
      posts: "950",
      topics: 67,
      subcategories: [
        { name: "Smart Contract Help", posts: "280" },
        { name: "Walrus Storage Issues", posts: "190" },
        { name: "Development Questions", posts: "480" }
      ]
    },
    {
      id: "market",
      name: "Market Insights",
      description: "Trading, DeFi, and market analysis",
      icon: TrendingUp,
      color: "from-pink-500 to-purple-600",
      posts: "1.2K",
      topics: 89,
      subcategories: [
        { name: "Token Analysis", posts: "350" },
        { name: "DeFi Discussions", posts: "420" },
        { name: "Trading Strategies", posts: "430" }
      ]
    }
  ];

  // Featured discussions
  const featuredDiscussions = [
    {
      id: 1,
      title: "How Walrus Storage is Revolutionizing Content Creation",
      author: "CryptoSage",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoSage",
      category: "Technical",
      time: "2 hours ago",
      replies: 24,
      upvotes: 156,
      downvotes: 3,
      views: "2.1K",
      isPinned: true,
      isHot: true,
      tags: ["Walrus", "Storage", "Innovation"],
      excerpt: "Exploring how decentralized storage is changing the way we think about content ownership and distribution..."
    },
    {
      id: 2,
      title: "Monetization Strategies for Sui Content Creators",
      author: "ContentCreator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ContentCreator",
      category: "Creator Hub",
      time: "4 hours ago",
      replies: 18,
      upvotes: 89,
      downvotes: 1,
      views: "1.8K",
      isPinned: false,
      isHot: true,
      tags: ["Monetization", "Creator", "Strategy"],
      excerpt: "A comprehensive guide to earning from your content on the Sui blockchain platform..."
    },
    {
      id: 3,
      title: "Sui Ecosystem Growth: Q4 Predictions",
      author: "MarketAnalyst",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarketAnalyst",
      category: "Market Insights",
      time: "6 hours ago",
      replies: 32,
      upvotes: 124,
      downvotes: 5,
      views: "3.2K",
      isPinned: false,
      isHot: false,
      tags: ["Sui", "Ecosystem", "Predictions"],
      excerpt: "Analyzing the current state of Sui and what we can expect in the coming months..."
    }
  ];

  // Community guidelines
  const guidelines = [
    {
      title: "Respectful Communication",
      description: "Treat all community members with respect. No harassment, hate speech, or discriminatory content.",
      icon: Heart
    },
    {
      title: "Quality Content",
      description: "Post meaningful, well-researched content. Avoid spam and low-quality posts.",
      icon: Star
    },
    {
      title: "Constructive Discussions",
      description: "Engage in productive conversations. Disagreements are fine, but keep them civil.",
      icon: MessageSquare
    },
    {
      title: "Report Issues",
      description: "Use the reporting system for violations. Help keep our community safe and welcoming.",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.4),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,20,147,0.2),transparent_80%)]" />

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
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

        <div className="relative z-10 container mx-auto text-center max-w-5xl px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <Users className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Join the{" "}
              <motion.span
                className="text-cyan-400 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Sui Times
              </motion.span>
              {" "}Community
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Connect with fellow creators, share insights, and shape the future of decentralized content on the Sui blockchain.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-10 py-5 text-xl font-semibold rounded-2xl shadow-2xl shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-cyan-400/50"
              >
                <MessageSquare className="w-6 h-6 mr-3" />
                Start Discussing
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/50 text-white hover:bg-white hover:text-black px-10 py-5 text-xl font-semibold rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <Users className="w-6 h-6 mr-3" />
                Explore Forums
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Community <span className="text-cyan-400">Statistics</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how our community is growing and thriving together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStatsData.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-card/80 backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    {isLoadingStats && (
                      <RefreshCw className="w-4 h-4 text-muted-foreground animate-spin" />
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${stat.color === 'text-cyan-400' ? 'from-cyan-500 to-blue-600' : stat.color === 'text-purple-400' ? 'from-purple-500 to-pink-600' : stat.color === 'text-pink-400' ? 'from-pink-500 to-purple-600' : 'from-blue-500 to-cyan-600'} transition-all duration-1000`} style={{ width: '75%' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Forum Categories Section */}
      <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Discussion <span className="text-cyan-400">Forums</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join conversations in our specialized forums covering all aspects of the Sui ecosystem.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {forumCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-cyan-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{category.posts} posts</span>
                      <span>•</span>
                      <span>{category.topics} topics</span>
                    </div>
                    <div className="space-y-2">
                      {category.subcategories.map((sub, subIndex) => (
                        <div key={subIndex} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{sub.name}</span>
                          <span className="text-cyan-400 font-medium">{sub.posts} posts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Discussions Section */}
      <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-cyan-400">Discussions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Check out the most engaging conversations happening in our community.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card/50 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'hot', 'trending', 'new'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedCategory(filter)}
                  className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                    selectedCategory === filter
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                      : 'bg-card/50 border-white/10 text-muted-foreground hover:bg-card/80'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {featuredDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <img
                    src={discussion.avatar}
                    alt={discussion.author}
                    className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
                  />

                  <div className="flex-1">
                    {/* Discussion Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.isPinned && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full text-xs text-yellow-400">
                              <Crown className="w-3 h-3" />
                              Pinned
                            </div>
                          )}
                          {discussion.isHot && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full text-xs text-red-400">
                              <Flame className="w-3 h-3" />
                              Hot
                            </div>
                          )}
                          <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-400 font-medium">
                            {discussion.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2 hover:text-cyan-400 transition-colors cursor-pointer">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>by {discussion.author}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {discussion.time}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {discussion.views} views
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Discussion Content */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {discussion.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-green-400 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{discussion.upvotes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                          <span className="text-sm">{discussion.downvotes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors">
                          <Reply className="w-4 h-4" />
                          <span className="text-sm">{discussion.replies} replies</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-muted-foreground hover:text-purple-400 transition-colors">
                          <Share className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-yellow-400 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines Section */}
      <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Community <span className="text-cyan-400">Guidelines</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Help us maintain a positive and productive community for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={index}
                className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                    <guideline.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{guideline.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{guideline.description}</p>
                  </div>
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
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Users className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Conversation?
              </span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Become part of the Sui Times community and help shape the future of decentralized content creation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <Plus className="w-6 h-6 mr-3" />
                Create Account
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/60 text-white hover:bg-white hover:text-black px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <MessageSquare className="w-6 h-6 mr-3" />
                Browse Discussions
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityPage;