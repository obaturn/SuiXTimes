import { useState, useEffect } from 'react';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { Token, fetchSingleToken } from '@/app/actions/tokens';

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

export function useWatchlist() {
  const { currentWallet } = useCurrentWallet();
  const account = currentWallet?.accounts?.[0];
  const accountAddress = account?.address;

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get localStorage key
  const getStorageKey = () => {
    return 'suihub_watchlist';
  };

  // Load watchlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = getStorageKey();
      let saved = localStorage.getItem(key);

      // If no account-specific data exists, try to migrate from the old generic key
      if (!saved) {
        const oldKey = 'suihub_watchlist';
        const oldData = localStorage.getItem(oldKey);
        if (oldData) {
          console.log('Migrating watchlist data from old key to account-specific key');
          saved = oldData;
          // Save to new key and remove old key
          localStorage.setItem(key, oldData);
          localStorage.removeItem(oldKey);
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
        console.log('No watchlist found in localStorage for account:', accountAddress);
        setWatchlist([]);
      }
    }
  }, [accountAddress]);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = getStorageKey();
      localStorage.setItem(key, JSON.stringify(watchlist));
      console.log('Saved watchlist to localStorage:', watchlist);
    }
  }, [watchlist]);

  const addToWatchlist = (token: Token) => {
    console.log('Adding token to watchlist:', token);
    console.log('Current account address:', accountAddress);

    setWatchlist(prev => {
      // Check if token is already in watchlist
      if (prev.some(item => item.id === token.id)) {
        console.log('Token already in watchlist:', token.id);
        return prev; // Already exists
      }

      const newItem: WatchlistItem = {
        ...token,
        addedAt: Date.now(),
        alerts: []
      };

      console.log('New watchlist item:', newItem);
      const updated = [...prev, newItem];
      console.log('Updated watchlist:', updated);
      return updated;
    });
  };

  const removeFromWatchlist = (tokenId: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== tokenId));
  };

  const isInWatchlist = (tokenId: string): boolean => {
    return watchlist.some(item => item.id === tokenId);
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
    return watchlist.reduce((total, item) => total + item.price, 0);
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

  return {
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
}