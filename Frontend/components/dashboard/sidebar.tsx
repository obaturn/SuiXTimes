"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BarChart3, Newspaper, Star, Calendar, Users, X, Sun, Moon, LogOut, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';

import { useDisconnectWallet } from '@mysten/dapp-kit';

const SidebarLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">S</span>
    </div>
    <span className="text-xl font-bold text-foreground">Sui Times</span>
  </div>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { mutate: disconnect } = useDisconnectWallet();

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/markets', icon: BarChart3, label: 'Markets' },
    { href: '/dashboard/learn', icon: BookOpen, label: 'Learn' },
    { href: '/dashboard/sui-news', icon: Newspaper, label: 'X Feed' },
    { href: '/dashboard/news', icon: Newspaper, label: 'Article' },
    { href: '/dashboard/watchlist', icon: Star, label: 'Watchlist' },
    { href: '/dashboard/events', icon: Calendar, label: 'Events' },
  ];

  return (
    <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-border bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
      isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'lg:translate-x-0'
    }`}>
      <div className="flex items-center justify-between h-20 border-b border-border px-4">
        {isMobile ? (
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-purple-400">Ξ</span> Sui Swap
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
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg px-4 py-3 text-muted-foreground transition-colors duration-200 hover:bg-blue-500/20 hover:text-blue-400 ${
                    pathname === item.href ? 'bg-blue-500/30 text-blue-400' : ''
                  }`}>

                  <Icon className="h-5 w-5" />
                  <span className="ml-4 font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

      </nav>
      <div className="border-t border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="/placeholder-user.jpg"
              alt="User avatar"
            />
            <div className="ml-4">
              <p className="font-semibold text-foreground">Satoshi</p>
              <p className="text-sm text-muted-foreground">Level 5</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        <a
          href="/"
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-600/20 border border-blue-600/30 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Back to Home</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
