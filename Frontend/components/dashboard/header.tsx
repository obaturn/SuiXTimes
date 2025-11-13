"use client";

import { useTheme } from 'next-themes';
import { useColorTheme, getWaveColors } from '@/components/color-theme-provider';
import { useCurrentWallet, useDisconnectWallet, ConnectButton } from '@mysten/dapp-kit';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, Wallet, Sun, Moon, Bell, Palette } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const { theme: colorTheme, setTheme: setColorTheme } = useColorTheme();
  const { currentWallet } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const router = useRouter();
  const account = currentWallet?.accounts?.[0];

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  const colors = getWaveColors(colorTheme);
  const primary = colors[0];
  const primaryText = colors[1];

  const cycleColorTheme = () => {
    const themes = ["green", "blue", "pink", "light"] as const;
    const currentIndex = themes.indexOf(colorTheme as any);
    const nextIndex = (currentIndex + 1) % themes.length;
    setColorTheme(themes[nextIndex] as any);
  };

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
          <h1 className="text-xl font-bold text-foreground">Sui Times Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Wallet Connection Status */}
          {account ? (
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: `${primary}22`, border: `1px solid ${primary}55` }}
              >
                <Wallet className="h-4 w-4" style={{ color: primaryText }} />
                <span className="text-sm font-medium" style={{ color: primaryText }}>
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="hover:opacity-90"
                style={{ color: primaryText, borderColor: `${primary}55`, backgroundColor: 'transparent' }}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <ConnectButton />
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleColorTheme}
            aria-label="Cycle dashboard color"
            style={{ color: primaryText }}
          >
            <Palette className="h-6 w-6" />
          </Button>
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
