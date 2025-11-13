"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  BookOpen,
  RefreshCw,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Newspaper,
  Search,
  Filter,
  Star,
  Share2,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useArticles } from '@/hooks/use-articles';
import { useLiveNews } from '@/hooks/use-live-news';
import { Article } from '../../../components/articles/ArticleCard';

const NewsPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const { articles, isLoading, error, refreshArticles } = useArticles();
  const { news: liveNews, isLoading: liveNewsLoading, error: liveNewsError, refreshNews } = useLiveNews();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Removed live news - focus on user articles only

  const categories = [
    { id: 'all', name: 'All News', icon: Newspaper, color: 'text-cyan-400' },
  
    { id: 'tech', name: 'Technology', icon: TrendingUp, color: 'text-blue-400' },
    { id: 'defi', name: 'DeFi', icon: Users, color: 'text-green-400' },
    { id: 'nft', name: 'NFT', icon: Star, color: 'text-purple-400' }
  ];

  // Filter articles based on category and search
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Removed live news fetching - focus on user articles only
  useEffect(() => {
    // No live news to fetch
  }, []);

  // Removed fetchLiveNews function - no live news needed

  // Removed getFallbackNews function - no live news needed

  // Removed updateTime function - no live news needed

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        className="relative overflow-hidden rounded-xl lg:rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-4 lg:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_70%)]" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 lg:mb-6">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">Sui X Times Articles</h1>
              <p className="text-slate-300 text-sm lg:text-base">Stay updated with the latest from the Sui ecosystem articles</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
              <Button
                variant="outline"
                onClick={refreshArticles}
                disabled={isLoading}
                className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 text-sm lg:text-base"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Link href="/dashboard/news/new" passHref>
                <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-sm lg:text-base">
                  <PlusCircle className="h-4 w-4 lg:h-5 lg:w-5" />
                  Write Article
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-3 lg:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search news and articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 lg:pl-10 pr-4 py-2 lg:py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm lg:text-base"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg border transition-all whitespace-nowrap text-sm ${
                    selectedCategory === category.id
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                      : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <category.icon className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live News Section */}
      <motion.div
        className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-slate-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" />
            <h2 className="text-xl lg:text-2xl font-bold text-white">Live News Feed</h2>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
              ElizaOS Agent
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshNews}
            disabled={liveNewsLoading}
            className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <RefreshCw className={`h-4 w-4 ${liveNewsLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {liveNewsError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <p className="text-red-400 text-sm">{liveNewsError}</p>
          </div>
        )}

        {liveNewsLoading && liveNews.length === 0 ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-slate-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-600 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : liveNews.length > 0 ? (
          <div className="space-y-3">
            {liveNews.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 hover:bg-slate-700/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    item.urgent ? 'bg-red-500 animate-pulse' : 'bg-cyan-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.category === 'breaking' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        item.category === 'defi' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        item.category === 'nft' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {item.category.toUpperCase()}
                      </span>
                      {item.urgent && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                          URGENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-medium text-sm lg:text-base leading-tight mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Newspaper className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No live news available at the moment.</p>
            <p className="text-slate-500 text-xs mt-1">The ElizaOS agent will update this feed automatically.</p>
          </div>
        )}
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-red-400">{error}</p>
          <Button
            variant="outline"
            onClick={refreshArticles}
            className="mt-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            Try Again
          </Button>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && articles.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RefreshCw className="w-16 h-16 text-slate-600 animate-spin" />
          <h2 className="text-xl font-bold text-slate-300">Loading Latest Article...</h2>
        </motion.div>
      ) : filteredArticles.length > 0 ? (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Featured Article */}
          {filteredArticles.length > 0 && (
            <motion.div
              className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3 lg:mb-4">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium text-sm lg:text-base">Featured Article</span>
              </div>
              <ArticleCard
                key={filteredArticles[0].id}
                article={filteredArticles[0]}
                onVote={refreshArticles}
              />
            </motion.div>
          )}

          {/* Regular Articles */}
          <div className="grid gap-6">
            {filteredArticles.slice(1).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ArticleCard
                  article={article}
                  onVote={refreshArticles}
                />
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

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {[
          { label: "Articles Today", value: articles.length.toString(), icon: BookOpen },
          { label: "Active Readers", value: "1.2K", icon: Users },
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
  );
};

export default NewsPage;