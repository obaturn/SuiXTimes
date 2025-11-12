"use client";

import React from 'react';
import { useWatchlist } from '@/hooks/use-watchlist';
import { Token } from '@/app/actions/tokens';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

const staticTokens = [
  {
    name: 'SUI',
    symbol: 'SUI',
    description: 'The native token for gas, staking, and governance.',
    logoUrl: 'https://static.cdnlogo.com/logos/s/8/sui.svg',
    id: 'sui'
  },
  {
    name: 'Cetus Protocol',
    symbol: 'CETUS',
    description: 'A decentralized exchange and concentrated liquidity protocol.',
    logoUrl: 'https://logo.svgcdn.com/token-branded/cetus.svg',
    id: 'cetus-protocol'
  },
  {
    name: 'Scallop',
    symbol: 'SCA',
    description: 'A leading DeFi protocol for lending and borrowing.',
    logoUrl: 'https://www.coingecko.com/coins/31133/logo_4x.png',
    id: 'scallop-protocol'
  },
  {
    name: 'Sui Name Service',
    symbol: 'SNS',
    description: 'Provides decentralized, human-readable names for wallets.',
    logoUrl: 'https://sns.id/favicon.ico',
    id: 'sui-name-service'
  }
];

// Convert static tokens to Token format with defaults
const tokens: Token[] = staticTokens.map(token => ({
  id: token.id,
  name: token.name,
  symbol: token.symbol,
  price: 0, // Default, will be updated if fetched
  changeHour: 0,
  change24h: 0,
  marketCapFormatted: 'N/A',
  volumeFormatted: 'N/A',
  isMostBought: false,
  image: token.logoUrl
}));

const EcosystemTokens = () => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleWatchlistToggle = (token: Token) => {
    if (isInWatchlist(token.id)) {
      removeFromWatchlist(token.id);
      toast.success(`Removed ${token.symbol} from watchlist`);
    } else {
      addToWatchlist(token);
      toast.success(`Added ${token.symbol} to watchlist`, {
        action: {
          label: 'View Watchlist',
          onClick: () => window.location.href = '/dashboard/watchlist'
        }
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4" style={{backgroundColor: '#030F1C'}}>
      <div className="container mx-auto text-center max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          A Thriving Ecosystem
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mb-8 sm:mb-12">
          Explore the foundational tokens that power the Sui network.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {tokens.map((token) => {
            const inWatchlist = isInWatchlist(token.id);
            return (
              <div key={token.id} className="bg-gray-900/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 transform hover:-translate-y-1 relative">
                <div className="flex items-center justify-center mb-4 h-16">
                  {token.image ? (
                    <img src={token.image} alt={`${token.name} logo`} className="h-12 w-12" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center text-white font-bold text-xl">
                      {token.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{token.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {staticTokens.find(t => t.id === token.id)?.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWatchlistToggle(token)}
                  className={`w-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-200 ${
                    inWatchlist ? 'bg-cyan-500/10 border-cyan-400' : ''
                  }`}
                >
                  {inWatchlist ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Watchlist
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EcosystemTokens;
