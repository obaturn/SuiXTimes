"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Bell, Trash2, Star, ArrowUpRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import StreakCard from '@/components/streak/StreakCard';

const Watchlist = () => {
  const summary = [
    { label: 'Watchlist Value', value: '$12,345.67' },
    { label: 'Top Performer', value: 'SUI', change: '+15.2%' },
    { label: 'Worst Performer', value: 'CETUS', change: '-5.1%' },
    { label: 'Active Alerts', value: '3' },
  ];

  const watchlistTokens = [
    { name: 'Sui', symbol: 'SUI', price: '$1.50', change: '+3.2%', image: '/placeholder.svg' },
    { name: 'USD Coin', symbol: 'USDC', price: '$1.00', change: '+0.1%', image: '/placeholder.svg' },
    { name: 'Cetus Protocol', symbol: 'CETUS', price: '$0.50', change: '-1.5%', image: '/placeholder.svg' },
  ];

  const alerts = [
    { token: 'SUI', condition: 'Price > $1.60' },
    { token: 'SUI', condition: 'Price < $1.40' },
    { token: 'CETUS', condition: '24h Change > 5%' },
  ];

  const alertHistory = [
    { token: 'SUI', message: 'Price reached $1.55', time: '2h ago' },
    { token: 'CETUS', message: 'Price dropped to $0.48', time: '1d ago' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">My Watchlist</h1>

      {/* Streak Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StreakCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summary.map(item => (
          <div key={item.label} className="rounded-lg bg-slate-800/60 p-6 backdrop-blur-md border border-slate-700/50">
            <p className="text-slate-400">{item.label}</p>
            <p className="text-2xl font-bold text-white mt-2">{item.value}</p>
            {item.change && (
              <p className={`text-sm font-semibold ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{item.change}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Tokens</h2>
            <Button className="bg-purple-600 hover:bg-purple-700"><Plus className="w-4 h-4 mr-2" /> Add Token</Button>
          </div>
          <div className="space-y-4">
            {watchlistTokens.map(token => (
              <div key={token.symbol} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={token.image} alt={token.symbol} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold text-white">{token.name}</p>
                    <p className="text-sm text-slate-400">{token.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{token.price}</p>
                  <p className={`text-sm font-semibold ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon"><Bell className="w-5 h-5 text-slate-400 hover:text-purple-400" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="w-5 h-5 text-slate-400 hover:text-red-400" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Alerts</h2>
          <div className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 space-y-4">
            {alerts.map(alert => (
              <div key={alert.condition} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg">
                <div>
                  <p className="font-semibold text-white">{alert.token}</p>
                  <p className="text-sm text-slate-400">{alert.condition}</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-purple-600" />
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white">Alert History</h2>
          <div className="space-y-3">
            {alertHistory.map(item => (
              <div key={item.message} className="flex items-center space-x-3 text-sm">
                <Bell className="w-4 h-4 text-purple-400" />
                <p className="text-slate-300">{item.token}: {item.message}</p>
                <p className="text-slate-500">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;