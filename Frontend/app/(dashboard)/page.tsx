"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import StreakCard from '@/components/streak/StreakCard';

const Home = () => {
  const stats = [
    { label: '24h Volume', value: '$1.2M', change: '+5.6%', isPositive: true },
    { label: 'Total TVL', value: '$2.4B', change: '-2.1%', isPositive: false },
    { label: 'Active Users', value: '1.5M', change: '+12.8%', isPositive: true },
  ];

  const tokens = [
    { name: 'SUI', price: '$1.50', change: '+3.2%', image: '/placeholder.svg' },
    { name: 'USDC', price: '$1.00', change: '+0.1%', image: '/placeholder.svg' },
    { name: 'CETUS', price: '$0.50', change: '-1.5%', image: '/placeholder.svg' },
    { name: 'TURBOS', price: '$0.01', change: '+10.2%', image: '/placeholder.svg' },
  ];

  const news = [
    { title: 'Sui DeFi ecosystem sees massive growth', source: 'CoinDesk', time: '2h ago', category: 'DeFi' },
    { title: 'New developer tools released for Sui', source: 'Sui Foundation', time: '1d ago', category: 'Technical' },
    { title: 'Community milestone: 1 million active wallets', source: 'Sui News', time: '3d ago', category: 'Community' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-900">
      <div className="space-y-8">
        <div className="rounded-lg bg-purple-600/40 p-8 backdrop-blur-md border border-purple-500/50">
          <div className="flex justify-between items-center">
            <span className="inline-block bg-purple-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full">Web3 Ecosystem</span>
          </div>
          <h1 className="text-4xl font-bold text-white mt-4">Sui Swap Dashboard</h1>
          <p className="text-purple-200 mt-2">Welcome to the future of decentralized finance.</p>
          <div className="mt-6 space-x-4">
            <Button className="bg-white text-purple-600 hover:bg-gray-200">Connect Wallet</Button>
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/30">Learn More</Button>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokens.map((token) => (
              <div key={token.name} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 flex items-center space-x-4">
                <img src={token.image} alt={token.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-white">{token.name}</p>
                  <p className="text-slate-400">{token.price}</p>
                </div>
                <p className={`text-sm font-semibold ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Latest News</h2>
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.title} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 flex items-center space-x-4">
                <img src="/placeholder.svg" alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <span className="text-xs font-semibold bg-purple-600/50 text-white px-2 py-1 rounded-full">{item.category}</span>
                  <p className="font-semibold text-white mt-2">{item.title}</p>
                  <p className="text-slate-400 text-sm mt-1">{item.source} &middot; {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
