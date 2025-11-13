"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BarChart3, Newspaper, Star, Calendar, Users, X, Sun, Moon, LogOut, BookOpen, Upload, Flame } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';
import { useWatchlist } from '@/hooks/use-watchlist';
import { useColorTheme, getWaveColors } from '@/components/color-theme-provider';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { useDisconnectWallet } from '@mysten/dapp-kit';
import { toast } from 'sonner';

// SidebarLogo will be rendered inline within the component so it can access color theme

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const { theme: colorTheme } = useColorTheme();
  const colors = getWaveColors(colorTheme);
  const primary = colors[1];
  const router = useRouter();
  const { mutate: disconnect } = useDisconnectWallet();
  const { currentWallet } = useCurrentWallet();
  const { watchlist } = useWatchlist();

  // Profile state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [streak, setStreak] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile from localStorage on mount
  React.useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setProfileImage(profile.image);
        setUserName(profile.name);
        setStreak(profile.streak || 0);
      } catch (e) {
        console.error('Error loading profile:', e);
      }
    }
    // Get wallet address as default name
    if (!userName && currentWallet?.accounts?.[0]) {
      setUserName(currentWallet.accounts[0].address.slice(0, 10) + '...');
    }
  }, [currentWallet]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image too large. Max 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setProfileImage(imageData);

        // Save to localStorage
        const profile = {
          image: imageData,
          name: userName,
          streak: streak,
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (newName: string) => {
    if (newName.trim()) {
      setUserName(newName);
      const profile = {
        image: profileImage,
        name: newName,
        streak: streak,
      };
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  };

  const handleStreakUpdate = (newStreak: number) => {
    setStreak(newStreak);
    const profile = {
      image: profileImage,
      name: userName,
      streak: newStreak,
    };
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors[0] }}>
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">Sui X Times</span>
          </div>
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
                  {
                    (() => {
                      const isActive = pathname === item.href;
                      const activeStyle: React.CSSProperties | undefined = isActive
                        ? { backgroundColor: `${primary}33`, color: primary }
                        : undefined;
                      return (
                        <Link
                          href={item.href}
                          className={`flex items-center rounded-lg px-4 py-3 text-muted-foreground transition-colors duration-200 hover:bg-slate-800/20`}
                          style={activeStyle}
                        >
                          <Icon className="h-5 w-5" style={isActive ? { color: primary } : undefined} />
                          <span className="ml-4 font-medium">{item.label}</span>
                          {isWatchlist && watchlistCount > 0 && (
                            <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: primary, color: '#fff' }}>
                              {watchlistCount}
                            </span>
                          )}
                        </Link>
                      );
                    })()
                  }
              </li>
            );
          })}
        </ul>

      </nav>
      <div className="border-t border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Profile Picture with Upload */}
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                src={profileImage || "/placeholder-user.jpg"}
                alt="User avatar"
                onClick={() => fileInputRef.current?.click()}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 bg-slate-700 p-1 rounded-full hover:bg-slate-600 transition-colors"
                title="Upload profile picture"
              >
                <Upload className="h-3 w-3 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">{userName || 'User'}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Flame className="h-4 w-4" style={{ color: primary }} />
                <span className="font-medium" style={{ color: primary }}>{streak}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex-shrink-0"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        <button
          onClick={handleDisconnect}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors"
          style={{ backgroundColor: `${primary}22`, border: `1px solid ${primary}55`, color: primary }}
        >
          <LogOut className="h-5 w-5" />
          <span>Disconnect</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
