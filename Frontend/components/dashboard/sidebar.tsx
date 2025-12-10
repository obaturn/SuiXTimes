"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BarChart3, Newspaper, Star, Calendar, Users, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWatchlist } from '@/hooks/use-watchlist';

const SidebarLogo = () => (
  <div className="flex items-center space-x-2">
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
  const { watchlist } = useWatchlist();

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'World' },
    { href: '/dashboard/sui-news', icon: Newspaper, label: 'X Feed' },
    { href: '/dashboard/news', icon: Newspaper, label: 'Articles' },
    { href: '/dashboard/markets', icon: BarChart3, label: 'Markets' },
    { href: '/dashboard/watchlist', icon: Star, label: 'Watchlist' },
    { href: '/dashboard/community', icon: Users, label: 'Community' },
  ];

  return (
    <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-border bg-card/95 backdrop-blur-xl transition-transform duration-300 ease-in-out shadow-2xl ${
      isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'lg:translate-x-0'
    }`}>
      <div className="flex items-center justify-between h-20 border-b border-border px-4 bg-muted/50">
        {isMobile ? (
          <Link href="/" className="text-2xl font-bold text-primary">
            Sui X Times
          </Link>
        ) : (
          <SidebarLogo />
        )}
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 px-4 py-8">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isWatchlist = item.label === 'Watchlist';
            const watchlistCount = isWatchlist ? watchlist.length : 0;
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`group flex items-center rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border hover:border-accent'
                  }`}>

                  <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                  <span className="ml-4 font-medium">{item.label}</span>
                  {isWatchlist && watchlistCount > 0 && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                      {watchlistCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

      </nav>
      {/* Wallet functionality removed */}
    </aside>
  );
};

export default Sidebar;
