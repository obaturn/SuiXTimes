"use client";

import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            className="rounded-md border border-border p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Sui Dashboard</h1>
        </div>
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold text-foreground">Sui News Live</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Wallet functionality removed */}
          <div className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-medium">3</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
