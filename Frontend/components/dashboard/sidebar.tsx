"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BarChart3, Newspaper, Star, Calendar, Users, X, Sun, Moon, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';

import { useDisconnectWallet } from '@mysten/dapp-kit';

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
    { href: '/dashboard/sui-news', icon: Newspaper, label: 'SUI News' },
    { href: '/dashboard/news', icon: Newspaper, label: 'Article' },
    { href: '/dashboard/watchlist', icon: Star, label: 'Watchlist' },
    { href: '/dashboard/events', icon: Calendar, label: 'Events' },
    { href: '/dashboard/community', icon: Users, label: 'Community' },
  ];

  return (
    <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-gray-800 bg-black/30 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
      isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'lg:translate-x-0'
    }`}>
      <div className="flex items-center justify-between h-20 border-b border-gray-800 px-4">
        {isMobile ? (
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-purple-400">Ξ</span> Sui Swap
          </Link>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">𝕏</span>
            </div>
            <span className="text-xl font-bold text-white">Sui Times</span>
          </div>
        )}
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 px-4 py-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-3 text-gray-300 transition-colors duration-200 hover:bg-purple-600/20 hover:text-white ${
                  pathname === item.href ? 'bg-purple-600/30 text-white' : ''
                }`}>

                <item.icon className="h-5 w-5" />
                <span className="ml-4 font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

      </nav>
      <div className="border-t border-gray-800 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="/placeholder-user.jpg"
              alt="User avatar"
            />
            <div className="ml-4">
              <p className="font-semibold text-white">Satoshi</p>
              <p className="text-sm text-gray-400">Level 5</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        <button
          onClick={handleDisconnect}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-red-600/20 border border-red-600/30 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Disconnect</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
