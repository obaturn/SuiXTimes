"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { Token } from '@/app/actions/tokens';

export interface WatchlistItem extends Token {
  addedAt: number;
  alerts: PriceAlert[];
}

export interface PriceAlert {
  id: string;
  type: 'above' | 'below';
  price: number;
  isActive: boolean;
  createdAt: number;
  triggeredAt?: number;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  isLoading: boolean;
  addToWatchlist: (token: Token) => void;
  removeFromWatchlist: (tokenId: string) => void;
  isInWatchlist: (tokenId: string) => boolean;
  updateTokenPrices: (updatedTokens: Token[]) => void;
  addPriceAlert: (tokenId: string, alert: Omit<PriceAlert, 'id' | 'createdAt'>) => string;
  removePriceAlert: (tokenId: string, alertId: string) => void;
  togglePriceAlert: (tokenId: string, alertId: string) => void;
  checkPriceAlerts: (currentPrices: { [tokenId: string]: number }) => Array<{ tokenId: string; alert: PriceAlert; currentPrice: number }>;
  getActiveAlertsCount: () => number;
  getWatchlistValue: () => number;
  getTopPerformer: () => WatchlistItem | null;
  getWorstPerformer: () => WatchlistItem | null;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { currentWallet } = useCurrentWallet();
  const account = currentWallet?.accounts?.[0];
  const accountAddress = account?.address;

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get localStorage key - FIXED: Now properly uses account address
  const getStorageKey = () => {
    // Use a global watchlist if no account is connected, or account-specific if connected
    return accountAddress ? `suihub_watchlist_${accountAddress}` : 'suihub_watchlist';
  };

  // Load watchlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = getStorageKey();
      let saved = localStorage.getItem(key);

