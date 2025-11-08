"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Newspaper,
  Search,
  Filter,
  Star,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/footer";
import NewsCard from '@/components/NewsCard';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category?: string;
}

const PublicNewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Live news data from ElizaOS
  const [liveNews, setLiveNews] = useState([
    {
      id: 1,
      title: "Loading live Sui news...",
      category: "breaking",
      time: "Just now",
      source: "ElizaOS Agent",
      urgent: false
    }
  ]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  // General news from NewsAPI
  const [generalNews, setGeneralNews] = useState<NewsArticle[]>([]);
  const [isLoadingGeneral, setIsLoadingGeneral] = useState(true);

  // Sui-specific news
  const [suiNews, setSuiNews] = useState<NewsArticle[]>([]);
  const [isLoadingSui, setIsLoadingSui] = useState(true);

  // Fetch news from all sources
  useEffect(() => {
    fetchLiveNews();
    fetchGeneralNews();
    fetchSuiNews();

    // Update timestamps every minute
    const interval = setInterval(() => {
      setLiveNews(prev => prev.map(item => ({
        ...item,
        time: updateTime(item.time)
      })));
    }, 60000);

    // Refresh news every 5 minutes
    const newsInterval = setInterval(() => {
      fetchLiveNews();
      fetchGeneralNews();
      fetchSuiNews();
    }, 300000);

    return () => {
      clearInterval(interval);
      clearInterval(newsInterval);
    };
  }, []);

  const fetchLiveNews = async () => {
    try {
      setIsLoadingNews(true);

      // Fetch from ElizaOS news API
      const response = await fetch('/api/news/live', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newsData = await response.json();
        setLiveNews(newsData);
      } else {
        // Fallback to mock data if API fails
        console.warn('Failed to fetch ElizaOS news, using fallback data');
        setLiveNews(getFallbackNews());
      }
    } catch (error) {
      console.error('Error fetching ElizaOS news:', error);
      // Fallback to mock data
      setLiveNews(getFallbackNews());
    } finally {
      setIsLoadingNews(false);
    }
  };

  const fetchGeneralNews = async () => {
    try {
      setIsLoadingGeneral(true);

      // Fetch from NewsAPI (you'll need to provide API key)
      const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      if (!NEWS_API_KEY) {
        console.warn('NewsAPI key not configured, skipping general news');
        setGeneralNews([]);
        return;
      }

      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}&pageSize=10`);

      if (response.ok) {
        const data = await response.json();
        setGeneralNews(data.articles || []);
      } else {
        console.warn('Failed to fetch general news');
        setGeneralNews([]);
      }
    } catch (error) {
      console.error('Error fetching general news:', error);
      setGeneralNews([]);
    } finally {
      setIsLoadingGeneral(false);
    }
  };

  const fetchSuiNews = async () => {
    try {
      setIsLoadingSui(true);

      // Fetch Sui-specific news from your existing API
      const response = await fetch('/api/news/sui', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const suiData = await response.json();
        setSuiNews(suiData.articles || []);
      } else {
        console.warn('Failed to fetch Sui news');
        setSuiNews([]);
      }
    } catch (error) {
      console.error('Error fetching Sui news:', error);
      setSuiNews([]);
    } finally {
      setIsLoadingSui(false);
    }
  };

  const getFallbackNews = () => [
    {
      id: 1,
      title: "Sui Network Achieves New Transaction Record",
      category: "breaking",
      time: "2 min ago",
      source: "ElizaOS Agent",
      urgent: true
    },
    {
      id: 2,
      title: "Major DeFi Protocol Launches on Sui Testnet",
      category: "defi",
      time: "15 min ago",
      source: "ElizaOS Agent",
      urgent: false
    },
    {
      id: 3,
      title: "New NFT Marketplace Goes Live",
      category: "nft",
      time: "1 hour ago",
      source: "ElizaOS Agent",
      urgent: false
    }
  ];

  const updateTime = (timeStr: string) => {
    // Simple time update logic
    if (timeStr.includes('min ago')) {
      const mins = parseInt(timeStr.split(' ')[0]) + 1;
      return `${mins} min ago`;
    }
    return timeStr;
  };

  // Combine all news sources
  const allNews = [...generalNews, ...suiNews];

  // Filter news based on category and search
  const filteredNews = allNews.filter(article => {
    const matchesCategory = selectedCategory === 'all' ||
      (article.category && article.category === selectedCategory) ||
      (selectedCategory === 'sui' && article.source.name.toLowerCase().includes('sui'));
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  const categories = [
    { id: 'all', name: 'All News', icon: Newspaper, color: 'text-cyan-400' },
    { id: 'breaking', name: 'Breaking', icon: Zap, color: 'text-red-400' },
    { id: 'tech', name: 'Technology', icon: TrendingUp, color: 'text-blue-400' },
    { id: 'defi', name: 'DeFi', icon: Users, color: 'text-green-400' },
    { id: 'nft', name: 'NFT', icon: Star, color: 'text-purple-400' }
  ];



  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section with Sliding Images */}
      <section className="relative h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,20,147,0.2),transparent_80%)]" />

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0.6, 1, 0.6],
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
            className="text-center text-white max-w-5xl px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-6"
            >
              <Newspaper className="w-16 h-16 mx-auto text-cyan-400 mb-4" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The Latest{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Sui News
              </motion.span>
              {" "}in Real Time
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Stay informed with breaking news, market insights, and community updates from the Sui blockchain ecosystem.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-5 text-xl font-semibold rounded-2xl shadow-2xl shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-cyan-400/50">
                <Zap className="w-6 h-6 mr-2" />
                Explore News
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white hover:text-black px-10 py-5 text-xl font-semibold rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <TrendingUp className="w-6 h-6 mr-2" />
                View Analytics
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

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
              <Newspaper className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Latest News & Updates
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the most recent developments, announcements, and insights from the Sui ecosystem.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search news and articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                      : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              onClick={() => {
                fetchLiveNews();
                fetchGeneralNews();
                fetchSuiNews();
              }}
              disabled={isLoadingGeneral || isLoadingSui}
              className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <RefreshCw className={`h-4 w-4 ${(isLoadingGeneral || isLoadingSui) ? 'animate-spin' : ''}`} />
              Refresh News
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Loading State */}
            {(isLoadingGeneral || isLoadingSui) && filteredNews.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <RefreshCw className="w-16 h-16 text-slate-600 animate-spin" />
                <h2 className="text-xl font-bold text-slate-300">Loading Latest News...</h2>
              </motion.div>
            ) : filteredNews.length > 0 ? (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Featured News */}
                {filteredNews.length > 0 && (
                  <motion.div
                    className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">Featured News</span>
                    </div>
                    <NewsCard article={filteredNews[0]} />
                  </motion.div>
                )}

                {/* Regular News */}
                <div className="grid gap-6">
                  {filteredNews.slice(1).map((article, index) => (
                    <motion.div
                      key={article.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <NewsCard article={article} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4 border-2 border-dashed border-slate-700 rounded-lg p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Newspaper className="w-16 h-16 text-slate-600" />
                <h2 className="text-xl font-bold text-slate-300">No News Found</h2>
                <p className="text-slate-400 max-w-sm">
                  {searchQuery
                    ? `No articles match "${searchQuery}". Try a different search term.`
                    : selectedCategory !== 'all'
                      ? `No articles in the ${categories.find(c => c.id === selectedCategory)?.name} category yet.`
                      : "Be the first to contribute! Click the 'Write Article' button to share news with the community."
                  }
                </p>
                {(searchQuery || selectedCategory !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Clear Filters
                  </Button>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live News Ticker */}
            <motion.div
              className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 sticky top-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <h3 className="text-red-400 font-semibold flex items-center gap-2">
                  Live Updates
                  {isLoadingNews && <RefreshCw className="w-4 h-4 animate-spin" />}
                </h3>
              </div>
              <div className="space-y-2">
                {liveNews.map((news) => (
                  <div key={news.id} className="flex items-center justify-between py-2 border-b border-red-500/10 last:border-b-0">
                    <div className="flex-1">
                      <p className="text-white text-sm">{news.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400">{news.source}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">{news.time}</span>
                      </div>
                    </div>
                    {news.urgent && (
                      <div className="ml-2 px-2 py-1 bg-red-500/20 rounded text-xs text-red-400 font-medium">
                        BREAKING
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-red-500/10">
                <p className="text-xs text-slate-500 text-center">
                  Powered by ElizaOS Agent • Real-time Sui ecosystem monitoring
                </p>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { label: "News Today", value: filteredNews.length.toString(), icon: Newspaper },
                { label: "Live Updates", value: liveNews.length.toString(), icon: Zap },
                { label: "Categories", value: categories.length.toString(), icon: Filter },
                { label: "Total Views", value: "15K", icon: TrendingUp }
              ].map((stat, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700">
                  <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublicNewsPage;