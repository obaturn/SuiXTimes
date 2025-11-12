"use client";

import React, { useEffect, useState } from 'react';
import { fetchTopPerformingTokens, fetchSuiChartData, fetchSuiToken, Token } from '@/app/actions/tokens';
import { useWatchlist } from '@/hooks/use-watchlist';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Star, Search, TrendingUp, TrendingDown, Plus, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

// Dynamically import chart components to avoid SSR issues
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">
    <div className="animate-pulse text-slate-400">Loading chart...</div>
  </div>
});

// Import and register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Markets = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [suiData, setSuiData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'change'>('market_cap');

  const { addToWatchlist, removeFromWatchlist, isInWatchlist, watchlist: currentWatchlist } = useWatchlist();

  // Filter and sort tokens
  useEffect(() => {
    let filtered = tokens.filter(token =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort tokens
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change24h - a.change24h;
        case 'market_cap':
        default:
          // Simple market cap sorting based on formatted string
          const getMarketCapValue = (formatted: string) => {
            const match = formatted.match(/\$([0-9.]+)([BKM])/);
            if (!match) return 0;
            const value = parseFloat(match[1]);
            const unit = match[2];
            switch (unit) {
              case 'B': return value * 1_000_000_000;
              case 'M': return value * 1_000_000;
              case 'K': return value * 1_000;
              default: return value;
            }
          };
          return getMarketCapValue(b.marketCapFormatted) - getMarketCapValue(a.marketCapFormatted);
      }
    });

    setFilteredTokens(filtered);
  }, [tokens, searchQuery, sortBy]);

  useEffect(() => {
    const getTokens = async () => {
      setLoading(true);
      const fetchedTokens = await fetchTopPerformingTokens();
      setTokens(fetchedTokens);

      // Get SUI specific data
      const suiToken = fetchedTokens.find(token => token.symbol === 'SUI');
      if (suiToken) {
        setSuiData(suiToken);
      }

      setLoading(false);
      setLastUpdated(new Date());
    };

    const getChartData = async () => {
      setChartLoading(true);
      const data = await fetchSuiChartData(30); // 30 days of data
      setChartData(data);
      setChartLoading(false);
    };

    getTokens();
    getChartData();

    // Set up auto-refresh: tokens every 2 minutes, SUI data every 30 seconds
    const tokenInterval = setInterval(() => {
      getTokens();
    }, 2 * 60 * 1000); // 2 minutes for tokens

    const suiInterval = setInterval(async () => {
      // Quick SUI data update using server action
      try {
        const suiToken = await fetchSuiToken();
        if (suiToken) {
          setSuiData(suiToken);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.warn("Failed to update SUI data:", error);
      }
    }, 30 * 1000); // 30 seconds for SUI data

    return () => {
      clearInterval(tokenInterval);
      clearInterval(suiInterval);
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* SUI Price Chart Section */}
      <div className="rounded-lg bg-slate-800/60 p-6 backdrop-blur-md border border-slate-700/50">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img src={suiData?.image || "/placeholder.svg"} alt="SUI" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white">SUI/USD</h2>
              <p className="text-3xl font-bold text-white mt-1">${suiData?.price?.toFixed(4) || '1.5000'}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center justify-end space-x-2 ${suiData?.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {suiData?.change24h >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span>{suiData?.change24h?.toFixed(2) || '+3.20'}% (24h)</span>
            </div>
            <div className={`flex items-center justify-end space-x-2 text-sm ${suiData?.changeHour >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {suiData?.changeHour >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{suiData?.changeHour?.toFixed(2) || '+1.20'}% (1h)</span>
            </div>
          </div>
        </div>

        {/* SUI Price Chart */}
        <div className="h-64 bg-slate-900/50 rounded-lg border border-slate-700/30 p-4">
          {chartLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse text-slate-400">Loading chart...</div>
            </div>
          ) : chartData && chartData.prices ? (
            <Line
              data={{
                labels: chartData.prices.map((point: any) => point.date),
                datasets: [{
                  label: 'SUI Price (USD)',
                  data: chartData.prices.map((point: any) => point.price),
                  borderColor: '#8b5cf6',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  fill: true,
                  tension: 0.4,
                  pointRadius: 0,
                  pointHoverRadius: 4,
                  pointBackgroundColor: '#8b5cf6',
                  pointBorderColor: '#ffffff',
                  pointBorderWidth: 2,
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#8b5cf6',
                    borderWidth: 1,
                    callbacks: {
                      title: function(context) {
                        return context[0].label;
                      },
                      label: function(context) {
                        return `Price: $${context.parsed.y !== null ? context.parsed.y.toFixed(4) : 'N/A'}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    display: false,
                    grid: {
                      display: false,
                    }
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    }
                  }
                },
                elements: {
                  point: {
                    hoverRadius: 6,
                  }
                },
                interaction: {
                  intersect: false,
                  mode: 'index',
                }
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-slate-400">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Unable to load chart</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-white">
          <div>
            <p className="text-sm text-slate-400">Market Cap</p>
            <p className="font-semibold">{suiData?.marketCapFormatted || '$1.5B'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Volume (24h)</p>
            <p className="font-semibold">{suiData?.volumeFormatted || '$1.2M'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">24h High</p>
            <p className="font-semibold text-green-400">$1.55</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">24h Low</p>
            <p className="font-semibold text-red-400">$1.42</p>
          </div>
        </div>

        {lastUpdated && (
          <div className="mt-4 text-xs text-slate-400 text-center">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Sui Ecosystem Tokens ({filteredTokens.length})</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={async () => {
                setLoading(true);
                const fetchedTokens = await fetchTopPerformingTokens();
                setTokens(fetchedTokens);
                const suiToken = fetchedTokens.find(token => token.symbol === 'SUI');
                if (suiToken) {
                  setSuiData(suiToken);
                }
                setLoading(false);
                setLastUpdated(new Date());
                toast.success('Data refreshed');
              }}
              disabled={loading}
              className="border-purple-400 text-purple-300 hover:bg-purple-500/30"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800/60 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              title="Sort tokens by"
              className="bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="market_cap">Market Cap</option>
              <option value="price">Price</option>
              <option value="change">24h Change</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700"></div>
                  <div>
                    <div className="h-4 w-20 bg-slate-700 rounded"></div>
                    <div className="h-4 w-16 bg-slate-700 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-800/40 rounded-lg text-sm font-semibold text-slate-300">
              <div className="col-span-4">Token</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">24h Change</div>
              <div className="col-span-2 text-right">Volume</div>
              <div className="col-span-1 text-right">Market Cap</div>
              <div className="col-span-1 text-right">Watchlist</div>
            </div>

            {/* Token Rows */}
            {filteredTokens.map((token) => {
              const inWatchlist = isInWatchlist(token.id);
              return (
                <div key={token.id} className="grid grid-cols-12 gap-4 px-4 py-4 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg hover:bg-slate-800/80 transition-colors">
                  <div className="col-span-4 flex items-center space-x-3">
                    <img src={token.image} alt={token.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-bold text-white text-sm">{token.name}</p>
                      <p className="text-xs text-slate-400">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <p className="text-white font-semibold">${token.price.toFixed(4)}</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <div className={`flex items-center space-x-1 text-sm font-semibold ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {token.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{token.change24h.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <p className="text-white text-sm">{token.volumeFormatted}</p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <p className="text-white text-sm">{token.marketCapFormatted}</p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Watchlist button clicked for token:', token);
                        console.log('Currently in watchlist:', inWatchlist);
                        console.log('Token ID:', token.id, 'Token symbol:', token.symbol);
                        if (inWatchlist) {
                          console.log('Removing from watchlist');
                          removeFromWatchlist(token.id);
                          toast.success(`Removed ${token.symbol} from watchlist`);
                        } else {
                          console.log('Adding to watchlist - calling addToWatchlist');
                          addToWatchlist(token);
                          console.log('addToWatchlist called, checking if token was added...');
                          // Check immediately if it was added
                          setTimeout(() => {
                            console.log('After add - isInWatchlist check:', isInWatchlist(token.id));
                          }, 100);
                          toast.success(`Added ${token.symbol} to watchlist`, {
                            action: {
                              label: 'View Watchlist',
                              onClick: () => window.location.href = '/dashboard/watchlist'
                            }
                          });
                        }
                      }}
                      className={`h-10 w-10 p-0 cursor-pointer ${inWatchlist ? 'text-green-400 hover:text-green-300' : 'text-slate-400 hover:text-purple-400'}`}
                    >
                      {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Markets;