"use client";

import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap, Clock } from 'lucide-react';
import StreakCard from '@/components/streak/StreakCard';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  source: string;
  time: string;
  category: string;
  image: string;
  readTime: string;
}

interface LiveNewsItem {
  id: number;
  title: string;
  category: string;
  time: string;
  source: string;
  urgent: boolean;
}

const Dashboard = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [liveNews, setLiveNews] = useState<LiveNewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [isLoadingLiveNews, setIsLoadingLiveNews] = useState(true);

  // Static news data with images
  const staticNews: NewsItem[] = [
    {
      id: 1,
      title: "Sui Network Achieves Record 100,000 TPS in Latest Testnet",
      excerpt: "The Sui blockchain has demonstrated unprecedented performance with 100,000 transactions per second during recent testnet trials, setting new standards for Web3 scalability.",
      source: "Sui Foundation",
      time: "2 hours ago",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Major DeFi Protocol Launches on Sui Mainnet",
      excerpt: "Leading DeFi platform announces full migration to Sui blockchain, bringing $500M in TVL and expanding ecosystem opportunities for developers and users.",
      source: "DeFi Pulse",
      time: "4 hours ago",
      category: "DeFi",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Sui Developer Conference 2024: Key Announcements",
      excerpt: "Mysten Labs reveals groundbreaking new features including enhanced smart contract capabilities and improved developer tooling at annual conference.",
      source: "Mysten Labs",
      time: "6 hours ago",
      category: "Development",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "NFT Marketplace Sees 300% Growth on Sui",
      excerpt: "The Sui NFT ecosystem continues to expand rapidly with new marketplaces and collections driving unprecedented adoption and trading volume.",
      source: "NFT Evening",
      time: "8 hours ago",
      category: "NFT",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop",
      readTime: "3 min read"
    },
    {
      id: 5,
      title: "Institutional Adoption: Major Bank Explores Sui Integration",
      excerpt: "Leading financial institution announces pilot program to integrate Sui blockchain technology for cross-border payments and asset tokenization.",
      source: "CoinDesk",
      time: "12 hours ago",
      category: "Adoption",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Sui Community Reaches 1 Million Active Wallets Milestone",
      excerpt: "The Sui ecosystem celebrates reaching 1 million active wallets, marking a significant milestone in blockchain adoption and community growth.",
      source: "Sui News",
      time: "1 day ago",
      category: "Community",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
      readTime: "4 min read"
    },
    {
      id: 7,
      title: "New Gaming DApp Launches with 50K Concurrent Users",
      excerpt: "Revolutionary blockchain gaming platform built on Sui achieves instant success with massive user adoption and innovative gameplay mechanics.",
      source: "GameFi Today",
      time: "1 day ago",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=250&fit=crop",
      readTime: "5 min read"
    },
    {
      id: 8,
      title: "Sui Gas Fee Reduction Initiative Shows 80% Improvement",
      excerpt: "Ongoing optimization efforts result in significant reduction of transaction costs, making Sui more accessible for everyday users and micro-transactions.",
      source: "CryptoCompare",
      time: "2 days ago",
      category: "Technical",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      readTime: "3 min read"
    }
  ];

  useEffect(() => {
    // Load static news data
    const loadNews = () => {
      setLoadingNews(true);
      // Simulate loading delay for better UX
      setTimeout(() => {
        setNews(staticNews);
        setLoadingNews(false);
      }, 1000);
    };

    // Fetch live news for sidebar
    const fetchLiveNews = async () => {
      try {
        setIsLoadingLiveNews(true);
        const response = await fetch('/api/news/live', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const newsData = await response.json();
          setLiveNews(newsData);
        }
      } catch (error) {
        console.error('Error fetching live news:', error);
      } finally {
        setIsLoadingLiveNews(false);
      }
    };

    loadNews();
    fetchLiveNews();

    // Update live news every 30 seconds
    const interval = setInterval(() => {
      fetchLiveNews();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main News Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-6">World</h1>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Latest News</h2>
              {loadingNews ? (
                <div className="space-y-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="rounded-lg bg-card p-6 backdrop-blur-md border border-border animate-pulse">
                      <div className="flex gap-6">
                        <div className="w-48 h-32 bg-muted rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded w-1/4 mb-3"></div>
                          <div className="h-6 bg-muted rounded w-full mb-2"></div>
                          <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {news.map((item) => (
                    <div key={item.id} className="rounded-lg bg-card backdrop-blur-md border border-border hover:border-accent transition-all duration-200 hover:shadow-lg hover:shadow-primary/10">
                      <div className="flex gap-6 p-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-48 h-32 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold bg-primary/20 text-primary px-3 py-1 rounded-full">{item.category}</span>
                            <span className="text-xs text-muted-foreground">{item.readTime}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight hover:text-primary transition-colors cursor-pointer">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{item.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground text-sm">{item.source} &middot; {item.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Live News Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Live Updates
                  {isLoadingLiveNews && <RefreshCw className="w-4 h-4 animate-spin ml-2" />}
                </h3>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {liveNews.length > 0 ? liveNews.slice(0, 15).map((news) => (
                  <div key={news.id} className="border-b border-gray-200 last:border-b-0 pb-3 last:pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm font-medium line-clamp-2 mb-1">{news.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{news.source}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {news.time}
                          </span>
                        </div>
                      </div>
                      {news.urgent && (
                        <div className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium flex-shrink-0">
                          BREAKING
                        </div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No live updates available
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Real-time Sui ecosystem monitoring
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-3">
              <div className="bg-card rounded-lg p-4 text-center border border-border">
                <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground">{liveNews.length}</div>
                <div className="text-sm text-muted-foreground">Live Updates</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center border border-border">
                <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground">30s</div>
                <div className="text-sm text-muted-foreground">Refresh Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