      // If no account-specific data exists, try to migrate from the old generic key
      if (!saved && accountAddress) {
        const oldKey = 'suihub_watchlist';
        const oldData = localStorage.getItem(oldKey);
        if (oldData) {
          console.log('Migrating watchlist data from old key to account-specific key');
          saved = oldData;
          // Save to new key (but don't remove old key yet in case user switches accounts)
          localStorage.setItem(key, oldData);
        }
      }

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          console.log('Loaded watchlist from localStorage:', parsed);
          setWatchlist(parsed);
        } catch (error) {
          console.error('Failed to parse watchlist from localStorage:', error);
          setWatchlist([]);
        }
      } else {
        console.log('No watchlist found in localStorage for key:', key);
        setWatchlist([]);
      }
    }
  }, [accountAddress]);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = getStorageKey();
      localStorage.setItem(key, JSON.stringify(watchlist));
      console.log('Saved watchlist to localStorage:', { key, count: watchlist.length, account: accountAddress });
    }
  }, [watchlist, accountAddress]);

  const addToWatchlist = (token: Token) => {
    console.log('=== addToWatchlist called ===');
    console.log('Token to add:', token);
    console.log('Token ID:', token.id);
    console.log('Current watchlist before add:', watchlist.length, 'items:', watchlist.map(w => w.id));

    if (!token.id) {
      console.error('Token has no ID:', token);
      return;
    }

    setWatchlist(prev => {
      console.log('setWatchlist callback - prev state:', prev.length, 'items:', prev.map(w => w.id));

      // Check if token is already in watchlist
      const exists = prev.some(item => item.id === token.id);
      console.log('Token exists in watchlist:', exists);

      if (exists) {
        console.log('Token already in watchlist, not adding');
        return prev;
      }

      const newItem: WatchlistItem = {
        ...token,
        addedAt: Date.now(),
        alerts: []
      };

      console.log('Created new watchlist item:', newItem);
      const updated = [...prev, newItem];
      console.log('Final updated watchlist:', updated.length, 'items:', updated.map(w => w.id));

      return updated;
    });

    console.log('addToWatchlist function completed');
  };

  const removeFromWatchlist = (tokenId: string) => {
    console.log('Removing token from watchlist:', tokenId);
    console.log('Current watchlist before remove:', watchlist);

    setWatchlist(prev => {
      const updated = prev.filter(item => item.id !== tokenId);
      console.log('Updated watchlist after remove:', updated);
      return updated;
    });
  };

  const isInWatchlist = (tokenId: string): boolean => {
    const inList = watchlist.some(item => item.id === tokenId);
    console.log(`Checking if ${tokenId} is in watchlist:`, inList, 'Current watchlist IDs:', watchlist.map(w => w.id));
    return inList;
  };

  const updateTokenPrices = (updatedTokens: Token[]) => {
    setWatchlist(prev =>
      prev.map(watchlistItem => {
        const updatedToken = updatedTokens.find(t => t.id === watchlistItem.id);
        if (updatedToken) {
          return {
            ...watchlistItem,
            ...updatedToken,
            alerts: watchlistItem.alerts // Preserve alerts
          };
        }
        return watchlistItem;
      })
    );
  };

  const addPriceAlert = (tokenId: string, alert: Omit<PriceAlert, 'id' | 'createdAt'>) => {
    const newAlert: PriceAlert = {
      ...alert,
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now()
    };

    setWatchlist(prev =>
      prev.map(item =>
        item.id === tokenId
          ? { ...item, alerts: [...item.alerts, newAlert] }
          : item
      )
    );

    return newAlert.id;
  };

  const removePriceAlert = (tokenId: string, alertId: string) => {
    setWatchlist(prev =>
      prev.map(item =>
        item.id === tokenId
          ? { ...item, alerts: item.alerts.filter(alert => alert.id !== alertId) }
          : item
      )
    );
  };

  const togglePriceAlert = (tokenId: string, alertId: string) => {
    setWatchlist(prev =>
      prev.map(item =>
        item.id === tokenId
          ? {
              ...item,
              alerts: item.alerts.map(alert =>
                alert.id === alertId
                  ? { ...alert, isActive: !alert.isActive }
                  : alert
              )
            }
          : item
      )
    );
  };

  const checkPriceAlerts = (currentPrices: { [tokenId: string]: number }) => {
    const triggeredAlerts: Array<{ tokenId: string; alert: PriceAlert; currentPrice: number }> = [];

    watchlist.forEach(item => {
      const currentPrice = currentPrices[item.id];
      if (!currentPrice) return;

      item.alerts.forEach(alert => {
        if (!alert.isActive || alert.triggeredAt) return;

        const shouldTrigger =
          (alert.type === 'above' && currentPrice >= alert.price) ||
          (alert.type === 'below' && currentPrice <= alert.price);

        if (shouldTrigger) {
          triggeredAlerts.push({
            tokenId: item.id,
            alert: { ...alert, triggeredAt: Date.now() },
            currentPrice
          });

          // Mark alert as triggered
          setWatchlist(prev =>
            prev.map(watchItem =>
              watchItem.id === item.id
                ? {
                    ...watchItem,
                    alerts: watchItem.alerts.map(a =>
                      a.id === alert.id ? { ...a, triggeredAt: Date.now() } : a
                    )
                  }
                : watchItem
            )
          );
        }
      });
    });

    return triggeredAlerts;
  };

  const getActiveAlertsCount = (): number => {
    return watchlist.reduce((count, item) =>
      count + item.alerts.filter(alert => alert.isActive && !alert.triggeredAt).length, 0
    );
  };

  const getWatchlistValue = (): number => {
    return watchlist.length; // Return count of tokens instead of sum of prices
  };

  const getTopPerformer = () => {
    if (watchlist.length === 0) return null;
    return watchlist.reduce((top, current) =>
      current.change24h > top.change24h ? current : top
    );
  };

  const getWorstPerformer = () => {
    if (watchlist.length === 0) return null;
    return watchlist.reduce((worst, current) =>
      current.change24h < worst.change24h ? current : worst
    );
  };

  const value: WatchlistContextType = {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    updateTokenPrices,
    addPriceAlert,
    removePriceAlert,
    togglePriceAlert,
    checkPriceAlerts,
    getActiveAlertsCount,
    getWatchlistValue,
    getTopPerformer,
    getWorstPerformer,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}