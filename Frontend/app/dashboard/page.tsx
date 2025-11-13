"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import StreakCard from '@/components/streak/StreakCard';

interface Token {
  name: string;
  price: string;
  change: string;
  image: string;
}

interface NewsItem {
  title: string;
  source: string;
  time: string;
  category: string;
}

const Home = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingTokens, setLoadingTokens] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  const stats = [
    { label: '24h Volume', value: '$1.2M', change: '+5.6%', isPositive: true },
    { label: 'Total TVL', value: '$2.4B', change: '-2.1%', isPositive: false },
    { label: 'Active Users', value: '1.5M', change: '+12.8%', isPositive: true },
  ];

  useEffect(() => {
    // Fetch tokens from CoinGecko
    const fetchTokens = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=sui,usd-coin,cetus-protocol,turbos&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();

        const tokenData: Token[] = [
          {
            name: 'SUI',
            price: `$${data.sui?.usd?.toFixed(2) || 'N/A'}`,
            change: `${data.sui?.usd_24h_change?.toFixed(1) || 0}%`,
            image: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg'
          },
          {
            name: 'USDC',
            price: `$${data['usd-coin']?.usd?.toFixed(2) || 'N/A'}`,
            change: `${data['usd-coin']?.usd_24h_change?.toFixed(1) || 0}%`,
            image: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
          },
          {
            name: 'CETUS',
            price: `$${data['cetus-protocol']?.usd?.toFixed(2) || 'N/A'}`,
            change: `${data['cetus-protocol']?.usd_24h_change?.toFixed(1) || 0}%`,
            image: 'https://assets.coingecko.com/coins/images/29463/small/cetus.png'
          },
          {
            name: 'TURBOS',
            price: `$${data.turbos?.usd?.toFixed(2) || 'N/A'}`,
            change: `${data.turbos?.usd_24h_change?.toFixed(1) || 0}%`,
            image: 'https://assets.coingecko.com/coins/images/29893/small/turbos.jpg'
          }
        ];
        setTokens(tokenData);
      } catch (error) {
        console.error('Error fetching tokens:', error);
        // Fallback to static data
        setTokens([
          { name: 'SUI', price: '$1.50', change: '+3.2%', image: '/placeholder.svg' },
          { name: 'USDC', price: '$1.00', change: '+0.1%', image: '/placeholder.svg' },
          { name: 'CETUS', price: '$0.50', change: '-1.5%', image: '/placeholder.svg' },
          { name: 'TURBOS', price: '$0.01', change: '+10.2%', image: '/placeholder.svg' },
        ]);
      } finally {
        setLoadingTokens(false);
      }
    };

    // Fetch news from multiple sources
    const fetchNews = async () => {
      try {
        let allNews: any[] = [];

        // Fetch from NewsAPI
        try {
          const newsApiResponse = await fetch('/api/newsapi');
          if (newsApiResponse.ok) {
            const newsApiData = await newsApiResponse.json();
            allNews = allNews.concat(newsApiData.slice(0, 2)); // Take 2 from NewsAPI
          }
        } catch (err) {
          console.warn('Failed to fetch from NewsAPI:', err);
        }

        // Fetch from RSS feeds
        const rssUrls = [
          'https://coindesk.com/arc/outboundfeeds/rss/',
          'https://www.coingecko.com/en/news/rss',
          'https://cointelegraph.com/rss'
        ];

        for (const url of rssUrls) {
          try {
            const response = await fetch(`/api/rss?url=${encodeURIComponent(url)}`);
            if (response.ok) {
              const data = await response.json();
              if (data.items) {
                // Filter for Sui-related news or take general crypto news
                const suiNews = data.items
                  .filter((item: any) => item.title?.toLowerCase().includes('sui') || item.content?.toLowerCase().includes('sui'))
                  .slice(0, 1); // Take 1 Sui-specific from each
                if (suiNews.length > 0) {
                  allNews = allNews.concat(suiNews);
                } else {
                  // Take 1 general news if no Sui news
                  allNews = allNews.concat(data.items.slice(0, 1));
                }
              }
            }
          } catch (err) {
            console.warn(`Failed to fetch from ${url}:`, err);
          }
        }

        // Shuffle and take top 3
        const shuffled = allNews.sort(() => 0.5 - Math.random());
        const newsData: NewsItem[] = shuffled.slice(0, 3).map((item: any) => ({
          title: item.title || 'No title',
          source: item.source || 'Crypto News',
          time: item.time || item.pubDate ? new Date(item.pubDate || item.time).toLocaleDateString() : 'Recent',
          category: item.category || 'Cryptocurrency'
        }));

        setNews(newsData.length > 0 ? newsData : [
          { title: 'Sui DeFi ecosystem sees massive growth', source: 'CoinDesk', time: '2h ago', category: 'DeFi' },
          { title: 'New developer tools released for Sui', source: 'Sui Foundation', time: '1d ago', category: 'Technical' },
          { title: 'Community milestone: 1 million active wallets', source: 'Sui News', time: '3d ago', category: 'Community' },
        ]);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to static data
        setNews([
          { title: 'Sui DeFi ecosystem sees massive growth', source: 'CoinDesk', time: '2h ago', category: 'DeFi' },
          { title: 'New developer tools released for Sui', source: 'Sui Foundation', time: '1d ago', category: 'Technical' },
          { title: 'Community milestone: 1 million active wallets', source: 'Sui News', time: '3d ago', category: 'Community' },
        ]);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchTokens();
    fetchNews();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900">
      <div className="space-y-8">
        <div className="rounded-lg bg-purple-600/40 p-8 backdrop-blur-md border border-purple-500/50">
          <div className="flex justify-between items-center">
            <span className="inline-block bg-purple-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full">Sui Blockchain Hub</span>
          </div>
          <h1 className="text-4xl font-bold text-white mt-4">Sui X Times Dashboard</h1>
          <p className="text-purple-200 mt-2">Your comprehensive platform for Sui blockchain news, market data, and community insights. Stay informed with real-time updates on DeFi, NFTs, and ecosystem developments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-slate-800/60 p-6 backdrop-blur-md border border-slate-700/50">
              <p className="text-slate-400">{stat.label}</p>
              <div className="flex items-baseline space-x-2 mt-2">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <div className={`flex items-center text-sm font-semibold ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  <ArrowUpRight className={`w-4 h-4 ${!stat.isPositive && 'transform rotate-180'}`} />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Streak Card Section */}
        <div className="w-full max-w-md">
          <StreakCard />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Top Tokens</h2>
          {loadingTokens ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 flex items-center space-x-4 animate-pulse">
                  <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-slate-700 rounded w-16 mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-12"></div>
                  </div>
                  <div className="h-4 bg-slate-700 rounded w-10"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tokens.map((token) => (
                <div key={token.name} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 flex items-center space-x-4">
                  <img src={token.image} alt={token.name} className="w-10 h-10 rounded-full" onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }} />
                  <div>
                    <p className="font-semibold text-white">{token.name}</p>
                    <p className="text-slate-400">{token.price}</p>
                  </div>
                  <p className={`text-sm font-semibold ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Latest News</h2>
          {loadingNews ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 flex items-center space-x-4 animate-pulse">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-slate-700 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-32"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((item, index) => (
                <div key={index} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 flex items-center space-x-4">
                  <img src="/placeholder.svg" alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <span className="text-xs font-semibold bg-purple-600/50 text-white px-2 py-1 rounded-full">{item.category}</span>
                    <p className="font-semibold text-white mt-2">{item.title}</p>
                    <p className="text-slate-400 text-sm mt-1">{item.source} &middot; {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
