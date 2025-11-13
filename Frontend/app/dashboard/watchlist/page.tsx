"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Bell, Trash2, Star, ArrowUpRight, RefreshCw, TrendingUp, TrendingDown, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useWatchlist } from '@/hooks/use-watchlist';
import { fetchTopPerformingTokens, fetchSuiToken, Token } from '@/app/actions/tokens';
import { toast } from 'sonner';
import StreakCard from '@/components/streak/StreakCard';

const Watchlist = () => {
  const {
    watchlist,
    removeFromWatchlist,
    updateTokenPrices,
    addPriceAlert,
    removePriceAlert,
    togglePriceAlert,
    checkPriceAlerts,
    getWatchlistValue,
    getTopPerformer,
    getWorstPerformer,
    getActiveAlertsCount,
  } = useWatchlist();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedTokenForAlert, setSelectedTokenForAlert] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'above' | 'below'>('above');
  const [alertPrice, setAlertPrice] = useState('');

  // Refresh prices for watchlist tokens
  const refreshPrices = async () => {
    setIsRefreshing(true);
    try {
      const updatedTokens = await fetchTopPerformingTokens();
      updateTokenPrices(updatedTokens);
      setLastUpdated(new Date());
      toast.success('Prices updated');
    } catch (error) {
      console.error('Failed to refresh prices:', error);
      toast.error('Failed to refresh prices');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh prices every 30 seconds for better real-time updates
  useEffect(() => {
    const interval = setInterval(refreshPrices, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Check for triggered alerts every 30 seconds
  useEffect(() => {
    const checkAlerts = () => {
      const currentPrices: { [tokenId: string]: number } = {};
      watchlist.forEach(token => {
        currentPrices[token.id] = token.price;
      });

      const triggeredAlerts = checkPriceAlerts(currentPrices);
      triggeredAlerts.forEach(({ tokenId, alert, currentPrice }) => {
        const token = watchlist.find(t => t.id === tokenId);
        if (token) {
          toast.success(
            `${token.symbol} Alert: Price ${alert.type === 'above' ? 'reached' : 'dropped to'} $${alert.price.toFixed(4)} (Current: $${currentPrice.toFixed(4)})`,
            { duration: 8000 }
          );
        }
      });
    };

    const alertInterval = setInterval(checkAlerts, 30 * 1000);
    return () => clearInterval(alertInterval);
  }, [watchlist, checkPriceAlerts]);

  // Separate SUI price updates every 30 seconds for real-time SUI data
  useEffect(() => {
    const updateSuiPrice = async () => {
      try {
        const suiToken = await fetchSuiToken();
        if (suiToken) {
          updateTokenPrices([suiToken]);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.warn("Failed to update SUI price in watchlist:", error);
      }
    };

    const suiInterval = setInterval(updateSuiPrice, 30 * 1000);
    // Initial SUI update
    updateSuiPrice();
    return () => clearInterval(suiInterval);
  }, []);

  // Initial price load
  useEffect(() => {
    console.log('Watchlist changed, current length:', watchlist.length);
    console.log('Current watchlist items:', watchlist);
    if (watchlist.length > 0) {
      console.log('Refreshing prices for watchlist');
      refreshPrices();
    }
  }, [watchlist]);

  const summary = [
    {
      label: 'Watchlist Value',
      value: watchlist.length > 0 ? `$${getWatchlistValue().toFixed(2)}` : '$0.00'
    },
    {
      label: 'Top Performer',
      value: getTopPerformer()?.symbol || 'N/A',
      change: getTopPerformer() ? `${getTopPerformer()!.change24h >= 0 ? '+' : ''}${getTopPerformer()!.change24h.toFixed(2)}%` : undefined
    },
    {
      label: 'Worst Performer',
      value: getWorstPerformer()?.symbol || 'N/A',
      change: getWorstPerformer() ? `${getWorstPerformer()!.change24h >= 0 ? '+' : ''}${getWorstPerformer()!.change24h.toFixed(2)}%` : undefined
    },
    {
      label: 'Active Alerts',
      value: getActiveAlertsCount().toString()
    },
  ];

  const handleCreateAlert = (tokenId: string) => {
    setSelectedTokenForAlert(tokenId);
    setShowAlertModal(true);
    const token = watchlist.find(t => t.id === tokenId);
    if (token) {
      setAlertPrice(token.price.toFixed(4));
    }
  };

  const handleSaveAlert = () => {
    if (!selectedTokenForAlert || !alertPrice) return;

    const price = parseFloat(alertPrice);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    addPriceAlert(selectedTokenForAlert, {
      type: alertType,
      price: price,
      isActive: true
    });

    const token = watchlist.find(t => t.id === selectedTokenForAlert);
    toast.success(`Alert created for ${token?.symbol}: Price ${alertType} $${price.toFixed(4)}`);

    setShowAlertModal(false);
    setSelectedTokenForAlert(null);
    setAlertPrice('');
  };

  const alerts = watchlist.flatMap(item =>
    item.alerts.map(alert => ({
      token: item.symbol,
      condition: `Price ${alert.type === 'above' ? '>' : '<'} $${alert.price.toFixed(4)}`,
      isActive: alert.isActive,
      id: alert.id,
      tokenId: item.id,
    }))
  );

  const alertHistory = watchlist.flatMap(item =>
    item.alerts
      .filter(alert => alert.triggeredAt)
      .map(alert => ({
        token: item.symbol,
        message: `Price ${alert.type === 'above' ? 'reached' : 'dropped to'} $${alert.price.toFixed(4)}`,
        time: new Date(alert.triggeredAt!).toLocaleString(),
      }))
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-white">My Watchlist</h1>

      {/* Streak Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StreakCard />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

      {lastUpdated && (
        <div className="text-xs text-slate-400 text-center">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h2 className="text-xl lg:text-2xl font-bold text-white">Tokens</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={refreshPrices}
                disabled={isRefreshing}
                className="border-purple-400 text-purple-300 hover:bg-purple-500/30 text-sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={() => window.location.href = '/dashboard/markets'}
                className="bg-purple-600 hover:bg-purple-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Token
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {watchlist.length === 0 ? (
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No tokens in watchlist</h3>
                <p className="text-slate-400 mb-6">Add tokens from the Markets page to start tracking them</p>
                <Button
                  onClick={() => window.location.href = '/dashboard/markets'}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Browse Markets
                </Button>
              </div>
            ) : (
              watchlist.map(token => (
                <div key={token.id} className="rounded-lg bg-slate-800/60 p-3 lg:p-4 backdrop-blur-md border border-slate-700/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <img src={token.image} alt={token.symbol} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full" />
                    <div>
                      <p className="font-bold text-white text-sm lg:text-base">{token.name}</p>
                      <p className="text-xs lg:text-sm text-slate-400">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-white text-sm lg:text-base">${token.price.toFixed(4)}</p>
                    <div className={`flex items-center justify-start sm:justify-end space-x-1 text-sm font-semibold ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {token.change24h >= 0 ? <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" /> : <TrendingDown className="w-3 h-3 lg:w-4 lg:h-4" />}
                      <span>{token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center sm:justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCreateAlert(token.id)}
                      className="text-slate-400 hover:text-purple-400 p-2"
                      title="Create price alert"
                    >
                      <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        removeFromWatchlist(token.id);
                        toast.success(`Removed ${token.symbol} from watchlist`);
                      }}
                      className="text-slate-400 hover:text-red-400 p-2"
                    >
                      <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <h2 className="text-xl lg:text-2xl font-bold text-white">Alerts</h2>
          <div className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No alerts set up yet</p>
                <p className="text-sm text-slate-500 mt-1">Add tokens to watchlist to create price alerts</p>
              </div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">{alert.token}</p>
                    <p className="text-sm text-slate-400">{alert.condition}</p>
                  </div>
                  <Switch
                    checked={alert.isActive}
                    onCheckedChange={() => {
                      togglePriceAlert(alert.tokenId, alert.id);
                      const token = watchlist.find(t => t.id === alert.tokenId);
                      toast.success(`${alert.isActive ? 'Disabled' : 'Enabled'} alert for ${token?.symbol}`);
                    }}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
              ))
            )}
          </div>

          <h2 className="text-2xl font-bold text-white">Alert History</h2>
          <div className="space-y-3">
            {alertHistory.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-slate-400">No alert history yet</p>
                <p className="text-sm text-slate-500 mt-1">Triggered alerts will appear here</p>
              </div>
            ) : (
              alertHistory.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <Bell className="w-4 h-4 text-purple-400" />
                  <p className="text-slate-300">{item.token}: {item.message}</p>
                  <p className="text-slate-500">{item.time}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Price Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Create Price Alert</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAlertModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {selectedTokenForAlert && (
              <div className="mb-4">
                {(() => {
                  const token = watchlist.find(t => t.id === selectedTokenForAlert);
                  return token ? (
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <img src={token.image} alt={token.symbol} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-bold text-white">{token.name}</p>
                        <p className="text-sm text-slate-400">Current: ${token.price.toFixed(4)}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Alert Type</label>
                <div className="flex space-x-2">
                  <Button
                    variant={alertType === 'above' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAlertType('above')}
                    className={alertType === 'above' ? 'bg-green-600 hover:bg-green-700' : 'border-slate-600 text-slate-300'}
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Above
                  </Button>
                  <Button
                    variant={alertType === 'below' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAlertType('below')}
                    className={alertType === 'below' ? 'bg-red-600 hover:bg-red-700' : 'border-slate-600 text-slate-300'}
                  >
                    <TrendingDown className="w-4 h-4 mr-1" />
                    Below
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Price</label>
                <input
                  type="number"
                  step="0.0001"
                  value={alertPrice}
                  onChange={(e) => setAlertPrice(e.target.value)}
                  placeholder="Enter price..."
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleSaveAlert}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  disabled={!alertPrice || parseFloat(alertPrice) <= 0}
                >
                  Create Alert
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAlertModal(false)}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;