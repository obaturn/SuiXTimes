"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BarChart3, Newspaper, Star, Calendar, Users, X, LogOut, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWatchlist } from '@/hooks/use-watchlist';

import { useDisconnectWallet, useCurrentAccount } from '@mysten/dapp-kit';
import { getUserStreak } from '@/app/actions/streak';

const SidebarLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">S</span>
    </div>
    <span className="text-xl font-bold text-foreground">Sui X Times</span>
  </div>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const router = useRouter();
  const { mutate: disconnect } = useDisconnectWallet();
  const { watchlist } = useWatchlist();
  const account = useCurrentAccount();
  const [streak, setStreak] = useState(0);

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  useEffect(() => {
    if (account?.address) {
      getUserStreak(account.address).then(setStreak);
    }
  }, [account?.address]);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/sui-news', icon: Newspaper, label: 'News Feed' },
    { href: '/dashboard/news', icon: Newspaper, label: 'Articles' },
    { href: '/dashboard/markets', icon: BarChart3, label: 'Markets' },
    { href: '/dashboard/watchlist', icon: Star, label: 'Watchlist' },
    { href: '/dashboard/events', icon: Users, label: 'Community' },
    { href: '/dashboard/learn', icon: BookOpen, label: 'Learn' },
  ];

  return (
    <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-border bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
      isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'lg:translate-x-0'
    }`}>
      <div className="flex items-center justify-between h-20 border-b border-border px-4">
        {isMobile ? (
          <Link href="/" className="text-2xl font-bold text-white">
            Sui X Times
          </Link>
        ) : (
          <SidebarLogo />
        )}
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 px-4 py-8">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isWatchlist = item.label === 'Watchlist';
            const watchlistCount = isWatchlist ? watchlist.length : 0;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg px-4 py-3 text-muted-foreground transition-colors duration-200 hover:bg-blue-500/20 hover:text-blue-400 ${
                    pathname === item.href ? 'bg-blue-500/30 text-blue-400' : ''
                  }`}>

                  <Icon className="h-5 w-5" />
                  <span className="ml-4 font-medium">{item.label}</span>
                  {isWatchlist && watchlistCount > 0 && (
                    <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {watchlistCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

      </nav>
      <div className="border-t border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {account?.address ? (
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${account.address}`}
                alt="Profile Avatar"
                className="h-10 w-10 rounded-full border-2 border-blue-500/50"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                G
              </div>
            )}
            <div className="ml-4">
              <p className="font-semibold text-foreground">
                {account?.address ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : 'Guest'}
              </p>
              <p className="text-sm text-muted-foreground">{streak} day streak</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleDisconnect}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-600/20 border border-blue-600/30 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Disconnect</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
